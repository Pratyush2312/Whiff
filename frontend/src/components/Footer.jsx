import { useNavigate } from "react-router";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const shopLinks = [
  { label: "Perfumes", path: "/shop" },
  { label: "Signature Combos", path: "/combos" },
];

const policyLinks = [
  { label: "Privacy Policy", path: "/privacy-policy" },
  { label: "Terms & Conditions", path: "/terms" },
  { label: "Refund Policy", path: "/refund-policy" },
  { label: "Contact Us", path: "/contact" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/whiffperfumeco",
    Icon: FaInstagram,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    Icon: FaFacebook,
  },
];

const Footer = () => {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <footer className="relative overflow-hidden bg-surface-dark px-6 pb-7 pt-16 text-text-inverse sm:px-10 sm:pt-20 lg:px-16 lg:pt-24">
      <div className="mx-auto max-w-[1440px]">
        {/* Closing brand statement */}
        <div className="relative overflow-hidden border-b border-white/15 pb-14 sm:pb-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full border border-white/[0.07] sm:right-8 sm:-top-32 sm:h-96 sm:w-96"
          />

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-10">
            <p className="mb-6 flex items-center gap-3 text-[9px] uppercase tracking-[0.28em] text-brand-muted sm:text-[10px]">
              <span className="h-px w-8 bg-brand-muted" />
              Until the next impression
            </p>

            <p className="max-w-5xl font-serif text-[clamp(2.7rem,7.5vw,6.8rem)] font-normal leading-[0.96] tracking-[-0.055em]">
              Leave a little
              <br />
              <span className="italic text-[#D5B5BA]">of yourself behind.</span>
            </p>

            <button
              type="button"
              onClick={() => navigate("/shop")}
              className="group mt-8 inline-flex min-h-12 items-center gap-5 border-b border-brand-muted pb-3 text-[10px] font-medium uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:text-[#D5B5BA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
              Find your signature scent
              <ArrowUpRight
                size={17}
                strokeWidth={1.4}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                aria-hidden="true"
              />
            </button>
          </motion.div>
        </div>

        {/* Footer navigation */}
        <div className="grid grid-cols-1 gap-12 py-14 sm:grid-cols-2 sm:py-16 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1.1fr] lg:gap-12 lg:py-20">
          {/* Brand */}
          <div className="max-w-sm">
            <button
              type="button"
              onClick={() => navigate("/")}
              aria-label="Whiff home"
              className="group text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
              <span className="font-serif text-3xl tracking-[0.18em] transition-colors duration-300 group-hover:text-[#D5B5BA]">
                WHIFF<span className="text-brand-muted">.</span>
              </span>
            </button>

            <p className="mt-5 max-w-xs text-sm leading-7 text-white/60">
              Thoughtfully crafted fragrances for everyday luxury. Find the
              scent that feels unmistakably you.
            </p>

            <p className="mt-6 text-[9px] uppercase tracking-[0.22em] text-brand-muted">
              More than a fragrance. A feeling.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="mb-6 text-[9px] font-semibold uppercase tracking-[0.24em] text-white/45">
              Explore
            </h3>

            <ul className="space-y-4">
              {shopLinks.map((link) => (
                <li key={link.path}>
                  <button
                    type="button"
                    onClick={() => navigate(link.path)}
                    className="group inline-flex items-center gap-2 text-sm text-white/70 transition-colors duration-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                    {link.label}
                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-6 text-[9px] font-semibold uppercase tracking-[0.24em] text-white/45">
              Follow along
            </h3>

            <p className="mb-5 max-w-[220px] text-sm leading-6 text-white/55">
              Discover our world of fragrance, rituals and inspiration.
            </p>

            <div className="flex gap-3">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit Whiff on ${label}`}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-lg text-white/70 transition-all duration-300 hover:border-brand-muted hover:bg-brand hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                  <Icon aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 text-[9px] font-semibold uppercase tracking-[0.24em] text-white/45">
              Get in touch
            </h3>

            <div className="space-y-5 text-sm leading-6 text-white/65">
              <div>
                <p className="mb-1 text-[10px] uppercase tracking-[0.15em] text-white/35">
                  Email
                </p>
                <a
                  href="mailto:whiffperfumeco@gmail.com"
                  className="break-words transition-colors duration-300 hover:text-[#D5B5BA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                  whiffperfumeco@gmail.com
                </a>
              </div>

              <div>
                <p className="mb-1 text-[10px] uppercase tracking-[0.15em] text-white/35">
                  Phone
                </p>
                <a
                  href="tel:+917980715632"
                  className="transition-colors duration-300 hover:text-[#D5B5BA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                  +91 79807 15632
                </a>
              </div>

              <div>
                <p className="mb-1 text-[10px] uppercase tracking-[0.15em] text-white/35">
                  Based in
                </p>
                <p>Kolkata, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Legal and copyright */}
        <div className="flex flex-col gap-7 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="order-2 text-center text-[10px] tracking-wide text-white/40 sm:order-1 sm:text-left">
            © {new Date().getFullYear()} Whiff. All rights reserved.
          </p>

          <nav
            aria-label="Legal and support links"
            className="order-1 flex flex-wrap justify-center gap-x-5 gap-y-3 sm:order-2 sm:justify-end sm:gap-x-6">
            {policyLinks.map((link) => (
              <button
                key={link.path}
                type="button"
                onClick={() => navigate(link.path)}
                className="text-[10px] text-white/50 transition-colors duration-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                {link.label}
              </button>
            ))}
          </nav>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="group mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:border-brand-muted hover:bg-brand hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:order-3 sm:mx-0">
            <ArrowUp
              size={17}
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
