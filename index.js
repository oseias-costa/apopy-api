const express = require("express");
const path = require("path");
const { ApolloServer } = require("apollo-server-express");
const { ConnectedMongoDB } = require("./src/services/mongodb");

//const dotenv = require('dotenv')
//dotenv.config()

const { mergeResolvers, mergeTypeDefs } = require("@graphql-tools/merge");
const { loadFilesSync } = require("@graphql-tools/load-files");

const resolverFiles = loadFilesSync(path.join(__dirname, "src/resolvers"));
const typesArray = loadFilesSync(path.join(__dirname, "src/types"));

const typeDefs = mergeTypeDefs(typesArray);
const resolvers = mergeResolvers(resolverFiles);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});

async function StartApolloServer() {
  await ConnectedMongoDB();
  await apolloServer.start();

  apolloServer.applyMiddleware({ app });
}

app.listen(4000, async function () {
  await apolloServer;
  console.log(`gql path is http://localhost:4000${apolloServer.graphqlPath}`);
});

module.exports = StartApolloServer();
