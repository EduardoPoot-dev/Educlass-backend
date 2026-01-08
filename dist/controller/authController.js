"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const User_1 = require("../models/User");
const bcrypt_1 = require("../utils/bcrypt");
const jwt_1 = require("../utils/jwt");
class AuthController {
    static async createAccount(req, res) {
        try {
            const { name, email, password } = req.body;
            const user = await User_1.User.findOne({ where: { email } });
            if (user) {
                const error = new Error('El correo ya está en uso');
                res.status(400).json({ error: error.message });
                return;
            }
            req.body.password = await (0, bcrypt_1.hashPassword)(password);
            await User_1.User.create(req.body);
            res.json('Cuenta creada correctamente');
        }
        catch (error) {
            res.status(500).json({ error: 'Hubo un error' });
        }
    }
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User_1.User.findOne({ where: { email } });
            if (!user) {
                const error = new Error('Este usuario no existe');
                res.status(403).json({ error: error.message });
                return;
            }
            const isCorrectPassword = await (0, bcrypt_1.verifyPassword)(password, user.password);
            if (!isCorrectPassword) {
                const error = new Error('Password incorrecto');
                res.status(403).json({ error: error.message });
                return;
            }
            const token = (0, jwt_1.signJwt)(user.id, process.env.JWT_SECRET);
            res.json(token);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Hubo un error' });
        }
    }
    static getUser(req, res) {
        res.json(req.user);
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=authController.js.map