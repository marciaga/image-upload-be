import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectToMongo } from "./mongodb";
import imageRoutes from "./routes/images";

// load env vars from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 4000;

const corsOptions = {
  origin: "http://localhost:3000",
};

const startServer = async () => {
  try {
    const mongoConnection = await connectToMongo();

    // create middleware to connect to mongo in route hanlders
    const addDbToRequestObj = (req, _, next) => {
      // sets db connection as "db" on request object
      req.db = mongoConnection.db();
      next();
    };

    app.use(addDbToRequestObj);
    // middleware that parses JSON request body
    app.use(express.json());
    // middleware that allows us to call API from localhost:3000
    app.use(cors(corsOptions));

    app.use("/images", imageRoutes);

    app.listen(PORT, () => {
      console.log(`App is running on port ${PORT}`);
    });
  } catch (error) {
    console.log('Unable to start App');
    console.log('error: ', error);
    // kill the node process if the app crashed during startup
    process.exit(1);
  }
};

startServer();
