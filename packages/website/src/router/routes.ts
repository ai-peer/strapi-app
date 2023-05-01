import { BasicLayout } from "../layouts";
export const routes = [
   {
      path: "/",
      redirect: "/home",
      component: BasicLayout,
      children: [
         {
            path: "/home",
            name: "home",
            component: () => import("@/components/HelloWorld.vue"),
         },
         {
            name: "plugin_charts_echarts",
            path: "/a",
            component: () => import("@/components/HelloWorld.vue"),
            meta: {
               title: "ECharts",
               requiresAuth: true,
               icon: "simple-icons:apacheecharts",
            },
         },
      ],
   },
];

export default routes;
