const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { ConnectedMongoDB } = require("./src/services/mongodb");

const { mergeResolvers, mergeTypeDefs } = require("@graphql-tools/merge");
const { loadFilesSync } = require("@graphql-tools/load-files");
const path = require("path");
const resolverFiles = loadFilesSync(path.join(__dirname, "src/resolvers"));
const typesArray = loadFilesSync(path.join(__dirname, "src/types", "**"));

const typeDefs = mergeTypeDefs(typesArray);
const resolvers = mergeResolvers(resolverFiles);
const jwt = require("jsonwebtoken");

let server = null

async function StartApolloServer() {
  server = new ApolloServer({ typeDefs, resolvers });

  const { url } = await startStandaloneServer(server, {
    context: ({ req }) => {
      const token = req.headers.authorization || null;

      if (token) {
        const user = jwt.verify(token, "unsafe");
        return { user };
      } else {
        return { user: null };
      }
      // if (!token)
      // throw new GraphQLError('User is not authenticated', {
      //     extensions: {
      //     code: 'UNAUTHENTICATED',
      //     http: { status: 401 },
      //     },
      // });
      // if(!user) {
      //     throw new GraphQLError('User is not authenticated')
      //  }
    },
    listen: { port: 4000 },
  });
  console.log(`
        🚀 Running ApolloServer
        📬 On url: ${url}
    `);
}

async function main() {
  await ConnectedMongoDB().catch(console.error);
  return StartApolloServer();
}

module.exports = main()