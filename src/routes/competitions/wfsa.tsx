import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, Award, ExternalLink, FileText, Trophy, Video, X, ZoomIn } from "lucide-react";

const HERO_IMAGE = "/WFSA%20Ferry%202026/1.jpeg";

type Certificate = {
  title: string;
  file: string;
  type: "image" | "pdf";
};

type Edition = {
  year: string;
  title: string;
  subtitle: string;
  desc: string;
  highlights: string[];
  achievements?: string[];
  details?: string[];
  images: { src: string; alt: string }[];
  video?: string;
  certificates?: Certificate[];
  vesselName?: string;
  route?: string;
  specs?: string[];
  remarks?: string[];
  remarksInDetails?: boolean;
};

const editions: Edition[] = [
  {
    year: "2026",
    title: "WFSA 2025–2026",
    subtitle: "Major International Success",
    vesselName: "Zaferun",
    route: "Niger River – Lokoja Terminal to Onitsha, crossing 4 ports (230 km)",
    desc: "The biggest milestone for NSME came in the 2025–2026 WFSA International Student Maritime Design Competition. After four years of continuous effort, the team achieved major international success.",
    details: [
      "31.5-meter double-decker hybrid catamaran diesel-electric ferry",
      "Designed to carry 200 passengers plus 15 tonnes of market cargo",
      "Covers 230 km at 18–21 knots",
      "Presented at the Ferry Safety and Technology Conference organized by WFSA",
    ],
    highlights: [
      "First Place – Charles R. Cushing Award for Aesthetic Design (out of 18 international teams)",
      "Meritorious Achievement Award for overall quality & engineering effort",
      "Featured on Marine Log (international platform)",
      "Invited to present Zaferun at WFSA Ferry Safety and Technology Conference",
    ],
    achievements: [
      "Charles R. Cushing Award for Aesthetic Design – 1st Place",
      "Meritorious Achievement Award",
      "Featured on Marine Log",
    ],
    specs: [
      "Length: 31.5 m",
      "Type: Double-decker hybrid catamaran diesel-electric",
      "Capacity: 200 passengers + 15 tonnes cargo",
      "Route: Niger River (Lokoja–Onitsha, 230 km)",
      "Speed: 18–21 knots",
      "Features: Waterjets, oily water separator, hybrid materials, solar panels for hotel load, IoT-based monitoring",
    ],
    remarks: [
      "Achievements: First Place in the Charles R. Cushing Award for Aesthetic Design – Out of 18 international teams from different continents, NSME secured first position for the aesthetic quality of its ferry design.",
      "Meritorious Achievement Award – Recognizing the overall quality and engineering efforts of the project according to the given URD.",
      "NSME and NUST – Pakistan Navy Engineering College were featured internationally on the Marine Log global platform, bringing global recognition to our team and the university.",
      "NSME will be presenting Zaferun at an online conference on 7th May 2026 organized by WFSA in front of maritime industry professionals, senior naval architects, and esteemed engineers.",
      "Positive Feedback & Innovations acknowledged by judges: Excellent choice of propulsion system. Waterjets use Oily water separator. Hybrid material use. Solar panels for hotel load. IoT-based systems for better monitoring.",
    ],
    remarksInDetails: true,
    images: [
      { src: "/WFSA%20Ferry%202026/1.jpeg", alt: "WFSA 2025–2026 - Zaferun on display" },
      { src: "/WFSA%20Ferry%202026/2.jpeg", alt: "WFSA 2025–2026 - team at work" },
      { src: "/WFSA%20Ferry%202026/3.jpeg", alt: "WFSA 2025–2026 - design presentation" },
      { src: "/WFSA%20Ferry%202026/4.jpeg", alt: "WFSA 2025–2026 - competition moment" },
    ],
    video: "/WFSA%20Ferry%202026/video.mp4",
    certificates: [
      {
        title: "Charles R. Cushing Award — First Place, Aesthetic Design",
        file: "/WFSA%20Ferry%202026/certificate_1.png",
        type: "image",
      },
      {
        title: "Meritorious Achievement Award",
        file: "/WFSA%20Ferry%202026/certificate_2.png",
        type: "image",
      },
    ],
  },
  {
    year: "2025",
    title: "WFSA 2025",
    subtitle: "Third International Competition",
    vesselName: "E-Blue Ferry",
    route: "Lagos State, Nigeria – Ikorodu to CMS Terminal (23 km)",
    desc: "NSME continued to grow and participated in the WFSA competition with the E-Blue Ferry, a 32-meter fully electric catamaran ferry designed for operation in Lagos State, Nigeria.",
    details: [
      "32-meter fully electric catamaran ferry",
      "Carries 200 passengers",
      "Route: Ikorodu to CMS Terminal, Lagos, Nigeria (23 km)",
      "Speed: 17–22 knots",
      "Equipped with all necessary safety equipment in compliance with international maritime standards",
    ],
    highlights: ["Won the 'Significant Achievement' Award"],
    achievements: ["Significant Achievement Award"],
    specs: [
      "Length: 32 m",
      "Type: Fully electric catamaran",
      "Capacity: 200 passengers",
      "Route: Ikorodu–CMS Terminal, Lagos (23 km)",
      "Speed: 17–22 knots",
    ],
    remarks: [
      "The team won the 'Significant Achievement' award.",
      "Positive feedback received from the judging panel.",
    ],
    remarksInDetails: true,
    images: [
      { src: "/WFSA%20Ferry%202025/1.jpeg", alt: "WFSA 2025 - E-Blue Ferry on display" },
      { src: "/WFSA%20Ferry%202025/2.jpeg", alt: "WFSA 2025 - E-Blue Ferry design" },
      { src: "/WFSA%20Ferry%202025/3.jpeg", alt: "WFSA 2025 - E-Blue Ferry profile" },
      { src: "/WFSA%20Ferry%202025/4.jpeg", alt: "WFSA 2025 - E-Blue Ferry systems" },
      { src: "/WFSA%20Ferry%202025/5.jpeg", alt: "WFSA 2025 - E-Blue Ferry presentation" },
    ],
    certificates: [
      {
        title: "Significant Achievement Award — Signed Certificate",
        file: "/WFSA%20Ferry%202025/certificate_1.png",
        type: "image",
      },
    ],
  },
  {
    year: "2023",
    title: "WFSA 2023",
    subtitle: "Second International Competition",
    desc: "NSME participated again with a fully electric ROPAX ferry design for the Pasig River in the Philippines, carrying 100 passengers and 50 bicycles. Improved design significantly.",
    details: [
      "Fully electric ROPAX ferry for Pasig River, Philippines",
      "Capacity: 100 passengers and 50 bicycles",
    ],
    highlights: [
      "NUST High Achievers Awards for representing NUST globally",
      "Judges impressed by submission",
    ],
    achievements: ["NUST High Achievers Awards"],
    remarks: [
      "The submission truly impressed the judges.",
      "The team members received the NUST High Achievers Awards for participating in an international engineering competition and representing NUST globally.",
      "This recognition was a commendable milestone for the society and further motivated the team.",
    ],
    images: [
      { src: "/WFSA%20Ferry%202023/1.jpeg", alt: "WFSA 2023 — ferry design" },
      { src: "/WFSA%20Ferry%202023/2.jpeg", alt: "WFSA 2023 — team at work" },
      { src: "/WFSA%20Ferry%202023/3.jpeg", alt: "WFSA 2023 — design presentation" },
      { src: "/WFSA%20Ferry%202023/4.jpeg", alt: "WFSA 2023 — competition moment" },
      { src: "/WFSA%20Ferry%202023/5.jpeg", alt: "WFSA 2023 — project showcase" },
    ],
    certificates: [
      {
        title: "WFSA 2023 — Participation Certificate",
        file: "/WFSA%20Ferry%202023/certificate_wfsa_2023.jpeg",
        type: "image",
      },
    ],
  },
  {
    year: "2022",
    title: "WFSA 2022",
    subtitle: "First International Competition",
    desc: "NSME's first participation in the WFSA International Student Maritime Design Competition. A learning opportunity to understand how international competitions work.",
    highlights: [
      "First participation in WFSA",
      "Received international certificates",
      "Honorable Mention from the judging panel",
      "Constructive feedback for future improvement",
    ],
    achievements: ["Honorable Mention"],
    remarks: [
      'Despite being our first competition, the team received the award of "Honorable Mention" from the judging panel.',
      "Judges provided constructive feedback related to areas of improvement for our design.",
      "Although the team did not secure a top position, they successfully participated and received international certificates.",
    ],
    images: [],
    certificates: [
      {
        title: "WFSA 2022 — Honorable Mention Certificate",
        file: "/WFSA%20Ferry%202022/wfsa_2022_certificate.jpeg",
        type: "image",
      },
    ],
  },
];

