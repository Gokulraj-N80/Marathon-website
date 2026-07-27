import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, ChevronDown } from "lucide-react";
import bgImg from "@/assets/background.png";
import logo from "@/assets/img.png";
import { EVENT } from "@/data/marathon";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <img
        src={bgImg}
        alt="Runners during the Run Beyond Limits marathon"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-navy/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/60 via-navy/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-navy/10" />

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 h-px w-48 bg-gradient-to-r from-transparent to-orange/40 animate-float" />
        <div className="absolute top-1/2 left-10 h-px w-32 bg-gradient-to-r from-transparent to-royal/40" style={{ animationDelay: "0.4s" }} />
        <div className="absolute bottom-1/3 right-0 h-px w-64 bg-gradient-to-l from-transparent to-orange/30 animate-float" style={{ animationDelay: "0.8s" }} />
        <div className="absolute top-20 right-1/4 h-2 w-2 rounded-full bg-orange/40 animate-pulse-glow" />
        <div className="absolute bottom-40 left-1/3 h-1.5 w-1.5 rounded-full bg-royal/40 animate-pulse-glow" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-24 text-white w-full">
        <div className="grid md:grid-cols-[1fr_auto] gap-10 md:gap-16 items-center">
          {/* Left side */}
          <div className="space-y-6 animate-fade-up">
            <img
              src={logo}
              alt="Run Beyond Limits"
              width={400}
              height={160}
              className="h-20 md:h-28 w-auto object-contain drop-shadow-lg"
            />
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full gradient-orange text-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest animate-pulse-glow">
                <span className="h-2 w-2 rounded-full bg-white" /> Registration Open
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur ring-1 ring-white/20 text-white px-4 py-1.5 text-xs font-semibold uppercase tracking-widest">
                <Calendar className="h-3 w-3" /> {EVENT.date}
              </span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.05] tracking-tight text-white drop-shadow-md">
              Run Beyond <br />
              <span className="text-gradient">Limits 2026</span>
            </h1>
            <p className="text-xl md:text-2xl font-semibold text-white/95">Push Your Endurance</p>
            <p className="text-base md:text-lg text-white/70 max-w-xl leading-relaxed">
              Join thousands of runners across three cities for an unforgettable celebration of health, fitness, resilience and community.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-full gradient-orange text-white px-8 py-4 font-bold shadow-elevated hover:shadow-glow hover:scale-105 transition-all duration-300 text-base"
              >
                Register Now <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/event-info"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md ring-1 ring-white/30 hover:ring-white/50 text-white px-8 py-4 font-semibold hover:bg-white/25 transition-all duration-300 text-base"
              >
                Explore Event
              </Link>
            </div>
          </div>

          {/* Right side — City cards */}
          <div className="hidden md:flex flex-col gap-5 items-end animate-fade-up" style={{ animationDelay: "0.3s" }}>
            {[
              { name: "CHENNAI", state: "Tamil Nadu", color: "group-hover:text-rose-500" },
              { name: "BENGALURU", state: "Karnataka", color: "group-hover:text-amber-500" },
              { name: "SALEM", state: "Tamil Nadu", color: "group-hover:text-emerald-500" },
            ].map((city) => (
              <div
                key={city.name}
                className="flex items-center justify-between gap-6 rounded-2xl bg-navy/40 backdrop-blur-md ring-1 ring-white/15 px-7 py-4.5 min-w-[310px] hover:translate-x-[-12px] hover:bg-navy/60 hover:ring-white/30 transition-all duration-300 group cursor-pointer shadow-soft hover:shadow-glow"
              >
                <div className="flex items-baseline gap-3">
                  <span className={`font-city text-4xl md:text-5xl text-white tracking-wide transition-colors duration-300 ${city.color}`}>{city.name}</span>
                  <span className="text-xs text-white/50 uppercase tracking-widest">{city.state}</span>
                </div>
                <div className="h-2 w-2 rounded-full bg-white/30 group-hover:bg-orange group-hover:scale-125 transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 animate-scroll-bounce">
          <span className="text-xs text-white/50 uppercase tracking-widest">Scroll</span>
          <ChevronDown className="h-4 w-4 text-white/50" />
        </div>
      </div>
    </section>
  );
}
