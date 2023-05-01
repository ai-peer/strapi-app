export const routes = [
   {
      path: "/home",
      name: "home",
      component: () => import("@/components/HelloWorld.vue"),
   },
   {
      path: "/",
      redirect: "/home",
   },
];

export default routes;
