"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const modal_1 = __importDefault(require("../modal/modal"));
const createuser = (email, password) => {
    if (password === "password") {
        return "/password";
    }
    else {
        const user = modal_1.default.findOne({ email: email });
        return "/login";
    }
};
exports.default = createuser;
