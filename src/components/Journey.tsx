import { motion } from "framer-motion";
import { Award, Compass, Flag, Rocket, Ship, Trophy, Users, Waves, Wrench, Crown, Globe2, Target } from "lucide-react";

const items = [
  {
    year: "2020",
    title: "Introduction of Naval Architecture",
    body: "Naval Architecture was introduced at NUST Pakistan Navy Engineering College (PNEC), marking the beginning of a new engineering discipline in Pakistan.",
    icon: Compass,
  },
  {
    year: "2021",
    title: "Formation of NAST",
    body: "A group of passionate students formed the Naval Architectural Student Team (NAST) to explore and represent the field.",
    icon: Users,
  },
  {
    year: "2021",
    title: "Foundation of NSME",
    body: "The team evolved into a structured society named NSME to organize projects and activities. Founders: Muhammad Ateeq, Abu Huraira Javed, Samama Ahmed, Junaid and their team.",
    icon: Flag,
  },
  {
    year: "2022",
    title: "First International Competition",
    body: "Participated in the WFSA International Student Maritime Design Competition. A learning experience that earned the team international certificates.",
    icon: Globe2,
  },
  {
    year: "2023",
    title: "Second International Competition",
    body: "Improved performance and received the NUST High Achievers Award.",
    icon: Award,
  },
  {
    year: "2023",
    title: "First Boat Building Competition",
    body: "Organized a departmental competition where students designed and built styrofoam boats.",
    icon: Ship,
  },
  {
    year: "2024",
    title: "ROV Project",
    body: "Developed a Remotely Operated Vehicle and showcased it at IDEAS 2024.",
    icon: Wrench,
  },
  {
    year: "2024",
    title: "Leadership Change",
    body: "Muhammad Shahbaz Ahmad Khan became President.",
    icon: Crown,
  },
  {
    year: "2025",
    title: "Third International Competition",
    body: "Designed a 200-passenger ferry and won the Significant Achievement Award.",
    icon: Trophy,
  },
  {
    year: "2025",
    title: "Leadership Transition",
    body: "Zain Ur Razzaq became President. Focus shifted toward industry exposure.",
    icon: Crown,
  },
  {
    year: "2025",
    title: "Exhibitions & Activities",
    body: "Participated in PIMEC & IEEEP exhibitions and organized the second Boat Building Competition.",
    icon: Waves,
  },
  {
    year: "2025–26",
    title: "Major International Success",
    body: "Won First Place — Charles R. Cushing Award for Aesthetic Design and the Meritorious Achievement Award. Featured on Marine Log with a $350 prize.",
    icon: Trophy,
  },
  {
    year: "2026",
    title: "Future Goals",
    body: "Preparing for Teknofest 2026 with an Autonomous Underwater Vehicle (AUV). Planning a larger Boat Building Competition.",
    icon: Target,
  },
];

export function Journey() {
  return (
    <section id="journey" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 gradient-radial opacity-60" />
      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-xs uppercase tracking-[0.2em] text-cyan-glow mb-5">
            Our Story
          </span>
          <h2 className="font-display font-bold text-4xl md:text-6xl">
            Our <span className="text-gradient">Journey</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-lg">
            From a small student team to an internationally recognized society — the journey continues.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2 bg-gradient-to-b from-transparent via-cyan-glow/40 to-transparent" />

          <div className="space-y-10 md:space-y-16">
            {items.map((item, i) => {
              const Icon = item.icon;
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: 0.05 }}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Node */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10 mt-6">
                    <div className="h-4 w-4 rounded-full bg-cyan-glow ring-4 ring-navy-deep glow-ring" />
                  </div>

                  {/* Card */}
                  <div className={`flex-1 pl-16 md:pl-0 ${isLeft ? "md:pr-16" : "md:pl-16"}`}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.3 }}
                      className="glass rounded-2xl p-6 md:p-7 hover:bg-white/[0.08] transition-colors group"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-glow/15 text-cyan-glow group-hover:bg-cyan-glow group-hover:text-navy-deep transition-colors">
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="font-display font-bold text-2xl text-cyan-glow">
                          {item.year}
                        </span>
                      </div>
                      <h3 className="font-display font-semibold text-xl mb-2">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-[15px]">
                        {item.body}
                      </p>
                    </motion.div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              );
            })}
          </div>

          {/* Closing */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative mt-20 text-center"
          >
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl glass">
              <Rocket className="h-5 w-5 text-cyan-glow" />
              <p className="font-display text-lg italic text-foreground">
                "From a small student team to an internationally recognized society — the journey continues."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
