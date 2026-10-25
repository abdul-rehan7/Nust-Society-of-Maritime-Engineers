import { motion } from "framer-motion";

type Lead = {
  name: string;
  role: string;
  year: string;
  image: string;
};

const leads: Lead[] = [
  {
    name: "Eesha Akhtar Iqbal",
    role: "President NSME",
    year: "4th year",
    image: "/leads/Eesha Akhtar Iqbal.jpeg",
  },
  {
    name: "Zain Ul Abideen",
    role: "Vice President NSME",
    year: "4th year",
    image: "/leads/Zain Ul Abideen.jpeg",
  },
  {
    name: "Areeba Anjum",
    role: "Technical Director",
    year: "3rd year",
    image: "/leads/Areeba Anjum.jpeg",
  },
  {
    name: "Zainab Jibran",
    role: "Marketing Director",
    year: "4th year",
    image: "/leads/Zainab Jibran.jpeg",
  },
  {
    name: "Faiza Ahmad Mahar",
    role: "Media Director",
    year: "4th year",
    image: "/leads/Faiza Ahmad Mahar.jpeg",
  },
];

export function Team() {
  const president = leads.find((l) => l.role.includes("President") && !l.role.includes("Vice"));
  const vicePresident = leads.find((l) => l.role.includes("Vice"));
  const directors = leads.filter((l) => l.role.includes("Director"));

  const LeadCard = ({ lead, size = "default" }: { lead: Lead; size?: "default" | "large" }) => (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -6 }}
      className="relative group"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-br from-sea/40 to-sea-light/20 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative rounded-2xl overflow-hidden border border-border bg-card shadow-card hover:shadow-[0_20px_60px_-20px_oklch(0.52_0.14_230/0.35)] transition-all duration-500">
        <div className={`relative overflow-hidden ${size === "large" ? "aspect-[4/5]" : "aspect-[3/4]"}`}>
          <img
            src={lead.image}
            alt={lead.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-sea-deep/90 via-sea-deep/20 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-sea-pale/90 mb-1.5">{lead.role}</p>
          <h3 className="font-display text-lg sm:text-xl font-semibold text-white leading-tight mb-1">{lead.name}</h3>
          <p className="text-sm text-white/70">{lead.year}</p>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section id="team" className="relative py-24 md:py-32 overflow-hidden bg-sea-pale-section">
      <div className="absolute inset-0 gradient-radial-strong pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-xs uppercase tracking-[0.2em] text-sea mb-5">
            Leadership
          </span>
          <h2 className="font-display font-bold text-4xl md:text-6xl text-foreground">
            Our <span className="text-gradient">Leads</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-lg">
            The driving force behind NSME's vision and success.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* President */}
          {president && (
            <div className="flex flex-col items-center mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-xs"
              >
                <LeadCard lead={president} size="large" />
              </motion.div>
              <div className="mt-6 w-px h-12 bg-gradient-to-b from-sea to-transparent" />
            </div>
          )}

          {/* Vice President */}
          {vicePresident && (
            <div className="flex flex-col items-center mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="w-full max-w-xs"
              >
                <LeadCard lead={vicePresident} size="large" />
              </motion.div>
              <div className="mt-6 w-full max-w-4xl">
                <div className="relative h-px bg-gradient-to-r from-transparent via-sea to-transparent">
                  <div className="absolute left-1/2 -translate-x-1/2 -top-1.5 h-3 w-3 rounded-full bg-sea ring-4 ring-sea/10" />
                </div>
              </div>
            </div>
          )}

          {/* Directors Row */}
          {directors.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8"
            >
              {directors.map((director) => (
                <LeadCard key={director.name} lead={director} />
              ))}
            </motion.div>
          )}
        </div>
      </div>

    </section>
  );
}
