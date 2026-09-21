import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const dialogCss = fs.readFileSync(path.join(root, "dialog.css"), "utf8");
const adminCss = fs.readFileSync(path.join(root, "admin.css"), "utf8");
const js = fs.readFileSync(path.join(root, "app.js"), "utf8");
const adminShell =
  '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Mensagens para Jéssica & Claudio</title><link rel="stylesheet" href="/admin.css"></head><body><main class="{{CLASS}}">{{CONTENT}}</main></body></html>';
const loginContent =
  '<p class="sub">Área reservada aos noivos</p><h1>Nossas mensagens</h1><p class="sub">Digite a senha para ler os recados recebidos.</p>{{ERROR}}<form method="post" action="/mensagens/login"><label class="field" for="password">Senha</label><input id="password" name="password" type="password" autocomplete="current-password" required><button type="submit">Entrar</button></form>';
const output = path.join(root, "dist", "server");
fs.mkdirSync(output, { recursive: true });

const worker = `const html = ${JSON.stringify(html)};
const css = ${JSON.stringify(css)};
const dialogCss = ${JSON.stringify(dialogCss)};
const adminCss = ${JSON.stringify(adminCss)};
const js = ${JSON.stringify(js)};
const adminShell = ${JSON.stringify(adminShell)};
const loginContent = ${JSON.stringify(loginContent)};

const escapeHtml = value => String(value ?? "").replace(/[&<>"']/g, character => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
})[character]);

const sha256 = async value => {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");
};

const adminPage = (content, login = false) => adminShell.replace("{{CLASS}}", login ? "login" : "wrap").replace("{{CONTENT}}", content);

const loginPage = error => adminPage(loginContent.replace("{{ERROR}}", error ? '<p class="error">Senha incorreta. Tente novamente.</p>' : ""), true);

const response = (body, type, status = 200) => new Response(body, {
  status,
  headers: { "content-type": type, "cache-control": type.includes("html") ? "no-cache" : "public, max-age=3600" }
});

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "GET" && url.pathname === "/") return response(html, "text/html; charset=utf-8");
    if (request.method === "GET" && url.pathname === "/styles.css") return response(css, "text/css; charset=utf-8");
    if (request.method === "GET" && url.pathname === "/dialog.css") return response(dialogCss, "text/css; charset=utf-8");
    if (request.method === "GET" && url.pathname === "/admin.css") return response(adminCss, "text/css; charset=utf-8");
    if (request.method === "GET" && url.pathname === "/app.js") return response(js, "text/javascript; charset=utf-8");

    if (request.method === "GET" && url.pathname === "/api/payment-config") {
      const giftId = String(url.searchParams.get("giftId") || "valor-livre").slice(0, 80);
      let payments = {};

      try {
        payments = JSON.parse(env.PAYMENT_CONFIG_JSON || "{}");
      } catch {
        payments = {};
      }

      const giftPayment = payments[giftId] || {};
      return response(JSON.stringify({
        pixCode: String(giftPayment.pixCode || ""),
        pixQr: String(giftPayment.pixQr || ""),
        cardUrl: String(giftPayment.cardUrl || ""),
        freePixKey: giftId === "valor-livre" ? String(env.FREE_PIX_KEY || "") : "",
        iban: giftId === "valor-livre" ? String(env.IBAN || "") : ""
      }), "application/json; charset=utf-8");
    }

    if (request.method === "POST" && url.pathname === "/api/messages") {
      if (!env.DB) return response(JSON.stringify({ error: "storage_unavailable" }), "application/json", 503);
      let data;
      try { data = await request.json(); } catch { return response(JSON.stringify({ error: "invalid_json" }), "application/json", 400); }
      if (data.website) return response(JSON.stringify({ ok: true }), "application/json");
      const name = String(data.name || "").trim().slice(0, 80);
      const message = String(data.message || "").trim().slice(0, 600);
      const giftId = String(data.giftId || "valor-livre").trim().slice(0, 80);
      const giftName = String(data.giftName || "Contribuição com valor livre").trim().slice(0, 160);
      if (!name || !message) return response(JSON.stringify({ error: "required_fields" }), "application/json", 400);
      await env.DB.prepare(
        "INSERT INTO guest_messages (guest_name, message, gift_id, gift_name) VALUES (?, ?, ?, ?)"
      ).bind(name, message, giftId, giftName).run();
      return response(JSON.stringify({ ok: true }), "application/json", 201);
    }

    if (url.pathname === "/mensagens/login" && request.method === "POST") {
      const form = await request.formData();
      const password = String(form.get("password") || "");
      if (!env.ADMIN_PASSWORD || password !== env.ADMIN_PASSWORD) return response(loginPage(true), "text/html; charset=utf-8", 401);
      const token = await sha256("jessica-claudio:" + env.ADMIN_PASSWORD);
      return new Response(null, { status: 303, headers: { "location": "/mensagens", "set-cookie": "wedding_admin=" + token + "; Path=/mensagens; HttpOnly; Secure; SameSite=Strict; Max-Age=604800" } });
    }

    if (url.pathname === "/mensagens/logout" && request.method === "POST") {
      return new Response(null, { status: 303, headers: { "location": "/mensagens", "set-cookie": "wedding_admin=; Path=/mensagens; HttpOnly; Secure; SameSite=Strict; Max-Age=0" } });
    }

    if (url.pathname === "/mensagens" && request.method === "GET") {
      if (!env.ADMIN_PASSWORD) return response("Painel ainda não configurado.", "text/plain; charset=utf-8", 503);
      const expected = await sha256("jessica-claudio:" + env.ADMIN_PASSWORD);
      const cookie = request.headers.get("cookie") || "";
      const authenticated = cookie.split(";").map(item => item.trim()).includes("wedding_admin=" + expected);
      if (!authenticated) return response(loginPage(false), "text/html; charset=utf-8");
      const result = await env.DB.prepare("SELECT guest_name, message, gift_name, created_at FROM guest_messages ORDER BY id DESC LIMIT 500").all();
      const items = result.results || [];
      const cards = items.length ? items.map(item => '<article class="message"><h2>' + escapeHtml(item.guest_name) + '</h2><p class="meta">' + escapeHtml(item.gift_name) + ' · ' + escapeHtml(item.created_at) + '</p><p>' + escapeHtml(item.message) + '</p></article>').join("") : '<div class="empty"><h2>Nenhuma mensagem ainda</h2><p>Quando um convidado enviar um recado, ele aparecerá aqui.</p></div>';
      return response(adminPage('<header class="top"><div><p class="sub">Jéssica & Claudio</p><h1>Mensagens recebidas</h1></div><form method="post" action="/mensagens/logout"><button class="logout" type="submit">Sair</button></form></header>' + cards), "text/html; charset=utf-8");
    }

    return response("Not found", "text/plain; charset=utf-8", 404);
  }
};
`;

fs.writeFileSync(path.join(output, "index.js"), worker);
fs.mkdirSync(path.join(root, "dist", ".openai"), { recursive: true });
fs.copyFileSync(
  path.join(root, ".openai", "hosting.json"),
  path.join(root, "dist", ".openai", "hosting.json"),
);
fs.mkdirSync(path.join(root, "dist", ".openai", "drizzle"), { recursive: true });
fs.copyFileSync(
  path.join(root, "drizzle", "0000_guest_messages.sql"),
  path.join(root, "dist", ".openai", "drizzle", "0000_guest_messages.sql"),
);
fs.copyFileSync(
  path.join(root, "drizzle", "0001_clear_test_messages.sql"),
  path.join(root, "dist", ".openai", "drizzle", "0001_clear_test_messages.sql"),
);
