"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signJwt = signJwt;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function signJwt(id, secret) {
    return jsonwebtoken_1.default.sign({ id }, secret, {
        expiresIn: '7d'
    });
}
//# sourceMappingURL=jwt.js.map