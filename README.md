## You'll need to have a MongoDB connection URI in your .env file, whether to a cluster on Atlas, or a locally running Docker container, e.g.

```
mongodb://localhost:27017/your-db-name-here
```

## The connection URI must be added to your .env file with the key `MONGO_CONNECTION_URI`

### If you just want to run a Docker container running MongoDB, you can use the command (assuming you have Docker running locally):

```
$ docker run --name mongodb -d -p 27017:27017 mongo
```

## You'll also need a Google Cloud Platform Storage bucket set up and a service account json file with permissions sufficient read/write access to the storage bucket you created.

## The Bucket name must be added to your .env file with the key `GCP_STORAGE_BUCKET_NAME`

## To run the app, first install the dependencies:

```sh
npm install
```

## To start the development server:

```sh
npm run dev
```

## There are no build scripts yet
