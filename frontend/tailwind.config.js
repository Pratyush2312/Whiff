
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      /* ========================================
         TYPOGRAPHY
         ======================================== */
      fontFamily: {
        body: ["Faculty Glyphic", "serif"],
        sans: ["DM Sans", "sans-serif"],
        serif: ["Playfair Display", "serif"],
        display: ["Playfair Display", "serif"],
      },

      fontSize: {
        hero: ["clamp(2.75rem, 6vw, 5.5rem)", {
          lineHeight: "0.98",
          letterSpacing: "-0.055em",
        }],
      },

      /* ========================================
         WHIFF COLOR SYSTEM
         ======================================== */
      colors: {
        brand: {
          DEFAULT: "#80535B",
          hover: "#684149",
          soft: "#E9D9DA",
          muted: "#B9979D",
        },

        background: "#FAF8F5",

        surface: {
          DEFAULT: "#FFFFFF",
          secondary: "#F1ECE7",
          rose: "#F0E2E2",
          dark: "#211B1A",
        },

        text: {
          primary: "#292321",
          secondary: "#716663",
          muted: "#958984",
          inverse: "#FFFFFF",
        },

        border: {
          DEFAULT: "#E8E0DA",
          strong: "#CFC1B8",
        },

        accent: "#B49A6C",
        success: "#47765A",
        error: "#B34343",
        whatsapp: "#16A34A",
      },

      /* ========================================
         LAYOUT & SPACING
         ======================================== */
      maxWidth: {
        container: "1440px",
      },

      spacing: {
        section: "clamp(4rem, 8vw, 8rem)",
      },

      borderRadius: {
        luxury: "1.25rem",
      },

      /* ========================================
         SHADOWS
         ======================================== */
      boxShadow: {
        card: "0 8px 30px rgb(41 35 33 / 5%)",
        hover: "0 16px 40px rgb(41 35 33 / 10%)",
        nav: "0 2px 16px rgb(41 35 33 / 4%)",
      },

      /* ========================================
         TRANSITIONS
         ======================================== */
      transitionDuration: {
        fast: "180ms",
        normal: "300ms",
        slow: "600ms",
      },

      transitionTimingFunction: {
        luxury: "cubic-bezier(0.22, 1, 0.36, 1)",
      },

      /* ========================================
         ANIMATIONS — PRESERVED
         ======================================== */
      keyframes: {
        float: {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },

        "fade-up": {
          from: {
            opacity: "0",
            transform: "translateY(24px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },

        "image-reveal": {
          from: {
            opacity: "0",
            transform: "scale(1.06)",
          },
          to: {
            opacity: "1",
            transform: "scale(1)",
          },
        },
      },

      animation: {
        float: "float 6s ease-in-out infinite",
        "fade-up": "fade-up 800ms cubic-bezier(0.22, 1, 0.36, 1) both",
        "image-reveal": "image-reveal 1.2s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },

  plugins: [],
};
