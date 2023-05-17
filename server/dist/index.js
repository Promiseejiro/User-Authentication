"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./route/routes"));
const db_1 = __importDefault(require("./db/db"));
const port = 2000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// app.use(express.urlencoded({ extended: false }));
app.use("/", routes_1.default);
app.listen(port, () => {
    (0, db_1.default)("mongodb://localhost:27017/upload");
    console.log("app is listenig on port 2000");
});
