/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#E86A12",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#F4A261",
          foreground: "#1A1A1A",
        },
        background: "#FAFAFA",
        foreground: "#1A1A1A",
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#1A1A1A",
        },
        muted: {
          DEFAULT: "#F5F5F5",
          foreground: "#737373",
        },
        accent: {
          DEFAULT: "#FFE4D6",
          foreground: "#E86A12",
        },
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#FFFFFF",
        },
        border: "#E5E5E5",
        input: "#E5E5E5",
        ring: "#E86A12",
      },
      borderRadius: {
        soft: 16,
        "soft-lg": 24,
        "soft-xl": 32,
      },
      fontFamily: {
        sans: ["Inter", "System"],
      },
    },
  },
  plugins: [],
};
