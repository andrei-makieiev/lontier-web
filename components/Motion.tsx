"use client";

import { useEffect } from "react";

/**
 * Scroll motion for the whole page:
 *  - [data-words]  headlines rise word by word   (adds .words-in)
 *  - [data-reveal] fade up 28px, 90ms stagger    (adds .in)
 *  - [data-frame]  image frames open from below  (adds .in)
 *  - [data-drift]  photo settles from 114% and drifts with scroll
 *  - #beyondBg     slow parallax on the world map
 *  - .win img      fades in once decoded (adds .ld)
 *
 * The drift loop only runs while something moves (scrolling, resizing, or a
 * frame settling), so an idle page costs no battery. Other components can
 * wake it with window.dispatchEvent(new Event("lontier:motion")).
 * Everything is skipped under prefers-reduced-motion (CSS also enforces it).
 */
export function Motion() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const SETTLE = 1800;

    /* ---------- photo fade-in ---------- */
    const markLoaded = (img: HTMLImageElement) => {
      if (img.dataset.ldBound) return;
      img.dataset.ldBound = "1";
      const done = () => img.classList.add("ld");
      if (img.complete && img.naturalWidth > 0) done();
      else {
        img.addEventListener("load", done, { once: true });
        img.addEventListener("error", done, { once: true });
      }
    };

    /* ---------- drift loop (runs only while needed) ---------- */
    let raf = 0;
    let until = 0;
    const update = () => {
      const h = window.innerHeight;
      const now = performance.now();
      document.querySelectorAll<HTMLElement>("[data-drift]").forEach((win) => {
        const img = win.querySelector("img");
        if (!img) return;
        const r = win.getBoundingClientRect();
        if (!r.height || r.bottom < -100 || r.top > h + 100) return;
        const fr = win.closest<HTMLElement>("[data-frame]");
        let sc = 1.14;
        const t0 = fr?.dataset.t0 ? Number(fr.dataset.t0) : undefined;
        if (t0 !== undefined) {
          const t = Math.min(1, (now - t0) / SETTLE);
          sc = 1.14 - 0.08 * (1 - Math.pow(1 - t, 3));
        }
        const off = (r.top + r.height / 2 - h / 2) / h;
        img.style.transform = `translate3d(0,${(-off * r.height * 0.05).toFixed(1)}px,0) scale(${sc.toFixed(4)})`;
      });
      const bg = document.getElementById("beyondBg");
      if (bg && bg.parentElement) {
        if (window.innerWidth > 820) {
          const r = bg.parentElement.getBoundingClientRect();
          if (r.bottom > 0 && r.top < h) {
            const off = (r.top + r.height / 2 - h / 2) / h;
            bg.style.transform = `translate3d(0,${(off * -60).toFixed(1)}px,0) scale(1.04)`;
          }
        } else if (bg.style.transform) bg.style.transform = "";
      }
    };
    const step = () => {
      raf = 0;
      update();
      if (performance.now() < until) raf = requestAnimationFrame(step);
    };
    const wake = (ms = 120) => {
      if (reduce) return;
      until = Math.max(until, performance.now() + ms);
      if (!raf) raf = requestAnimationFrame(step);
    };
    const onScroll = () => wake(160);
    const onWake = () => wake(SETTLE + 100);

    /* ---------- reveals ---------- */
    const io = new IntersectionObserver(
      (entries) => {
        const groups = new Map<Element | null, number>();
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          if (el.hasAttribute("data-words")) el.classList.add("words-in");
          else if (el.hasAttribute("data-frame")) {
            el.dataset.t0 = String(performance.now());
            el.classList.add("in");
            wake(SETTLE + 100);
          } else {
            const n = groups.get(el.parentElement) ?? 0;
            groups.set(el.parentElement, n + 1);
            el.style.setProperty("--d", `${n * 90}ms`);
            el.classList.add("in");
          }
          io.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    const scan = () => {
      document
        .querySelectorAll("[data-words]:not(.words-in),[data-reveal]:not(.in),[data-frame]:not(.in)")
        .forEach((el) => io.observe(el));
      document.querySelectorAll<HTMLImageElement>(".win img").forEach(markLoaded);
    };
    scan();
    // Pick up anything rendered later (the form's "Received." state, eager panel photos).
    let pending = false;
    const mo = new MutationObserver(() => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(() => {
        pending = false;
        scan();
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("lontier:motion", onWake);
    wake(SETTLE);

    return () => {
      io.disconnect();
      mo.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("lontier:motion", onWake);
    };
  }, []);
  return null;
}
