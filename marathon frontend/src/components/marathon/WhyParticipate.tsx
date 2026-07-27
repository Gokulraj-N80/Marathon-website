import { HeartPulse, Users, Trophy, Footprints } from "lucide-react";

const items = [
  { icon: HeartPulse, title: "Run for Your Health", desc: "Improve cardiovascular health while training for a purposeful cause.", num: "01" },
  { icon: Users, title: "Build a Stronger Community", desc: "Connect with thousands of runners who share your passion.", num: "02" },
  { icon: Trophy, title: "Celebrate Your Achievement", desc: "Earn your finisher medal and a moment you'll remember for life.", num: "03" },
  { icon: Footprints, title: "Make Every Step Count", desc: "Support heart health awareness with each stride you take.", num: "04" },
];

export default function WhyParticipate() {
  return (
    <section className="py-24 md:py-28 bg-[#F8FAFC] dots-pattern">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-navy font-semibold text-sm tracking-widest uppercase">Why Participate</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-extrabold text-charcoal tracking-tight">Reasons to Run With Us</h2>
          <div className="mt-4 h-1.5 w-20 mx-auto rounded-full bg-navy" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, desc, num }) => (
            <div key={title} className="group bg-card border border-slate-200 dark:border-white/10 rounded-3xl p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover-premium relative overflow-hidden">
              <span className="absolute top-4 right-4 text-5xl font-black text-navy/5 transition duration-300">{num}</span>
              <div className="grid place-items-center h-14 w-14 rounded-2xl bg-primary text-white">
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="mt-6 font-extrabold text-lg text-slate-800 dark:text-white tracking-tight">{title}</h3>
              <p className="mt-2.5 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
