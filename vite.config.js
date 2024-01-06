import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    base: `${loadEnv(mode, process.cwd()).VITE_BASE}`,
    plugins: [vue()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      port: process.env.VITE_PORT,
      proxy: {
        target: process.env.VITE_URL,
        rewrite: (path) => path.replace(/^\/api/, ""),
        // changeOrigin: true,
      },
    },
  });
};
