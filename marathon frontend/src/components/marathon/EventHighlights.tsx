import { Timer, Award, Coffee, Shirt, ShoppingBag, Medal } from "lucide-react";

const items = [
  { icon: Timer, title: "Timing Chip", desc: "Certified electronic timing", num: "01" },
  { icon: Award, title: "E-Certificate", desc: "Digital finisher certificate", num: "02" },
  { icon: Coffee, title: "Breakfast", desc: "Post-race healthy meal", num: "03" },
  { icon: Shirt, title: "Event T-Shirt", desc: "Premium technical fabric", num: "04" },
  { icon: ShoppingBag, title: "Goodie Bag", desc: "Sponsor gifts & samples", num: "05" },
  { icon: Medal, title: "Finisher Medal", desc: "Keepsake to remember", num: "06" },
];

export default function EventHighlights() {
  return (
    <section className="py-24 md:py-28 bg-background dots-pattern">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-navy dark:text-primary-light font-semibold text-sm tracking-widest uppercase">Every Participant Gets</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-extrabold text-charcoal dark:text-white tracking-tight">Included In Every Bib</h2>
          <div className="mt-4 h-1.5 w-20 mx-auto rounded-full bg-navy dark:bg-primary-light" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 md:gap-6">
          {items.map(({ icon: Icon, title, desc, num }) => (
            <div
              key={title}
              className="group bg-gradient-to-b from-white to-slate-50/80 rounded-[1.5rem] p-6 text-center border border-slate-200/60 shadow-card hover:border-navy/20 hover:shadow-card-hover hover-lift relative overflow-hidden transition-all duration-300"
            >
              <span className="absolute top-3 right-3 text-[10px] font-bold text-navy/20">{num}</span>
              <div className="mx-auto grid place-items-center h-14 w-14 rounded-2xl bg-navy/5 text-navy group-hover:bg-gradient-to-br group-hover:from-navy group-hover:to-charcoal group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-glow">
                <Icon className="h-6 w-6 transition-transform duration-300" strokeWidth={1.75} />
              </div>
              <h3 className="mt-4 font-bold text-charcoal text-sm md:text-base tracking-tight transition-colors duration-300 group-hover:text-navy">{title}</h3>
              <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
