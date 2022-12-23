/**
 * atricle controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::category.category",
  ({ strapi }) => {
    return <any>{
      count(ctx) {
        var { query } = ctx.request;
        return strapi.entityService.count("api::category.category", query);
      },
    };
  }
);
