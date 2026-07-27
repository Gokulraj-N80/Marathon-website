import { MapPin, Calendar, Clock, Phone, Mail } from "lucide-react";
import { EVENT } from "@/data/marathon";

const cards = [
  {
    title: "Bib Collection",
    location: "Run Beyond Limits Expo",
    date: "September 26, 2026",
    time: "10:00 AM - 7:00 PM",
    address: "At your registered city venue"
  },
  {
    title: "Race Day Helpdesk",
    location: "Event Venue",
    date: "September 27, 2026",
    time: "4:30 AM onwards",
  },
];

export default function BibPickupSection() {
  return (
    <section className="py-20 md:py-24 gradient-hero text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.18) 1.2px, transparent 1.2px)", backgroundSize: "20px 20px" }} />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-orange font-semibold text-sm tracking-widest uppercase">Pick-up & Helpdesk</p>
          <h2 className="mt-2 font-display text-3xl md:text-5xl font-extrabold">Bib Pickup & Helpdesk</h2>
          <p className="mt-3 text-white/80">Collect your bib, timing chip, T-shirt and goodie bag ahead of race day.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {cards.map((c) => (
            <div key={c.title} className="rounded-3xl bg-white/10 backdrop-blur ring-1 ring-white/20 p-8 hover:bg-white/15 transition">
              <h3 className="font-display text-2xl font-bold text-orange">{c.title}</h3>
              <ul className="mt-5 space-y-3 text-sm">
                <li className="flex items-start gap-3"><MapPin className="h-4 w-4 mt-0.5 text-orange shrink-0" /> {c.location}</li>
                <li className="flex items-start gap-3"><Calendar className="h-4 w-4 mt-0.5 text-orange shrink-0" /> {c.date}</li>
                <li className="flex items-start gap-3"><Clock className="h-4 w-4 mt-0.5 text-orange shrink-0" /> {c.time}</li>
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 rounded-2xl bg-white/5 ring-1 ring-white/15 p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-orange font-semibold text-sm uppercase tracking-widest">Need Help?</p>
            <p className="mt-1 font-display text-2xl font-bold">We’re here for you.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={`tel:${EVENT.phone}`} className="inline-flex items-center gap-2 rounded-full bg-white text-navy px-5 py-2.5 font-semibold hover:scale-105 transition">
              <Phone className="h-4 w-4" /> {EVENT.phone}
            </a>
            <a href={`mailto:${EVENT.email}`} className="inline-flex items-center gap-2 rounded-full ring-1 ring-white/40 text-white px-5 py-2.5 font-semibold hover:bg-white/10 transition">
              <Mail className="h-4 w-4" /> {EVENT.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
