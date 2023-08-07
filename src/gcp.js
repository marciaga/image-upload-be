import { Storage } from "@google-cloud/storage";
import path from "path";

// in order to authenticate with GCP, we need a service account with the appropriate permisssions
// when you create one in GCP, it will download a json file that you'll need to reference here
// this contains sensitive information, so be sure not to check it in!
const serviceKeyPath = path.join(__dirname, "..", "image-upload-sa.json");
const storage = new Storage({ keyFilename: serviceKeyPath });

export const uploadFileToStorage = async (file) =>
  new Promise((resolve, reject) => {
    const bucketName = process.env.GCP_STORAGE_BUCKET_NAME;
    const bucket = storage.bucket(bucketName);
    const { buffer, originalname } = file;
    const newFileName = originalname.replace(/ /g, "_");
    const blob = bucket.file(newFileName);
    // omit spaces in filename
    const blobStream = blob.createWriteStream({ resumable: false });

    blobStream
      .on("finish", () => {
        const publicUrl = `https://storage.googleapis.com/${bucketName}/${newFileName}`;
        resolve(publicUrl);
      })
      .on("error", (e) => {
        console.log("e: ", e);
        reject("Oops something went wrong trying to upload the image.");
      })
      .end(buffer);
  });
