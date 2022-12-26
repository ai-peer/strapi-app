/**
 * global router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::global.global", {
   prefix: "", //允许传入自定义前缀以添加到此型号的所有路由器（例如/test)
   only: ["find", "update"], //仅加载核心路由 不在此数组中的任何内容都将被忽略。
   except: [], //不应加载的核心路由 这在功能上与参数相反
   config: {
      //用于处理路由的策略、中间件和公共可用性的配置
      find: {
         auth: false,
      },
      create: {},
      update: {},
      delete: {},
   },
});
