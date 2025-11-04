"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  tagline: string;
};

type Highlight = {
  title: string;
  description: string;
  stat: string;
  suffix?: string;
};

type JourneyMilestone = {
  id: number;
  heading: string;
  copy: string;
};

type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

type NavLink = {
  label: string;
  href: string;
};

type Feature = {
  title: string;
  copy: string;
  icon: string;
};

const products: Product[] = [
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

const highlights: Highlight[] = [
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

const journey: JourneyMilestone[] = [
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

const testimonials: Testimonial[] = [
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

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { ease: "easeOut", duration: 0.6 },
  },
};

const NAV_LINKS: NavLink[] = [
  { label: "Drops", href: "#featured" },
  { label: "Story", href: "#story" },
  { label: "Why Qyntra", href: "#features" },
  { label: "Testimonials", href: "#voices" },
];

const CORE_FEATURES: Feature[] = [
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

type HeroSectionProps = {
  highlights: Highlight[];
  featureProduct: Product;
};

type JourneySectionProps = {
  milestones: JourneyMilestone[];
};

type FeaturesSectionProps = {
  features: Feature[];
};

type FeaturedDropsProps = {
  products: Product[];
};

type TestimonialsSectionProps = {
  testimonials: Testimonial[];
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const floatingCard: Variants = {
  hidden: { opacity: 0, scale: 0.9, rotate: -8 },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 90, damping: 16, delay: 0.1 },
  },
};

const Navigation: React.FC = () => (
  <motion.nav
    initial={{ opacity: 0, y: -12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-6 backdrop-blur-lg"
  >
    <Link
      href="#"
      className="glow-ring flex items-center gap-3"
      aria-label="Qyntra home"
    >
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#00E0FF] to-[#7209B7] text-lg font-semibold text-black shadow-lg">
        Q
      </span>
      <span className="text-sm font-medium uppercase tracking-[0.35em] text-[#9aa5ce]">
        Qyntra
      </span>
    </Link>

    <div className="hidden items-center gap-8 text-sm font-medium text-[#9aa5ce] md:flex">
      {NAV_LINKS.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className="relative transition-colors duration-200 hover:text-[#00E0FF]"
        >
          {link.label}
        </Link>
      ))}
    </div>

    <div className="flex items-center gap-4">
      <Link
        href="#"
        className="btn-outline hidden sm:inline-flex"
        aria-label="Open Qyntra journal"
      >
        Journal
      </Link>
      <Link href="#" className="btn-primary" aria-label="Access Qyntra studio">
        Launch Studio
      </Link>
    </div>
  </motion.nav>
);

const HeroSection: React.FC<HeroSectionProps> = ({
  highlights,
  featureProduct,
}) => (
  <section className="narrative-section grid-overlay">
    <motion.div
      initial="hidden"
      animate="show"
      variants={staggerContainer}
      className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
    >
      <motion.div variants={fadeIn} className="space-y-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.4em] text-[#9aa5ce]/80">
          <span className="h-2 w-2 rounded-full bg-[#00E0FF]" aria-hidden />
          beta v3.1 live
        </span>
        <h1 className="text-balance text-gradient text-4xl leading-tight sm:text-5xl lg:text-6xl">
          Shop the tools that turn imagination into momentum.
        </h1>
        <p className="max-w-xl text-lg text-[#c3cae4]">
          Qyntra curates future-built wearables, desk upgrades, and ambient tech
          so every launch, pitch, or night edit feels cinematic. Designed
          narratives, one-tap micro interactions, and always-on support
          included.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <motion.a
            whileHover={{ x: 6 }}
            className="btn-primary"
            href="#featured"
          >
            Explore featured drops
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.03 }}
            className="btn-outline"
            href="#story"
          >
            Read the brand story
          </motion.a>
        </div>
        <dl className="grid gap-6 sm:grid-cols-3">
          {highlights.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeIn}
              className="glass-card subtle-float"
            >
              <dt className="text-sm uppercase tracking-[0.3em] text-[#9aa5ce]/80">
                {item.title}
              </dt>
              <dd className="mt-4 flex items-baseline gap-2 text-3xl font-semibold text-gradient">
                <span>{item.stat}</span>
                {item.suffix ? (
                  <span className="text-[#9aa5ce] text-base">
                    {item.suffix}
                  </span>
                ) : null}
              </dd>
              <p className="mt-3 text-sm text-[#9aa5ce]">{item.description}</p>
            </motion.div>
          ))}
        </dl>
      </motion.div>

      <motion.div
        variants={floatingCard}
        initial="hidden"
        animate="show"
        className="relative mx-auto flex w-full max-w-md flex-col gap-6 rounded-[2.5rem] bg-[rgba(8,12,28,0.8)] p-8 shadow-2xl backdrop-blur-xl"
      >
        <div
          className="absolute inset-x-8 -top-24 hidden h-24 rounded-[2rem] bg-gradient-to-br from-[#00E0FF]/40 to-[#7209B7]/30 blur-3xl sm:block"
          aria-hidden
        />
        <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10">
          <Image
            src={featureProduct.image}
            alt={`${featureProduct.name} product shot`}
            width={540}
            height={380}
            className="h-64 w-full object-cover"
            priority
          />
          <motion.span
            animate={{ opacity: [0.65, 1, 0.65] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-6 top-6 rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-[#eef3ff]"
          >
            live telemetry
          </motion.span>
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-gradient">
            {featureProduct.name} • Launch Edition
          </h3>
          <p className="text-sm leading-relaxed text-[#9aa5ce]">
            Adaptive noise shaping, haptic cues, and zero-lag pairing keep
            creativity moving—whether you are ideating at midnight or presenting
            at dawn.
          </p>
          <div className="flex items-center justify-between rounded-2xl bg-[#0b1024]/80 px-4 py-3">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#9aa5ce]/70">
                Launch price
              </p>
              <p className="text-xl font-semibold text-gradient">
                ${featureProduct.price.toFixed(2)}
              </p>
            </div>
            <button className="btn-primary" type="button">
              Reserve
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  </section>
);

const JourneySection: React.FC<JourneySectionProps> = ({ milestones }) => (
  <section id="story" className="narrative-section">
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-start"
    >
      <motion.div variants={fadeIn} className="space-y-5">
        <h2 className="section-title">The Qyntra arc</h2>
        <p className="section-lead text-[#c3cae4]">
          Our story runs on obsession. We scout visionary makers, tune every
          surface, and choreograph micro-animations so that unboxing feels like
          stepping into chapter one of your next launch.
        </p>
        <div className="glass-card">
          <p className="text-sm uppercase tracking-[0.3em] text-[#9aa5ce]/80">
            Manifesto
          </p>
          <p className="mt-3 text-[#eef3ff]">
            Build tools that honor focus, cherish play, and leave the planet
            better than we found it.
          </p>
        </div>
      </motion.div>

      <motion.div variants={fadeIn} className="space-y-8">
        {milestones.map((milestone) => (
          <div
            key={milestone.id}
            className="timeline-divider rounded-3xl bg-[#060b1c]/70 p-6 backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 text-[#00E0FF]/80">
              <span className="text-sm font-semibold uppercase tracking-[0.4em]">
                {String(milestone.id).padStart(2, "0")}
              </span>
              <span className="text-sm uppercase tracking-[0.4em]">
                {milestone.heading}
              </span>
            </div>
            <p className="mt-4 text-[#c3cae4]">{milestone.copy}</p>
          </div>
        ))}
      </motion.div>
    </motion.div>
  </section>
);

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ features }) => (
  <section id="features" className="narrative-section">
    <motion.div
      className="space-y-12"
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div variants={fadeIn} className="space-y-4 text-center">
        <h2 className="section-title text-gradient">
          Engineered for the modern launch cycle
        </h2>
        <p className="section-lead mx-auto text-[#c3cae4]">
          From pre-order to post-launch, Qyntra keeps momentum high and friction
          low so the only thing you notice is progress.
        </p>
      </motion.div>

      <div className="feature-grid">
        {features.map((feature) => (
          <motion.article
            key={feature.title}
            variants={fadeIn}
            className="feature-tile"
          >
            <span className="text-2xl" aria-hidden>
              {feature.icon}
            </span>
            <h3 className="mt-4 text-xl font-semibold text-[#eef3ff]">
              {feature.title}
            </h3>
            <p className="mt-3 text-sm text-[#9aa5ce]">{feature.copy}</p>
          </motion.article>
        ))}
      </div>
    </motion.div>
  </section>
);

