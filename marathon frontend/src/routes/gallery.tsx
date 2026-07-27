import { createFileRoute, Link } from "@tanstack/react-router";
import Gallery from "@/components/marathon/Gallery";
import PressHighlights from "@/components/marathon/PressHighlights";
import bgImg from "@/assets/background.png";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery · Run Beyond Limits 2026" },
      { name: "description", content: "Moments from previous Run Beyond Limits events." },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <div className="min-h-screen">
      <section className="relative py-20 md:py-28 overflow-hidden">
        <img
          src={bgImg}
          alt="Marathon gallery background"
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-navy/80 via-navy/60 to-navy/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-navy/20" />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-white">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-8">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white font-medium">Gallery</span>
          </nav>
          <p className="text-orange font-semibold text-sm tracking-widest uppercase">Gallery</p>
          <h1 className="mt-3 font-display text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
            Moments That <span className="text-gradient">Made Us</span>
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-xl leading-relaxed">
            Relive the energy, emotion and spirit of Run Beyond Limits through our collection of unforgettable moments.
          </p>
        </div>
      </section>
      <Gallery />
      <PressHighlights />
    </div>
  );
}
