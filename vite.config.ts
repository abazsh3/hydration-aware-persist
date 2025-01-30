import path from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "hydration-aware-persist",
      formats: ["es"],
      fileName: (format) => `hydration-aware-persist.${format}.js`,
    },
    rollupOptions: {
      external: ["zustand"],
      output: {
        interop: "auto",
      },
    },
  },
});
