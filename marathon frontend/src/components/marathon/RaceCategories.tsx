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
    ring: "ring-orange/40 hover:ring-orange/80 shadow-soft hover:shadow-glow scale-102 md:scale-105 z-10",
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
    <section id="races" className="py-24 md:py-32 bg-[#F8FAFC] dots-pattern">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-navy dark:text-primary-light font-semibold text-sm tracking-widest uppercase">Race Categories</p>
          <h2 className="mt-3 text-4xl md:text-6xl font-extrabold text-charcoal dark:text-white tracking-tight">Choose Your Challenge</h2>
          <div className="mt-4 h-1.5 w-24 mx-auto rounded-full bg-navy dark:bg-primary-light" />
          <p className="mt-5 text-slate-500 dark:text-slate-300 text-lg leading-relaxed">
            Every step counts. Pick the distance that inspires you to go further.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3 items-center">
          {RACES.map((r) => {
            const s = styles[r.accent];
            return (
              <div
                key={r.id}
                className={`relative rounded-[2rem] bg-gradient-to-b ${s.bg} p-8 md:p-10 ring-1 ${s.ring} shadow-card hover:shadow-card-hover hover-lift transition-all duration-300`}
              >
                {r.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full gradient-orange text-white text-[10px] font-black uppercase tracking-widest px-5 py-1.5 shadow-glow animate-pulse-glow">
                    Most Popular
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
                  <li className="flex items-center gap-3"><Check className="h-4 w-4 text-emerald shrink-0" strokeWidth={3} /> Minimum age: {r.minAge}</li>
                  <li className="flex items-center gap-3"><Check className="h-4 w-4 text-emerald shrink-0" strokeWidth={3} /> Timing chip & bib inclusion</li>
                  <li className="flex items-center gap-3"><Check className="h-4 w-4 text-emerald shrink-0" strokeWidth={3} /> T-shirt · Medal · Hot Breakfast</li>
                </ul>

                <div className="mt-10 flex items-center justify-between gap-4 border-t border-slate-100/60 pt-6">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Registration</p>
                    <p className="font-display text-3xl font-extrabold text-charcoal">₹{r.fee}</p>
                  </div>
                  <Link
                    to="/register"
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
