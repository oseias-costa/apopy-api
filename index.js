const express = require("express");
const path = require("path");
const cors = require('cors')
const jwt = require("jsonwebtoken");
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

async function StartApolloServer() {
  
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
    context: async({req, res}) => {
      const authHeader = req.headers.authorization

      const token = authHeader.split(' ')[1] || ''
      const user = await jwt.verify(token, "unsafe", (error, decoded) => {
        if(error){
          return console.log(error)
        }

        return decoded
      })

      return user
    }
  });
  
  await ConnectedMongoDB();
  await apolloServer.start();
  
  app.use(cors())
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  apolloServer.applyMiddleware({ app });

  app.listen(4000, function (){
    console.log(`gql path is http://localhost:4000${apolloServer.graphqlPath}`);
  });
}

StartApolloServer();
