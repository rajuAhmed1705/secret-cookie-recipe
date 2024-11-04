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
exports.registerUser = exports.validateUser = exports.verifyToken = exports.generateToken = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const promises_1 = __importDefault(require("fs/promises"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const path_1 = __importDefault(require("path"));
const user_service_1 = require("./services/user.service");
const SECRET_KEY = process.env.JWT_SECRET_KEY || "default_secret_key";
const USERS_FILE = path_1.default.join(__dirname, "store.json");
const generateToken = (username) => {
    return jsonwebtoken_1.default.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, SECRET_KEY);
    }
    catch (error) {
        return null;
    }
};
exports.verifyToken = verifyToken;
const validateUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_service_1.getUser)(username);
    return user && (yield bcryptjs_1.default.compare(password, user.password));
});
exports.validateUser = validateUser;
const registerUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const usersData = yield promises_1.default.readFile(USERS_FILE, "utf8");
    const users = JSON.parse(usersData);
    if (users.find((u) => u.username === username)) {
        throw new Error("User already exists");
    }
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    users.push({ username, password: hashedPassword });
    yield promises_1.default.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
});
exports.registerUser = registerUser;