function RemarksList({ remarks, className = "" }: { remarks: string[]; className?: string }) {
  return (
    <div className={className}>
      <p className="text-[10px] sm:text-xs uppercase tracking-[0.16em] text-sea/80 mb-2 sm:mb-3">
        Remarks
      </p>
      <ul className="space-y-1.5 sm:space-y-2">
        {remarks.map((remark) => (
          <li
            key={remark}
            className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground"
          >
            <span className="mt-1 sm:mt-1.5 h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-sea flex-shrink-0" />
            <span>{remark}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const Route = createFileRoute("/competitions/wfsa")({
  head: () => ({
    meta: [
      { title: "WFSA International Maritime Design Competition — NSME" },
      {
        name: "description",
        content:
          "NSME at the WFSA International Maritime Design Competition — ferry design campaigns from 2024 and 2026 on the global stage.",
      },
    ],
  }),
  component: WfsaPage,
});

function WfsaPage() {
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
        <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-end overflow-hidden pt-24 sm:pt-28">
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

          <div className="container relative mx-auto px-4 sm:px-6 pb-10 sm:pb-16 md:pb-20 w-full">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Link
                to="/"
                hash="competitions"
                className="inline-flex items-center gap-2 text-xs sm:text-sm text-white/80 hover:text-white transition-colors mb-6 sm:mb-8"
              >
                <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Back to Competitions
              </Link>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
                <span className="px-2.5 py-1 rounded-full glass text-[10px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.2em] text-black">
                  International
                </span>
                <span className="px-2.5 py-1 rounded-full glass text-[10px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.2em] text-black">
                  2022 • 2023 • 2025 • 2025–2026
                </span>
              </div>

              <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-7xl leading-[1.08] sm:leading-[1.05] max-w-4xl text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.7),0_0_40px_rgba(0,40,80,0.5)]">
                WFSA International <span className="text-white">Maritime Design</span> Competition
              </h1>
              <p className="mt-4 sm:mt-6 max-w-2xl text-white/85 text-sm sm:text-base md:text-lg leading-relaxed [text-shadow:0_1px_12px_rgba(0,0,0,0.6)]">
                The global ferry design arena where NSME has represented NUST, conceptualising,
                engineering and defending next-generation ferry designs before an international
                jury.
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
                The Journey
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-6">
                A Legacy of <span className="text-gradient">Excellence</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                From first participation in 2022 to major international triumph in 2025–2026, NSME
                has grown through the WFSA International Student Maritime Design Competition,
                representing Pakistan on the global stage with each passing year.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Editions ─────────────────────────────────────────── */}
        {editions.map((edition) => (
          <section
            key={edition.year}
            id={`wfsa-${edition.year}`}
            className="relative py-12 sm:py-16 md:py-24"
          >
            <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 sm:gap-6 mb-6 sm:mb-8"
              >
                <div className="max-w-3xl">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <span className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-gradient leading-none">
                      {edition.year}
                    </span>
                    <span className="px-2.5 py-1 rounded-full border border-sea/30 bg-sea/10 text-sea text-[10px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.2em]">
                      WFSA
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-xl sm:text-2xl lg:text-4xl leading-tight">
                    {edition.title}
                    {edition.vesselName && (
                      <span className="text-gradient"> · {edition.vesselName}</span>
                    )}
                  </h3>
                  <p className="mt-1.5 sm:mt-2 text-sm sm:text-base text-muted-foreground">
                    {edition.subtitle}
                  </p>
                  {edition.route && (
                    <p className="mt-1 text-xs sm:text-sm text-sea/80">{edition.route}</p>
                  )}
                </div>
                {edition.achievements && edition.achievements.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 lg:justify-end">
                    {edition.achievements.map((ach) => (
                      <span
                        key={ach}
                        className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-700 text-xs sm:text-sm font-medium"
                      >
                        <Trophy className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        {ach}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>

              <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-4 sm:gap-6 mb-6 sm:mb-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8"
                >
                  <p className="text-foreground leading-relaxed text-sm sm:text-[15px] lg:text-base mb-3 sm:mb-4">
                    {edition.desc}
                  </p>
                  {edition.details && edition.details.length > 0 && (
                    <ul className="space-y-1.5 sm:space-y-2">
                      {edition.details.map((detail) => (
                        <li
                          key={detail}
                          className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground"
                        >
                          <span className="mt-1 sm:mt-1.5 h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-sea flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {edition.remarks && edition.remarks.length > 0 && edition.remarksInDetails && (
                    <RemarksList remarks={edition.remarks} className="mt-4 sm:mt-5" />
                  )}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8"
                >
                  <p className="text-[10px] sm:text-xs uppercase tracking-[0.16em] text-sea/80 mb-2 sm:mb-3">
                    Highlights
                  </p>
                  <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-5">
                    {edition.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2 text-xs sm:text-sm text-foreground"
                      >
                        <span className="mt-1 sm:mt-1.5 h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-sea flex-shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  {edition.specs && edition.specs.length > 0 && (
                    <>
                      <p className="text-[10px] sm:text-xs uppercase tracking-[0.16em] text-sea/80 mb-2 sm:mb-3">
                        Specifications
                      </p>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5">
                        {edition.specs.map((spec) => (
                          <span
                            key={spec}
                            className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg border border-border bg-muted/40 text-[10px] sm:text-xs text-foreground"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                  {edition.remarks && edition.remarks.length > 0 && !edition.remarksInDetails && (
                    <RemarksList remarks={edition.remarks} />
                  )}
                </motion.div>
              </div>

              {edition.certificates && edition.certificates.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6 }}
                  className="mb-6 sm:mb-10"
                >
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <Award className="h-5 w-5 text-sea" />
                    <h4 className="font-display font-semibold text-lg sm:text-xl">Certificates</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
                    {edition.certificates.map((cert, i) =>
                      cert.type === "image" ? (
                        <motion.button
                          key={cert.file}
                          type="button"
                          initial={{ opacity: 0, scale: 0.97 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true, margin: "-40px" }}
                          transition={{ duration: 0.5, delay: i * 0.06 }}
                          onClick={() => setLightbox({ src: cert.file, alt: cert.title })}
                          className="group relative overflow-hidden rounded-xl border border-border/60 bg-white text-left cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sea/60"
                          aria-label={`View certificate: ${cert.title}`}
                        >
                          <div className="relative aspect-[4/3]">
                            <img
                              src={cert.file}
                              alt={cert.title}
                              loading="lazy"
                              className="absolute inset-0 h-full w-full object-contain p-2 transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-sea-deep/10">
                              <span className="glass-dark rounded-full p-2.5 text-white/90">
                                <ZoomIn className="h-4 w-4" />
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 border-t border-border/60 px-3 py-2.5 bg-muted/30">
                            <Award className="h-4 w-4 shrink-0 text-sea" />
                            <span className="text-xs sm:text-sm font-medium text-foreground line-clamp-2">
                              {cert.title}
                            </span>
                          </div>
                        </motion.button>
                      ) : (
                        <motion.a
                          key={cert.file}
                          href={cert.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, scale: 0.97 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true, margin: "-40px" }}
                          transition={{ duration: 0.5, delay: i * 0.06 }}
                          className="group relative overflow-hidden rounded-xl border border-border/60 bg-card text-left transition-colors hover:border-sea/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sea/60"
                          aria-label={`Open certificate PDF: ${cert.title}`}
                        >
                          <div className="relative aspect-[4/3] flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-sea/10 via-transparent to-sea-light/10">
                            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-sea/25 bg-white/70 text-sea shadow-sm">
                              <FileText className="h-7 w-7" />
                            </span>
                            <span className="text-[10px] uppercase tracking-[0.18em] text-sea/80">
                              PDF Certificate
                            </span>
                          </div>
                          <div className="flex items-center gap-2 border-t border-border/60 px-3 py-2.5 bg-muted/30">
                            <Award className="h-4 w-4 shrink-0 text-sea" />
                            <span className="text-xs sm:text-sm font-medium text-foreground line-clamp-2 flex-1">
                              {cert.title}
                            </span>
                            <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-sea transition-colors" />
                          </div>
                        </motion.a>
                      ),
                    )}
                  </div>
                </motion.div>
              )}

              {edition.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-2.5 auto-rows-[110px] sm:auto-rows-[140px] lg:auto-rows-[160px]">
                  {edition.images.slice(0, 5).map((img, i) => {
                    const isLarge = i === 0;
                    return (
                      <motion.button
                        key={img.src}
                        type="button"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.5, delay: i * 0.06 }}
                        onClick={() => setLightbox({ src: img.src, alt: img.alt })}
                        className={`group relative overflow-hidden rounded-md sm:rounded-lg border border-border/60 cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sea/60 ${isLarge ? "col-span-2 row-span-2" : i === 3 ? "md:col-span-2" : ""}`}
                        aria-label={`View larger: ${img.alt}`}
                      >
                        <img
                          src={img.src}
                          alt={img.alt}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                        <div
                          className="absolute inset-0 bg-gradient-to-t from-sea-deep/70 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500"
                          aria-hidden="true"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400">
                          <span className="glass-dark rounded-full p-3 text-white/90 shadow-glow">
                            <ZoomIn className="h-5 w-5" />
                          </span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              )}

              {edition.video && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6 }}
                  className="mt-6 sm:mt-10"
                >
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <Video className="h-5 w-5 text-sea" />
                    <h4 className="font-display font-semibold text-lg sm:text-xl">
                      Ferry Showcase
                    </h4>
                  </div>
                  <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-border/60 bg-black shadow-card">
                    <video
                      src={edition.video}
                      poster="/WFSA%20Ferry%202026/1.jpeg"
                      className="w-full aspect-video object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      controls
                      aria-label={`${edition.title} — ferry showcase video`}
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </section>
        ))}

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="relative py-14 sm:py-20 md:py-28 mt-2 sm:mt-4">
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
              <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-5">
                Want to be part of the <span className="text-gradient">next chapter?</span>
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg mb-6 sm:mb-8">
                Join NSME and help carry the maritime engineering legacy onto bigger international
                stages.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                <Link to="/register" className="btn text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3">
                  Join NSME
                </Link>
                <Link
                  to="/"
                  hash="competitions"
                  className="btn text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
                >
                  <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> All Competitions
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
