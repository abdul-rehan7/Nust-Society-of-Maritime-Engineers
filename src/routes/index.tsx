import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Journey } from "@/components/Journey";
import { Competitions } from "@/components/Competitions";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { WaveDivider } from "@/components/WaveDivider";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NSME — NUST Society of Maritime Engineers" },
      {
        name: "description",
        content:
          "NUST Society of Maritime Engineers (NSME) at PNEC — engineering the future of maritime innovation through international competitions, ROV projects, and naval design.",
      },
      { property: "og:title", content: "NSME — NUST Society of Maritime Engineers" },
      {
        property: "og:description",
        content: "Engineering the Future of Maritime Innovation — NUST PNEC's premier maritime engineering society.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <WaveDivider />
        <Journey />
        <WaveDivider flip />
        <Competitions />
      </main>
      <Footer />
    </div>
  );
}
