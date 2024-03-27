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
      daisyui: {
        themes: [
          {
            mytheme: {
              "primary": "#be123c",
              "secondary": "#155e75",
              "accent": "#155e75",
              "neutral": "#100e01",
              "base-100": "#fff8d7",
              "info": "#0369a1",
              "success": "#0f766e",
              "warning": "#facc15",
              "error": "#e11d48",
            },
          },
        ],
      },
    },
    plugins: [daisyui],
  }
}

export default config