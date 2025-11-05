"use client";

import React from "react";

import {
  FeaturedDropsSection,
  FeaturesSection,
  FooterSection,
  HeroSection,
  JourneySection,
  Navigation,
  NewsletterCta,
  TestimonialsSection,
} from "./components";
import {
  coreFeatures,
  heroHighlights,
  journeyMilestones,
  navLinks,
  products,
  testimonials,
} from "./content";

export default function LandingPage(): React.ReactElement {
  const featureProduct = products[0];

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="aurora-sheet" aria-hidden />
      <header className="relative z-10">
        <Navigation links={navLinks} />
        <HeroSection
          highlights={heroHighlights}
          featureProduct={featureProduct}
        />
      </header>
      <JourneySection milestones={journeyMilestones} />
      <FeaturesSection features={coreFeatures} />
      <FeaturedDropsSection products={products} />
      <TestimonialsSection testimonials={testimonials} />
      <NewsletterCta />
      <FooterSection />
    </main>
  );
}
