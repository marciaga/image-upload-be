import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectToMongo } from "./mongodb";
import imageRouter from "./routes/images";

// load env vars from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3000;
// origin is the host and port of the client
const corsOptions = {
  origin: "http://localhost:5173",
};

const startServer = async () => {
  try {
    const mongoConnection = await connectToMongo();
    // create middleware to connect to mongo in route hanlders
    const addDbToReqObj = (req, res, next) => {
      // sets db connection as "db" on request object
      req.db = mongoConnection.db();
      next();
    };

    app.use(addDbToReqObj);
    // middleware that allows us to call API from localhost:5173
    app.use(cors(corsOptions));
    // middleware that parses JSON request body
    app.use(express.json());

    app.use("/images", imageRouter);

    app.listen(PORT, () => {
      console.log(`App is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("error: ", error);
    console.log("Error starting the app");
    // kill the node process if the app crashed during startup
    process.exit(1);
  }
};

startServer();
