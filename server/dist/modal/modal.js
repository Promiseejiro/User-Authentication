"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    email: {
        type: String,
        //required:true,
        //   unique:true
    },
    password: {
        type: String,
        //required:true,
        default: "password"
    },
    name: {
        type: String,
        default: "Edit user name"
    },
    bio: {
        type: String,
        default: "No bio stated yet"
    },
    phone: {
        type: Number,
        default: 0
    },
    profileUrl: {
        type: String,
        default: ""
    },
    verified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
const User = (0, mongoose_1.model)("Usery", schema);
exports.default = User;
