import { NextResponse } from "next/server";
import { site } from "@/lib/site";

export const runtime = "nodejs";

type Body = { name?: unknown; channel?: unknown; message?: unknown; topic?: unknown; consent?: unknown; company?: unknown };
type Enquiry = { name: string; channel: string; message: string; topic: string };

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const esc = (s: string) => s.replace(/[&<>"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[ch]!);

/**
 * POST /api/enquiry — receives the enquiry form and delivers it to the house.
 *
 * Delivery channels (configure in the hosting dashboard):
 *  1. Telegram bot (primary) — TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
 *  2. Email via Resend (optional written copy) — RESEND_API_KEY, ENQUIRY_TO (+ ENQUIRY_FROM)
 * The visitor sees success if at least one configured channel delivered.
 * With nothing configured, the enquiry is only logged (demo mode).
 */
export async function POST(req: Request) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields. Pretend success, send nothing.
  if (str(body.company, 200)) return NextResponse.json({ ok: true });

  const e: Enquiry = {
    name: str(body.name, 120),
    channel: str(body.channel, 200),
    message: str(body.message, 4000),
    topic: str(body.topic, 120),
  };
  if (!e.name || !e.channel || !e.message) return NextResponse.json({ error: "Please fill in all three fields." }, { status: 422 });
  if (body.consent !== true) return NextResponse.json({ error: "Please confirm consent to process your details." }, { status: 422 });

  const text = [
    `New enquiry — ${site.name}`,
    "",
    `Name: ${e.name}`,
    `Reach at: ${e.channel}`,
    ...(e.topic ? [`Regarding: ${e.topic}`] : []),
    "",
    e.message,
    "",
    `Consent given: yes (${new Date().toISOString()})`,
  ].join("\n");

  const jobs: Array<[string, Promise<void>]> = [];
  if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) jobs.push(["telegram", sendTelegram(e)]);
  if (process.env.RESEND_API_KEY && process.env.ENQUIRY_TO) jobs.push(["email", sendEmail(e, text)]);

  if (jobs.length === 0) {
    console.info("[enquiry] no delivery channel configured — logged only\n" + text);
    return NextResponse.json({ ok: true, delivered: [] });
  }

  const results = await Promise.allSettled(jobs.map(([, p]) => p));
  const delivered = jobs.filter((_, i) => results[i].status === "fulfilled").map(([n]) => n);
  results.forEach((r, i) => r.status === "rejected" && console.error(`[enquiry] ${jobs[i][0]} failed:`, r.reason));

  if (delivered.length === 0) return NextResponse.json({ error: "We could not send your enquiry just now." }, { status: 502 });
  return NextResponse.json({ ok: true, delivered });
}

/**
 * Telegram Bot API (official, free). The bot posts each enquiry to TELEGRAM_CHAT_ID —
 * a private chat with the bot or a group the bot was added to (several people can follow it).
 * When the visitor left a phone number, a "Reply on WhatsApp" button opens a chat with them.
 */
async function sendTelegram(e: Enquiry) {
  const h = (s: string) => s.replace(/[&<>]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[ch]!);
  const html = [
    `<b>New enquiry — ${h(site.name)}</b>`,
    "",
    `<b>Name:</b> ${h(e.name)}`,
    `<b>Reach at:</b> ${h(e.channel)}`,
    ...(e.topic ? [`<b>Regarding:</b> ${h(e.topic)}`] : []),
    "",
    // Telegram caps a message at 4096 characters; long requests are trimmed here (the email copy keeps all of it).
    h(e.message.length > 3300 ? e.message.slice(0, 3300) + " …" : e.message),
    "",
    `<i>Consent given · ${new Date().toISOString().slice(0, 16).replace("T", " ")} UTC</i>`,
  ].join("\n");

  const digits = e.channel.replace(/\D/g, "");
  const looksLikePhone = digits.length >= 9 && digits.length <= 15 && !e.channel.includes("@");
  const res = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    signal: AbortSignal.timeout(8000),
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: html,
      parse_mode: "HTML",
      link_preview_options: { is_disabled: true },
      ...(looksLikePhone && {
        reply_markup: { inline_keyboard: [[{ text: "Reply on WhatsApp", url: `https://wa.me/${digits}` }]] },
      }),
    }),
  });
  const json = (await res.json().catch(() => ({}))) as { ok?: boolean; description?: string };
  if (!res.ok || !json.ok) throw new Error(`Telegram ${res.status}: ${json.description ?? "unknown error"}`);
}

/** Resend email (optional second channel, useful as a written record). */
async function sendEmail(e: Enquiry, text: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    signal: AbortSignal.timeout(8000),
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.ENQUIRY_FROM ?? `${site.name} <onboarding@resend.dev>`,
      to: process.env.ENQUIRY_TO!.split(",").map((s) => s.trim()),
      subject: `New enquiry${e.topic ? ` — ${e.topic}` : ""} — ${e.name}`,
      text,
      html: `<pre style="font:14px/1.6 Georgia,serif;white-space:pre-wrap">${esc(text)}</pre>`,
    }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${(await res.text().catch(() => "")).slice(0, 300)}`);
}
