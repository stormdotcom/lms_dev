const { REGION, BUCKET_NAME } = require("./s3Util");

const ResponseDataSuccess = (data) => {
  if (data) {
    return { data, operationStatus: 1 };
  } else {
    return { data: null, operationStatus: 1 };
  }
};

const ResponseDataFailed = (data) => {
  if (data) {
    return { data, operationStatus: 0 };
  } else {
    return { data: null, operationStatus: 0 };
  }
};

function generateSlug(title = "") {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}
const extractS3KeyFromUrl = (url) => {
  const prefix = `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/`;
  return url.replace(prefix, '');
};
module.exports = { ResponseDataSuccess, ResponseDataFailed, generateSlug, extractS3KeyFromUrl };
