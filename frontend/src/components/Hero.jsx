
import { useNavigate } from "react-router";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import banner1 from "../assets/banner1.jpg";

const easeLuxury = [0.22, 1, 0.36, 1];

const Hero = () => {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const reveal = (delay = 0) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.9,
            delay,
            ease: easeLuxury,
          },
        };

  const scrollToCollection = () => {
    document
      .getElementById("signature-collection")
      ?.scrollIntoView({
        behavior: shouldReduceMotion ? "auto" : "smooth",
        block: "start",
      });
  };

  return (
    <section
      className="relative isolate min-h-[680px] h-[88svh] max-h-[1000px] w-full overflow-hidden bg-surface-dark text-white"
      aria-labelledby="hero-title"
    >
      {/* Atmospheric background */}
      <motion.img
        src={banner1}
        alt="Whiff fragrance campaign"
        fetchPriority="high"
        initial={shouldReduceMotion ? false : { scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 1.8,
          ease: easeLuxury,
        }}
        className="absolute inset-0 h-full w-full object-cover object-[65%_center]"
      />

      {/* Cinematic color grading */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#211B1A]/85 via-[#211B1A]/45 to-[#211B1A]/10"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#211B1A]/50 via-transparent to-[#211B1A]/15"
      />

      {/* Fine editorial frame */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-4 border border-white/15 sm:inset-6 lg:inset-8"
      />

      {/* Main composition */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1600px] items-center px-8 py-24 sm:px-16 lg:px-24 xl:px-32">
        <div className="w-full max-w-3xl">
          <motion.div {...reveal(0.2)} className="flex items-center gap-4">
            <span className="h-px w-10 bg-brand-muted sm:w-14" />
            <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-white/80 sm:text-xs">
              The art of wearing a memory
            </p>
          </motion.div>

          <motion.h1
            {...reveal(0.38)}
            id="hero-title"
            className="mt-8 font-serif text-[clamp(4rem,10vw,9rem)] font-normal leading-[0.84] tracking-[-0.065em] text-white"
          >
            Wear the
            <br />
            <span className="pl-[0.12em] font-normal italic text-[#E5C7C8]">
              unforgettable.
            </span>
          </motion.h1>

          <motion.p
            {...reveal(0.58)}
            className="mt-8 max-w-md text-sm leading-7 text-white/75 sm:text-base sm:leading-8"
          >
            More than a fragrance. An atmosphere, a feeling, a part of your
            story that stays long after you leave.
          </motion.p>

          <motion.div
            {...reveal(0.76)}
            className="mt-9 flex flex-wrap items-center gap-6"
          >
            <button
              type="button"
              onClick={() => navigate("/shop")}
              className="group inline-flex min-h-14 items-center gap-8 bg-white px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#211B1A] transition-colors duration-300 hover:bg-brand hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Discover your scent
              <ArrowUpRight
                size={17}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                aria-hidden="true"
              />
            </button>

            <button
              type="button"
              onClick={scrollToCollection}
              className="group inline-flex min-h-12 items-center gap-3 text-xs text-white/80 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Explore the story
              <ArrowDown
                size={15}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:translate-y-1"
                aria-hidden="true"
              />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Editorial details */}
      <motion.div
        {...reveal(1)}
        className="absolute bottom-10 left-8 right-8 z-10 flex items-end justify-between sm:left-16 sm:right-16 lg:left-24 lg:right-24 xl:left-32 xl:right-32"
      >
        <div className="hidden sm:block">
          <p className="text-[9px] uppercase tracking-[0.25em] text-white/50">
            Crafted for your presence
          </p>
          <p className="mt-2 text-xs tracking-wide text-white/80">
            A signature, uniquely yours.
          </p>
        </div>

        <button
          type="button"
          onClick={scrollToCollection}
          className="ml-auto flex items-center gap-3 text-[9px] uppercase tracking-[0.24em] text-white/70 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          aria-label="Scroll to signature collection"
        >
          Scroll to discover
          <span className="h-10 w-px bg-white/40" aria-hidden="true" />
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;
