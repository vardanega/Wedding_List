// ============================================================
// 1. LISTA DE PRESENTES
// Altere aqui nomes, descrições, valores e imagens.
// ============================================================
const gifts = [
  {
    id: "lagoa-bonita",
    name: "Circuito Lagoa Bonita para dois",
    description: "Passeio pelas dunas e lagoas de Barreirinhas.",
    price: 280.0,
    image:
      "https://img.melhoresdestinos.com.br/image/upload/v1773415615/guia/cache/7812307c4f54514bd8d9a120956aa407.jpg",
  },
  {
    id: "rio-preguicas",
    name: "Lancha pelo Rio Preguiças para dois",
    description: "Um dia navegando entre Vassouras, Mandacaru e Caburé.",
    price: 280.0,
    image:
      "https://webbox.imgix.net/images/zlpcyquvspekxggv/a3150ccb-52b1-4176-ac7d-945f15d58612.jpeg",
  },
  {
    id: "circuito-atins",
    name: "Circuito Atins para dois",
    description: "Dunas, lagoas e o charme da vila de Atins.",
    price: 440.0,
    image:
      "https://midias.correio24horas.com.br/2024/09/06/edicasea-trilhas-do-parque-nacional-levam-a-paisagens-incriveis-das-lagoas-dos-lencois-maranhenses-imagem-9dstudio--shutterstock-0tejt7d37.jpg",
  },
  {
    id: "cavalgada-atins",
    name: "Cavalgada ao pôr do sol em Atins",
    description: "Uma experiência a dois entre praia, dunas e pôr do sol.",
    price: 400.0,
    image:
      "https://img.melhoresdestinos.com.br/image/upload/v1773415796/guia/cache/8aa5fc710f440c2574d831fadb39b6ee.jpg",
  },
  {
    id: "betania",
    name: "Circuito Betânia para dois",
    description: "Lagoas e comunidade tradicional em Santo Amaro.",
    price: 400.0,
    image:
      "https://img.melhoresdestinos.com.br/image/upload/v1773415615/guia/cache/7812307c4f54514bd8d9a120956aa407.jpg",
  },
  {
    id: "marau",
    name: "Lancha para Maraú e 4 Ilhas",
    description: "Passeio para duas pessoas pelas águas da Baía de Camamu.",
    price: 480.0,
    image:
      "https://ilheuspasseios.com.br/wp-content/uploads/2026/07/passeio-ilhas-marau-baia-camamu-ilheus-passeios-escuna-1024x768.webp",
  },
  {
    id: "cacau-ilheus",
    name: "Fazenda de cacau e Ilhéus para dois",
    description: "Cacau, chocolate e os cenários históricos de Jorge Amado.",
    price: 220.0,
    image:
      "https://ilheuspasseios.com.br/wp-content/uploads/2026/05/fruto-cacau-pe-fazenda-capela-velha-ilheus-1.webp",
  },
  {
    id: "itacare",
    name: "Passeio pelas praias de Itacaré",
    description: "Um dia a dois entre praias e paisagens da Costa do Cacau.",
    price: 220.0,
    image:
      "https://ilheuspasseios.com.br/wp-content/uploads/2026/07/mosaico-cachoeira-tijuipe-cacau-itacarezinho-casa-jorge-amado-ilheus-passeios-1024x768.webp",
  },
  {
    id: "bate-volta-lencois",
    name: "Bate e volta aos Lençóis Maranhenses",
    description: "Um dia inteiro saindo de São Luís para conhecer o parque.",
    price: 400.0,
    image:
      "https://midias.correio24horas.com.br/2024/09/06/edicasea-trilhas-do-parque-nacional-levam-a-paisagens-incriveis-das-lagoas-dos-lencois-maranhenses-imagem-9dstudio--shutterstock-0tejt7d37.jpg",
  },
  {
    id: "mixer",
    name: "Mixer Britânia 3 em 1",
    description: "Mixer, processador e batedor para facilitar as receitas.",
    price: 160.16,
    image:
      "https://lojasunilar.vtexassets.com/arquivos/ids/291145/2811312213111.png?v=638623734957630000",
  },
  {
    id: "airfryer",
    name: "Air fryer Mondial 4 litros",
    description: "Fritadeira sem óleo de 1.500 W para o dia a dia.",
    price: 272.63,
    image:
      "https://casaspernambucanas.vtexassets.com/arquivos/ids/1279333/996461_1.jpg?v=638902112925130000",
  },
  {
    id: "purificador",
    name: "Purificador de água Consul",
    description: "Modelo compacto com filtragem Classe A.",
    price: 269.9,
    image:
      "https://conteudoproduto.magazineluiza.com.br/22/222050500/222050500/index.jpg",
  },
  {
    id: "cafeteira",
    name: "Cafeteira Espresso LOV",
    description: "Cafeteira automática TRES 3 Corações para cápsulas.",
    price: 395.32,
    image:
      "https://images.tcdn.com.br/img/img_prod/1452919/cafeteira_espresso_lov_automatica_preta_3_coracoes_127v_413_1_075237b284d95484941d4bff3e4e4ec3.jpg",
  },
  {
    id: "poltrona",
    name: "Poltrona decorativa",
    description: "Uma poltrona confortável para o cantinho da sala.",
    price: 303.05,
    image:
      "https://images.tcdn.com.br/img/img_prod/731441/poltrona_decorativa_melinda_veludo_bege_montanaris_decor_7407_1_44b67aa890ec0295e46a14840ba2cba3.jpg",
  },
  {
    id: "panelas",
    name: "Jogo de panelas Tramontina",
    description: "Conjunto Paris antiaderente com sete peças.",
    price: 340.31,
    image:
      "https://assets.tramontina.com.br/upload/tramon/imagens/CUT/20899050IXP001G.jpg",
  },
];

