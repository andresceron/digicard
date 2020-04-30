const fs = require('fs');
const AWS = require('aws-sdk');
let s3 = new AWS.S3();

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();
const envVars = process.env;


AWS.config.setPromisesDependency();
AWS.config.update({
  accessKeyId: envVars.AWS_ID,
  secretAccessKey: envVars.AWS_SECRET,
  region: envVars.AWS_REGION
});

async function fileUpload(data) {
  try {
    const params = {
      ACL: 'public-read',
      Bucket: envVars.AWS_BUCKET_NAME,
      Body: fs.createReadStream(data.path),
      ContentType: data.mimetype,
      Key: `avatar/${new Date().getTime()}_` + `${data.filename}`,
    };
    return await s3.upload(params).promise().then(uploadResolve);
  } catch (e) {
    console.log('Error occured while trying to upload to S3 bucket', e);
    return e;
  }

}

function uploadResolve(res) {
  const test = s3.getSignedUrl('getObject', {
    Bucket: envVars.AWS_BUCKET_NAME,
    Key: res.Key,
    Expires: 300
  });

  return res;
}

module.exports = {
  upload: fileUpload
};
