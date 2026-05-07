import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Waves } from "lucide-react";
import { useRef } from "react";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const videoY = useTransform(scrollY, [0, 800], [0, 200]);
  const contentY = useTransform(scrollY, [0, 800], [0, 80]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  const handleExplore = () => {
    document.querySelector("#journey")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      id="home"
      className="relative h-screen min-h-160 w-full overflow-hidden"
    >
      {/* Parallax video background */}
      <motion.div
        style={{ y: videoY }}
        className="absolute inset-0 -top-20 -bottom-20"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        >
          <source
            src="https://videos.pexels.com/video-files/4725965/4725965-hd_1920_1080_25fps.mp4"
            type="video/mp4"
          />
        </video>
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-linear-to-b from-navy-deep/70 via-navy-deep/60 to-navy-deep" />
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 gradient-radial" />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-cyan-glow/60"
            style={{
              left: `${(i * 83) % 100}%`,
              top: `${(i * 47) % 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 4 + (i % 4),
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Foreground content */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
        >
          <Waves className="h-4 w-4 text-cyan-glow" />
          <span className="text-sm text-muted-foreground">
            NUST Pakistan Navy Engineering College
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="font-display font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl max-w-5xl leading-[1.05]"
        >
          NUST Society of{" "}
          <span className="text-gradient">Maritime Engineers</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-muted-foreground mx-auto"
        >
          Engineering the Future of Maritime Innovation
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="mt-12 flex flex-col items-center"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleExplore}
            className="group inline-flex items-center gap-3 rounded-full bg-linear-to-r from-cyan-glow to-cyan-soft px-8 py-4 text-navy-deep font-semibold glow-ring transition-shadow hover:shadow-glow"
          >
            Explore Our Journey
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="h-10 w-6 rounded-full border-2 border-muted-foreground/40 flex justify-center pt-1.5">
            <div className="h-2 w-1 rounded-full bg-cyan-glow" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
