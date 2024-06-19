const { ApolloServer, gql } = require('apollo-server');
const fs = require('fs');
const path = require('path');
const resolvers = require('./resolvers');

const typeDefs = gql(fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'));

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
