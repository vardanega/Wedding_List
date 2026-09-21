CREATE TABLE IF NOT EXISTS guest_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  guest_name TEXT NOT NULL,
  message TEXT NOT NULL,
  gift_id TEXT NOT NULL,
  gift_name TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_guest_messages_created_at
ON guest_messages(created_at);
