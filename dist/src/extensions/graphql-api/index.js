"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resolversConfig_1 = __importDefault(require("./resolversConfig"));
const typeDefs_1 = __importDefault(require("./typeDefs"));
const resolvers_1 = __importDefault(require("./resolvers"));
function default_1(strapi) {
    const extensionService = strapi.plugin("graphql").service("extension");
    extensionService.use({
        // GraphQL SDL
        typeDefs: typeDefs_1.default,
        resolvers: (0, resolvers_1.default)(strapi),
        resolversConfig: resolversConfig_1.default,
    });
}
exports.default = default_1;
