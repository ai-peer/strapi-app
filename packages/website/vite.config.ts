import { defineConfig, loadEnv } from "vite";
import { createViteProxy, getRootPath, getSrcPath, setupVitePlugins, viteDefine } from "./build";
import { getServiceEnvConfig } from "./.env-config";
import path from "path";

export default defineConfig((configEnv) => {
  const viteEnv: any = loadEnv(configEnv.mode, process.cwd()); // as unknown as ImportMetaEnv;

  const rootPath = path.resolve(__dirname);
  const srcPath = path.join(rootPath, "src");
  //console.info("vite env", viteEnv);
  const isOpenProxy = viteEnv.VITE_HTTP_PROXY === "Y";
  const envConfig = getServiceEnvConfig(viteEnv);

  return {
    base: viteEnv.VITE_BASE_URL,
    resolve: {
      alias: {
        "~": rootPath,
        "@": srcPath,
        "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
      },
    },
    define: viteDefine,
    plugins: setupVitePlugins(viteEnv),
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "./src/styles/scss/global.scss" as *;`,
        },
      },
    },
    server: {
      https: false,
      host: "0.0.0.0",
      port: 3200,
      open: false,
      proxy: createViteProxy(isOpenProxy, envConfig),
    },
    optimizeDeps: {
      include: [
        "vue",
        "naive-ui",
        "@antv/data-set",
        "@antv/g2",
        "@better-scroll/core",
        "echarts",
        "swiper",
        "swiper/vue",
        "vditor",
        "wangeditor",
        "xgplayer",
      ],
    },
    build: {
      reportCompressedSize: false,
      sourcemap: false,
      commonjsOptions: {
        ignoreTryCatch: false,
      },
    },
  };
});
