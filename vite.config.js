import alias from "@rollup/plugin-alias";

import react from "@vitejs/plugin-react";

import { defineConfig } from "vite";

import { resolve } from "path";

const projectRootDir = resolve(__dirname);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    alias({
      entries: [
        {
          find: "@",
          replacement: resolve(projectRootDir, "src"),
        },
      ],
    }),
  ],
});
