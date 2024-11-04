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
const express_1 = __importDefault(require("express"));
const auth_1 = require("./auth");
const middleware_1 = require("./middleware");
const cookie_service_1 = require("./services/cookie.service");
const router = express_1.default.Router();
// Register route
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        yield (0, auth_1.registerUser)(username, password);
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(400).json({ error: "An unknown error occurred" });
        }
    }
}));
// Login route
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (yield (0, auth_1.validateUser)(username, password)) {
        const token = (0, auth_1.generateToken)(username);
        res.json({ token });
    }
    else {
        res.status(401).json({ error: "Invalid credentials" });
    }
}));
// Get Cookie recipe
router.get("/secret", middleware_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipe = yield (0, cookie_service_1.userRecipe)(req.user.username);
    res.json({
        recipe,
    });
}));
// Store recipe
router.post("/secret", middleware_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { recipe } = req.body;
    if (!recipe) {
        res.status(401).json({
            error: "Please include your secret recipe",
        });
    }
    const username = req.user.username;
    yield (0, cookie_service_1.storeRecipe)(username, recipe);
    res.json({
        recipe,
    });
}));
exports.default = router;
