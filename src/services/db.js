const { MongoClient } = require('mongodb')


async function ConnectedMongoDB() {
    const MONGODB = "mongodb+srv://oseiasc2:j3qqlbCc4YFFqnAP@apopydb.e92lo9p.mongodb.net/?retryWrites=true&w=majority"
    const client = new MongoClient(MONGODB)
    try {
        const connect = await client.connect()
        const db = connect.db('apopydb')
        console.log(db.collection('users').find({}))
        return console.log('mongodb is connected')
    } catch {
        console.log("Error on connect mongodb")
    }
}

async function listCollections(client){
    const collections = await client.db("apopydb").collection("users").find({})
    console.log(collections)
}


module.exports = { ConnectedMongoDB }