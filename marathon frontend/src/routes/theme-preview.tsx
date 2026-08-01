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

const themes: Record<string, { name: string; description: string; colors: CSSPropertiesWithVars; isDark: boolean }> = {
  default: {
    name: "Default Dark Theme",
    description: "The original dark theme with Navy Blue, Royal Blue, and Orange.",
    isDark: true,
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
  royalOrangeLight: {
    name: "Royal & Orange Light (White BG)",
    description: "Clean white background with royal blue headings, vibrant orange buttons, and deep navy text. Highly readable and professional.",
    isDark: false,
    colors: {
      "--navy": "#0F172A",       /* Main Text / Headings */
      "--royal": "#2563EB",      /* Primary Accent (Royal Blue) */
      "--orange": "#F97316",     /* Warm Accent (Orange) */
      "--emerald": "#10B981",    /* Badge Accent */
      "--gradient-hero": "linear-gradient(135deg, #1E3A8A 0%, #2563EB 50%, #3B82F6 100%)", /* Banner retains energy */
      "--gradient-cta": "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
      "--gradient-orange": "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
    },
  },
  forestGoldLight: {
    name: "Forest & Gold Light (White BG)",
    description: "Clean white background with deep forest green branding, premium gold accents, and dark charcoal text. Gives a highly premium, organic vibe.",
    isDark: false,
    colors: {
      "--navy": "#1F2937",       /* Dark Charcoal Text */
      "--royal": "#15803D",      /* Forest Green Primary */
      "--orange": "#D97706",     /* Gold Accent */
      "--emerald": "#16A34A",    /* Green Badge */
      "--gradient-hero": "linear-gradient(135deg, #14532D 0%, #15803D 50%, #16A34A 100%)",
      "--gradient-cta": "linear-gradient(135deg, #D97706 0%, #B45309 100%)",
      "--gradient-orange": "linear-gradient(135deg, #D97706 0%, #B45309 100%)",
    },
  },
  londonCrimsonLight: {
    name: "London Crimson Light (White BG)",
    description: "Clean white background with passionate crimson red and coral accents, and charcoal midnight text. Modern and high-energy.",
    isDark: false,
    colors: {
      "--navy": "#111827",       /* Midnight Text */
      "--royal": "#E11D48",      /* London Crimson Primary */
      "--orange": "#F43F5E",     /* Coral/Rose Accent */
      "--emerald": "#0D9488",    /* Teal Badge */
      "--gradient-hero": "linear-gradient(135deg, #881337 0%, #E11D48 50%, #F43F5E 100%)",
      "--gradient-cta": "linear-gradient(135deg, #E11D48 0%, #BE123C 100%)",
      "--gradient-orange": "linear-gradient(135deg, #E11D48 0%, #BE123C 100%)",
    },
  },
};

function ThemePreview() {
  const [activeTheme, setActiveTheme] = useState<keyof typeof themes>("default");
  const theme = themes[activeTheme];

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
            {Object.entries(themes).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setActiveTheme(key as keyof typeof themes)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeTheme === key
                    ? "bg-slate-800 text-white dark:bg-white dark:text-slate-900 shadow-md scale-105"
                    : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:border-slate-700"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-2 text-center md:text-left">
          <span className="text-xs font-medium text-slate-600 dark:text-slate-300 italic">
            Active Palette Description: {theme.description}
          </span>
        </div>
      </div>

      {/* Embedded Dynamic Homepage Preview */}
      <div style={theme.colors} className="transition-all duration-500">
        <div className={theme.isDark ? "dark" : "light"}>
          <div className="gradient-page min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100">
            <HeroSection />
            <Sponsors />
            <RaceCategories />
            <AboutEvent />
          </div>
        </div>
      </div>
    </div>
  );
}
