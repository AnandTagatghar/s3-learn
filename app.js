require("dotenv").config();
const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

async function getObjectURL(key) {
  const command = new GetObjectCommand({
    Key: key,
    Bucket: process.env.BUCKET_NAME,
  });

  const signedUrl = await getSignedUrl(s3Client, command);
  return signedUrl;
}


async function putObjectURL(ContentType) {
  const command = new PutObjectCommand({
    Key: "video1.mp4",
    Bucket: process.env.BUCKET_NAME,
    ContentType,
  });

  const signedUrl = await getSignedUrl(s3Client, command);

  return signedUrl;
}

(async () => {
  console.log(await getObjectURL("video1.mp4"));

  console.log(await putObjectURL("video/mp4"));
})();
