import AWS from 'aws-sdk';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
// Configure AWS
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

export const uploadToS3 = async (file, folder = 'uploads') => {
  const fileContent = fs.readFileSync(file.path);
  const fileName = `${folder}/${Date.now()}-${file.originalname}`;
  
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: fileName,
    Body: fileContent,
    ContentType: file.mimetype
  };

  const result = await s3.upload(params).promise();
  
  // Clean up temp file
  fs.unlinkSync(file.path);
  
  return {
    url: result.Location,
    publicId: fileName
  };
};

export const deleteFromS3 = async (publicId) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: publicId
  };
  
  await s3.deleteObject(params).promise();
};