"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { Seal } from "./Seal";

/**
 * Floating UI: top nav, scroll progress line, the "Enquire" pill and the
 * "Ring the bell" contact dock. Visibility rules:
 *  - nav appears once the hero has scrolled 70% away
 *  - the bell appears after 60% of the hero; the pill after the hero,
 *    and hides whenever another call to action sits in the bottom of the screen
 *  - the contact menu closes on outside click, choosing an option, Esc or scrolling away
 */
export function Chrome() {
  const [past, setPast] = useState(false);
  const [dockOn, setDockOn] = useState(false);
  const [pillOn, setPillOn] = useState(false);
  const [open, setOpen] = useState(false);
  const [ringing, setRinging] = useState(false);
  const [tip, setTip] = useState(false);
  const progress = useRef<HTMLDivElement>(null);
  const dock = useRef<HTMLDivElement>(null);
  const openY = useRef(0);
  const greeted = useRef(false);

  const ring = useCallback(() => {
    setRinging(false);
    requestAnimationFrame(() => setRinging(true));
  }, []);

  const setDock = useCallback(
    (o: boolean) => {
      setOpen(o);
      if (o) {
        openY.current = window.scrollY;
        ring();
      }
    },
    [ring]
  );

  useEffect(() => {
    let q = false;
    const tick = () => {
      q = false;
      const h = window.innerHeight;
      const max = document.documentElement.scrollHeight - h;
      if (progress.current) progress.current.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max).toFixed(4) : 0})`;
      const hero = document.getElementById("top");
      const P = hero ? Math.min(1, Math.max(0, -hero.getBoundingClientRect().top / (hero.offsetHeight * 0.7))) : 1;
      const isPast = P >= 1;
      setPast(isPast);
      setDockOn(P > 0.6);
      const clash = Array.from(document.querySelectorAll("[data-pill-hide]")).some((el) => {
        const r = el.getBoundingClientRect();
        return r.bottom > h - 150 && r.top < h && r.height > 0;
      });
      setPillOn(isPast && !clash);
      if (Math.abs(window.scrollY - openY.current) > 160) setOpen(false);
    };
    const onScroll = () => {
      if (!q) {
        q = true;
        requestAnimationFrame(tick);
      }
    };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const id = window.setInterval(tick, 500); // panels opening change layout without scrolling
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.clearInterval(id);
    };
  }, []);

  // First appearance: ring once and show the "Ring the bell" tag for a moment.
  useEffect(() => {
    if (!dockOn || greeted.current) return;
    greeted.current = true;
    const a = window.setTimeout(() => {
      ring();
      setTip(true);
    }, 500);
    const b = window.setTimeout(() => setTip(false), 3700);
    return () => {
      window.clearTimeout(a);
      window.clearTimeout(b);
    };
  }, [dockOn, ring]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (dock.current && !dock.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("click", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const c = site.contact;
  return (
    <>
      <nav className={`nav${past ? " is-on" : ""}`} aria-label="Main">
        <a href="#top" className="brand">
          <Seal small />
          <span>{site.name}</span>
        </a>
        <div className="links">
          <a href="#services">Services</a>
          <a href="#how">How it works</a>
          <a href="#enquiry" className="btn btn--line-dark">
            Enquire
          </a>
        </div>
      </nav>

      <div className="progress" ref={progress} aria-hidden="true" />

      <div className={`pill${pillOn && !open ? " is-on" : ""}`}>
        <a href="#enquiry">Enquire</a>
      </div>

      <div ref={dock} className={`dock${dockOn ? " is-on" : ""}${open ? " open" : ""}`}>
        <div className="menu">
          <a href={c.whatsappHref} onClick={() => setOpen(false)}>
            WhatsApp<span>→</span>
          </a>
          <a href={c.telegramHref} onClick={() => setOpen(false)}>
            Telegram<span>→</span>
          </a>
          <a href={c.phoneHref} onClick={() => setOpen(false)}>
            Telephone<span>→</span>
          </a>
        </div>
        <div className="bellrow">
          <span className={`bell-tip${tip ? " show" : ""}`}>Ring the bell</span>
          <button
            type="button"
            className={`bell${ringing ? " ringing" : ""}`}
            aria-label="Ring the bell — WhatsApp, Telegram or telephone"
            aria-expanded={open}
            onClick={(e) => {
              e.stopPropagation();
              setDock(!open);
            }}
            onAnimationEnd={(e) => e.animationName === "bellRock" && setRinging(false)}
          >
            <BellIcon />
          </button>
        </div>
      </div>
    </>
  );
}

export function PrivacyLink({ children = "Privacy Policy" }: { children?: React.ReactNode }) {
  return <Link href="/privacy">{children}</Link>;
}

function BellIcon() {
  return (
    <svg className="bell-ico" aria-hidden="true" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.7}>
      <g className="b-ring" strokeWidth={1.4}>
        <path d="M5.5 15.5l3.4 2.6M42.5 15.5l-3.4 2.6M3 23.5h4M45 23.5h-4" />
      </g>
      <g className="b-body">
        <circle cx="24" cy="9.2" r="2.3" />
        <path d="M24 11.5v6.6" />
        <path d="M9.5 32.5a14.5 14.5 0 0 1 29 0" />
        <path d="M15 27.8a9.8 9.8 0 0 1 5.8-6" strokeWidth={1.3} strokeOpacity={0.7} />
      </g>
      <path d="M7 32.5h34v3.4H7z" />
      <path d="M4.5 35.9h39v3.6h-39z" />
    </svg>
  );
}
