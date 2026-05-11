/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Phase 3: these will be overridden by values fetched from the API
      colors: {
        primary: "var(--color-primary, #0ea5e9)",
        secondary: "var(--color-secondary, #64748b)",
        accent: "var(--color-accent, #f59e0b)",
      },
      fontFamily: {
        // Phase 3: loaded dynamically from SiteConfig
        site: ["var(--font-site, 'Noto Sans')", "sans-serif"],
      },
    },
  },
  plugins: [],
};
