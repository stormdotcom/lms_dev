const jwt = require("jsonwebtoken");
const express = require("express");
const path = require("path")
const { JWT_ACCESS_SECRET } = require("../../config/index");

const setUserFromToken = (req, res, next) => {
    const authHeader = req.headers["authorization"] || "";
    const token = authHeader.split(" ")[1];
    console.log("Token received in primary for verification:", token);

    jwt.verify(token, JWT_ACCESS_SECRET, (err, user) => {
        if (err) {
            console.log("Verification error in primary:", err);
            return res.status(401).json({ message: "Invalid access token", errorCode: 9000 });
        }

        console.log("Token verified successfully in primary:", user);
        req.user = user;
        next();
    });
};

const fileServer = express.static(path.join(__dirname, 'public'))


const serveFile = (req, res) => {

    const { filename } = req.params;
    const uploadDirectory = path.join(__dirname, '../../public/uploads');
    const filePath = path.join(uploadDirectory, filename);
    // Check if the file exists
    if (fs.existsSync(filePath)) {
        // Check file permissions
        fs.access(filePath, fs.constants.R_OK, (err) => {
            if (err) {
                // File is not readable
                res.status(403).json({ message: 'File access denied.' });
            } else {
                // Serve the file
                res.sendFile(filePath);
            }
        });
    } else {
        // File not found
        res.status(404).json({ message: 'File not found.' });
    }
};

module.exports = { setUserFromToken, serveFile, fileServer }