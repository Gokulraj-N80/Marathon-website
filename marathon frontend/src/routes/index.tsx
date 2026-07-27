import { createFileRoute } from "@tanstack/react-router";
import HeroSection from "@/components/marathon/HeroSection";
import EventHighlights from "@/components/marathon/EventHighlights";
import RaceCategories from "@/components/marathon/RaceCategories";
import Countdown from "@/components/marathon/Countdown";
import AboutEvent from "@/components/marathon/AboutEvent";
import WhyParticipate from "@/components/marathon/WhyParticipate";
import MarathonDifference from "@/components/marathon/MarathonDifference";
import EventTimeline from "@/components/marathon/EventTimeline";
import HeartHealthSection from "@/components/marathon/HeartHealthSection";
import BibPickupSection from "@/components/marathon/BibPickupSection";
import Gallery from "@/components/marathon/Gallery";
import PressHighlights from "@/components/marathon/PressHighlights";
import Sponsors from "@/components/marathon/Sponsors";
import FAQ from "@/components/marathon/FAQ";
import RegistrationCTA from "@/components/marathon/RegistrationCTA";
import ContactSection from "@/components/marathon/ContactSection";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="gradient-page min-h-screen">
      <HeroSection />
      <EventHighlights />
      <RaceCategories />
      <Countdown />
      <AboutEvent />
      <WhyParticipate />
      <MarathonDifference />
      <EventTimeline />
      <HeartHealthSection />
      <BibPickupSection />
      <Gallery compact />
      <PressHighlights />
      <Sponsors />
      <FAQ />
      <RegistrationCTA />
      <ContactSection />
    </div>
  );
}
