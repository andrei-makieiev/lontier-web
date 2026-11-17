#!/usr/bin/env node
/**
 * Telegram helper for the enquiry bot.
 *   TELEGRAM_BOT_TOKEN=123:abc npm run telegram:chat-id
 *       → lists the chats that have written to the bot, with their ids
 *   TELEGRAM_BOT_TOKEN=123:abc TELEGRAM_CHAT_ID=-100… npm run telegram:test
 *       → sends a test message to that chat
 * Values can also live in .env.local (read automatically).
 */
import { readFileSync, existsSync } from "node:fs";

for (const f of [".env.local", ".env"]) {
  if (!existsSync(f)) continue;
  for (const line of readFileSync(f, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
  console.error("Set TELEGRAM_BOT_TOKEN first (from @BotFather).");
  process.exit(1);
}
const api = (method, body) =>
  fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body ?? {}),
  }).then((r) => r.json());

const cmd = process.argv[2];
if (cmd === "chat-id") {
  const me = await api("getMe");
  if (!me.ok) throw new Error(me.description);
  const up = await api("getUpdates");
  const chats = new Map();
  for (const u of up.result ?? []) {
    const c = (u.message ?? u.channel_post ?? u.my_chat_member ?? u.edited_message)?.chat;
    if (c) chats.set(c.id, c.title ?? ([c.first_name, c.last_name].filter(Boolean).join(" ") || c.username));
  }
  console.log(`Bot: @${me.result.username}`);
  if (!chats.size) console.log("No chats yet. Press Start in the bot (or send a message in the group it was added to), then run this again.");
  for (const [id, name] of chats) console.log(`  ${id}   ${name}`);
  console.log("\nPut the right id in TELEGRAM_CHAT_ID.");
} else if (cmd === "test") {
  const chat = process.env.TELEGRAM_CHAT_ID;
  if (!chat) {
    console.error("Set TELEGRAM_CHAT_ID too (run: npm run telegram:chat-id).");
    process.exit(1);
  }
  const r = await api("sendMessage", { chat_id: chat, text: "<b>Lontier</b>\nTest message: website enquiries will arrive here.", parse_mode: "HTML" });
  console.log(r.ok ? "Sent. Check Telegram." : `Telegram said: ${r.description}`);
  if (!r.ok) process.exit(1);
} else {
  console.log("Usage: node scripts/telegram.mjs chat-id | test");
}
