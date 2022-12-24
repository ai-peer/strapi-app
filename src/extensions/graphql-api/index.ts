import { Context } from "koa";
import resolversConfig from "./resolversConfig";
import typeDefs from "./typeDefs";
import funResolvers from "./resolvers";

export default function (strapi) {
  const extensionService = strapi.plugin("graphql").service("extension");
  extensionService.use({
    // GraphQL SDL
    typeDefs: typeDefs,
    resolvers: funResolvers(strapi),
    resolversConfig: resolversConfig,
  });
}
