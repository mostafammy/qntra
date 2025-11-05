"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { fadeIn, staggerContainer } from "../motionPresets";
import type { Product } from "../types";

type FeaturedDropsSectionProps = {
  products: Product[];
};

const FeaturedDropsSection: React.FC<FeaturedDropsSectionProps> = ({
  products,
}) => (
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
            <div className="relative overflow-hidden rounded-3xl">
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

export default FeaturedDropsSection;
