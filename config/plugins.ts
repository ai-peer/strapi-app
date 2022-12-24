export default {
  graphql: {
    config: {
      endpoint: '/graphql',
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