// ============================================================
// 2. FORMAS DE PAGAMENTO
// Os dados são carregados pelo servidor a partir do arquivo .env.
// Assim, IBAN, Pix e links de pagamento não ficam escritos neste arquivo.
// ============================================================

// ============================================================
// 3. ELEMENTOS DA PÁGINA
// Estas variáveis ligam o JavaScript aos elementos do HTML.
// ============================================================
const currency = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const grid = document.querySelector("#gift-grid");
const dialog = document.querySelector("#payment-dialog");
const selection = document.querySelector("#selection");
const pixBox = document.querySelector("#pix-box");
const pixCode = document.querySelector("#pix-code");
const pixQr = document.querySelector("#pix-qr");
const pixPlaceholder = document.querySelector("#pix-placeholder");
const copyPix = document.querySelector("#copy-pix");
const pixLabel = document.querySelector("#pix-label");
const cardPayment = document.querySelector("#card-payment");
const ibanBox = document.querySelector("#iban-box");
const freePixBox = document.querySelector("#free-pix-box");
const freePixKey = document.querySelector("#free-pix-key");
const copyFreePix = document.querySelector("#copy-free-pix");
const iban = document.querySelector("#iban");
const messageForm = document.querySelector("#message-form");
const guestName = document.querySelector("#guest-name");
const guestMessage = document.querySelector("#guest-message");
const messageStatus = document.querySelector("#message-status");
let currentGift = null;

// ============================================================
// 4. MONTAGEM DOS CARTÕES DE PRESENTES
// ============================================================
grid.innerHTML = gifts
  .map(
    (gift) => `
  <article class="gift">
    <div class="gift-art"><img src="${gift.image}" alt="${gift.name}" loading="lazy"></div>
    <div class="gift-content">
      <h3>${gift.name}</h3>
      <p>${gift.description}</p>
      <div class="price">${currency.format(gift.price)}</div>
      <p class="price-note">Valor consultado em 21/09/2026</p>
      <button type="button" data-gift="${gift.id}">Presentear</button>
    </div>
  </article>`,
  )
  .join("");

