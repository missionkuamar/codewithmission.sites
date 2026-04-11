import AWS from 'aws-sdk';

// Configure AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  signatureVersion: 'v4',
});

const s3 = new AWS.S3();

// Test connection
export const testS3Connection = async () => {
  try {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      MaxKeys: 1
    };
    await s3.listObjectsV2(params).promise();
    console.log('✅ AWS S3 connected successfully');
    return true;
  } catch (error) {
    console.error('❌ AWS S3 connection failed:', error.message);
    return false;
  }
};

// Delete from S3
export const deleteFromS3 = async (key) => {
  try {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
    };
    const result = await s3.deleteObject(params).promise();
    return result;
  } catch (error) {
    console.error('S3 delete error:', error);
    throw error;
  }
};

export default s3;