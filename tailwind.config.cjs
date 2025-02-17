/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "#cccbcd",
        input: "#cccbcd",
        ring: "#e7191f",
        background: "hsl(var(--background))",
        foreground: "#2e3138",
        primary: {
          DEFAULT: "#e7191f",
          foreground: "#f0f5f9",
        },
        secondary: {
          DEFAULT: "#494947",
          foreground: "#f0f5f9",
        },
        destructive: {
          DEFAULT: "#e7191f",
          foreground: "#f0f5f9",
        },
        muted: {
          DEFAULT: "#f0f5f9",
          foreground: "#494947",
        },
        accent: {
          DEFAULT: "#cccbcd",
          foreground: "#2e3138",
        },
        popover: {
          DEFAULT: "#f0f5f9",
          foreground: "#2e3138",
        },
        card: {
          DEFAULT: "#f0f5f9",
          foreground: "#2e3138",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};
