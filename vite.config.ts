import { defineConfig, UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import terser from "@rollup/plugin-terser";
import { resolve } from "node:path";

const lifecycle = process.env.npm_lifecycle_event;

function getConfigs(): UserConfig {
  return lifecycle === "lib"
    ? {
        publicDir: false,
        build: {
          lib: {
            entry: resolve(__dirname, "packages/index.ts"),
            name: "KForm",
            fileName: format => `index.${format}.js`
          },
          rollupOptions: {
            treeshake: true,
            external: ["vue", "element-plus"],
            output: {
              globals: {
                vue: "Vue",
                "element-plus": "ElementPlus"
              },
              exports: "named"
            },
            plugins: [terser({ compress: { drop_console: true } })]
          }
        }
      }
    : ({
        base: "/k-form/",
        build: {
          sourcemap: false,
          chunkSizeWarningLimit: 4000
        }
      } as any);
}

export default defineConfig({
  plugins: [vue()],
  define: { "process.env.NODE_ENV": '"production"' },
  ...getConfigs()
});
