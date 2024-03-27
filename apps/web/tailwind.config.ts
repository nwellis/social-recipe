import type { Config } from "tailwindcss";
import sharedConfig from "@acme/css-config/tailwind.config";

const fileExtensions = 'html,js,jsx,md,mdx,ts,tsx' as const

const config: Config = {
  presets: [sharedConfig],
  content: [`./src/**/*.{${fileExtensions}}`],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config