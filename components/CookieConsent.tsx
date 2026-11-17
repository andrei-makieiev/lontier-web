"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export const CONSENT_KEY = "lontier-cookie-consent";
export type Consent = "essential" | "all";

/** Reads the visitor's cookie choice. Use it before loading any analytics. */
export function getConsent(): Consent | null {
  try {
    return (localStorage.getItem(CONSENT_KEY) as Consent | null) ?? null;
  } catch {
    return null;
  }
}

/**
 * GDPR banner. Essential cookies only until the visitor accepts.
 * Publishes its height as --consent-h so the floating buttons sit above it.
 * Fires a "lontier:consent" event when the choice is made.
 */
export function CookieConsent() {
  const [show, setShow] = useState(false);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setShow(getConsent() === null);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (!show || !bar.current) {
      root.style.setProperty("--consent-h", "0px");
      return;
    }
    const ro = new ResizeObserver(([e]) => root.style.setProperty("--consent-h", `${Math.ceil(e.contentRect.height) + 28 + 14}px`));
    ro.observe(bar.current);
    return () => ro.disconnect();
  }, [show]);

  const choose = (c: Consent) => {
    try {
      localStorage.setItem(CONSENT_KEY, c);
    } catch {}
    window.dispatchEvent(new CustomEvent("lontier:consent", { detail: c }));
    setShow(false);
  };

  return (
    <div className={`consentbar${show ? " show" : ""}`} role="region" aria-label="Cookie consent">
      <div className="wrap" ref={bar}>
        <p>
          We use essential cookies to run this site, and analytics cookies only with your consent. See our{" "}
          <Link href="/privacy">Privacy Policy</Link>.
        </p>
        <div className="b">
          <button type="button" className="btn btn--line-dark" onClick={() => choose("essential")}>
            Essential only
          </button>
          <button type="button" className="btn btn--solid-brass" onClick={() => choose("all")}>
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
