import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Users, Anchor, ArrowRight } from "lucide-react";
import { RegisterForm } from "@/components/RegisterForm";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [{ title: "Join NSME — Registration" }],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <main>
        <section className="relative py-20 sm:py-32 overflow-hidden pt-32 sm:pt-40">
          {/* Background effects */}
          <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
          
          <div className="container relative mx-auto px-4 sm:px-6 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full max-w-3xl text-center"
            >
              {/* Main heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6 }}
                className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.1] mb-6"
              >
                Join <span className="text-gradient">NSME</span>
              </motion.h1>

              {/* Subheading */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-lg sm:text-xl text-muted-foreground mx-auto mb-8"
              >
                Apply to become part of NUST's premier maritime engineering society. Work on cutting-edge ROV projects, compete internationally, and shape the future of naval innovation.
              </motion.p>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6 }}
                className="flex flex-wrap justify-center gap-4 sm:gap-6"
              >
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                    <Users className="h-4 w-4" />
                  </div>
                  <span>Multiple teams</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-glow/20 text-cyan-soft">
                    <Anchor className="h-4 w-4" />
                  </div>
                  <span>Maritime focus</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-500/20 text-violet-400">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                  <span>Fast application</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
        <RegisterForm />
      </main>
    </div>
  );
}
