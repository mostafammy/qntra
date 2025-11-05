"use client";

import { motion } from "framer-motion";

import { fadeIn, staggerContainer } from "../motionPresets";
import type { JourneyMilestone } from "../types";

type JourneySectionProps = {
  milestones: JourneyMilestone[];
};

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

export default JourneySection;
