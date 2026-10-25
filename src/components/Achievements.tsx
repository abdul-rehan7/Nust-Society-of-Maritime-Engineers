import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ExternalLink, X, ZoomIn } from "lucide-react";

type Certificate = {
  title: string;
  description: string;
  file: string;
  year?: string;
};

const certificates: Certificate[] = [
  {
    title: "Charles R. Cushing Award",
    description: "First Place - Aesthetic Design",
    file: "/WFSA%20Ferry%202026/certificate_1.png",
    year: "2025-26",
  },
  {
    title: "Meritorious Achievement Award",
    description: "International Recognition",
    file: "/WFSA%20Ferry%202026/certificate_2.png",
    year: "2025-26",
  },
  {
    title: "Award Certificates 2025",
    description: "Pakistan - Signed Awards",
    file: "/WFSA%20Ferry%202025/certificate_1.png",
    year: "2025",
  },
];

export function Achievements() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  return (
    <section id="achievements" className="relative py-16 md:py-24 overflow-hidden bg-background">
      <div className="absolute inset-0 gradient-radial pointer-events-none" />
      <div className="container mx-auto px-4 sm:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-10 md:mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-xs uppercase tracking-[0.2em] text-sea mb-4">
            Achievements
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground">
            Awards & <span className="text-gradient">Recognition</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg">
            Celebrating our team's accomplishments on national and international stages.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-5 max-w-6xl mx-auto">
          {certificates.map((cert, index) => (
            <motion.button
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedCert(cert)}
              className="group relative flex-1 text-left rounded-2xl border border-border bg-card overflow-hidden shadow-card hover:border-sea/40 hover:shadow-[0_16px_50px_-16px_oklch(0.52_0.14_230/0.35)] transition-all duration-500"
            >
              <div className="absolute -inset-px bg-gradient-to-br from-sea/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative aspect-[4/3] overflow-hidden border-b border-border bg-white">
                <img
                  src={cert.file}
                  alt={`${cert.title} certificate`}
                  loading="lazy"
                  className="h-full w-full object-contain p-2 transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-sea-deep/10">
                  <span className="glass-dark rounded-full p-2.5 text-white/90 shadow-glow">
                    <ZoomIn className="h-5 w-5" />
                  </span>
                </div>
              </div>
              <div className="relative p-5 sm:p-6">
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="inline-flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl border border-sea/25 bg-gradient-to-br from-sea/15 to-sea/5 text-sea group-hover:scale-110 transition-transform duration-500">
                    <Award className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  {cert.year && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-sea/10 text-sea border border-sea/20">
                      {cert.year}
                    </span>
                  )}
                </div>
                <h3 className="font-display text-lg sm:text-xl font-semibold text-foreground mb-1.5 group-hover:text-sea transition-colors">
                  {cert.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  {cert.description}
                </p>
                <div className="flex items-center gap-2 text-sm text-sea font-medium">
                  <ZoomIn className="h-4 w-4" />
                  View Certificate
                </div>
              </div>
              <div className="relative h-1.5 bg-gradient-to-r from-sea via-sea-light to-sea opacity-60 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-[100] bg-sea-deep/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl h-[90vh] rounded-2xl overflow-hidden border border-white/20 shadow-2xl"
            >
              <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
                <div className="flex items-center gap-3 px-4 py-2 rounded-full glass-dark">
                  <Award className="h-4 w-4 text-sea-pale" />
                  <span className="text-sm font-medium text-white">{selectedCert.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={selectedCert.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark text-white hover:bg-white/20 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span className="text-sm">Open in New Tab</span>
                  </a>
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full glass-dark text-white hover:bg-white/20 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="w-full h-full bg-white flex items-center justify-center p-4 pt-20 sm:pt-16">
                <img
                  src={selectedCert.file}
                  alt={`${selectedCert.title} certificate`}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
