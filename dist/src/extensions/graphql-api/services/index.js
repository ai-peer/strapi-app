"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const article_1 = __importDefault(require("./article"));
const category_1 = __importDefault(require("./category"));
let rets;
function default_1(strapi) {
    if (!rets) {
        rets = {
            article: new article_1.default(strapi),
            category: new category_1.default(strapi),
        };
    }
    return rets;
}
exports.default = default_1;
