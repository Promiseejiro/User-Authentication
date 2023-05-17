import enviromentVariable from "../config";

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: enviromentVariable.cloud_name,
  api_key: enviromentVariable.api_key,
  api_secret: enviromentVariable.api_secret,
});

export default cloudinary;
