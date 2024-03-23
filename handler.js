// handler.js
'use strict';

const { graphqlLambda } = require('graphql-server-lambda');
const { makeExecutableSchema } = require('graphql-tools');

// Define your GraphQL schema and resolvers
const schema = `
  type Query {
    hello: String
  }
  type Mutation {
    setMessage(message: String!): String
  }
  type Subscription {
    messageUpdated: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello, world!',
  },
  Mutation: {
    setMessage: ({ message }) => {
      // Handle the mutation logic here
      return message;
    },
  },
  Subscription: {
    messageUpdated: {
      subscribe: () => pubsub.asyncIterator('messageUpdated'),
    },
  },
};

// Create executable schema
const executableSchema = makeExecutableSchema({ typeDefs: schema, resolvers });

// Define GraphQL handlers
const queryHandler = graphqlLambda({ schema: executableSchema });
const mutationHandler = graphqlLambda({ schema: executableSchema });
const subscriptionHandler = graphqlLambda({ schema: executableSchema });

// Export handlers
module.exports = {
  queryHandler,
  mutationHandler,
  subscriptionHandler,
};
