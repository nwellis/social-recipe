import type { Config } from "tailwindcss";
import sharedConfig from "@acme/ui/tailwind.config";
import daisyui from 'daisyui';

const fileExtensions = 'html,js,jsx,md,mdx,ts,tsx' as const

const config: Config = {
  presets: [sharedConfig],
  content: [
    './index.html',
    `./src/**/*.{${fileExtensions}}`,
    `../../node_modules/@acme/ui/src/components/**/*.{${fileExtensions}}`,
  ],
  theme: {
    extend: {
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        standard: {
          "primary": "#be123c",
          "secondary": "#155e75",
          "accent": "#155e75",
          "neutral": "#100e01",
          "base-100": "#fffbed",
          "info": "#0369a1",
          "success": "#0f766e",
          "warning": "#facc15",
          "error": "#e11d48",

          "--rounded-box": "1rem", // border radius rounded-box utility class, used in card and other large boxes
          "--rounded-btn": "0.5rem", // border radius rounded-btn utility class, used in buttons and similar element
          "--rounded-badge": "1.9rem", // border radius rounded-badge utility class, used in badges and similar
          "--animation-btn": "0.25s", // duration of animation when you click on button
          "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
          "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
          "--border-btn": "1px", // border width of buttons
          "--tab-border": "1px", // border width of tabs
          "--tab-radius": "0.5rem", // border radius of tabs
        },
      },
    ],
  },
}

export default config