const FeaturedDropsSection: React.FC<FeaturedDropsProps> = ({ products }) => (
  <section id="featured" className="narrative-section">
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="space-y-10"
    >
      <motion.div
        variants={fadeIn}
        className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between"
      >
        <div>
          <h2 className="section-title">Featured drops</h2>
          <p className="text-sm uppercase tracking-[0.3em] text-[#9aa5ce]/80">
            Limited seats • Weekly refresh
          </p>
        </div>
        <Link href="#" className="btn-outline self-start">
          View all drops
        </Link>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3">
        {products.map((product, index) => (
          <motion.article
            key={product.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-card"
          >
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src={product.image}
                alt={product.name}
                width={480}
                height={360}
                className="h-56 w-full object-cover"
              />
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="absolute right-4 top-4 rounded-full bg-[#00E0FF]/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-[#eef3ff]"
              >
                {product.tagline}
              </motion.span>
            </div>
            <div className="mt-5 flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold text-[#eef3ff]">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm text-[#9aa5ce]">
                  Ships within 48h • 2-year coverage
                </p>
              </div>
              <span className="rounded-full bg-[#00E0FF]/12 px-3 py-1 text-sm font-medium text-gradient">
                ${product.price.toFixed(2)}
              </span>
            </div>
            <div className="mt-5 flex items-center gap-3">
              <Link href="#" className="btn-outline flex-1 justify-center">
                Details
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="btn-primary flex-1 justify-center"
              >
                Add to cart
              </motion.button>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.div>
  </section>
);

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
}) => (
  <section id="voices" className="narrative-section">
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="space-y-12"
    >
      <motion.div variants={fadeIn} className="text-center">
        <h2 className="section-title text-gradient">
          Voices from the creative frontier
        </h2>
        <p className="section-lead mx-auto text-[#c3cae4]">
          Teams using Qyntra aren’t just buying gear—they are investing in
          narrative momentum.
        </p>
      </motion.div>

      <div className="story-panels">
        {testimonials.map((item) => (
          <motion.figure
            key={item.author}
            variants={fadeIn}
            className="glass-card"
          >
            <blockquote className="text-[#eef3ff]">“{item.quote}”</blockquote>
            <figcaption className="mt-6 text-sm uppercase tracking-[0.35em] text-[#9aa5ce]/80">
              <p className="text-[#eef3ff]">{item.author}</p>
              <p className="mt-1 text-xs text-[#9aa5ce]">{item.role}</p>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </motion.div>
  </section>
);

const NewsletterCta: React.FC = () => (
  <section className="narrative-section">
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="cta-panel"
    >
      <div className="max-w-xl space-y-4">
        <h2 className="section-title text-gradient">
          Ready to launch your next chapter?
        </h2>
        <p className="section-lead text-[#c3cae4]">
          Join the Qyntra inner circle for early drops, backstage documentaries,
          and surprise collaborations.
        </p>
      </div>
      <form
        className="flex w-full max-w-lg flex-col gap-4 sm:flex-row"
        aria-label="Join Qyntra insider list"
      >
        <label className="sr-only" htmlFor="email">
          Email address
        </label>
        <input
          id="email"
          type="email"
          required
          placeholder="you@studio.com"
          className="w-full flex-1 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-[#eef3ff] placeholder:text-[#9aa5ce]/70 focus:border-[#00E0FF] focus:outline-none"
        />
        <motion.button
          whileHover={{ x: 6 }}
          type="submit"
          className="btn-primary"
        >
          Enter orbit
        </motion.button>
      </form>
    </motion.div>
  </section>
);

const FooterSection: React.FC = () => (
  <footer className="narrative-section text-sm text-[#9aa5ce]/80">
    <div className="flex flex-col gap-6 border-t border-white/10 pt-10 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-4">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#00E0FF] to-[#7209B7] text-sm font-semibold text-black">
          Q
        </span>
        <div>
          <p className="text-[#eef3ff]">Qyntra Studios</p>
          <p>
            © {new Date().getFullYear()} All rights reserved. Crafted for
            dreamers, builders, and explorers.
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Link href="#" className="hover:text-[#00E0FF]">
          Privacy
        </Link>
        <Link href="#" className="hover:text-[#00E0FF]">
          Terms
        </Link>
        <Link href="#" className="hover:text-[#00E0FF]">
          Support
        </Link>
        <p className="text-xs uppercase tracking-[0.35em] text-[#9aa5ce]/70">
          Made with intention by DaphiEvolution
        </p>
      </div>
    </div>
  </footer>
);

export default function LandingPage(): React.ReactElement {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="aurora-sheet" aria-hidden />
      <header className="relative z-10">
        <motion.nav
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-6 backdrop-blur-lg"
        >
          <Link
            href="#"
            className="glow-ring flex items-center gap-3"
            aria-label="Qyntra home"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#00E0FF] to-[#7209B7] text-lg font-semibold text-black shadow-lg">
              Q
            </span>
            <span className="text-sm font-medium uppercase tracking-[0.35em] text-[#9aa5ce]">
              Qyntra
            </span>
          </Link>

          <div className="hidden items-center gap-8 text-sm font-medium text-[#9aa5ce] md:flex">
            {[
              { label: "Drops", href: "#featured" },
              { label: "Story", href: "#story" },
              { label: "Why Qyntra", href: "#features" },
              { label: "Testimonials", href: "#voices" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative transition-colors duration-200 hover:text-[#00E0FF]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="btn-outline hidden sm:inline-flex"
              aria-label="Open Qyntra journal"
            >
              Journal
            </Link>
            <Link
              href="#"
              className="btn-primary"
              aria-label="Access Qyntra studio"
            >
              Launch Studio
            </Link>
          </div>
        </motion.nav>

        <section className="narrative-section grid-overlay">
          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
          >
            <motion.div variants={fadeIn} className="space-y-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.4em] text-[#9aa5ce]/80">
                <span
                  className="h-2 w-2 rounded-full bg-[#00E0FF]"
                  aria-hidden
                />
                beta v3.1 live
              </span>
              <h1 className="text-balance text-gradient text-4xl leading-tight sm:text-5xl lg:text-6xl">
                Shop the tools that turn imagination into momentum.
              </h1>
              <p className="max-w-xl text-lg text-[#c3cae4]">
                Qyntra curates future-built wearables, desk upgrades, and
                ambient tech so every launch, pitch, or night edit feels
                cinematic. Designed narratives, one-tap micro interactions, and
                always-on support included.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <motion.a
                  whileHover={{ x: 6 }}
                  className="btn-primary"
                  href="#featured"
                >
                  Explore featured drops
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  className="btn-outline"
                  href="#story"
                >
                  Read the brand story
                </motion.a>
              </div>
              <dl className="grid gap-6 sm:grid-cols-3">
                {highlights.map((item) => (
                  <motion.div
                    key={item.title}
                    variants={fadeIn}
                    className="glass-card subtle-float"
                  >
                    <dt className="text-sm uppercase tracking-[0.3em] text-[#9aa5ce]/80">
                      {item.title}
                    </dt>
                    <dd className="mt-4 flex items-baseline gap-2 text-3xl font-semibold text-gradient">
                      <span>{item.stat}</span>
                      {item.suffix ? (
                        <span className="text-[#9aa5ce] text-base">
                          {item.suffix}
                        </span>
                      ) : null}
                    </dd>
                    <p className="mt-3 text-sm text-[#9aa5ce]">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </dl>
            </motion.div>

            <motion.div
              variants={floatingCard}
              initial="hidden"
              animate="show"
              className="relative mx-auto flex w-full max-w-md flex-col gap-6 rounded-[2.5rem] bg-[rgba(8,12,28,0.8)] p-8 shadow-2xl backdrop-blur-xl"
            >
              <div
                className="absolute inset-x-8 -top-24 hidden h-24 rounded-[2rem] bg-gradient-to-br from-[#00E0FF]/40 to-[#7209B7]/30 blur-3xl sm:block"
                aria-hidden
              />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10">
                <Image
                  src="/images/img1.png"
                  alt="AeroPods X charging on a minimal desk"
                  width={540}
                  height={380}
                  className="h-64 w-full object-cover"
                  priority
                />
                <motion.span
                  animate={{ opacity: [0.65, 1, 0.65] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute left-6 top-6 rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-[#eef3ff]"
                >
                  live telemetry
                </motion.span>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-gradient">
                  AeroPods X • Launch Edition
                </h3>
                <p className="text-sm leading-relaxed text-[#9aa5ce]">
                  Adaptive noise shaping, haptic cues, and zero-lag pairing keep
                  creativity moving—whether you are ideating at midnight or
                  presenting at dawn.
                </p>
                <div className="flex items-center justify-between rounded-2xl bg-[#0b1024]/80 px-4 py-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-[#9aa5ce]/70">
                      Launch price
                    </p>
                    <p className="text-xl font-semibold text-gradient">
                      ${products[0].price.toFixed(2)}
                    </p>
                  </div>
                  <button className="btn-primary" type="button">
                    Reserve
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>
      </header>

      <section id="story" className="narrative-section">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-start"
        >
          <motion.div variants={fadeIn} className="space-y-5">
            <h2 className="section-title">The Qyntra arc</h2>
            <p className="section-lead text-[#c3cae4]">
              Our story runs on obsession. We scout visionary makers, tune every
              surface, and choreograph micro-animations so that unboxing feels
              like stepping into chapter one of your next launch.
            </p>
            <div className="glass-card">
              <p className="text-sm uppercase tracking-[0.3em] text-[#9aa5ce]/80">
                Manifesto
              </p>
              <p className="mt-3 text-[#eef3ff]">
                Build tools that honor focus, cherish play, and leave the planet
                better than we found it.
              </p>
            </div>
          </motion.div>

          <motion.div variants={fadeIn} className="space-y-8">
            {journey.map((milestone) => (
              <div
                key={milestone.id}
                className="timeline-divider rounded-3xl bg-[#060b1c]/70 p-6 backdrop-blur-xl"
              >
                <div className="flex items-center gap-3 text-[#00E0FF]/80">
                  <span className="text-sm font-semibold uppercase tracking-[0.4em]">
                    {String(milestone.id).padStart(2, "0")}
                  </span>
                  <span className="text-sm uppercase tracking-[0.4em]">
                    {milestone.heading}
                  </span>
                </div>
                <p className="mt-4 text-[#c3cae4]">{milestone.copy}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <section id="features" className="narrative-section">
        <motion.div
          className="space-y-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={fadeIn} className="space-y-4 text-center">
            <h2 className="section-title text-gradient">
              Engineered for the modern launch cycle
            </h2>
            <p className="section-lead mx-auto text-[#c3cae4]">
              From pre-order to post-launch, Qyntra keeps momentum high and
              friction low so the only thing you notice is progress.
            </p>
          </motion.div>

          <div className="feature-grid">
            {[
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
            ].map((feature) => (
              <motion.article
                key={feature.title}
                variants={fadeIn}
                className="feature-tile"
              >
                <span className="text-2xl" aria-hidden>
                  {feature.icon}
                </span>
                <h3 className="mt-4 text-xl font-semibold text-[#eef3ff]">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm text-[#9aa5ce]">{feature.copy}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="featured" className="narrative-section">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-10"
        >
          <motion.div
            variants={fadeIn}
            className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between"
          >
            <div>
              <h2 className="section-title">Featured drops</h2>
              <p className="text-sm uppercase tracking-[0.3em] text-[#9aa5ce]/80">
                Limited seats • Weekly refresh
              </p>
            </div>
            <Link href="#" className="btn-outline self-start">
              View all drops
            </Link>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {products.map((product, index) => (
              <motion.article
                key={product.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card"
              >
                <div className="relative overflow-hidden rounded-2xl">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={480}
                    height={360}
                    className="h-56 w-full object-cover"
                  />
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="absolute right-4 top-4 rounded-full bg-[#00E0FF]/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-[#eef3ff]"
                  >
                    {product.tagline}
                  </motion.span>
                </div>
                <div className="mt-5 flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-[#eef3ff]">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-[#9aa5ce]">
                      Ships within 48h • 2-year coverage
                    </p>
                  </div>
                  <span className="rounded-full bg-[#00E0FF]/12 px-3 py-1 text-sm font-medium text-gradient">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                <div className="mt-5 flex items-center gap-3">
                  <Link href="#" className="btn-outline flex-1 justify-center">
                    Details
                  </Link>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="btn-primary flex-1 justify-center"
                  >
                    Add to cart
                  </motion.button>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="voices" className="narrative-section">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-12"
        >
          <motion.div variants={fadeIn} className="text-center">
            <h2 className="section-title text-gradient">
              Voices from the creative frontier
            </h2>
            <p className="section-lead mx-auto text-[#c3cae4]">
              Teams using Qyntra aren’t just buying gear—they are investing in
              narrative momentum.
            </p>
          </motion.div>

          <div className="story-panels">
            {testimonials.map((item) => (
              <motion.figure
                key={item.author}
                variants={fadeIn}
                className="glass-card"
              >
                <blockquote className="text-[#eef3ff]">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-6 text-sm uppercase tracking-[0.35em] text-[#9aa5ce]/80">
                  <p className="text-[#eef3ff]">{item.author}</p>
                  <p className="mt-1 text-xs text-[#9aa5ce]">{item.role}</p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="narrative-section">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="cta-panel"
        >
          <div className="max-w-xl space-y-4">
            <h2 className="section-title text-gradient">
              Ready to launch your next chapter?
            </h2>
            <p className="section-lead text-[#c3cae4]">
              Join the Qyntra inner circle for early drops, backstage
              documentaries, and surprise collaborations.
            </p>
          </div>
          <form
            className="flex w-full max-w-lg flex-col gap-4 sm:flex-row"
            aria-label="Join Qyntra insider list"
          >
            <label className="sr-only" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="you@studio.com"
              className="w-full flex-1 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-[#eef3ff] placeholder:text-[#9aa5ce]/70 focus:border-[#00E0FF] focus:outline-none"
            />
            <motion.button
              whileHover={{ x: 6 }}
              type="submit"
              className="btn-primary"
            >
              Enter orbit
            </motion.button>
          </form>
        </motion.div>
      </section>

      <footer className="narrative-section text-sm text-[#9aa5ce]/80">
        <div className="flex flex-col gap-6 border-t border-white/10 pt-10 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#00E0FF] to-[#7209B7] text-sm font-semibold text-black">
              Q
            </span>
            <div>
              <p className="text-[#eef3ff]">Qyntra Studios</p>
              <p>
                © {new Date().getFullYear()} All rights reserved. Crafted for
                dreamers, builders, and explorers.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="#" className="hover:text-[#00E0FF]">
              Privacy
            </Link>
            <Link href="#" className="hover:text-[#00E0FF]">
              Terms
            </Link>
            <Link href="#" className="hover:text-[#00E0FF]">
              Support
            </Link>
            <p className="text-xs uppercase tracking-[0.35em] text-[#9aa5ce]/70">
              Made with intention by DaphiEvolution
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
