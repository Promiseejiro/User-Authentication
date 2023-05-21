"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const cloudinary = require("cloudinary").v2;
dotenv_1.default.config();
cloudinary.config({
    cloud_name: process.env["cloud_name"],
    api_key: process.env["api_key"],
    api_secret: process.env["api_secret"],
});
exports.default = cloudinary;
