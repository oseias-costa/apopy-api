const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer }  = require('@apollo/server/standalone');
const { default: mongoose } = require('mongoose');
const { mergeResolvers, mergeTypeDefs } = require('@graphql-tools/merge')
const { loadFilesSync } = require('@graphql-tools/load-files')
const path = require('path')
const resolverFiles = loadFilesSync(path.join(__dirname, "src/resolvers"))
const typesArray = loadFilesSync(path.join(__dirname, "src/types"))
const { MongoClient } = require('mongodb')

const MONGODB = "mongodb+srv://oseiasc2:j3qqlbCc4YFFqnAP@apopydb.e92lo9p.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(MONGODB)

async function ConnectedDb(client){
    const db = client.connect().then(() => console.log('mongodbconnected'))
  
    console.log(db.then(() => console.log(collection('users').find({}))))
}

const typeDefs = mergeTypeDefs(typesArray)
const resolvers = mergeResolvers(resolverFiles)
const jwt = require('jsonwebtoken');
const { collection } = require('./src/models/Product');

async function StartApolloServer(){
    const server = new ApolloServer({ typeDefs,resolvers })

    // await mongoose.connect(MONGODB, { useNewUrlParser: true })
    // .then(console.log(`
    //     💾 MongoDB Connected`))

    const { url } = await startStandaloneServer(server, {
        context: ({ req }) => {
            const token = req.headers.authorization || null
            
            if(token){
                const user = jwt.verify(token, "unsafe")
                return { user }
            } else {
                return { user: null }
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
        listen: { port: 4000 }
    })
    console.log(`
        🚀 Running ApolloServer
        📬 On url: ${url}
    `)
}
ConnectedDb(client)
StartApolloServer()

