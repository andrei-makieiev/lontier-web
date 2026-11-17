"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { services, nn } from "@/lib/content";
import { site } from "@/lib/site";
import { useEnquiry } from "./EnquiryContext";
import { Frame } from "./Frame";
import { Words } from "./Words";

/** III. What We Do — seven rows; the whole row opens a panel; one panel open at a time. */
export function Services() {
  const [open, setOpen] = useState<string | null>(null);
  const { setTopic } = useEnquiry();
  const buttons = useRef<Record<string, HTMLButtonElement | null>>({});
  const section = useRef<HTMLElement>(null);

  // Start loading the seven panel photos when the section is near, so a panel
  // never opens on an empty frame.
  const [warm, setWarm] = useState(false);
  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const io = new IntersectionObserver((e) => e.some((x) => x.isIntersecting) && (setWarm(true), io.disconnect()), {
      rootMargin: "900px 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Where the clicked row sat before the change, so the page never jumps.
  const pending = useRef<{ key: string; before: number } | null>(null);

  const toggle = (key: string) => {
    const btn = buttons.current[key];
    pending.current = { key, before: btn?.getBoundingClientRect().top ?? 0 };
    setOpen((cur) => (cur === key ? null : key));
  };

  // Runs after React has updated the DOM and before the browser paints.
  // Same result in every browser (iOS Safari has no native scroll anchoring):
  //  1. undo any shift caused by a panel collapsing above the clicked row;
  //  2. when a row opens, glide it to just below the top bar.
  useLayoutEffect(() => {
    const p = pending.current;
    if (!p) return;
    pending.current = null;
    const btn = buttons.current[p.key];
    if (!btn) return;
    const shift = btn.getBoundingClientRect().top - p.before;
    if (shift !== 0) window.scrollBy({ top: shift, behavior: "instant" as ScrollBehavior });
    if (open !== p.key) return;
    document.querySelectorAll<HTMLElement>(`#panel-${p.key} [data-frame]:not(.in)`).forEach((fr) => {
      fr.dataset.t0 = String(performance.now());
      fr.classList.add("in");
    });
    window.dispatchEvent(new Event("lontier:motion"));
    const nav = document.querySelector(".nav") as HTMLElement | null;
    const offset = (nav?.offsetHeight ?? 64) + 12;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = btn.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: target, behavior: reduce ? "auto" : "smooth" });
  }, [open]);

  return (
    <section id="services" className="services on-dark" ref={section}>
      <div className="wrap">
        <div className="eyebrow" data-reveal="">
          III. &nbsp;What We Do
        </div>
        <div className="svc-head">
          <Words lines={["Seven disciplines, one contact."]} />
          <p data-reveal="">Select a discipline to discover how we work.</p>
        </div>

        <div className="rows" data-pill-hide="">
          {services.map((s, i) => {
            const isOpen = open === s.key;
            return (
              <div className={`row${isOpen ? " open" : ""}`} key={s.key}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`panel-${s.key}`}
                  ref={(el) => {
                    buttons.current[s.key] = el;
                  }}
                  onClick={() => toggle(s.key)}
                >
                  <span className="num">{nn(i)}</span>
                  <span className="ttl">
                    <b>{s.title}</b>
                    <i className="script">{s.tagline}</i>
                  </span>
                  <span className="disc">
                    <span className="lbl">{isOpen ? "Close" : "Discover"}</span>
                    <span className="ln" />
                  </span>
                </button>
                <div className="panel" id={`panel-${s.key}`} role="region" aria-label={s.title}>
                  <figure>
                    <Frame src={s.image} alt={s.alt} sizes="(max-width: 760px) 90vw, 320px" eager={warm} />
                  </figure>
                  <div className="tx">
                    <p className="lead script">{s.lead}</p>
                    {s.bullets.length > 0 && (
                      <div className="bul">
                        {s.bullets.map((b) => (
                          <div key={b}>
                            <i className="dot" />
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {s.body.map((p) => (
                      <p className="bd" key={p}>
                        {p}
                      </p>
                    ))}
                    <p className="hl">{s.highlight}</p>
                    <a href="#enquiry" className="btn btn--solid-brass" data-pill-hide="" onClick={() => setTopic(s.title)}>
                      Enquire about {s.title} <span className="arr">→</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="svc-cta" data-pill-hide="">
          <div className="rule40c" data-reveal="" />
          <Words as="div" className="st display" lines={["No request is too large.", "No detail is too small."]} />
          <div className="row2" data-reveal="">
            <a href={site.contact.whatsappHref} className="btn btn--solid-brass">
              WhatsApp
            </a>
            <a href={site.contact.telegramHref} className="btn btn--line-dark">
              Telegram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
