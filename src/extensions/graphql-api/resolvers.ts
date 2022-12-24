import { Context } from "koa";
import funService from "./services";

export default function (strapi) {
  const services = funService(strapi);

  return {
    Query: {
      hello(root, args, context) {
        return "Hello world!";
      },
      /*       cates: (root, args, context) =>
        services.category.list(root, args, context), */
      artis: (root, args, context) =>
        services.article.list(root, args, context),
      cates: (root, args, context) =>
        services.article.list(root, args, context),
    },
  };
}
