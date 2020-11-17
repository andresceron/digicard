import fs from 'fs';
import AWS from 'aws-sdk';
import config from '../config/config';

const s3 = new AWS.S3();

AWS.config.setPromisesDependency(null);
AWS.config.update({
  accessKeyId: config.aws.id,
  secretAccessKey: config.aws.secret,
  region: config.aws.region
});

// TODO: Refactor this to be a service
export const upload = async(data: any) => {
  try {
    const params = {
      ACL: 'public-read',
      Bucket: config.aws.bucket_name,
      Body: fs.createReadStream(data.path),
      ContentType: data.mimetype,
      Key: `avatar/${new Date().getTime()}_` + `${data.filename}`,
    };

    return await s3.upload(params).promise(); //.then(uploadResolve);
  } catch (e) {
    console.log('Error occured while trying to upload to S3 bucket', e);
    return e;
  }

}
