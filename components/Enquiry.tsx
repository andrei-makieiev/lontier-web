"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/site";
import { useEnquiry } from "./EnquiryContext";
import { Words } from "./Words";

type Status = "idle" | "sending" | "sent" | "error";

/** A ready-written WhatsApp message to the house, prefilled with the enquiry. */
function whatsappLink(d: { name?: string; channel?: string; message?: string; topic?: string }) {
  const lines = [
    `Hello ${site.name}, this is ${d.name || "a new client"}.`,
    d.topic ? `Regarding: ${d.topic}` : "",
    d.message || "",
    d.channel ? `You can reach me at: ${d.channel}` : "",
  ].filter(Boolean);
  return `https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(lines.join("\n\n"))}`;
}

/** VIII. Enquiry — contact channels and the four-field form (posts to /api/enquiry). */
export function Enquiry() {
  const { topic, setTopic } = useEnquiry();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [last, setLast] = useState<{ name?: string; channel?: string; message?: string; topic?: string }>({});
  const c = site.contact;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    setLast({ name: data.name, channel: data.channel, message: data.message, topic });
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, topic, consent: data.consent === "on" }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("sent");
      form.reset();
      setTopic("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section id="enquiry" className="enquiry on-dark" data-pill-hide="">
      <div className="wrap grid">
        <div>
          <div className="eyebrow" data-reveal="">
            VIII. &nbsp;Enquiry
          </div>
          <Words lines={["Tell us what you need."]} />
          <p className="intro" data-reveal="">
            Every enquiry is read by a principal and answered within the day. Nothing you write leaves this house.
          </p>
          <div className="chan" data-reveal="">
            <a href={c.phoneHref}>
              <span className="l">Telephone</span>
              <span className="v">{c.phoneDisplay}</span>
            </a>
            <a href={c.whatsappHref}>
              <span className="l">WhatsApp</span>
              <span className="v">Direct line</span>
            </a>
            <a href={c.telegramHref}>
              <span className="l">Telegram</span>
              <span className="v">{c.telegramHandle}</span>
            </a>
            <a href={c.instagramHref} target="_blank" rel="noopener noreferrer">
              <span className="l">Instagram</span>
              <span className="v">{c.instagramHandle}</span>
            </a>
            <a href={`mailto:${c.office}`}>
              <span className="l">Office</span>
              <span className="v">{c.office}</span>
            </a>
          </div>
        </div>

        <div className="letter" data-reveal="">
          <div className="hd">
            <span className="c">Correspondence</span>
          </div>

          {status === "sent" ? (
            <div className="sent" role="status">
              <div className="display">Received.</div>
              <p>A principal will reply to you personally within the day.</p>
              <a className="btn btn--line-bone wa" href={whatsappLink(last)} target="_blank" rel="noopener noreferrer">
                Continue on WhatsApp <span className="arr">→</span>
              </a>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate={false}>
              {topic && (
                <div className="topic">
                  <span className="l">Regarding</span>
                  <span className="t">{topic}</span>
                  <button type="button" onClick={() => setTopic("")}>
                    Change
                  </button>
                </div>
              )}
              <label className="fld">
                <span>Name</span>
                <input type="text" name="name" autoComplete="name" required maxLength={120} />
              </label>
              <label className="fld">
                <span>Where to reach you</span>
                <input type="text" name="channel" placeholder="Phone, WhatsApp, Telegram or email" required maxLength={200} />
              </label>
              <label className="fld">
                <span>The request</span>
                <textarea name="message" rows={3} placeholder="Dates, city and what needs to happen." required maxLength={4000} />
              </label>
              {/* Honeypot: real visitors never see or fill this. */}
              <label className="hp" aria-hidden="true">
                Company <input type="text" name="company" tabIndex={-1} autoComplete="off" />
              </label>
              <label className="consent">
                <input type="checkbox" name="consent" required />
                <span>
                  I consent to {site.name} processing the details above in order to respond to this enquiry, as described in the{" "}
                  <Link href="/privacy">Privacy Policy</Link>.
                </span>
              </label>
              {status === "error" && (
                <p className="err" role="alert">
                  {error}{" "}
                  <a href={whatsappLink(last)} target="_blank" rel="noopener noreferrer">
                    Send it on WhatsApp instead
                  </a>
                  .
                </p>
              )}
              <button type="submit" className="btn btn--line-bone" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Send enquiry"} <span className="arr">→</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