async function loadPayment(gift) {
  const giftId = gift?.id || "valor-livre";
  const response = await fetch(`/api/payment-config?giftId=${encodeURIComponent(giftId)}`);

  if (!response.ok) {
    return {};
  }

  return response.json();
}

async function openPayment(gift) {
  currentGift = gift;
  const payment = await loadPayment(gift);
  selection.textContent = gift
    ? `${gift.name} — ${currency.format(gift.price)}`
    : "Contribuição com valor livre";
  pixCode.textContent = payment.pixCode || "";
  pixQr.src = payment.pixQr || "";
  pixQr.hidden = !payment.pixQr;
  pixPlaceholder.hidden = Boolean(payment.pixQr);
  pixCode.hidden = !payment.pixCode;
  copyPix.hidden = !payment.pixCode;
  pixBox.hidden = !gift;
  pixLabel.textContent = gift ? "Pix copia e cola" : "Pix · valor livre";
  ibanBox.hidden = Boolean(gift);
  freePixBox.hidden = Boolean(gift);
  freePixKey.textContent = payment.freePixKey || "Chave Pix será adicionada aqui";
  copyFreePix.hidden = !payment.freePixKey;
  iban.textContent = payment.iban || "IBAN será adicionado aqui";
  cardPayment.href = payment.cardUrl || "#";
  cardPayment.hidden = !gift;
  messageStatus.textContent = "";
  dialog.showModal();
}

// ============================================================
// 5. ABRIR E FECHAR A JANELA DE PAGAMENTO
// ============================================================
grid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-gift]");
  if (button) openPayment(gifts.find((gift) => gift.id === button.dataset.gift));
});
document
  .querySelector("[data-free-value]")
  .addEventListener("click", () => openPayment(null));
document.querySelector(".close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

// ============================================================
// 6. GERAR UMA SUGESTÃO DE MENSAGEM
// ============================================================
document.querySelector("#suggest-message").addEventListener("click", () => {
  const giftName = currentGift ? currentGift.name.toLowerCase() : "este novo começo";
  const suggestions = [
    `Que ${giftName} traga momentos lindos e muitas histórias felizes para vocês. Com carinho!`,
    `Desejamos que a vida a dois seja repleta de amor, cumplicidade e aventuras inesquecíveis. Aproveitem muito ${giftName}!`,
    `Que este presente faça parte de uma vida cheia de alegrias, sonhos realizados e muito amor. Felicidades aos noivos!`,
    `Com muito carinho, desejamos que ${giftName} seja apenas um dos muitos momentos especiais dessa nova caminhada juntos.`,
  ];
  guestMessage.value = suggestions[Math.floor(Math.random() * suggestions.length)];
  guestMessage.focus();
});

// ============================================================
// 7. ENVIAR A MENSAGEM PARA O BANCO DE DADOS
// ============================================================
messageForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const submit = messageForm.querySelector("[type=submit]");
  submit.disabled = true;
  messageStatus.textContent = "Enviando sua mensagem…";
  try {
    const response = await fetch("/api/messages", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: guestName.value.trim(),
        message: guestMessage.value.trim(),
        giftId: currentGift?.id || "valor-livre",
        giftName: currentGift?.name || "Contribuição com valor livre",
        website: messageForm.website.value,
      }),
    });
    if (!response.ok) throw new Error("Falha ao salvar");
    messageForm.reset();
    messageStatus.textContent = "Mensagem enviada com carinho ✓";
  } catch {
    messageStatus.textContent =
      "Não foi possível enviar agora. Sua mensagem continua aqui para você tentar novamente.";
  } finally {
    submit.disabled = false;
  }
});

// ============================================================
// 8. BOTÕES PARA COPIAR PIX E IBAN
// ============================================================
document.querySelectorAll("[data-copy]").forEach((button) =>
  button.addEventListener("click", async () => {
    const value = document.querySelector(`#${button.dataset.copy}`).textContent;
    await navigator.clipboard.writeText(value);
    const original = button.textContent;
    button.textContent = "Copiado ✓";
    setTimeout(() => (button.textContent = original), 1600);
  }),
);
