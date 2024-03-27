import type { Config } from "tailwindcss";
import sharedConfig from "@acme/css-config/tailwind.config";
import daisyui from 'daisyui';

const fileExtensions = 'html,js,jsx,md,mdx,ts,tsx' as const

const config: Config = {
  presets: [sharedConfig],
  content: [
    './index.html',
    `./src/**/*.{${fileExtensions}}`
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
        },
      },
    ],
  },
}

export default config