"use strict";
/**
 * global router
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreRouter("api::global.global", {
    prefix: "",
    only: ["find", "update"],
    except: [],
    config: {
        //用于处理路由的策略、中间件和公共可用性的配置
        find: {
            auth: false,
        },
        create: {},
        update: {},
        delete: {},
    },
});
