import type { ComponentType } from "react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, Compass, Cpu, Megaphone, UserCircle2, X } from "lucide-react";

type Member = {
  name: string;
  isLead?: boolean;
};

type Department = {
  name: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  members: Member[];
};

const departments: Department[] = [
  {
    name: "Design & Analysis",
    description: "Concepts, hydrodynamic thinking, and engineering decisions.",
    icon: Compass,
    members: [
      { name: "Noman Ejaz", isLead: true },
      { name: "Areeba Anjum" },
      { name: "Rahima Amir" },
    ],
  },
  {
    name: "Automation & Control",
    description: "Embedded logic, control systems, and smart maritime workflows.",
    icon: Cpu,
    members: [
      { name: "Zain Ul Abideen", isLead: true },
      { name: "Saif Ur Rehman" },
      { name: "Saman Jamali" },
      { name: "Faiza Ahmed" },
    ],
  },
  {
    name: "Fabrication Unit",
    description: "Prototyping, structure execution, and build quality.",
    icon: Compass,
    members: [
      { name: "Muhammad Abdullah", isLead: true },
      { name: "Muhammad Umair Jelani" },
      { name: "Zainab Jibran" },
      { name: "Nadia Batool" },
    ],
  },
  {
    name: "Marketing",
    description: "Outreach, partnerships, and audience growth.",
    icon: Megaphone,
    members: [
      { name: "Zainab Jibran", isLead: true },
      { name: "Faiza Ahmed" },
      { name: "Sania Ahmed" },
      { name: "Muhammad Umair Jelani" },
    ],
  },
  {
    name: "Media",
    description: "Storytelling, visual identity, and event coverage.",
    icon: Camera,
    members: [
      { name: "Faiza Ahmed", isLead: true },
      { name: "Zainab Jibran" },
      { name: "Syeda Alishba Hamid" },
      { name: "Hassan Asghar" },
      { name: "Usman Khan" },
      { name: "Yussar Suleman" },
      { name: "Shoaib Ahmed" },
      { name: "Afaque Ahmed" },
    ],
  },
];

export function Team() {
  const [activeDepartment, setActiveDepartment] = useState<Department | null>(null);

  useEffect(() => {
    if (!activeDepartment) return;

    const onEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveDepartment(null);
      }
    };

    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [activeDepartment]);

  return (
    <section id="team" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 gradient-radial opacity-50" />
      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-xs uppercase tracking-[0.2em] text-cyan-glow mb-5">
            Our Team
          </span>
          <h2 className="font-display font-bold text-4xl md:text-6xl">
            Departments & <span className="text-gradient">People</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-lg">
            Explore each department to meet the team behind NSME.
          </p>
          <p className="mt-3 text-sm text-cyan-soft/90">
            Click any department card to view its member list.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {departments.map((department, index) => {
            const Icon = department.icon;
            return (
              <motion.button
                key={department.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setActiveDepartment(department)}
                className="text-left rounded-2xl border border-white/12 bg-card/70 backdrop-blur-xl p-6 shadow-card hover:border-cyan-glow/45 hover:bg-card/85 transition-all"
                aria-haspopup="dialog"
                aria-label={`Open ${department.name} team members`}
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-glow/35 bg-cyan-glow/10 text-cyan-soft">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold">{department.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{department.description}</p>
                <p className="mt-5 text-xs uppercase tracking-[0.14em] text-cyan-soft/90">
                  {department.members.length} members
                </p>
              </motion.button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {activeDepartment && (
          <motion.div
            className="fixed inset-0 z-70 bg-black/55 backdrop-blur-sm p-4 sm:p-8 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveDepartment(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`${activeDepartment.name} department members`}
              className="w-full max-w-2xl rounded-2xl border border-white/15 bg-card/95 shadow-card overflow-hidden"
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 border-b border-border/70 px-5 sm:px-6 py-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-cyan-soft">Department</p>
                  <h3 className="mt-1 font-display text-2xl font-semibold">{activeDepartment.name}</h3>
                </div>
                <button
                  onClick={() => setActiveDepartment(null)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-background/35 hover:bg-background/55 transition-colors"
                  aria-label="Close team dialog"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="px-5 sm:px-6 py-5 sm:py-6">
                <ul className="space-y-3">
                  {activeDepartment.members.map((member) => (
                    <li
                      key={member.name}
                      className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 ${
                        member.isLead
                          ? "border-cyan-glow/40 bg-cyan-glow/10"
                          : "border-white/10 bg-background/35"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${
                            member.isLead
                              ? "border-cyan-glow/45 text-cyan-soft bg-cyan-glow/12"
                              : "border-white/14 text-muted-foreground bg-background/45"
                          }`}
                          aria-hidden="true"
                        >
                          <UserCircle2 className="h-5 w-5" />
                        </span>
                        <span className="text-sm sm:text-base font-medium truncate">{member.name}</span>
                      </div>
                      {member.isLead && (
                        <span className="rounded-full border border-cyan-glow/45 bg-cyan-glow/15 px-2.5 py-1 text-[11px] uppercase tracking-wider text-cyan-soft">
                          Lead
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
