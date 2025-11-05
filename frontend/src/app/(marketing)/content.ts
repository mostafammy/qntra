import type {
  Feature,
  Highlight,
  JourneyMilestone,
  NavLink,
  Product,
  Testimonial,
} from "./types";

export const products: Product[] = [
  {
    id: "p1",
    name: "AeroPods X",
    price: 129.99,
    image: "/images/img1.png",
    tagline: "Sound that lifts off",
  },
  {
    id: "p2",
    name: "Orbit Band",
    price: 79.99,
    image: "/images/img2.png",
    tagline: "Wearable simplicity",
  },
  {
    id: "p3",
    name: "Q-Drive Mini",
    price: 49.99,
    image: "/images/img3.png",
    tagline: "Portable power, elegant design",
  },
];

export const heroHighlights: Highlight[] = [
  {
    title: "Lightning Checkout",
    description:
      "Pay, confirm, and receive tracking in under 32 seconds on average.",
    stat: "32",
    suffix: "sec",
  },
  {
    title: "Planet Aligned",
    description:
      "99% recycled packaging, carbon-neutral delivery partners, traceable logistics.",
    stat: "99%",
  },
  {
    title: "Trusted Worldwide",
    description:
      "8,400+ shoppers choose Qyntra for future-ready accessories every month.",
    stat: "8.4k",
    suffix: "+",
  },
];

export const journeyMilestones: JourneyMilestone[] = [
  {
    id: 1,
    heading: "Dream it",
    copy: "We begin with the obsession: what will elevate tomorrow's creatives, founders, and explorers? Our curation team gathers insights from the fastest-growing studios and techno-artists across three continents.",
  },
  {
    id: 2,
    heading: "Forge it",
    copy: "Every product ships after it passes a 72-point experience benchmark—latency, finish, sustainability, and companion apps. The result: only 7% of submissions make the Qyntra roster.",
  },
  {
    id: 3,
    heading: "Deliver it",
    copy: "One-tap checkout and adaptive logistics send your picks from our micro-hub network so that new tools land right when your next idea sparks.",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "Qyntra feels like a design lab in my inbox. The Orbit Band drop streamlined my entire studio workflow without sacrificing style.",
    author: "Mila Torres",
    role: "Creative Director, Lumen Collective",
  },
  {
    quote:
      "Their micro-animations and unboxing story turned a routine purchase into a launch moment for our team.",
    author: "Devin Cole",
    role: "Head of Product, Nova Systems",
  },
];

export const navLinks: NavLink[] = [
  { label: "Drops", href: "#featured" },
  { label: "Story", href: "#story" },
  { label: "Why Qyntra", href: "#features" },
  { label: "Testimonials", href: "#voices" },
];

export const coreFeatures: Feature[] = [
  {
    title: "Orchestrated drops",
    copy: "Each collection tells a narrative arc with synced visuals, sound design, and AR reveals.",
    icon: "🎛️",
  },
  {
    title: "Adaptive logistics",
    copy: "Dynamic routing ensures same-week arrival in 42 countries, with carbon tracking included.",
    icon: "🚀",
  },
  {
    title: "Mindful support",
    copy: "Design concierges answer within 12 minutes, armed with real telemetry from your gear.",
    icon: "🤝",
  },
];
