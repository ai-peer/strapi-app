import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
   plugins: [vue()],
   // 起个别名，在引用资源时，可以用‘@/资源路径’直接访问
   resolve: {
      alias: {
         "@": path.resolve(__dirname, "src"),
         "@coms": path.resolve(__dirname, "src/components"),
      },
   },
   // 配置前端服务地址和端口
   server: {
      host: "0.0.0.0",
      port: 8082,
      // 是否开启 https
      https: false,
      proxy: {
         "/api/": {
            target: "http://localhost:80/api",
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ""),
         },
      },
   },
   // 设置反向代理，跨域
});
