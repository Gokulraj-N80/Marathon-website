import { createFileRoute } from "@tanstack/react-router";
import HeroSection from "@/components/marathon/HeroSection";
import AboutEvent from "@/components/marathon/AboutEvent";
import RaceCategories from "@/components/marathon/RaceCategories";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="gradient-page min-h-screen">
      <HeroSection />
      <RaceCategories />
      <AboutEvent />
    </div>
  );
}


