const ResponseDataSuccess = (data) => {
  if (data) {
    return { data, operationStatus: 1 };
  } else {
    return { data: null };
  }
};

const ResponseDataFailed = (data) => {
  if (data) {
    return { data, operationStatus: 0 };
  } else {
    return { data: null, operationStatus: 0 };
  }
};

module.exports = { ResponseDataSuccess, ResponseDataFailed };
