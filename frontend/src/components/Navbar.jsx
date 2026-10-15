import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, useReducedMotion } from "framer-motion";
import {
  IoPersonOutline,
  IoHeartOutline,
  IoCartOutline,
  IoArrowForwardOutline,
} from "react-icons/io5";
import { toast } from "react-hot-toast";
import logo from "../assets/logo.png";

const URL = import.meta.env.VITE_BACKEND_URL;

const navItems = [
  { label: "Wishlist", icon: IoHeartOutline, path: "/wishlist" },
  { label: "Cart", icon: IoCartOutline, path: "/cart" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const [checkingAccount, setCheckingAccount] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Update the visual state without adding a scroll listener.
  // The header uses CSS styling until we explicitly wire scroll state.
  const handleAccountClick = async () => {
    if (checkingAccount) return;

    setCheckingAccount(true);

    try {
      const res = await fetch(`${URL}/account/me`, {
        credentials: "include",
      });

      if (res.ok) {
        navigate("/account");
      } else if (res.status === 401) {
        navigate("/account/auth");
      } else {
        toast.error("Unable to verify your account. Please try again.");
      }
    } catch (error) {
      console.error("Account check failed:", error);
      toast.error("Unable to connect. Please try again.");
    } finally {
      setCheckingAccount(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full text-text-primary">
      {/* Announcement strip */}
      <div className="relative flex min-h-8 items-center justify-center bg-surface-dark px-4 py-2 text-center text-[9px] uppercase tracking-[0.18em] text-text-inverse sm:text-[10px]">
        <a
          href="https://chat.whatsapp.com/FoJVrMNdgdC4zhRPM0Cdfd"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 transition-colors duration-300 hover:text-brand-muted">
          <span>Have a question? Connect with us</span>
          <IoArrowForwardOutline
            className="transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </a>
      </div>

      {/* Main navigation */}
      <nav
        aria-label="Main navigation"
        className="border-b border-border/70 bg-background/90 shadow-nav backdrop-blur-xl">
        <div className="mx-auto flex h-[68px] max-w-[1600px] items-center justify-between px-5 sm:h-[76px] sm:px-8 lg:px-12">
          {/* Brand */}
          <button
            type="button"
            aria-label="Whiff home"
            onClick={() => navigate("/")}
            className="group relative shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
            <motion.img
              src={logo}
              alt="Whiff"
              initial={false}
              whileHover={shouldReduceMotion ? undefined : { scale: 1.035 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="h-auto w-[66px] sm:w-[76px]"
            />
          </button>

          {/* Navigation actions */}
          <div className="flex items-center gap-1 sm:gap-3">
            <motion.button
              type="button"
              whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
              onClick={handleAccountClick}
              disabled={checkingAccount}
              aria-label={checkingAccount ? "Checking account" : "Account"}
              className="group inline-flex min-h-10 items-center gap-2 rounded-full px-2.5 text-text-primary transition-colors duration-300 hover:bg-surface-secondary hover:text-brand disabled:cursor-wait disabled:opacity-60 sm:px-3">
              <IoPersonOutline
                className="text-[19px] transition-transform duration-300 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
              <span className="hidden text-xs sm:inline">
                {checkingAccount ? "Checking..." : "Account"}
              </span>
            </motion.button>

            {navItems.map(({ label, icon: Icon, path }) => (
              <motion.button
                key={label}
                type="button"
                whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
                onClick={() => navigate(path)}
                aria-label={label}
                className="group inline-flex min-h-10 items-center gap-2 rounded-full px-2.5 text-text-primary transition-colors duration-300 hover:bg-surface-secondary hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:px-3">
                <Icon
                  className="text-[19px] transition-transform duration-300 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
                <span className="hidden text-xs sm:inline">{label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
