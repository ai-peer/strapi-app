export default {
   menus: {
      config: {
         maxDepth: 3,
      },
   },
   graphql: {
      config: {
         endpoint: "/graphql",
         shadowCRUD: false,
         playgroundAlways: false,
         depthLimit: 7,
         amountLimit: 100,
         apolloServer: {
            tracing: false,
         },
      },
   },
};
