/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}", // importante para Next 13+
  ],
  safelist: ["animate-shimmer", "animate-laserSweep"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["var(--font-roboto)", "sans-serif"],
        geist: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
    },
  },
  plugins: [
    // ativa pseudo-elementos para scrollbars customizados
    require("tailwind-scrollbar")({
      nocompatible: true,
      preferredStrategy: "pseudoelements",
    }),
  ],
};
