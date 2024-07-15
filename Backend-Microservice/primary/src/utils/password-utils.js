const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = require("../config");

// Generates a salt
const GenerateSalt = async () => {
  return await bcrypt.genSalt(10);
};

// Generates a hashed password
const GeneratePassword = async (password, salt) => {
  return await bcrypt.hash(password, salt);
};

// Validates a password
const ValidatePassword = async (enteredPassword, savedPassword) => {
  return await bcrypt.compare(enteredPassword, savedPassword);
};

// Generates an access token
const GenerateAccessToken = async (payload) => {
  return await jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: "2h" });
};

// Generates a refresh token
const GenerateRefreshToken = async (payload) => {
  return await jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

// Verifies a refresh token
const VerifyRefreshToken = async (token) => {
  try {
    return await jwt.verify(token, JWT_REFRESH_SECRET);
  } catch (err) {
    throw new Error("Invalid refresh token");
  }
};

// Formats data
const FormateData = (data) => {
  if (data) {
    return { data };
  } else {
    return { data: null };
  }
};

module.exports = {
  GenerateSalt,
  GeneratePassword,
  ValidatePassword,
  GenerateAccessToken,
  GenerateRefreshToken,
  VerifyRefreshToken,
  FormateData,
};
