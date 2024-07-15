const { S3Client, PutObjectCommand, DeleteObjectsCommand } = require("@aws-sdk/client-s3");
const fs = require('fs');
const path = require('path');
const BUCKET_NAME = process.env.AWS_S3_BUCKET
const REGION = process.env.AWS_REGION

// Configure AWS SDK
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

/**
 * Uploads a file to a specified folder in an S3 bucket.
 * @param {string} folder - The folder in the S3 bucket (e.g., 'videos', 'profilePictures', 'attachments').
 * @param {string} filePath - The path to the file to upload.
 * @returns {Promise<string>} - The URL of the uploaded file.
 */
const uploadFileToS3 = async (folder, filePath) => {
    const fileContent = fs.readFileSync(filePath);
    const fileName = path.basename(filePath);
    const s3Key = `${folder}/${fileName}`;

    const params = {
        Bucket: BUCKET_NAME,
        Key: s3Key,
        Body: fileContent
    };

    try {
        const data = await s3Client.send(new PutObjectCommand(params));
        return { data, url: `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3Key}` };
    } catch (err) {
        throw new Error(`Failed to upload file to S3: ${err.message}`);
    }
};
const uploadVideoToS3 = async (folder, filePath) => {
    const fileContent = fs.readFileSync(filePath);
    const fileName = path.basename(filePath);
    const s3Key = `${folder}/${fileName}`;

    const params = {
        Bucket: BUCKET_NAME,
        Key: s3Key,
        Body: fileContent
    };

    try {
        await s3Client.send(new PutObjectCommand(params));

    } catch (err) {
        throw new Error(`Failed to upload file to S3: ${err.message}`);
    }
};
const sendCommandToS3 = async (command) => {
    const { UploadId } = await s3Client.send(command);
    return UploadId
}
const sendCommandToS3NGetData = async (command) => {
    const data = await s3Client.send(command);
    return data
}
const sendCommandToS3NGetHeadData = async (command) => {
    const data = await s3Client.headObject(command).promise();;
    return data
}

const deleteS3Objects = async (keys) => {
    if (keys.length > 0) {
        const deleteParams = {
            Bucket: BUCKET_NAME,
            Delete: {
                Objects: keys,
                Quiet: false
            }
        };
        const result = await s3Client.send(new DeleteObjectsCommand(deleteParams));
        console.log("DeleteObjects result", result);
    }
};
module.exports = {
    uploadFileToS3,
    uploadVideoToS3,
    sendCommandToS3,
    BUCKET_NAME,
    REGION,
    s3Client,
    sendCommandToS3NGetData,
    sendCommandToS3NGetHeadData,
    deleteS3Objects
};
