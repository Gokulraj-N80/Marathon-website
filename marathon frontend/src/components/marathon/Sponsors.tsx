import { Stethoscope, Dumbbell, Users, Newspaper } from "lucide-react";

const partners = [
  { icon: Stethoscope, name: "Healthcare Partner" },
  { icon: Dumbbell, name: "Fitness Partner" },
  { icon: Users, name: "Community Partner" },
  { icon: Newspaper, name: "Media Partner" },
];

export default function Sponsors() {
  return (
    <section className="py-20 md:py-24 bg-white border-y border-border dots-pattern">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-navy dark:text-primary-light font-semibold text-sm tracking-widest uppercase">Event Powered By</p>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {partners.map(({ icon: Icon, name }) => (
            <div
              key={name}
              className="flex items-center justify-center gap-4.5 rounded-[1.25rem] border border-slate-100 bg-white py-7 px-5 shadow-card hover:shadow-card-hover hover:border-royal/30 hover:scale-[1.03] transition-all duration-300 group cursor-pointer"
            >
              <div className="p-2.5 rounded-xl bg-slate-50 group-hover:bg-navy/10 group-hover:text-navy transition-all duration-300 text-slate-400">
                <Icon className="h-7 w-7 transition-transform duration-500 group-hover:rotate-3" strokeWidth={1.5} />
              </div>
              <span className="font-bold text-slate-600 group-hover:text-charcoal transition-colors duration-300 text-sm md:text-base">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
