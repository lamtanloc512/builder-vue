import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { vitePluginForArco } from "@arco-plugins/vite-vue";

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1500,
  },
  plugins: [
    vue(),
    vitePluginForArco({
      style: "css",
    }),
  ],
});
