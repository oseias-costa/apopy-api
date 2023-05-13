const MongoClient = require("mongodb").MongoClient;

const MONGODB = "mongodb+srv://oseiasc2:j3qqlbCc4YFFqnAP@apopydb.e92lo9p.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(MONGODB, { useUnifiedTopology: true });
const db = client.db("test")


async function ConnectedMongoDB() {
  try {
    await client.connect();
    console.log(`
      MongoDb Connected!
    `)
  } catch (e) {
      console.error(e);
  }
}

module.exports = { ConnectedMongoDB, db };
