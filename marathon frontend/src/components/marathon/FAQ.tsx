import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { FAQS } from "@/data/marathon";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-24 md:py-28 gradient-soft dots-pattern">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-navy dark:text-primary-light font-semibold text-sm tracking-widest uppercase">FAQ</p>
          <h2 className="mt-2 font-display text-3xl md:text-5xl font-extrabold text-charcoal dark:text-white">Frequently Asked Questions</h2>
          <div className="mt-4 h-1.5 w-20 mx-auto rounded-full bg-navy dark:bg-primary-light" />
        </div>
        <div className="space-y-4">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "bg-white border-royal/30 shadow-card-hover scale-[1.01]"
                    : "bg-white border-slate-100 shadow-card hover:border-slate-200/80 hover:shadow-card-hover"
                }`}
              >
                <button
                  className="w-full text-left flex items-center justify-between gap-4 p-6 md:p-7 cursor-pointer"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className={`font-bold text-sm md:text-base leading-snug transition-colors duration-200 ${isOpen ? "text-navy" : "text-slate-800"}`}>{f.q}</span>
                  <span
                    className={`shrink-0 grid place-items-center h-10 w-10 rounded-full transition-all duration-300 ${
                      isOpen ? "gradient-orange text-white rotate-180 shadow-glow" : "bg-navy/5 text-navy hover:bg-navy/10"
                    }`}
                  >
                    {isOpen ? <Minus className="h-4 w-4" strokeWidth={3} /> : <Plus className="h-4 w-4" strokeWidth={3} />}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 md:px-7 pb-6 md:pb-7 text-xs md:text-sm text-slate-500 leading-relaxed animate-fade-up">
                    <p className="border-t border-slate-100 pt-4">{f.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
