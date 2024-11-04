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
exports.storeRecipe = exports.userRecipe = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const user_service_1 = require("./user.service");
const USERS_FILE = path_1.default.join(process.cwd(), "../store.json");
const userRecipe = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const { recipe } = yield (0, user_service_1.getUser)(username);
    return recipe;
});
exports.userRecipe = userRecipe;
const storeRecipe = (username, recipe) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersData = yield promises_1.default.readFile(USERS_FILE, "utf8");
        const users = JSON.parse(usersData);
        const userIndex = users.findIndex((u) => u.username === username);
        if (userIndex === -1) {
            throw new Error(`User ${username} not found`);
        }
        users[userIndex].recipe = recipe;
        yield promises_1.default.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
    }
    catch (error) {
        console.error(`Failed to store recipe`);
        throw error;
    }
});
exports.storeRecipe = storeRecipe;
