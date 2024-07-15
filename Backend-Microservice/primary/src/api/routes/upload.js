

const { upload } = require("../../utils/filehandler");
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const { PassThrough } = require('stream');
const { CreateMultipartUploadCommand, CompleteMultipartUploadCommand, UploadPartCommand, GetObjectCommand } = require("@aws-sdk/client-s3");

const { uploadFileToS3, sendCommandToS3, BUCKET_NAME, s3Client, sendCommandToS3NGetData, sendCommandToS3NGetHeadData } = require("../../utils/s3Util");
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const express = require('express');
const path = require("path");

const UserService = require("../../services/user-service");
const VideoService = require("../../services/video-service");

const router = express.Router();
const service = new UserService()
const videoService = new VideoService()

const { uploadAttachmentsValidate } = require("../../utils/validator/instructor-validator");
const { ROUTING_KEY, EXCHANGE_NAME } = require("../../config/constants");

const baseUploadDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(baseUploadDir)) {
    fs.mkdirSync(baseUploadDir, { recursive: true });
}

router.put("/profile-image", upload.single('file'), async (req, res, next) => {
    try {
        const folder = "profile-picture";
        const filePath = req.file.path;
        const { url } = await uploadFileToS3(folder, filePath);
        fs.unlinkSync(filePath);
        const { id } = req.user;
        const data = await service.UpdateAvatar(id, url);
        return res.status(201).json(data);
    } catch (err) {
        console.log("Error : \n", err)
        next(err);
    }
});

router.put("/course/thumbnail-image", upload.single('file'), async (req, res, next) => {
    try {
        const folder = "thumbnails";
        const filePath = req.file.path;
        const { url } = await uploadFileToS3(folder, filePath);
        console.log("here", url)
        fs.unlinkSync(filePath);

        return res.status(201).json({ data: url });
    } catch (err) {
        console.log("Error : \n", err)
        next(err);
    }
});

router.put("/course/attachment/:videoId", uploadAttachmentsValidate, upload.single('file'), async (req, res, next) => {
    try {
        const videoId = req.params.videoId;
        const folder = "attachments";
        const filePath = req.file.path;
        const { url } = await uploadFileToS3(folder, filePath);
        console.log("here", url)
        fs.unlinkSync(filePath);
        await videoService.UpdateAttachments(videoId, url)
        return res.status(201).json({ data: url });
    } catch (err) {
        console.log("Error : \n", err)
        next(err);
    }
});


router.post('/course/video', async (req, res) => {

    const { fileName, fileType, slug } = req.body;
    console.log("here", slug, fileName, fileType)
    const Key = `videos/${slug}/${fileName}`;

    try {
        const command = new CreateMultipartUploadCommand({
            Bucket: BUCKET_NAME,
            Key,
            ContentType: fileType,
        });
        const UploadId = await sendCommandToS3(command);
        res.json({ UploadId, Key });
    } catch (error) {
        console.error('Error starting multipart upload', error);
        res.status(500).json({ error: 'Error starting multipart upload' });
    }
});

router.post('/course/video/url', async (req, res) => {
    const { Key, UploadId, PartNumber } = req.body;

    try {
        const command = new UploadPartCommand({
            Bucket: BUCKET_NAME,
            Key,
            PartNumber,
            UploadId,
        });
        const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
        res.json({ uploadUrl });
    } catch (error) {
        console.error('Error starting multipart upload:', error.message);
        console.error('Stack trace:', error.stack);
        res.status(500).json({ error: 'Error starting multipart upload' });
    }
});

router.post('/course/video/complete', async (req, res) => {
    const { Key, UploadId, Parts, courseId, videoNo, slug, title } = req.body;
    console.log("here", { Key, UploadId, Parts, courseId, videoNo, slug })
    const { id } = req.user;
    try {

        const command = new CompleteMultipartUploadCommand({
            Bucket: BUCKET_NAME,
            Key,
            UploadId,
            MultipartUpload: { Parts },
        });
        await sendCommandToS3(command);

        const params = {
            Bucket: BUCKET_NAME,
            Key
        };

        const passThroughStream = new PassThrough();
        const videoStream = await s3Client.send(new GetObjectCommand(params));
        videoStream.Body.pipe(passThroughStream);
        ffmpeg.ffprobe(passThroughStream, async (err, metadata) => {
            if (err) {
                console.error('Error getting video metadata:', err);
                return res.status(500).json({ error: 'Error getting video metadata' });
            }
            const sourceUrl = `https://${BUCKET_NAME}.s3.amazonaws.com/${Key}`;
            const duration = metadata.format.duration;
            const video = await videoService.CreateVideo({
                title,
                sourceUrl,
                courseId,
                videoKey: Key,
                duration,
                slug,
                videoNo,
                instructorId: id,
                uploadId: UploadId,
            });


            const data = { video, sourceUrl }
            return res.json({ message: 'Upload complete', data });
        });

    } catch (error) {
        console.error('Error completing the upload', error);
        res.status(500).json({ error: 'Error completing the upload' });
    }
});

router.get("/course/video/stream", async (req, res, next) => {
    const videoKey = req.query.videoKey;

    try {
        const range = req.headers.range;
        if (!range) {
            return res.status(416).send('Requires Range header');
        }

        const params = {
            Bucket: BUCKET_NAME,
            Key: videoKey,
        };

        // Get head object to retrieve video metadata
        const headCommand = new GetObjectCommand(params);
        const headData = await s3Client.send(headCommand);
        const videoSize = headData.ContentLength;

        const CHUNK_SIZE = 10 ** 6; // 1MB
        const start = Number(range.replace(/\D/g, ''));
        const end = Math.min(start + CHUNK_SIZE - 1, videoSize - 1);

        // Ensure the requested range is within the video size


        const contentLength = end - start + 1;
        const headers = {
            'Content-Range': `bytes ${start}-${end}/${videoSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': contentLength,
            'Content-Type': headData.ContentType,
        };

        res.writeHead(206, headers);

        // Create a readable stream for the specified range
        const streamCommand = new GetObjectCommand({
            ...params,
            Range: `bytes=${start}-${end}`,
        });
        const streamData = await s3Client.send(streamCommand);

        // Pipe the stream to the response
        streamData.Body.pipe(res);
    } catch (err) {
        next(err);
    }
});



module.exports = router;
