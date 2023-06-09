"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_api_1 = __importDefault(require("./extensions/graphql-api"));
const restformat_1 = __importDefault(require("./utils/restformat"));
exports.default = {
    /**
     * An asynchronous register function that runs before
     * your application is initialized.
     *
     * This gives you an opportunity to extend code.
     */
    register({ strapi }) {
        let app = strapi.server;
        app.use(async (ctx, next) => {
            if (/\.(js|css|html|jpg|jpeg|png|gif|ttf|wof*)$/i.test(ctx.url))
                return next();
            if (/post/i.test(ctx.method) && /^\/graphql$/i.test(ctx.url)) {
                await next();
                /*  let body = ctx.body;
                try {
                   if (typeof body == "object") {
                      //ctx.body = transformGraphql(body);
                   } else if (typeof body == "string") {
                      //ctx.body = transformGraphql(JSON.parse(body));
                   }
                } catch (err) {
                   console.warn("graphql error", err.message);
                } */
            }
            else if (/^\/api\//i.test(ctx.url)) {
                await next();
                let body = ctx.body;
                if (typeof body == "object") {
                    ctx.body = (0, restformat_1.default)(body);
                }
            }
            else {
                return next();
            }
        });
        (0, graphql_api_1.default)(strapi);
        /*  const extensionService = strapi.plugin("graphql").service("extension");
      extensionService.use({
        // GraphQL SDL
        typeDefs: `
            type Category {
              id: String
              name: String
            }
            type Article {
              id: String
              title: String
              logo: String
              content: String
            }
            type Query {
               hello: String
               cates: [Category]
               artis: [Article]
            }
            
            schema {
              query: Query
            }
         `,
        resolvers: {
          Query: {
            hello(root, args, context) {
              return "Hello world!";
            },
            async cates(root, args, context) {
              let ctx: Context = context.koaContext;
              const list = await strapi.entityService.findMany(
                "api::category.category",
                {
                  //fields: ['title', 'description'],
                  //filters: { title: 'Hello World' },
                  //sort: { createdAt: 'DESC' },
                  //populate: { category: true },
                }
              );
              console.info("cates", list);
  
              return list.map((v) => {
                return {
                  id: v.id,
                  name: v.name,
                };
              });
            },
          },
        },
        resolversConfig: {
          "Query.hello": {
            auth: false,
          },
          "Query.cates": {
            auth: false,
          },
          "Query.articles": {
            auth: false,
          },
          "Query.categorys": {
            auth: false,
          },
        },
      }); */
    },
    /**
     * An asynchronous bootstrap function that runs before
     * your application gets started.
     *
     * This gives you an opportunity to set up your data model,
     * run jobs, or perform some special logic.
     */
    bootstrap( /*{ strapi }*/) { },
};
