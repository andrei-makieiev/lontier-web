/**
 * Lontier — page copy. Edit text here; components only handle layout.
 */

export type Service = {
  key: string;
  title: string;
  tagline: string;
  lead: string;
  bullets: string[];
  body: string[];
  highlight: string;
  image: string;
  alt: string;
};

export const services: Service[] = [
  {
    key: "aviation",
    title: "Private Aviation",
    tagline: "Leave the ordinary behind.",
    lead: "Some journeys should begin before you ever reach the airport.",
    bullets: [],
    body: [
      "From a private jet waiting exactly when you need it to the car waiting when you land, every detail is quietly arranged around you.",
      "No queues. No unnecessary waiting. No logistics to think about.",
    ],
    highlight: "Just departure, arrival and everything in between, handled.",
    image: "/images/service-aviation.jpg",
    alt: "A glass of champagne in a private jet cabin at sunset",
  },
  {
    key: "accommodation",
    title: "Luxury Accommodation",
    tagline: "A place that feels like it was waiting for you.",
    lead: "The right address can change the entire experience.",
    bullets: [
      "A private villa overlooking the ocean.",
      "A discreet suite in the heart of the city.",
      "A residence where every detail feels considered.",
    ],
    body: [
      "We look beyond availability. We look for the place that feels right for you: your style, your occasion, your rhythm.",
    ],
    highlight: "You arrive. Everything is already in place.",
    image: "/images/service-accommodation.jpg",
    alt: "White-gloved porters at a brass luggage cart before velvet curtains",
  },
  {
    key: "mobility",
    title: "Luxury Mobility",
    tagline: "Make an entrance.",
    lead: "Because arriving is part of the experience.",
    bullets: [
      "A chauffeur waiting outside your residence.",
      "A rare car for the weekend.",
      "A discreet transfer after a late dinner.",
    ],
    body: [
      "Whether you need to move across the city or arrive somewhere unforgettable, we make the journey feel as effortless as the destination.",
    ],
    highlight: "Your car is ready. Whenever you are.",
    image: "/images/service-mobility.jpg",
    alt: "A chauffeur opening a car door at night",
  },
  {
    key: "lifestyle",
    title: "Lifestyle Management",
    tagline: "You shouldn’t have to think about everything.",
    lead: "Consider the details already taken care of.",
    bullets: [
      "The last-minute reservation.",
      "The perfect gift.",
      "The impossible request.",
      "The appointment you forgot to make.",
      "The evening that suddenly needs a plan.",
    ],
    body: [],
    highlight: "You send the message. We make it happen.",
    image: "/images/service-lifestyle.jpg",
    alt: "A gloved attendant wrapping gifts in a boutique",
  },
  {
    key: "business",
    title: "Business Concierge",
    tagline: "Your time belongs elsewhere.",
    lead: "Let us take care of the city.",
    bullets: ["The right introduction.", "The right address.", "The right person to call."],
    body: [
      "Whether you are arriving somewhere for the first time, hosting important guests or building your presence in a new market, we make the local side of things feel effortless.",
    ],
    highlight: "You focus on the opportunity. We handle everything around it.",
    image: "/images/service-business.jpg",
    alt: "A lamplit boardroom table with crystal glasses",
  },
  {
    key: "experiences",
    title: "Exclusive Experiences",
    tagline: "Some doors don’t have a sign.",
    lead: "And some of the most memorable experiences aren’t found by searching.",
    bullets: [
      "A table that isn’t available online.",
      "An evening behind closed doors.",
      "A private yacht waiting beyond the marina.",
      "A dinner prepared somewhere few people know exists.",
    ],
    body: ["Through our trusted network, we open access to experiences chosen around you."],
    highlight: "Tell us what you want to experience. We’ll find the way in.",
    image: "/images/service-experiences.jpg",
    alt: "A polo match on the lawn of a country house",
  },
  {
    key: "relocation",
    title: "Relocation Services",
    tagline: "Arrive. Unpack. Begin.",
    lead: "Moving to a new country should feel like the beginning of something, not an endless list of things to arrange.",
    bullets: [],
    body: [
      "From finding your ideal home to connecting you with the right people, services and places, we take care of the details that make Portugal feel like home.",
    ],
    highlight: "A new chapter deserves a beautiful beginning.",
    image: "/images/service-relocation.jpg",
    alt: "A handshake over signed papers at a marble desk",
  },
];

export const pillars = [
  { t: "Time", p: "We give our clients more time by handling every detail." },
  { t: "Access", p: "We open doors that money alone cannot." },
  { t: "Trust", p: "We operate with absolute discretion, integrity and confidentiality." },
];

export const steps = [
  { t: "You tell us", p: ["A call, a message or four lines in the form.", "Dates, city and what needs to happen."] },
  { t: "We propose", p: ["Options, costs and timings within the day, drawn from our own partners rather than a search engine."] },
  { t: "We handle it", p: ["Bookings, drivers, documents, staff and the details you never hear about. One contact throughout."] },
];

export const reasons = [
  { k: "Personalization", v: "Every client is different. Every solution is tailored." },
  { k: "Exclusivity & Access", v: "Access beyond what money can simply buy." },
  { k: "Trust & Discretion", v: "A trusted partner for highly personal matters." },
  { k: "Speed & Availability", v: "When our clients need it, we make it happen." },
  { k: "One Point of Contact", v: "Everything they need, managed through one relationship." },
  { k: "Global Network", v: "A carefully selected network of premium partners." },
];

/** I. The Founder — Miriam's words (client copy, Nov 2026). */
export const founder = {
  name: "Miriam",
  role: "Founder",
  statement: "I believe true luxury is found in exclusivity, discretion and attention to every detail.",
  paragraphs: [
    "Driven by my appreciation for a refined and well-organised lifestyle, I created this service to offer personalised assistance that simplifies everyday life and makes exceptional experiences possible, anywhere in the world.",
    "My philosophy is simple: to treat every client with the same care, dedication and excellence that I value in the way I am treated.",
  ],
  // PLACEHOLDER portrait (AI-generated stand-in). Replace with Miriam's real photo, same 4:5 crop.
  image: "/images/founder-placeholder.jpg",
  alt: "Miriam, founder of Lontier",
};

export const nn = (i: number) => String(i + 1).padStart(2, "0");
