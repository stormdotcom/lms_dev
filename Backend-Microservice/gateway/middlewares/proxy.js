const { createProxyMiddleware } = require('http-proxy-middleware');

const fileUploadProxy = createProxyMiddleware({
    target: "http://localhost:8001",
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
        // Handle multipart/form-data requests (file uploads)
        if (req.headers['content-type'] && req.headers['content-type'].includes('multipart/form-data')) {
            console.log("Handling multipart/form-data request");
            req.pipe(proxyReq); // Pipe the request stream directly to the proxyReq
        } else {
            res.statusCode = 415; // Unsupported Media Type
            res.end("This proxy only supports multipart/form-data requests.");
        }
    }
});

module.exports = fileUploadProxy;
