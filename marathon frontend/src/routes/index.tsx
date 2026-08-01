import { createFileRoute } from "@tanstack/react-router";
import HeroSection from "@/components/marathon/HeroSection";
import AboutEvent from "@/components/marathon/AboutEvent";
import RaceCategories from "@/components/marathon/RaceCategories";
import Sponsors from "@/components/marathon/Sponsors";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="gradient-page min-h-screen">
      <HeroSection />
      <Sponsors />
      <RaceCategories />
      <AboutEvent />
    </div>
  );
}


