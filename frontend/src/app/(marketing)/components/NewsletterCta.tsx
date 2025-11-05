"use client";

import { motion } from "framer-motion";

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

export default NewsletterCta;
