// tailwind.config.js
const { heroui } = require("@heroui/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      "./node_modules/@heroui/theme/dist/components/divider.js",
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}",
   ],
   theme: {
      extend: {
         animation: {
            "fade-in": "fadeIn 0.5s ease-in-out",
            "fade-in-up": "fadeInUp 0.7s ease-out forwards",
            pulse: "pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            shimmer: "shimmer 2s infinite linear",
         },
         keyframes: {
            fadeIn: {
               "0%": { opacity: "0" },
               "100%": { opacity: "1" },
            },
            fadeInUp: {
               "0%": { opacity: "0", transform: "translateY(20px)" },
               "100%": { opacity: "1", transform: "translateY(0)" },
            },
            pulse: {
               "0%, 100%": { opacity: "1" },
               "50%": { opacity: "0.5" },
            },
            shimmer: {
               "0%": { backgroundPosition: "-200% 0" },
               "100%": { backgroundPosition: "200% 0" },
            },
         },
      },
   },
   darkMode: "class",
   plugins: [heroui()],
};
