import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, X, ZoomIn } from "lucide-react";

const HERO_IMAGE = "/Boat%20Building%20Competition/Competition_1/9.jpeg";

type GalleryImage = { src: string; alt: string };

type Edition = {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  images: GalleryImage[];
};

const editions: Edition[] = [
  {
    year: "2025",
    title: "Boat Building Competition 2025",
    subtitle: "Second Edition",
    description:
      "The second edition of NSME's boat building challenge — another round of styrofoam hulls, tight deadlines and ideas tested on the water.",
    images: [
      {
        src: "/Boat%20Building%20Competition/Competition_2/1.jpeg",
        alt: "Boat Building Competition 2025 — concept stage",
      },
      {
        src: "/Boat%20Building%20Competition/Competition_2/2.jpeg",
        alt: "Boat Building Competition 2025 — building in progress",
      },
      {
        src: "/Boat%20Building%20Competition/Competition_2/3.jpeg",
        alt: "Boat Building Competition 2025 — team at work",
      },
      {
        src: "/Boat%20Building%20Competition/Competition_2/4.jpeg",
        alt: "Boat Building Competition 2025 — hull construction",
      },
      {
        src: "/Boat%20Building%20Competition/Competition_2/5.jpeg",
        alt: "Boat Building Competition 2025 — engineering the design",
      },
      {
        src: "/Boat%20Building%20Competition/Competition_2/6.jpeg",
        alt: "Boat Building Competition 2025 — launch day",
      },
      {
        src: "/Boat%20Building%20Competition/Competition_2/7.jpeg",
        alt: "Boat Building Competition 2025 — on the water",
      },
      {
        src: "/Boat%20Building%20Competition/Competition_2/8.jpeg",
        alt: "Boat Building Competition 2025 — competition moment",
      },
      {
        src: "/Boat%20Building%20Competition/Competition_2/9.jpeg",
        alt: "Boat Building Competition 2025 — the finished boats",
      },
      {
        src: "/Boat%20Building%20Competition/Competition_2/10.jpeg",
        alt: "Boat Building Competition 2025 — showcase",
      },
      {
        src: "/Boat%20Building%20Competition/Competition_2/11.jpeg",
        alt: "Boat Building Competition 2025 — team moment",
      },
    ],
  },
  {
    year: "2024",
    title: "Boat Building Competition 2024",
    subtitle: "First Edition",
    description:
      "The first edition of the competition, where students took styrofoam boats from early sketches through construction and into the water.",
    images: [
      {
        src: "/Boat%20Building%20Competition/Competition_1/1.jpeg",
        alt: "Boat Building Competition 2024 — concept stage",
      },
      {
        src: "/Boat%20Building%20Competition/Competition_1/2.jpeg",
        alt: "Boat Building Competition 2024 — building in progress",
      },
      {
        src: "/Boat%20Building%20Competition/Competition_1/3.jpeg",
        alt: "Boat Building Competition 2024 — team at work",
      },
      {
        src: "/Boat%20Building%20Competition/Competition_1/4.jpeg",
        alt: "Boat Building Competition 2024 — hull construction",
      },
      {
        src: "/Boat%20Building%20Competition/Competition_1/5.jpeg",
        alt: "Boat Building Competition 2024 — engineering the design",
      },
      {
        src: "/Boat%20Building%20Competition/Competition_1/6.jpeg",
        alt: "Boat Building Competition 2024 — launch day",
      },
      {
        src: "/Boat%20Building%20Competition/Competition_1/7.jpeg",
        alt: "Boat Building Competition 2024 — on the water",
      },
      {
        src: "/Boat%20Building%20Competition/Competition_1/8.jpeg",
        alt: "Boat Building Competition 2024 — competition moment",
      },
      {
        src: "/Boat%20Building%20Competition/Competition_1/9.jpeg",
        alt: "Boat Building Competition 2024 — the finished boats",
      },
    ],
  },
];

const highlights = [
  "Design, engineer and build — start to finish",
  "Styrofoam boat challenge on campus",
  "Teamwork under real constraints and deadlines",
];

export const Route = createFileRoute("/competitions/boat-building")({
  head: () => ({
    meta: [
      { title: "Boat Building Competition — NSME" },
      {
        name: "description",
        content:
          "NSME's internal Boat Building Competition — students design, engineer and build styrofoam boats from concept to launch.",
      },
    ],
  }),
  component: BoatBuildingPage,
});

