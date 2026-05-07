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
    <footer className="relative border-t border-border mt-10">
      <div className="absolute inset-0 gradient-radial opacity-50 pointer-events-none" />
      <div className="container mx-auto px-6 py-16 relative">
        <div className="grid md:grid-cols-3 gap-10 items-start">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BrandLogo className="h-10 w-10 shadow-sm" />
              <span className="font-display font-bold text-xl">NSME</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              NUST Society of Maritime Engineers — engineering the future of maritime innovation from PNEC.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Location</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              NUST Pakistan Navy Engineering College
              <br />
              PNS Jauhar, Habib Ibrahim Rehmatullah Road
              <br />
              Karachi, Pakistan
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Connect</h4>
            <div className="flex flex-wrap gap-3">
              {socials.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
                  aria-label={label}
                  title={label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-background/40 text-foreground transition-all hover:-translate-y-0.5 hover:border-cyan-glow/40 hover:bg-cyan-glow/10 hover:text-cyan-soft"
                >
                  <Icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()}{' '}
            <Link
              to="/admin"
              className="no-underline hover:no-underline focus:no-underline text-current"
            >
              NUST
            </Link>{' '}
            Society of Maritime Engineers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
