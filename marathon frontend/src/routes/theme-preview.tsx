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
  heritage: {
    name: "Heritage Classic (Boston inspired)",
    description: "Deep Midnight Blue, Boston Blue, and Historic Gold/Yellow.",
    colors: {
      "--navy": "#0A1128",
      "--royal": "#1C3FFD",
      "--orange": "#FFC914",
      "--emerald": "#00A86B",
      "--gradient-hero": "linear-gradient(135deg, #0A1128 0%, #0D21A9 45%, #1C3FFD 100%)",
      "--gradient-cta": "linear-gradient(135deg, #0D21A9 0%, #1C3FFD 60%, #4D6AFF 100%)",
      "--gradient-orange": "linear-gradient(135deg, #FFC914 0%, #E0A800 100%)",
    },
  },
  urban: {
    name: "Urban Energy (NYC inspired)",
    description: "Matte Charcoal, NYC Orange/Rust, and Safety Yellow.",
    colors: {
      "--navy": "#121214",
      "--royal": "#E35E14",
      "--orange": "#FACC15",
      "--emerald": "#10B981",
      "--gradient-hero": "linear-gradient(135deg, #121214 0%, #7C2D12 45%, #E35E14 100%)",
      "--gradient-cta": "linear-gradient(135deg, #7C2D12 0%, #E35E14 60%, #F97316 100%)",
      "--gradient-orange": "linear-gradient(135deg, #FACC15 0%, #E2B007 100%)",
    },
  },
  pulse: {
    name: "Community Pulse (London/Chicago inspired)",
    description: "Deep Plum-Navy, London Crimson, and Coral Pink.",
    colors: {
      "--navy": "#13001C",
      "--royal": "#E11D48",
      "--orange": "#FB7185",
      "--emerald": "#14B8A6",
      "--gradient-hero": "linear-gradient(135deg, #13001C 0%, #881337 45%, #E11D48 100%)",
      "--gradient-cta": "linear-gradient(135deg, #881337 0%, #E11D48 60%, #FB7185 100%)",
      "--gradient-orange": "linear-gradient(135deg, #FB7185 0%, #F43F5E 100%)",
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
