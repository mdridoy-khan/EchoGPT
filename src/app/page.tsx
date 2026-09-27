"use client";

import React from "react";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { ModelsShowcase } from "@/components/landing/ModelsShowcase";
import { ComparisonArena } from "@/components/landing/ComparisonArena";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { ExtensionShowcase } from "@/components/landing/ExtensionShowcase";
import { WhyChooseSection } from "@/components/landing/WhyChooseSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { CtaSection } from "@/components/landing/CtaSection";
import { LandingFooter } from "@/components/landing/LandingFooter";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200">
      <LandingNavbar />
      <main className="flex-1">
        <HeroSection />
        <ModelsShowcase />
        <ComparisonArena />
        <FeaturesSection />
        <ExtensionShowcase />
        <WhyChooseSection />
        <PricingSection />
        <TestimonialsSection />
        <FaqSection />
        <CtaSection />
      </main>
      <LandingFooter />
    </div>
  );
}
