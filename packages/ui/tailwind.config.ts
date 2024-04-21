import type { Config } from "tailwindcss";
import sharedConfig from "@acme/css-config/tailwind.config.js";
import daisyui from 'daisyui';

const fileExtensions = 'html,js,jsx,md,mdx,ts,tsx' as const

const config: Config = {
  presets: [sharedConfig],
  content: [
    `./src/components/**/*.{${fileExtensions}}`
  ],
  theme: {
    extend: {
    },
  },
  plugins: [daisyui],
}

export default config