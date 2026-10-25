import { motion } from "framer-motion";
import { Award, Compass, Flag, Rocket, Ship, Trophy, Users, Wrench, Crown, Globe2, Target } from "lucide-react";

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
    title: "Pipe ROV",
    body: "Developed a Pipe ROV designed to inspect and navigate through pipelines, showcasing practical underwater inspection capabilities.",
    icon: Wrench,
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
    body: "Expanding into Ferry Design, scaling up Boat Building activities, and advancing AUV Fabrication for upcoming projects and competitions.",
    icon: Target,
  },
];

export function Journey() {
  return (
    <section id="journey" className="relative py-16 md:py-24 overflow-hidden bg-sea-section">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, oklch(0.62 0.13 225 / 0.25), transparent 60%)",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-10 md:mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass-dark text-xs uppercase tracking-[0.25em] text-sea-pale mb-4">
            Our Story
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">
            Our <span className="text-gradient-light">Journey</span>
          </h2>
          <p className="mt-4 text-white/80 text-base sm:text-lg">
            Milestones that shaped NSME into what it is today.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          <div className="absolute left-4 sm:left-6 lg:left-1/2 top-0 bottom-0 w-px lg:-translate-x-1/2 bg-gradient-to-b from-sea-pale/40 via-white/20 to-transparent" />
          <div className="space-y-6 md:space-y-8">
            {items.map((item, i) => {
              const Icon = item.icon;
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.03 }}
                  className={`relative flex items-start gap-4 sm:gap-6 lg:gap-0 ${isLeft ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                >
                  <div className="absolute left-4 sm:left-6 lg:left-1/2 -translate-x-1/2 z-10">
                    <motion.div
                      whileInView={{ scale: [0.8, 1.1, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.03 }}
                      className="relative"
                    >
                      <div className="h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-sea-light shadow-[0_0_0_8px_rgba(98,160,255,0.12)]" />
                      <div className="absolute inset-0 rounded-full bg-sea-pale/40 animate-pulse" />
                    </motion.div>
                  </div>
                  <div className={`flex-1 pl-10 sm:pl-16 lg:pl-0 ${isLeft ? "lg:pr-12" : "lg:pl-12"}`}>
                    <motion.div
                      whileHover={{ y: -4, scale: 1.01 }}
                      transition={{ duration: 0.3 }}
                      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl shadow-[0_40px_80px_-60px_rgba(80,160,255,0.9)]"
                    >
                      <div className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-sea-pale/10 via-transparent to-transparent" />
                      <div className="relative p-4 sm:p-5 md:p-6">
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-2.5">
                          <div className="flex items-center gap-2.5">
                            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-sea-pale">
                              <Icon className="h-4.5 w-4.5" />
                            </span>
                            <span className="font-display text-lg sm:text-xl font-bold text-sea-pale">{item.year}</span>
                          </div>
                          <span className="hidden sm:inline-flex px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] text-white/50 border border-white/10">
                            Milestone
                          </span>
                        </div>
                        <h3 className="font-display text-lg sm:text-xl md:text-2xl font-semibold text-white mb-2 leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-white/75 leading-relaxed text-sm sm:text-[15px]">
                          {item.body}
                        </p>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    </motion.div>
                  </div>
                  <div className="hidden lg:block flex-1" />
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative mt-10 md:mt-12 text-center"
          >
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-xl">
              <Rocket className="h-4 w-4 text-sea-pale" />
              <p className="font-display text-sm text-white/90">The journey continues</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
