"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { fadeIn, floatingCard, staggerContainer } from "../motionPresets";
import type { Highlight, Product } from "../types";

type HeroSectionProps = {
  highlights: Highlight[];
  featureProduct: Product;
};

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
          className="absolute inset-x-8 -top-24 hidden h-24 rounded-4xl bg-linear-to-br from-[#00E0FF]/40 to-[#7209B7]/30 blur-3xl sm:block"
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

export default HeroSection;
