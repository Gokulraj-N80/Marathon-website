import { Link } from "@tanstack/react-router";
import { Check, ArrowRight } from "lucide-react";
import { RACES } from "@/data/marathon";

const styles = {
  magenta: {
    ring: "ring-slate-200/80 hover:ring-navy/30",
    accent: "text-navy",
    bg: "from-navy/5 via-white to-white",
    btn: "bg-navy hover:bg-charcoal text-white hover:scale-105 transition-all duration-300",
  },
  gold: {
    ring: "ring-orange/40 hover:ring-orange/80 shadow-soft hover:shadow-glow",
    accent: "text-orange",
    bg: "from-orange/10 via-white to-white",
    btn: "gradient-orange hover:shadow-glow text-white hover:scale-105 transition-all duration-300",
  },
  cream: {
    ring: "ring-slate-200/80 hover:ring-emerald/40",
    accent: "text-emerald",
    bg: "from-emerald/5 via-white to-white",
    btn: "bg-emerald hover:bg-emerald-600 text-white hover:scale-105 transition-all duration-300",
  },
} as const;

export default function RaceCategories() {
  return (
    <section id="races" className="py-10 md:py-24 bg-[#F8FAFC] dots-pattern">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-16">
          <p className="text-navy font-semibold text-xs tracking-widest uppercase">Race Categories</p>
          <h2 className="mt-2 text-2xl md:text-6xl font-extrabold text-charcoal tracking-tight">Choose Your Challenge</h2>
          <div className="mt-3 h-1 w-16 mx-auto rounded-full bg-navy" />
          <p className="mt-3 text-slate-500 text-sm md:text-lg leading-relaxed hidden md:block">
            Every step counts. Pick the distance that inspires you to go further.
          </p>
        </div>

        {/* Mobile: compact horizontal cards */}
        <div className="flex flex-col gap-3 md:hidden">
          {RACES.map((r) => {
            const s = styles[r.accent];
            return (
              <div
                key={r.id}
                className={`relative rounded-2xl bg-gradient-to-r ${s.bg} px-4 py-4 ring-1 ${s.ring} shadow-sm flex items-center gap-4`}
              >
                {r.popular && (
                  <span className="absolute -top-2.5 left-4 rounded-full gradient-orange text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 shadow-glow">
                    Popular
                  </span>
                )}
                {/* Distance badge */}
                <div className={`shrink-0 flex flex-col items-center justify-center w-16 h-16 rounded-xl bg-white ring-1 ${s.ring}`}>
                  <span className={`font-display text-2xl font-black ${s.accent} leading-none`}>{r.distance}</span>
                  <span className={`text-[9px] font-bold ${s.accent}`}>KM</span>
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-extrabold text-charcoal text-sm">{r.type}</p>
                  <p className="text-xs text-slate-400">{r.subtype}</p>
                  <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5">
                    <span className="flex items-center gap-1 text-[10px] text-slate-500"><Check className="h-3 w-3 text-emerald shrink-0" strokeWidth={3} />Age {r.minAge}+</span>
                    <span className="flex items-center gap-1 text-[10px] text-slate-500"><Check className="h-3 w-3 text-emerald shrink-0" strokeWidth={3} />Chip timing</span>
                    <span className="flex items-center gap-1 text-[10px] text-slate-500"><Check className="h-3 w-3 text-emerald shrink-0" strokeWidth={3} />Medal + T-shirt</span>
                  </div>
                </div>
                {/* Fee + CTA */}
                <div className="shrink-0 flex flex-col items-end gap-2">
                  <p className="font-display text-lg font-extrabold text-charcoal">₹{r.fee}</p>
                  <Link
                    to="/register" target="_blank" rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1 rounded-full px-4 py-1.5 text-xs font-bold shadow-sm ${s.btn}`}
                  >
                    Register <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop: original tall card layout */}
        <div className="hidden md:grid gap-8 md:grid-cols-3 items-center">
          {RACES.map((r) => {
            const s = styles[r.accent];
            return (
              <div
                key={r.id}
                className={`relative rounded-[2rem] bg-gradient-to-b ${s.bg} p-8 md:p-10 ring-1 ${s.ring} shadow-card hover:shadow-card-hover hover-lift transition-all duration-300`}
              >
                {r.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full gradient-orange text-white text-[10px] font-black uppercase tracking-widest px-5 py-1.5 shadow-glow animate-pulse-glow">
                    Popular
                  </span>
                )}
                <div className="flex items-baseline gap-1">
                  <span className={`font-display text-6xl md:text-7xl font-black ${s.accent} leading-none`}>
                    {r.distance}
                  </span>
                  <span className={`text-xl font-bold ${s.accent}`}>KM</span>
                </div>
                <h3 className="mt-5 text-2xl font-extrabold text-charcoal">{r.type}</h3>
                <p className="text-sm font-semibold text-slate-400 mt-0.5">{r.subtype}</p>

                <ul className="mt-8 space-y-3.5 text-sm text-slate-600 border-t border-slate-100 pt-6">
                  <li className="flex items-center gap-3"><Check className="h-4 w-4 text-emerald shrink-0" strokeWidth={3} /> Age {r.minAge}+</li>
                  <li className="flex items-center gap-3"><Check className="h-4 w-4 text-emerald shrink-0" strokeWidth={3} /> Chip timing</li>
                  <li className="flex items-center gap-3"><Check className="h-4 w-4 text-emerald shrink-0" strokeWidth={3} /> Medal + T-shirt</li>
                </ul>

                <div className="mt-10 flex items-center justify-between gap-4 border-t border-slate-100/60 pt-6">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Registration</p>
                    <p className="font-display text-3xl font-extrabold text-charcoal">₹{r.fee}</p>
                  </div>
                  <Link
                    to="/register" target="_blank" rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold shadow-soft transition-all ${s.btn}`}
                  >
                    Register <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

