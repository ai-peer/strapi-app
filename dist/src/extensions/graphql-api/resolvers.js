"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = __importDefault(require("./services"));
function default_1(strapi) {
    const services = (0, services_1.default)(strapi);
    return {
        Query: {
            hello(root, args, context) {
                return "Hello world!";
            },
            /*       cates: (root, args, context) =>
           services.category.list(root, args, context), */
            artis: (root, args, context) => services.article.list(root, args, context),
            cates: (root, args, context) => services.article.list(root, args, context),
        },
    };
}
exports.default = default_1;
