export default {
  routes: [
    {
      name: "count",
      method: "GET",
      path: "/articles/count",
      handler: "article.count",
      config: {
        policies: [],
      },
    },
    /* {
      method: "GET",
      path: "/articles",
      handler: "article.find",
      config: {
        policies: [],
      },
    },

    {
      method: "GET",
      path: "/articles/:id",
      handler: "article.findOne",
      config: {
        policies: [],
      },
    },
    {
      method: "POST",
      path: "/articles",
      handler: "article.create",
      config: {
        policies: [],
      },
    },
    {
      method: "PUT",
      path: "/articles/:id",
      handler: "article.update",
      config: {
        policies: [],
      },
    },
    {
      method: "DELETE",
      path: "/articles/:id",
      handler: "article.delete",
      config: {
        policies: [],
      },
    }, */
  ],
};
