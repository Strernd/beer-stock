import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
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
        "srm-1": "#FFE699",
        "srm-2": "#FFD878",
        "srm-3": "#FFCA5A",
        "srm-4": "#FFBF42",
        "srm-5": "#FBB123",
        "srm-6": "#F8A600",
        "srm-7": "#F39C00",
        "srm-8": "#EA8F00",
        "srm-9": "#E58500",
        "srm-10": "#DE7C00",
        "srm-11": "#D77200",
        "srm-12": "#CF6900",
        "srm-13": "#CB6200",
        "srm-14": "#C35900",
        "srm-15": "#BB5100",
        "srm-16": "#B54C00",
        "srm-17": "#B04500",
        "srm-18": "#A63E00",
        "srm-19": "#A13700",
        "srm-20": "#9B3200",
        "srm-21": "#952D00",
        "srm-22": "#8E2900",
        "srm-23": "#882300",
        "srm-24": "#821E00",
        "srm-25": "#7B1A00",
        "srm-26": "#771900",
        "srm-27": "#701400",
        "srm-28": "#6A0E00",
        "srm-29": "#660D00",
        "srm-30": "#5E0B00",
        "srm-31": "#5A0A02",
        "srm-32": "#600903",
        "srm-33": "#520907",
        "srm-34": "#4C0505",
        "srm-35": "#470606",
        "srm-36": "#440607",
        "srm-37": "#3F0708",
        "srm-38": "#3B0607",
        "srm-39": "#3A070B",
        "srm-40": "#36080A",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
