/**
 * Lontier — site configuration.
 * Every contact detail on the site comes from here. The values below are
 * PLACEHOLDERS where marked TODO: replace them before launch.
 * Phone and WhatsApp are the real ones (+351 934 945 820).
 */
export const site = {
  name: "Lontier",
  tagline: "The art of connection",
  descriptor: "Luxury Lifestyle & Executive Concierge",
  description:
    "An exclusive concierge and lifestyle house for entrepreneurs, executives, investors, family offices and private individuals across Portugal and beyond.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://lontier.com",
  place: "Portugal",
  contact: {
    phoneDisplay: "+351 934 945 820",
    phoneHref: "tel:+351934945820",
    whatsappNumber: "351934945820", // digits only, used for wa.me links and enquiry delivery
    whatsappHref: "https://wa.me/351934945820",
    telegramHandle: "@lontier", // TODO: real handle (to be provided)
    telegramHref: "https://t.me/lontier",
    instagramHandle: "@lontier", // TODO: real handle (to be provided)
    instagramHref: "https://instagram.com/lontier",
    office: "office@lontier.com", // TODO: real address (to be provided)
    privacy: "privacy@lontier.com", // TODO: real address
  },
  year: 2026,
} as const;
