import { Link } from "@tanstack/react-router";
import { ArrowRight, Heart, MapPin } from "lucide-react";
import img from "@/New assests/about.webp";

export default function AboutEvent() {
  return (
    <section className="py-10 md:py-32 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-royal/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-orange/5 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-8 md:gap-20 md:grid-cols-2 items-center">
        {/* Image — hidden on mobile to save space */}
        <div className="relative hidden md:block">
          <img
            src={img}
            alt="Runners celebrating at the finish line"
            loading="lazy"
            width={1200}
            height={1200}
            className="rounded-[2rem] shadow-elevated w-full h-auto object-cover aspect-square"
          />
          <div className="absolute -bottom-8 -right-8 hidden md:block rounded-2xl bg-navy/95 backdrop-blur-xl shadow-glow p-6 max-w-[260px] ring-1 ring-white/15 border-l-4 border-l-orange">
            <div className="flex items-center gap-4">
              <div className="grid place-items-center h-14 w-14 rounded-xl bg-orange/15 text-orange shrink-0 animate-pulse-glow">
                <Heart className="h-7 w-7" fill="currentColor" />
              </div>
              <div>
                <p className="font-display text-4xl font-black text-white leading-none">10K+</p>
                <p className="text-xs text-slate-400 mt-1 font-semibold uppercase tracking-wider">Expected Runners</p>
              </div>
            </div>
          </div>
          <div className="absolute -top-4 -left-4 hidden md:flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md ring-1 ring-white/20 px-4 py-2 animate-float">
            <MapPin className="h-4 w-4 text-orange" />
            <span className="text-xs font-semibold text-white">3 Cities</span>
          </div>
        </div>

        {/* Text content */}
        <div>
          {/* Mobile: show a compact stats row */}
          <div className="flex items-center gap-4 mb-4 md:hidden">
            <div className="flex items-center gap-2 rounded-full bg-white/10 ring-1 ring-white/20 px-3 py-1.5">
              <MapPin className="h-3 w-3 text-orange" />
              <span className="text-xs font-semibold text-white">3 Cities</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/10 ring-1 ring-white/20 px-3 py-1.5">
              <Heart className="h-3 w-3 text-orange" />
              <span className="text-xs font-semibold text-white">10K+ Runners</span>
            </div>
          </div>

          <p className="text-white/70 font-semibold text-xs md:text-sm tracking-widest uppercase">About The Event</p>
          <h2 className="mt-2 md:mt-3 font-display text-2xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            Tie Your Laces, Get Ready and <span className="text-orange-gradient">Push Your Limits</span>
          </h2>
          <div className="mt-3 h-1 w-16 rounded-full bg-orange" />
          <p className="mt-4 text-white/80 text-sm md:text-lg leading-relaxed">
            We are excited to announce Run Beyond Limits, happening on 27th September 2026 simultaneously across Chennai, Bengaluru, and Salem. With the theme "Push Your Endurance", this year's event continues our mission to raise awareness about fitness, resilience, and personal records.
          </p>
          <p className="mt-3 text-white/70 leading-relaxed text-sm md:text-lg hidden md:block">
            By participating, you're not just running a race — you're embracing a lifestyle and joining a community that
            believes in taking proactive steps toward a stronger, healthier future.
          </p>
          <blockquote className="mt-5 md:mt-8 border-l-4 border-orange bg-white/5 backdrop-blur-sm rounded-r-2xl pl-4 py-3 pr-3 italic text-white/95 font-semibold text-sm md:text-lg max-w-xl">
            "Every step matters. Every heartbeat counts."
          </blockquote>
          <div className="mt-6 md:mt-10">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-full gradient-orange text-white px-6 py-3 md:px-10 md:py-5 font-bold shadow-elevated hover:shadow-glow hover:scale-105 transition-all duration-300 text-sm md:text-lg"
            >
              Know More <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
