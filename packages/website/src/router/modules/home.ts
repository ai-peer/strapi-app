const home: AuthRoute.Route = {
  name: "home",
  path: "/home",
  component: "self",
  meta: {
    title: "首页",
    requiresAuth: false,
    keepAlive: true,
    singleLayout: "basic",
    //permissions: ["user"],
    icon: "fluent:book-information-24-regular",
    order: 1,
  },
};

export default home;
