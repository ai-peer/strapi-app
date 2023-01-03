"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mode = "api::category.category";
class Category {
    constructor(strapi) {
        this.strapi = strapi;
    }
    async list(root, args, context) {
        let ctx = context.koaContext;
        const list = await this.strapi.entityService.findMany(mode, {
        //fields: ['title', 'description'],
        //filters: { title: 'Hello World' },
        //sort: { createdAt: 'DESC' },
        //populate: { category: true },
        });
        return list.map((v) => {
            return {
                id: v.id,
                name: v.name,
            };
        });
    }
}
exports.default = Category;
