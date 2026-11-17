import type { Metadata } from "next";
import Link from "next/link";
import { CookieConsent } from "@/components/CookieConsent";
import { Seal } from "@/components/Seal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} handles personal data.`,
};

/*
 * DRAFT. Bracketed placeholders must be completed with the registered entity's
 * details, and the text reviewed by a Portuguese data protection lawyer, before launch.
 */
export default function PrivacyPage() {
  const c = site.contact;
  return (
    <div className="sheet legal">
      <div className="bar">
        <div className="in">
          <Link href="/" className="brand">
            <Seal small />
            {site.name}
          </Link>
          <Link href="/" className="btn btn--line-dark" style={{ minHeight: 44, padding: "0 20px" }}>
            Back to the house
          </Link>
        </div>
      </div>
      <main className="doc">
        <div className="eyebrow" style={{ color: "var(--tobacco)" }}>
          Legal
        </div>
        <h1>Privacy Policy</h1>
        <p className="lead script">Discretion is the service. This page explains, in plain terms, what we hold and why.</p>
        <div className="upd">Last updated: September 2026</div>
        <div className="note">
          <p>
            Placeholders below are marked in brackets and must be completed with the registered entity&apos;s details before publication. This text is a drafting basis, not legal advice — have it reviewed by a Portuguese data protection lawyer.
          </p>
        </div>
        <div className="cl">
          <div>
            <h2>1. Who we are</h2>
            <p>
              {site.name} [registered name, NIPC, registered address, Portugal] is the controller of the personal data described in this policy. For any question about this policy or your rights, write to {c.privacy} or call [phone].
            </p>
          </div>
          <div>
            <h2>2. What we collect</h2>
            <p>
              <strong>Enquiry details.</strong> Your name, the contact channel you give us (telephone, WhatsApp, Telegram or email) and the content of your request.
            </p>
            <p>
              <strong>Service data.</strong> Where we act for you, the information needed to arrange it — travel dates, passenger names, dietary or medical requirements, addresses, and payment references.
            </p>
            <p>
              <strong>Technical data.</strong> Standard server logs and, only with your consent, analytics about how this site is used.
            </p>
          </div>
          <div>
            <h2>3. Why we hold it, and on what basis</h2>
            <p>To answer your enquiry and to perform the services you ask for — on the basis of the contract between us, or steps taken at your request before one exists (GDPR Art. 6(1)(b)).</p>
            <p>To meet accounting, tax and anti-money-laundering obligations — legal obligation (Art. 6(1)(c)).</p>
            <p>To keep records of how a request was handled and to protect the house in the event of a dispute — legitimate interests (Art. 6(1)(f)).</p>
            <p>For analytics cookies, and for any marketing message — your consent (Art. 6(1)(a)), which you may withdraw at any time.</p>
            <p>Where a request requires health, dietary or similar sensitive information, we rely on your explicit consent (Art. 9(2)(a)) and pass it only to the partner who must act on it.</p>
          </div>
          <div>
            <h2>4. Who sees it</h2>
            <p>
              We work through a selected network of partners — aviation operators, hotels and villas, chauffeur and security companies, yacht brokers, restaurants, relocation and legal advisors. We disclose the minimum each partner needs to fulfil your request, and never for their own marketing. We also use service providers for hosting, email and messaging [name them], who act on our instructions under written agreements. We do not sell personal data.
            </p>
          </div>
          <div>
            <h2>5. Transfers outside the EEA</h2>
            <p>
              Requests are global, so a partner may sit outside the European Economic Area. Where that happens we rely on an adequacy decision, or on the European Commission&apos;s Standard Contractual Clauses with additional safeguards. A copy of the relevant mechanism is available on request.
            </p>
          </div>
          <div>
            <h2>6. How long we keep it</h2>
            <p>
              Enquiries that do not become instructions are deleted within [12] months. Client records are kept for the duration of the relationship and then for [5] years. Accounting records are kept for the [10] years Portuguese law requires. Consent records are kept for as long as we rely on the consent, plus [2] years.
            </p>
          </div>
          <div>
            <h2>7. Your rights</h2>
            <p>
              You have the right to access your data, to correct it, to erase it, to restrict or object to its processing, to receive it in a portable form, and to withdraw consent. Write to {c.privacy} and we will respond within one month.
            </p>
            <p>
              If you believe we have handled your data improperly you may complain to the Comissão Nacional de Proteção de Dados (CNPD), Av. D. Carlos I, 134, 1200-651 Lisboa.
            </p>
          </div>
          <div>
            <h2>8. Cookies</h2>
            <p>
              Essential cookies keep the site working and your consent choice remembered; they need no permission. Analytics cookies [name the tool] are set only after you accept them, and you can change your choice at any time by clearing this site&apos;s storage in your browser.
            </p>
          </div>
          <div>
            <h2>9. Security</h2>
            <p>
              Access to client information is limited to the people arranging the request. Messages and files are held on [providers] with encryption in transit and at rest, and staff and partners are bound by confidentiality undertakings.
            </p>
          </div>
          <div>
            <h2>10. Changes</h2>
            <p>If this policy changes materially we will post the revised version here and update the date above. For clients under an active instruction, we will say so directly.</p>
          </div>
        </div>
        <div className="end">
          <span>Questions about your data? Write to {c.privacy}.</span>
          <Link href="/" className="btn btn--solid-tobacco">
            Back to the house
          </Link>
        </div>
      </main>
      <CookieConsent />
    </div>
  );
}
