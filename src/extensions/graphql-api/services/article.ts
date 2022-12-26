import { Context } from "koa";

const mode = "api::article.article";
export default class Article {
   constructor(private readonly strapi) {}

   async list(root, args, context) {
      let ctx: Context = context.koaContext;
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
