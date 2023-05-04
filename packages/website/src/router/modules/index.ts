import * as utils from "@/utils/router";

//import about from "./about";
//import dashboard from "./dashboard";
let modules: { [key: string]: any } = {};
/* function addModules(...list: any[]) {
  list.forEach((module) => {
    modules[module.path] = {
      default: module,
    };
  });
}
addModules(about, dashboard); */
modules = import.meta.glob("./**/*.ts", { eager: true }) as AuthRoute.RouteModule;
console.info("===========handleModuleRoutes", utils.handleModuleRoutes, utils, import.meta.env.MODE, import.meta.env.SSR);
export const routes = utils.handleModuleRoutes(modules);