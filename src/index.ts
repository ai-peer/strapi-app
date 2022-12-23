import Koa from "koa";
import {
  transformGraphql,
  transformRest,
} from "./extensions/graphql-transform";
export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    let app: Koa = strapi.server;
    app.use(async (ctx, next) => {
      if (/\.(js|css|html|jpg|jpeg|png|gif|ttf|wof*)$/i.test(ctx.url))
        return next();
      if (/post/i.test(ctx.method) && /^\/graphql$/i.test(ctx.url)) {
        await next();
        let body = ctx.body;
        try {
          if (typeof body == "object") {
            ctx.body = transformGraphql(body);
          } else if (typeof body == "string") {
            ctx.body = transformGraphql(JSON.parse(body));
          }
        } catch (err) {
          console.warn("graphql error", err.message);
        }
      } else if (/^\/api\//i.test(ctx.url)) {
        await next();
        let body = ctx.body;
        if (typeof body == "object") {
          ctx.body = transformRest(body);
        }
      } else {
        return next();
      }
    });
    const extensionService = strapi.plugin("graphql").service("extension");
    extensionService.use({
      resolvers: {
        /*       Query: {
          address: {
            resolve() {
              return { value: { city: 'Montpellier' } };
            },
          },
        }, */
      },
      resolversConfig: {
        "Query.articles": {
          auth: false,
        },
        "Query.categorys": {
          auth: false,
          /*         auth: {
            scope: ["api::address.address.find"],
          }, */
        },
      },
    });
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {},
};
