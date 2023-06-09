"use strict";
/**
 * atricle controller
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController("api::article.article", ({ strapi }) => {
    return {
        count(ctx) {
            var { query } = ctx.request;
            return strapi.entityService.count("api::article.article", query);
        },
    };
});
