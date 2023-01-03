"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mode = "api::article.article";
class Article {
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
        console.info("list", list);
        return list.map((v) => {
            return {
                id: v.id,
                title: v.title,
                content: v.content,
                logo: v.logo,
            };
        });
    }
}
exports.default = Article;
