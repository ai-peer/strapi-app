/**
 * atricle controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::article.article",
  ({ strapi }) => {
    return <any>{
      count(ctx) {
        var { query } = ctx.request;
        return strapi.entityService.count("api::article.article", query);
      },
    };
  }
);
