import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { EVENT } from "@/data/marathon";

function diff(target: number) {
  const now = Date.now();
  const d = Math.max(0, target - now);
  return {
    days: Math.floor(d / 86400000),
    hours: Math.floor((d / 3600000) % 24),
    minutes: Math.floor((d / 60000) % 60),
    seconds: Math.floor((d / 1000) % 60),
  };
}

export default function Countdown() {
  const target = new Date(EVENT.dateISO).getTime();
  const [t, setT] = useState<ReturnType<typeof diff> | null>(null);
  useEffect(() => {
    setT(diff(target));
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const cells: [string, number | null][] = [
    ["Days", t?.days ?? null],
    ["Hours", t?.hours ?? null],
    ["Minutes", t?.minutes ?? null],
    ["Seconds", t?.seconds ?? null],
  ];

  return (
    <section className="relative py-10 md:py-12 gradient-hero text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Label */}
          <div className="text-center md:text-left">
            <p className="text-white/60 font-semibold text-xs tracking-widest uppercase">Race Day Countdown</p>
            <p className="mt-1 font-display text-xl md:text-2xl font-extrabold text-white">{EVENT.date}</p>
            <p className="text-white/60 text-sm mt-0.5">{EVENT.location}</p>
          </div>

          {/* Timer cells */}
          <div className="grid grid-cols-4 gap-2 md:gap-3">
            {cells.map(([label, val]) => (
              <div
                key={label}
                className="rounded-2xl bg-white/10 backdrop-blur-xl ring-1 ring-white/15 px-4 py-3 md:px-6 md:py-4 text-center shadow-elevated hover:bg-white/15 transition-all duration-300 min-w-[64px]"
              >
                <div className="font-display text-3xl md:text-5xl font-black tabular-nums tracking-tight text-white">
                  {val === null ? "--" : String(val).padStart(2, "0")}
                </div>
                <div className="mt-1 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">{label}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Link
            to="/register" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full gradient-orange text-white px-7 py-3 font-bold shadow-glow hover:scale-105 transition-all duration-300 text-sm whitespace-nowrap"
          >
            Secure Your Spot
          </Link>
        </div>
      </div>
    </section>
  );
}


