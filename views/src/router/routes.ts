import Layout from "../components/Layout.vue";

const routes = [
   {
      path: "/",
      name: "index",
      component: Layout,
      redirect: "/home.html",
      children: [
         {
            path: "/home.html",
            name: "home",
            title: "首页",
            component: () => import("../views/Home.vue"),
            //icon: 'icon-wujiaoxing',
            meta: {
               //requiresAuth: true, // 是否需要登录
            },
         }
      ],
   },
 /*   {
      path: "/login.html",
      name: "login",
      component: () => import("../views/Login.vue"),
      meta: {
         requiresAuth: false, // 是否需要登录
      },
   }, */
   {
      path: "*",
      redirect: "/index",
   },
];

export default routes;
