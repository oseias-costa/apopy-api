const MongoClient = require("mongodb").MongoClient;

const MONGODB = `${process.env.MONGODB_ACESS}`;
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
