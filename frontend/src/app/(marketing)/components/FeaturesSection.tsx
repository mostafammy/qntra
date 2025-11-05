"use client";

import { motion } from "framer-motion";

import { fadeIn, staggerContainer } from "../motionPresets";
import type { Feature } from "../types";

type FeaturesSectionProps = {
  features: Feature[];
};

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

export default FeaturesSection;
