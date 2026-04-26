import { motion } from "framer-motion";
import { Globe2, Ship, Wrench, Cpu, ArrowUpRight } from "lucide-react";

const comps = [
  {
    icon: Globe2,
    title: "WFSA International Maritime Design Competition",
    desc: "Global ferry design competition. NSME has participated multiple times, earning international recognition and prestigious awards.",
    tag: "International",
  },
  {
    icon: Ship,
    title: "Boat Building Competition",
    desc: "Internal hands-on competition where students design, engineer and build styrofoam boats from concept to launch.",
    tag: "On-Campus",
  },
  {
    icon: Wrench,
    title: "ROV Project Showcase",
    desc: "Remotely Operated Vehicle presented at IDEAS 2024 — demonstrating real-world underwater engineering capabilities.",
    tag: "Showcase",
  },
  {
    icon: Cpu,
    title: "Teknofest 2026",
    desc: "Upcoming international competition in Türkiye focused on Autonomous Underwater Vehicles (AUVs) — our next frontier.",
    tag: "Upcoming",
  },
];

export function Competitions() {
  return (
    <section id="competitions" className="relative py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-xs uppercase tracking-[0.2em] text-cyan-glow mb-5">
            What We Do
          </span>
          <h2 className="font-display font-bold text-4xl md:text-6xl">
            <span className="text-gradient">Competitions</span> & Projects
          </h2>
          <p className="mt-5 text-muted-foreground text-lg">
            Pushing the boundaries of maritime engineering on both national and international stages.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {comps.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.article
                key={c.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group relative glass rounded-2xl p-7 overflow-hidden cursor-pointer"
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-cyan-glow/30 via-transparent to-transparent" />
                  <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-cyan-glow/20 blur-3xl" />
                </div>

                <div className="relative flex items-start justify-between mb-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-glow/20 to-navy-light/40 text-cyan-glow group-hover:from-cyan-glow group-hover:to-cyan-soft group-hover:text-navy-deep transition-all duration-500">
                    <Icon className="h-7 w-7" />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground border border-border rounded-full px-3 py-1">
                    {c.tag}
                  </span>
                </div>

                <h3 className="relative font-display font-semibold text-xl mb-3 leading-snug group-hover:text-cyan-soft transition-colors">
                  {c.title}
                </h3>
                <p className="relative text-muted-foreground text-[15px] leading-relaxed">
                  {c.desc}
                </p>

                <div className="relative mt-6 flex items-center gap-2 text-cyan-glow text-sm font-medium opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  Learn more <ArrowUpRight className="h-4 w-4" />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
