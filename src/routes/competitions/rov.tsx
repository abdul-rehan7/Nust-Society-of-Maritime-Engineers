import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, X, ZoomIn } from "lucide-react";

const HERO_IMAGE = "/Pipe%20ROV/1.jpeg";

const images: { src: string; alt: string }[] = [
  { src: "/Pipe%20ROV/1.jpeg", alt: "Pipe ROV — the vehicle on display" },
  { src: "/Pipe%20ROV/2.jpeg", alt: "Pipe ROV — engineering the build" },
  { src: "/Pipe%20ROV/3.jpeg", alt: "Pipe ROV — systems and wiring" },
  { src: "/Pipe%20ROV/4.jpeg", alt: "Pipe ROV — underwater demonstration" },
  { src: "/Pipe%20ROV/5.jpeg", alt: "Pipe ROV — project showcase" },
];

const highlights = [
  "Presented at IDEAS 2024",
  "Real-world underwater engineering",
  "Designed, built and piloted by students",
];

export const Route = createFileRoute("/competitions/rov")({
  head: () => ({
    meta: [
      { title: "ROV Project Showcase — NSME" },
      {
        name: "description",
        content:
          "NSME's Remotely Operated Vehicle — an underwater engineering project presented at IDEAS 2024.",
      },
    ],
  }),
  component: RovPage,
});

function RovPage() {
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
                  ROV Project
                </span>
                <span className="px-3 py-1 rounded-full glass text-[11px] uppercase tracking-[0.2em] text-black">
                  IDEAS 2024
                </span>
              </div>

              <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-7xl leading-[1.05] max-w-4xl text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.7),0_0_40px_rgba(0,40,80,0.5)]">
                ROV Project <span className="text-white">Showcase</span>
              </h1>
              <p className="mt-6 max-w-2xl text-white/85 text-base sm:text-lg leading-relaxed [text-shadow:0_1px_12px_rgba(0,0,0,0.6)]">
                A Remotely Operated Vehicle built by NSME members — designed, wired and piloted by
                students to demonstrate real-world underwater engineering capabilities.
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
                The Project
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-6">
                Engineering <span className="text-gradient">Below the Surface</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                From chassis layout to thruster control and waterproofing, the ROV project brings
                together mechanical design, electronics and software into one working underwater
                vehicle — culminating in a live showcase at IDEAS 2024.
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

        {/* ── Gallery ──────────────────────────────────────────── */}
        <section className="relative pb-20 md:pb-28">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <h3 className="font-display font-semibold text-2xl sm:text-3xl">
                Moments from the Project
              </h3>
              <p className="mt-2 text-muted-foreground text-[15px]">
                A look at the build, the systems and the showcase.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {images.map((img, i) => (
                <motion.button
                  key={img.src}
                  type="button"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
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
          </div>
        </section>

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
                Want to build things that <span className="text-gradient">dive deep?</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Join NSME and work on real engineering projects — from ROVs to international design
                competitions.
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
