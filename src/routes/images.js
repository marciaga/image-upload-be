import express from "express";
import multer from "multer";

import { uploadFileToStorage } from "../gcp";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post("/upload", upload.single("image"), async (req, res) => {
  // here we send the image to GCP and get back the URL to the image
  const url = await uploadFileToStorage(req.file);
  // Create a document in Mongo DB images collection
  await req.db.collection("images").insertOne({ url });
  res.json({ success: true });
});

router.get("/", async (req, res) => {
  const limit = req.query.limit;
  const cursor = await req.db
    .collection("images")
    .find()
    .limit(limit ?? 10);
  const result = await cursor.toArray();
  res.json({ images: result });
});

export default router;
