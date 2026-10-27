import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

const comps: {
  title: string;
  desc: string;
  tag: string;
  image?: string;
  href?: "/competitions/wfsa" | "/competitions/boat-building" | "/competitions/rov";
}[] = [
  {
    title: "WFSA International Maritime Design Competition",
    desc: "Global ferry design competition. NSME has participated multiple times, earning international recognition and prestigious awards.",
    tag: "International",
    image: "/WFSA%20Ferry%202026/1.jpeg",
    href: "/competitions/wfsa",
  },
  {
    title: "Boat Building Competition",
    desc: "Internal hands-on competition where students design, engineer and build styrofoam boats from concept to launch.",
    tag: "On-Campus",
    image: "/Boat%20Building%20Competition/Competition_1/8.jpeg",
    href: "/competitions/boat-building",
  },
  {
    title: "ROV Project Showcase",
    desc: "Remotely Operated Vehicle presented at IDEAS 2024 — demonstrating real-world underwater engineering capabilities.",
    tag: "Showcase",
    image: "/Pipe%20ROV/1.jpeg",
    href: "/competitions/rov",
  },
];

export function Competitions() {
  return (
    <section id="competitions" className="relative py-24 md:py-32 bg-background">
      <div className="absolute inset-0 gradient-radial pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-xs uppercase tracking-[0.2em] text-sea mb-5">
            What We Do
          </span>
          <h2 className="font-display font-bold text-4xl md:text-6xl text-foreground">
            <span className="text-gradient">Competitions</span> &amp; Projects
          </h2>
          <p className="mt-5 text-muted-foreground text-lg">
            Pushing the boundaries of maritime engineering on both national and international stages.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {comps.map((c, i) => {
            return (
              <motion.article
                key={c.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-2xl overflow-hidden cursor-pointer border border-border shadow-card"
              >
                {/* Card background image + overlay */}
                {c.image && (
                  <>
                    <div
                      className="absolute inset-0 bg-cover bg-center scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
                      style={{ backgroundImage: `url("${c.image}")` }}
                      aria-hidden="true"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-sea-deep/90 via-sea-deep/70 to-sea-deep/45 group-hover:from-sea-deep/95 group-hover:via-sea-deep/75 transition-colors duration-500"
                      aria-hidden="true"
                    />
                  </>
                )}

                {/* Glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-sea/30 via-transparent to-transparent" />
                  <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-sea-light/20 blur-3xl" />
                </div>

                <div className="relative p-7">
                  <div className="flex items-start justify-end mb-5">
                    <span className="text-[10px] uppercase tracking-widest text-white/90 border border-white/30 rounded-full px-3 py-1 backdrop-blur-sm bg-black/30">
                      {c.tag}
                    </span>
                  </div>

                  <h3 className="font-display font-semibold text-xl mb-3 leading-snug text-white group-hover:text-white transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-white/80 text-[15px] leading-relaxed">
                    {c.desc}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-sea-pale text-sm font-medium opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    Learn more <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>

                {/* Whole-card stretched link */}
                {c.href && (
                  <Link
                    to={c.href}
                    className="absolute inset-0 z-10 rounded-2xl"
                    aria-label={`Learn more about ${c.title}`}
                  />
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
