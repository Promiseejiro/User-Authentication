"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setpassword = exports.getAuthenticatedUser = exports.login = exports.verifyAccount = exports.updateUser = exports.signUp = exports.hashHandler = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const isemail_1 = __importDefault(require("isemail"));
const nodemailer_1 = __importDefault(require("../utils/nodemailer"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const modal_1 = __importDefault(require("../modal/modal"));
const hashHandler = (prehashedValue) => __awaiter(void 0, void 0, void 0, function* () {
    const hashed = yield bcryptjs_1.default.hash(prehashedValue, 8);
    return hashed;
});
exports.hashHandler = hashHandler;
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (email && password) {
        if (isemail_1.default.validate(email)) {
            const userExist = yield modal_1.default.findOne({ email: email });
            if (userExist) {
                res.send({ message: "User already exist" });
            }
            else {
                const hashedpassword = yield bcryptjs_1.default.hash(password, 10);
                const newUser = yield modal_1.default.create({ email: email, password: hashedpassword });
                const verificationUrl = yield `http://localhost:2000/${newUser._id}`;
                console.log(verificationUrl);
                (0, nodemailer_1.default)(email, "Account verification", verificationUrl);
                res.status(200).send({ message: "A verification mail has been sent to your email account please verify email account." });
            }
        }
        else {
            res.send({ message: "Invalid email" });
        }
    }
    else {
        res.send({
            message: "Input email and password"
        });
    }
});
exports.signUp = signUp;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { email, password, bio, phone, profileUrl, name } = yield req.body;
    const hashedpassword = yield bcryptjs_1.default.hash(password, 10);
    const user = yield modal_1.default.findOne({ _id: req.user.userId });
    if (user) {
        //check permission
        if (user._id == req.user.userId) {
            const updatedUser = yield modal_1.default.findOneAndUpdate({ _id: req.user.userId }, {
                email: email, password: hashedpassword, bio: bio, phone: phone, name: name, profileUrl: profileUrl
            }, {
                new: true,
                runValidators: true,
            });
            console.log(updatedUser);
            res.send({ message: "User details successfully update" });
        }
        else {
            res.send({ message: "not permitted to make update" });
        }
    }
    else {
        res.send({ message: "Erro cannot update user" });
    }
});
exports.updateUser = updateUser;
const verifyAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = yield req.params;
    const user = yield modal_1.default.findOne({ _id: id });
    const updatedUser = yield modal_1.default.updateOne({ _id: id, Verified: true });
    res.redirect("http://localhost:3000/login?message: Account Verified");
    //console.log(updatedUser.acknowledged)
});
exports.verifyAccount = verifyAccount;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = yield req.body;
    if (email && password) {
        const user = yield modal_1.default.findOne({ email: email });
        if (user) {
            console.log(user.password);
            const passwordMatch = yield bcryptjs_1.default.compare(password, user.password);
            if (passwordMatch) {
                const token = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email }, "your_secret_key", { expiresIn: "30d" });
                res.send({ token });
            }
            else {
                res.send({ message: "Invalid password" });
            }
        }
        else {
            res.send({ message: "No such user registered" });
        }
    }
    else {
        res.send({ message: "Input email and password" });
    }
});
exports.login = login;
const getAuthenticatedUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        console.log(req.user.userId);
        const user = yield modal_1.default.findOne({ _id: req.user.userId });
        console.log(user);
        res.send({ user: user });
    }
    else {
        res.send({ message: "user details couldn't be fetch"
        });
    }
});
exports.getAuthenticatedUser = getAuthenticatedUser;
const setpassword = (req, res) => {
};
exports.setpassword = setpassword;
