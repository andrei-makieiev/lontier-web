import Image from "next/image";
import Link from "next/link";
import { founder, pillars, reasons, steps, nn } from "@/lib/content";
import { site } from "@/lib/site";
import { Frame } from "./Frame";
import { Seal } from "./Seal";
import { Words } from "./Words";

/* Static sections (server components). Copy lives in lib/content.ts and lib/site.ts. */

export function Hero() {
  return (
    <section id="top">
      <div className="stage">
        <div className="heroGround" />
        <div className="heroLine heroTop" data-reveal="">
          <span>More than concierge. A private office for your lifestyle.</span>
          <span className="r" />
        </div>
        {/* Name lockup placeholder. When the client's name artwork arrives, replace the
            two spans with: <Image src="/images/lontier-name.png" alt="Lontier — the art of connection" ... /> */}
        <h1 className="heroName" aria-label={`${site.name} — ${site.tagline}`}>
          <Words as="span" className="wm" lines={["LONTIER"]} />
          <span className="tag" data-reveal="">
            {site.tagline}
          </span>
          <span className="rule" data-reveal="" />
        </h1>
        <div className="heroCta">
          <div className="sub" data-reveal="">
            {site.descriptor}
          </div>
          <div className="slogan script" data-reveal="">
            You need someone who makes things happen.
          </div>
          <div className="actions" data-reveal="">
            <a href="#enquiry" className="btn btn--solid-brass">
              Make an enquiry
            </a>
            <a href={site.contact.whatsappHref} className="btn btn--line-dark">
              Chat now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/** I. The Founder — Miriam, in her own words. */
export function Founder() {
  return (
    <section className="position founder on-bone" id="founder">
      <div className="wrap">
        <div className="top">
          <div className="copy">
            <div className="eyebrow" data-reveal="">
              I. &nbsp;The Founder
            </div>
            <Words lines={[founder.statement]} />
            <div className="rule40" data-reveal="" />
            <div className="paras">
              {founder.paragraphs.map((p) => (
                <p className="body-bone" data-reveal="" key={p}>
                  {p}
                </p>
              ))}
            </div>
            <div className="signature" data-reveal="">
              <span className="script">{founder.name}</span>
              <span className="role">
                {founder.role}, {site.name}
              </span>
            </div>
          </div>
          <figure>
            <Frame src={founder.image} alt={founder.alt} sizes="(max-width: 760px) 90vw, 380px" />
          </figure>
        </div>
        <div className="band" data-reveal="">
          <div className="st display">
            <span>
              More than concierge.
              <br />A private office for your lifestyle.
            </span>
          </div>
          <a href="#enquiry" className="btn btn--solid-tobacco" data-pill-hide="">
            Speak to us <span className="arr">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export function Philosophy() {
  return (
    <section className="philosophy on-bone">
      <div className="wrap">
        <div className="eyebrow" data-reveal="">
          II. &nbsp;Philosophy
        </div>
        <p className="lead script" data-reveal="">
          Luxury has changed.
          <br />
          Today, true luxury is measured by
          <br />
          three things.
        </p>
        <div className="pillars">
          {pillars.map((x, i) => (
            <div key={x.t} data-reveal="">
              <div className="n">{nn(i)}</div>
              <div className="t display">{x.t}</div>
              <p>{x.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  return (
    <section id="how" className="how on-bone">
      <div className="wrap">
        <div className="hd">
          <div className="eyebrow" data-reveal="">
            IV. &nbsp;How It Works
          </div>
          <div className="script" data-reveal="">
            One message is enough to begin.
          </div>
        </div>
        <div className="steps">
          {steps.map((x, i) => (
            <div key={x.t} data-reveal="">
              <div className="n">{nn(i)}</div>
              <div className="t">{x.t}</div>
              <p>
                {x.p.map((line, li) => (
                  <span key={li}>
                    {li > 0 && <br />}
                    {line}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
        <div className="cta" data-reveal="">
          <a href="#enquiry" className="btn btn--solid-tobacco" data-pill-hide="">
            Begin here <span className="arr">→</span>
          </a>
          <span>No membership. No retainer. You pay for what you ask for.</span>
        </div>
      </div>
    </section>
  );
}

export function BeyondBorders() {
  return (
    <section className="beyond on-dark">
      {/* Swap to /images/beyond-map-gold-no-label.png to drop the city label on the map. */}
      <div className="bg" id="beyondBg">
        <Image
          src="/images/beyond-map-gold.png"
          alt="A gold line map of the world with a concierge bell on each continent"
          fill
          sizes="(max-width: 820px) 100vw, 50vw"
          style={{ objectFit: "contain" }}
        />
      </div>
      <div className="shade" />
      <div className="inner">
        <div className="eyebrow" data-reveal="">
          V. &nbsp;Beyond Borders
        </div>
        <Words lines={["Wherever you are.", "Whatever you need."]} />
        <p data-reveal="">
          Our work is not bound to a single city. Through a carefully selected circle of trusted partners, the same standard follows you, wherever the request takes you.
        </p>
        <div className="attrs" data-reveal="">
          <span>Absolute discretion</span>
          <span>24/7 assistance</span>
          <span>Global partner network</span>
        </div>
      </div>
    </section>
  );
}

export function WhyUs() {
  return (
    <section className="why on-dark">
      <div className="wrap">
        <div className="eyebrow" data-reveal="">
          VI. &nbsp;Why Us
        </div>
        <div className="list">
          {reasons.map((x, i) => (
            <div className="it" key={x.k} data-reveal="">
              <span className="n">{nn(i)}</span>
              <span className="k">{x.k}</span>
              <span className="v script">{x.v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function House() {
  return (
    <section className="house on-dark">
      <div className="wrap grid">
        <div>
          <div className="eyebrow" data-reveal="">
            VII. &nbsp;The House
          </div>
          <Words lines={["To become the only local contact our clients will ever need."]} />
          <p data-reveal="">
            {site.name} was founded on two decades inside the luxury service industry: the hotels, the estates, the aviation desks and the private residences where standards are actually set.
            <br />
            We do not own the assets. We hold the relationships and we answer for them personally.
          </p>
          <p data-reveal="">The house does not publish its client list and it does not publish its team. Both by design.</p>
          <div className="sig script" data-reveal="">
            The Founder
          </div>
        </div>
        <Frame kind="arch" src="/images/house.jpg" alt="A long lamplit corridor with marble floors and an arched ceiling" sizes="(max-width: 760px) 90vw, 384px" />
      </div>
    </section>
  );
}

export function Quote() {
  return (
    <section className="quote on-bone">
      <div className="wrap">
        <div className="mark" aria-hidden="true" data-reveal="">
          “
        </div>
        <Words as="blockquote" className="" lines={["Time is the most valuable thing a human being can spend."]} />
        <div className="by" data-reveal="">
          Diogenes
        </div>
        <div className="r" data-reveal="" />
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer data-pill-hide="">
      <div className="sign">
        <Seal />
        <span className="nm">{site.name}</span>
        <span className="pl">{site.place} &nbsp;·&nbsp; By appointment</span>
        <span className="cl script">Discretion is the service.</span>
      </div>
      <div className="base">
        <span>{site.descriptor}</span>
        <Link href="/privacy">Privacy Policy</Link>
        <span>© {site.year}</span>
      </div>
    </footer>
  );
}
