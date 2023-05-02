import { handleModuleRoutes } from "@/utils";
import about from "./about";
import dashboard from "./dashboard";
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

console.info("modules", modules);

export const routes = handleModuleRoutes(modules);
