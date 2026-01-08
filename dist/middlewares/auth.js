"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidations = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
class AuthValidations {
    static async authenticate(req, res, next) {
        try {
            const beaerToken = req.headers.authorization;
            if (!beaerToken) {
                const error = new Error('Token no proporcionado');
                res.status(401).json({ error: error.message });
                return;
            }
            const [, token] = beaerToken.split(' ');
            const validToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            if (typeof validToken === 'object' && validToken.id) {
                const user = await User_1.User.findByPk(validToken.id, {
                    attributes: ['id', 'name', 'email'],
                });
                if (!user) {
                    const error = new Error('Usuario no encontrado');
                    res.status(401).json({ error: error.message });
                    return;
                }
                req.user = user;
                next();
            }
        }
        catch (error) {
            res.status(500).json({ error: 'No autorizado' });
        }
    }
}
exports.AuthValidations = AuthValidations;
//# sourceMappingURL=auth.js.map