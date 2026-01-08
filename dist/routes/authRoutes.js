"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validation_1 = require("../middlewares/validation");
const authController_1 = require("../controller/authController");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.post('/create-account', (0, express_validator_1.body)('name')
    .notEmpty().withMessage('El nombre no puede ir vacio'), (0, express_validator_1.body)('email')
    .isEmail().withMessage('Email no válido'), (0, express_validator_1.body)('password')
    .custom(value => value.length >= 8).withMessage('El password debe tener mínimo 8 carácteres'), validation_1.handleInputErrors, authController_1.AuthController.createAccount);
router.post('/login', (0, express_validator_1.body)('email')
    .isEmail().withMessage('Email no válido'), (0, express_validator_1.body)('password')
    .custom(value => value.length > 6).withMessage('El password debe tener mínimo 8 carácteres'), validation_1.handleInputErrors, authController_1.AuthController.login);
router.get('/user', auth_1.AuthValidations.authenticate, authController_1.AuthController.getUser);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map