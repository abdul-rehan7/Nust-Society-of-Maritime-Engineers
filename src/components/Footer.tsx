import { BrandLogo } from "@/components/BrandLogo";
import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";
import { Link } from "@tanstack/react-router";

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/nustsocietyofmaritimeengineers", icon: Instagram },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/nust-society-of-maritime-engineers/", icon: Linkedin },
  { label: "Facebook", href: "https://www.facebook.com/nustsocietyofmaritimeengineers", icon: Facebook },
  { label: "Email", href: "mailto:nsme@pnec.nust.edu.pk", icon: Mail },
];

export function Footer() {
  return (
    <footer className="relative bg-sea-section border-t border-white/10 mt-0">
      {/* Subtle glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, oklch(0.62 0.13 225 / 0.15), transparent 50%)",
        }}
      />
      <div className="container mx-auto px-6 py-16 relative">
        <div className="grid md:grid-cols-3 gap-10 items-start">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BrandLogo className="h-10 w-10 shadow-sm" />
              <span className="font-display font-bold text-xl text-white">NSME</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              NUST Society of Maritime Engineers - engineering the future of maritime innovation from PNEC.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-white">Location</h4>
            <p className="text-white/70 text-sm leading-relaxed">
              NUST Pakistan Navy Engineering College
              <br />
              PNS Jauhar, Habib Ibrahim Rehmatullah Road
              <br />
              Karachi, Pakistan
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-white">Connect</h4>
            <div className="flex flex-wrap gap-3">
              {socials.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
                  aria-label={label}
                  title={label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/8 text-white/80 transition-all hover:-translate-y-0.5 hover:border-sea-light/60 hover:bg-white/15 hover:text-white"
                >
                  <Icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-white/65">
          <p>
            &copy; {new Date().getFullYear()} NUST Society of Maritime Engineers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
