require("dotenv").config();
const { generateKey } = require("./auth/services");

const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  COOKIE_KEY_1: generateKey(),
  COOKIE_KEY_2: generateKey(),
};

module.exports = config;
