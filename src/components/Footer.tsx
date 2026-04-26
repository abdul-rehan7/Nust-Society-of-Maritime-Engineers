import { Anchor, Facebook, Instagram, Linkedin, Mail, Twitter } from "lucide-react";

const socials = [
  { Icon: Linkedin, href: "#", label: "LinkedIn" },
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Facebook, href: "#", label: "Facebook" },
  { Icon: Twitter, href: "#", label: "Twitter" },
  { Icon: Mail, href: "#", label: "Email" },
];

export function Footer() {
  return (
    <footer id="contact" className="relative border-t border-border mt-10">
      <div className="absolute inset-0 gradient-radial opacity-50 pointer-events-none" />
      <div className="container mx-auto px-6 py-16 relative">
        <div className="grid md:grid-cols-3 gap-10 items-start">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-glow to-navy-light glow-ring">
                <Anchor className="h-5 w-5 text-navy-deep" strokeWidth={2.5} />
              </span>
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
            <div className="flex gap-2">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="h-10 w-10 inline-flex items-center justify-center rounded-lg glass hover:bg-cyan-glow hover:text-navy-deep transition-all hover:scale-110 hover:shadow-glow"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} NUST Society of Maritime Engineers. All rights reserved.</p>
          <p className="text-xs">Crafted with passion for the seas 🌊</p>
        </div>
      </div>
    </footer>
  );
}
