"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const auth_1 = require("./auth");
const authenticateToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        res.status(403).json({ error: "A token is required for authentication" });
        return;
    }
    try {
        const decoded = (0, auth_1.verifyToken)(token.split(" ")[1]);
        req.user = decoded;
    }
    catch (err) {
        res.status(401).json({ error: "Invalid Token" });
        return;
    }
    next();
};
exports.authenticateToken = authenticateToken;
