import type { PluginOption } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import unocss from "@unocss/vite";
import progress from "vite-plugin-progress";
//import pageRoute from "@soybeanjs/vite-plugin-vue-page-route";
import pageRoute from "@ai-lion/vite-plugin-vue-page-route";
import unplugin from "./unplugin";
import mock from "./mock";
import visualizer from "./visualizer";
import compress from "./compress";
import pwa from "./pwa";
import ssr from "vite-plugin-ssr/plugin";

/**
 * vite插件
 * @param viteEnv - 环境变量配置
 */
export function setupVitePlugins(viteEnv: ImportMetaEnv): (PluginOption | PluginOption[])[] {
  const isProd = viteEnv.VITE_SERVICE_ENV == "prod";
  console.info("init plugins env", viteEnv.VITE_SERVICE_ENV);
  const plugins = [
    vue(), //
    vueJsx(),
    ...unplugin(viteEnv),
    unocss(),
    mock,
    progress(),
    pageRoute({
      //
      pageDir: "src/views", // 默认
      pageGlobs: ["**/**.{vue,tsx,jsx}", "!**/components/**"], // 默认
      //routeDts: "src/typings/page-route.d.ts", // 默认
      //routeModuleDir: "src/router/modules", // 默认
      //routeModuleExt: "ts", // 默认
      //routeModuleType: "AuthRoute.Route", // 默认
      /**
       * @example _builtin_login => login
       */
      //name.replace(/^_([a-zA-Z]|[0-9]|$)+_*/, ""), // 默认
      /**
       * 路由懒加载
       * @param name 路由名称
       * @example
       * - 直接导入
       * ```ts
       * import Home from './views/home/index.vue';
       * ```
       * - 懒加载导入
       * ```ts
       * const Home = import('./views/home/index.vue');
       * ```
       */
      lazyImport: (_name) => true, // 默认
      /**
       * 是否生成路由模块
       * @param name 未转换过的路由名称(没有调用函数routeNameTansformer)
       * @returns 是否生成路由模块的代码
       */
      //onRouteModuleGenerate: (name) => !name.includes("_builtin"), // 对于系统内置路由不生成路由模块, 其他的都生成
    }),
  ];

  if (viteEnv.VITE_VISUALIZER === "Y") {
    plugins.push(visualizer as any as PluginOption);
  }
  if (viteEnv.VITE_COMPRESS === "Y") {
    plugins.push(compress(viteEnv));
  }
  if (viteEnv.VITE_PWA === "Y" || viteEnv.VITE_VERCEL === "Y") {
    plugins.push(pwa());
  }
  if (isProd) {
    plugins.push(ssr());
  }
  return plugins;
}