function BoatBuildingPage() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, closeLightbox]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <main>
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="relative min-h-[70vh] flex items-end overflow-hidden pt-28">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url("${HERO_IMAGE}")` }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-sea-deep/80 via-sea-deep/55 to-sea-deep/40"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-grid opacity-20 pointer-events-none"
            aria-hidden="true"
          />

          <div className="container relative mx-auto px-4 sm:px-6 pb-16 sm:pb-20 w-full">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Link
                to="/"
                hash="competitions"
                className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors mb-8"
              >
                <ArrowLeft className="h-4 w-4" /> Back to Competitions
              </Link>

              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="px-3 py-1 rounded-full glass text-[11px] uppercase tracking-[0.2em] text-black">
                  Boat Building
                </span>
                <span className="px-3 py-1 rounded-full glass text-[11px] uppercase tracking-[0.2em] text-black">
                  NUST PNEC
                </span>
              </div>

              <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-7xl leading-[1.05] max-w-4xl text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.7),0_0_40px_rgba(0,40,80,0.5)]">
                Boat Building <span className="text-white">Competition</span>
              </h1>
              <p className="mt-6 max-w-2xl text-white/85 text-base sm:text-lg leading-relaxed [text-shadow:0_1px_12px_rgba(0,0,0,0.6)]">
                NSME's flagship hands-on challenge — students design, engineer and build styrofoam
                boats from first sketch to open water, testing their ideas against real physics and
                the clock.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Overview ─────────────────────────────────────────── */}
        <section className="relative py-20 md:py-24">
          <div
            className="absolute inset-0 gradient-radial pointer-events-none"
            aria-hidden="true"
          />
          <div className="container relative mx-auto px-4 sm:px-6 max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full glass text-xs uppercase tracking-[0.2em] text-cyan-glow mb-5">
                The Build
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-6">
                From Sketch to <span className="text-gradient">Open Water</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                No motors, no shortcuts — just styrofoam, engineering judgement and teamwork.
                Competitors balance buoyancy, stability and speed as they take a boat they built
                with their own hands from the drawing board straight into the water.
              </p>
              <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
                {highlights.map((h) => (
                  <li key={h} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-cyan-glow shrink-0"
                      aria-hidden="true"
                    />
                    {h}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* ── Editions & Galleries ─────────────────────────────── */}
        {editions.map((edition) => (
          <section
            key={edition.year}
            id={`boat-building-${edition.year}`}
            className="relative pb-20 md:pb-28 scroll-mt-24"
          >
            <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className="mb-8 sm:mb-10"
              >
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                  <span className="font-display text-4xl sm:text-5xl font-bold text-gradient leading-none">
                    {edition.year}
                  </span>
                  <span className="px-2.5 py-1 rounded-full border border-sea/30 bg-sea/10 text-sea text-[10px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.2em]">
                    {edition.subtitle}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-2xl sm:text-3xl">{edition.title}</h3>
                <p className="mt-2 text-muted-foreground text-[15px] max-w-2xl">
                  {edition.description}
                </p>
              </motion.div>

              {edition.images.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                  {edition.images.map((img, i) => (
                    <motion.button
                      key={img.src}
                      type="button"
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.5, delay: i * 0.05 }}
                      onClick={() => setLightbox({ src: img.src, alt: img.alt })}
                      className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-border/60 cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-glow/60"
                      aria-label={`View larger: ${img.alt}`}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500"
                        aria-hidden="true"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400">
                        <span className="glass-dark rounded-full p-3 text-white/90 shadow-glow">
                          <ZoomIn className="h-5 w-5" />
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5 }}
                  className="rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-12 text-center"
                >
                  <p className="text-sm text-muted-foreground">
                    Photos from the {edition.year} competition will be added soon.
                  </p>
                </motion.div>
              )}
            </div>
          </section>
        ))}

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="relative py-20 md:py-28 mt-4 border-t border-border/60">
          <div
            className="absolute inset-0 gradient-radial pointer-events-none"
            aria-hidden="true"
          />
          <div className="container relative mx-auto px-4 sm:px-6 text-center max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-5">
                Think you can <span className="text-gradient">build better?</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Join NSME and take on challenges like this — hands-on, team-driven engineering from
                day one.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link to="/register" className="btn">
                  Join NSME
                </Link>
                <Link to="/" hash="competitions" className="btn">
                  <ArrowLeft className="h-4 w-4" /> All Competitions
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ── Lightbox ───────────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 sm:p-8"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label={lightbox.alt}
          >
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-5 right-5 glass-dark rounded-full p-2.5 text-foreground hover:text-cyan-soft transition-colors"
              aria-label="Close image"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.img
              src={lightbox.src}
              alt={lightbox.alt}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-full max-w-full rounded-2xl border border-border/60 object-contain shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
