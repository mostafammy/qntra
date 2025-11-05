"use client";

import { motion } from "framer-motion";

import { fadeIn, staggerContainer } from "../motionPresets";
import type { Testimonial } from "../types";

type TestimonialsSectionProps = {
  testimonials: Testimonial[];
};

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

export default TestimonialsSection;
