import VueRouter from "vue-router";
//import cookies from "js-cookie";
import config from "../config";
import routes from "./routes";
const baseUrl = ("/" + config.baseUrl + "/").replace(/[\/]{2,}/, "/"); //config.isDev ? "/" : "/admin-view/";
//const viewUrls = routes[0].children?.map((item) => ({ title: item.title, path: baseUrl + item.path.replace(/^\/+/, "") }));
//Vue.prototype.$viewUrls = viewUrls;

function getRouter(path: string, routes: any): any {
  for (let v of routes) {
    if (path == v.path || path == v.name) return v;
    if (v.children && v.children.length > 0) {
      let ret = getRouter(path, v.children);
      if (ret) return ret;
    }
  }
  return undefined;
}

const routerPush = VueRouter.prototype.push;
/* VueRouter.prototype.push = function push(location: any) {
  try {
    //if (location.path) location.path = location.path.replace(this.history.base, "");
    let path = (location.path || location.name || "")
      .replace(config.baseUrl, "")
      .replace(/^[\/]{2,}/, "/");
    let route = getRouter(path, this.options.routes);
    console.info("route=-===", path, route, this.options.routes);
    if (route) {
      return routerPush
        .call(this, { ...location, path: route.path })
    } else if (/^https?:/i.test(location.path)) {
      window.open(location.path);
    }
  } catch (err) {}
}; */
const router = new VueRouter({
  mode: "history", //config.isDev ? "hash" : "history", //
  base: baseUrl,
  routes: routes,
});

router.beforeEach(async (to, from, next) => {
  let isLogin = false;// = !!cookies.get("token-admin");
  console.info("isLogin===", isLogin, to.name);
  if (to.name == "login") {
    return isLogin ? next("/home.html") : next();
  }
  if (isLogin) {
    next();
  } else {
    // 未登录且要跳转的页面不是登录页
    next({
      name: "login", // 跳转到登录页
    });
  }
  //next();
});

router.afterEach((route) => {});

//if (location.pathname.startsWith("/admin-view/index.html")) location.href = "/admin-view/home.html";
//console.info("-----", location.pathname == "/admin-view/index.html", location.pathname);

export default router;
