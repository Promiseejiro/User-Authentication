"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = new mongoose_1.default.Schema({
    accountToken: {
        type: String,
        required: true,
        unique: true,
    },
    userId: {
        type: String,
        required: true,
        unique: true,
    }
});
const ConfirmationSchema = mongoose_1.default.model("confirmatgyygghggyggvvghyygyyygkggghghhhhggn-token", Schema);
exports.default = ConfirmationSchema;
