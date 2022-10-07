const AWS = require("aws-sdk");
const s3 = new AWS.S3();

const BUCKET_NAME = process.env.FILE_UPLOAD_BUCKET_NAME;

// retrieving file from s3 bucket
module.exports.handler = async (event) => {
  console.log(event);

  const response = {
    //actual response return from endpoint
    isBase64Encoded: false,
    statusCode: 200,
  };

  try {
    const params = {
      Bucket: BUCKET_NAME,
      key: decodeURIComponent(event.pathParameters.fileKey),
    };
    const data = await s3.getObject(params).promise();

    response.body = JSON.stringify({
      message: "Successfully retrieved file from S3.",
      data,
    });
  } catch (e) {
    console.log(e);
    response.body = JSON.stringify({
      message: "Failed to get file",
      errorMessage: e,
    });
    response.statusCode = 500;
  }
};
