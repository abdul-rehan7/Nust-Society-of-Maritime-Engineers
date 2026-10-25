import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { Journey } from "@/components/Journey";
import { Competitions } from "@/components/Competitions";
import { Achievements } from "@/components/Achievements";
import { Team } from "@/components/Team";
import { ContactForm } from "@/components/ContactForm";
import { ScrollProgress } from "@/components/ScrollProgress";
import { WaveDivider } from "@/components/WaveDivider";

export const Route = createFileRoute("/")({"head": () => ({
    meta: [
      { title: "NSME | NUST Society of Maritime Engineers" },
      {
        name: "description",
        content:
          "NUST Society of Maritime Engineers (NSME) at PNEC — engineering the future of maritime innovation through international competitions, ROV projects, and naval design.",
      },
      { property: "og:title", content: "NSME | NUST Society of Maritime Engineers" },
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
      <main>
        <Hero />
        {/* white ▸ sea-blue Journey section */}
        <WaveDivider variant="to-sea" />
        <Journey />
        {/* sea-blue ▸ white Competitions section */}
        <WaveDivider variant="from-sea" flip />
        <Competitions />
        {/* white ▸ white Achievements section */}
        <WaveDivider variant="to-pale" />
        <Achievements />
        {/* pale-blue ▸ pale-blue Team section */}
        <WaveDivider variant="from-pale" flip />
        <Team />
        {/* pale-blue ▸ white Contact section */}
        <WaveDivider variant="to-sea-foam" />
        <ContactForm id="contact" />
      </main>
    </div>
  );
}
