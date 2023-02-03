import { MongoClient } from "mongodb";

export const connectToMongo = async () => {
  try {
    const connectionStr = process.env.MONGODB_CONNECTION_URI;

    const client = new MongoClient(connectionStr, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = await client.connect();
    console.log("Connection to Mongo successful");
    return db;
  } catch (error) {
    console.log("error: ", error);
    throw new Error("Could not connect to MongoDB");
  }
};
