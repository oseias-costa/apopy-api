const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { expressMiddleware } = require("@apollo/server/express4");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const { ConnectedMongoDB } = require("./src/services/mongodb");

//const dotenv = require('dotenv')
//dotenv.config()
const http = require("http");
const path = require("path");
const cors = require("cors");
const { json } = require("body-parser");

const { mergeResolvers, mergeTypeDefs } = require("@graphql-tools/merge");
const { loadFilesSync } = require("@graphql-tools/load-files");

const resolverFiles = loadFilesSync(path.join(__dirname, "src/resolvers"));
const typesArray = loadFilesSync(path.join(__dirname, "src/types"));

const typeDefs = mergeTypeDefs(typesArray);
const resolvers = mergeResolvers(resolverFiles);

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
  typeDefs,
  resolvers,
  //plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

async function StartApolloServer() {
  await ConnectedMongoDB();
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
  //await server.start();
  //app.use("/graphql", cors(), json(), expressMiddleware(server));

  //await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  //console.log(`🚀 Server ready at http://localhost:4000/graphql`);
}
module.exports = StartApolloServer();
