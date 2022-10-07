const AWS = require("aws-sdk");
const s3 = new AWS.S3();

const BUCKET_NAME = process.env.FILE_UPLOAD_BUCKET_NAME;

// retrieving file from s3 bucket
module.exports.handler = async (event) => {
  console.log(event);

  const response = {
    isBase64Encoded: false,
    statusCode: 200,
  };
  try {
    const params = {
      Bucket: BUCKET_NAME,
      key: decodeURIComponent(event.pathParameters.fileKey), //holds the file key we want get or delete
    };
    const deleteResult = await s3.deleteObject(params).promise();

    response.body = JSON.stringify({
      message: "Successfully deleted file from S3.",
      deleteResult,
    });
  } catch (e) {
    console.log(e);
    response.body = JSON.stringify({
      message: "Failed to delete file",
      errorMessage: e,
    });
    response.statusCode = 500;
  }
};
