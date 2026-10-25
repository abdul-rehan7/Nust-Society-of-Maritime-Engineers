import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "@tanstack/react-router";
import { BrandLogo } from "@/components/BrandLogo";

const links = [
  { label: "Home", href: "/", section: "#home" },
  { label: "Our Journey", href: "/", section: "#journey" },
  { label: "Competitions", href: "/", section: "#competitions" },
  { label: "Team", href: "/", section: "#team" },
  { label: "Contact", href: "/", section: "#contact" },
  { label: "Join NSME", href: "/register", section: null },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const scrollToSection = (selector: string) => {
    const element = document.querySelector(selector);
    if (!element) return;

    const navOffset = 96;
    const targetTop = element.getBoundingClientRect().top + window.scrollY - navOffset;
    window.scrollTo({ top: Math.max(targetTop, 0), behavior: "smooth" });
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string, section: string | null) => {
    setOpen(false);
    if (section) {
      // If we're on the home page, just scroll to section
      if (location.pathname === "/") {
        requestAnimationFrame(() => scrollToSection(section));
      } else {
        // If we're on another page, navigate home then scroll
        window.location.assign(href + section);
      }
    }
  };

  /* When at the very top on home page (hero), navbar text is white on dark background.
     On other pages or when scrolled, use dark text on light glass. */
  const isHome = location.pathname === "/";
  const atTop = isHome && !scrolled && !open;

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "glass-strong py-3 shadow-sm"
          : isHome
          ? "bg-transparent py-5"
          : "glass-strong py-3 shadow-sm"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 group"
          aria-label="NSME Home"
        >
          <BrandLogo className="h-10 w-10 shadow-sm" />
          <span
            className={`font-display font-bold text-xl tracking-tight transition-colors ${
              atTop ? "text-white" : "text-foreground"
            }`}
          >
            NSME
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={`${link.label}-${link.section ?? link.href}`}
              to={link.href}
              onClick={(e) => {
                if (link.section) {
                  e.preventDefault();
                  handleClick(link.href, link.section);
                }
              }}
              className={`relative px-4 py-2 text-sm font-medium transition-colors group ${
                atTop
                  ? "text-white/75 hover:text-white"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
              <span className="absolute inset-x-4 -bottom-0.5 h-px bg-sea scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>
          ))}
        </nav>

        <button
          className={`md:hidden h-10 w-10 inline-flex items-center justify-center rounded-lg ${
            scrolled || open
              ? "glass text-foreground"
              : isHome
              ? "glass-dark text-white"
              : "glass text-foreground"
          }`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="x"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-5 w-5" />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="h-5 w-5" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden overflow-hidden glass-strong border-t border-border"
          >
            <nav className="container mx-auto px-6 py-4 flex flex-col gap-1">
              {links.map((link, i) => (
                <motion.div
                  key={`${link.label}-${link.section ?? link.href}`}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.href}
                    onClick={(e) => {
                      if (link.section) {
                        e.preventDefault();
                        handleClick(link.href, link.section);
                      }
                      setOpen(false);
                    }}
                    className="block text-left px-4 py-3 rounded-lg text-foreground hover:bg-sea/5 hover:text-sea transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
