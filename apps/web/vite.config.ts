import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import { visualizer } from 'rollup-plugin-visualizer'

const CWD = process.cwd()
const idIncludes = (prefix: string, ...checks: string[]) => {
  const withPrefix = checks.map(check => [prefix, check].filter(Boolean).join("/"))
  return (id: string) => withPrefix.some(check => id.includes(check))
}
const nodeModuleIncludes = (...checks: string[]) => idIncludes("node_modules", ...checks)
const srcIncludes = (...checks: string[]) => idIncludes(`${CWD}/src`, ...checks)

/**
 * I've found that `npm ls --omit=dev react` (replace react with the dep you're tracking) to
 * be very helpful.
 */
const ChunkNameAndCheck: Record<string, (id: string) => boolean> = {
  // Add a trailing slash to match the folder name exactly

  // SRC
  // "local-folder": srcIncludes("local-folder/"),

  // NODE_MODULES
  "vendor-lodash": nodeModuleIncludes("lodash"), // so many modules use lodash, so hold onto this just in case
  "vendor-react-shared": nodeModuleIncludes("react-is/", "ua-parser-js/", "prop-types/", "use-sync-external-store/"), // shared between react vendors, makes them accessible to all
  "vendor-react-core": nodeModuleIncludes("react/", "react-dom/", "scheduler/"),
  "vendor-react-misc": nodeModuleIncludes("react"),
  "vendor-acme": nodeModuleIncludes("@acme"),
  "vendor-tanstack": nodeModuleIncludes("@tanstack"),
  "vendor-icon": nodeModuleIncludes("@fortawesome"),
  "vendor-markdown": nodeModuleIncludes("@mdxeditor", "@lexical", "@mdast-util-to-markdown", "mdx", "mdast", "markdown", "micromark", "lexical"),
  "vendor": nodeModuleIncludes(""),
}
const ManualChunks = Object.entries(ChunkNameAndCheck).map(([name, check]) => ({ name, check }))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    TanStackRouterVite(),
    visualizer(),
  ],
  build: {
    // sourcemap: true, // for debugging
    rollupOptions: {
      output: {
        manualChunks: (id) => ManualChunks.find(({ check }) => check(id))?.name,
      }
    },
  },
  server: {
    cors: false,
    // https://github.com/expressjs/cors#configuration-options
    // cors: {
    //   origin: [
    //     /\.digitaloceanspaces\.com$/
    //   ]
    // }
    proxy: {
      '/s3': {
        target: 'https://nyc3.digitaloceanspaces.com',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/s3/, '')
      }
    },
  },
})

