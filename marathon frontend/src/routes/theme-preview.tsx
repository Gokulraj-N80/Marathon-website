import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import HeroSection from "@/components/marathon/HeroSection";
import Sponsors from "@/components/marathon/Sponsors";
import RaceCategories from "@/components/marathon/RaceCategories";
import AboutEvent from "@/components/marathon/AboutEvent";

export const Route = createFileRoute("/theme-preview")({
  component: ThemePreview,
});

type CSSPropertiesWithVars = React.CSSProperties & {
  [key: string]: string;
};

const themes: Record<string, { name: string; description: string; colors: CSSPropertiesWithVars }> = {
  default: {
    name: "Default Brand",
    description: "The original Navy Blue, Royal Blue, and Orange scheme.",
    colors: {
      "--navy": "#0F172A",
      "--royal": "#2563EB",
      "--orange": "#F97316",
      "--emerald": "#10B981",
      "--gradient-hero": "linear-gradient(135deg, #0F172A 0%, #1E3A8A 45%, #2563EB 100%)",
      "--gradient-cta": "linear-gradient(135deg, #1E3A8A 0%, #2563EB 60%, #3B82F6 100%)",
      "--gradient-orange": "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
    },
  },
  stealthVolt: {
    name: "Stealth & Volt (2-Color High Tech)",
    description: "High-performance matte charcoal with high-visibility electric volt yellow/green accents.",
    colors: {
      "--navy": "#121214",       /* Dark Charcoal */
      "--royal": "#CCFF00",      /* Volt Green */
      "--orange": "#CCFF00",     /* Volt Green */
      "--emerald": "#CCFF00",    /* Volt Green */
      "--gradient-hero": "linear-gradient(135deg, #121214 0%, #1E1E22 60%, #2E2E34 100%)",
      "--gradient-cta": "linear-gradient(135deg, #CCFF00 0%, #B3E000 100%)",
      "--gradient-orange": "linear-gradient(135deg, #CCFF00 0%, #B3E000 100%)",
    },
  },
  pureCrimson: {
    name: "Pure Crimson & Obsidian (2-Color Bold)",
    description: "Deep obsidian dark background paired only with high-energy crimson red and white.",
    colors: {
      "--navy": "#0A0D14",       /* Obsidian Dark */
      "--royal": "#E11D48",      /* Crimson Red */
      "--orange": "#E11D48",     /* Crimson Red */
      "--emerald": "#10B981",    /* Kept emerald for success badges */
      "--gradient-hero": "linear-gradient(135deg, #0A0D14 0%, #1A0B10 50%, #3F0712 100%)",
      "--gradient-cta": "linear-gradient(135deg, #E11D48 0%, #BE123C 100%)",
      "--gradient-orange": "linear-gradient(135deg, #E11D48 0%, #BE123C 100%)",
    },
  },
  electricObsidian: {
    name: "Electric Blue & Dark Slate (3-Color Modern)",
    description: "Minimalist dark slate background with a single bright electric cyan highlight and clean white text.",
    colors: {
      "--navy": "#0F172A",       /* Dark Slate */
      "--royal": "#0EA5E9",      /* Electric Cyan */
      "--orange": "#0EA5E9",     /* Electric Cyan */
      "--emerald": "#0EA5E9",    /* Electric Cyan */
      "--gradient-hero": "linear-gradient(135deg, #0F172A 0%, #0C4A6E 50%, #0284C7 100%)",
      "--gradient-cta": "linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)",
      "--gradient-orange": "linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)",
    },
  },
};

function ThemePreview() {
  const [activeTheme, setActiveTheme] = useState<keyof typeof themes>("default");

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
      {/* Sticky Theme Controller Bar */}
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 p-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-800 dark:text-white">Theme Live Preview</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Select an option below to dynamically preview the homepage in different color systems.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(themes).map(([key, theme]) => (
              <button
                key={key}
                onClick={() => setActiveTheme(key as keyof typeof themes)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeTheme === key
                    ? "bg-slate-800 text-white dark:bg-white dark:text-slate-900 shadow-md scale-105"
                    : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:border-slate-700"
                }`}
              >
                {theme.name}
              </button>
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-2 text-center md:text-left">
          <span className="text-xs font-medium text-slate-600 dark:text-slate-300 italic">
            Active Palette Description: {themes[activeTheme].description}
          </span>
        </div>
      </div>

      {/* Embedded Dynamic Homepage Preview */}
      <div style={themes[activeTheme].colors} className="transition-all duration-500">
        <div className="gradient-page min-h-screen">
          <HeroSection />
          <Sponsors />
          <RaceCategories />
          <AboutEvent />
        </div>
      </div>
    </div>
  );
}
