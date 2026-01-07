import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "../middlewares/validation";
import { AuthController } from "../controller/authController";
import { AuthValidations } from "../middlewares/auth";


const router = Router()

router.post('/create-account', 
    body('name')
        .notEmpty().withMessage('El nombre no puede ir vacio'),
    body('email')
        .isEmail().withMessage('Email no válido'),
    body('password')
        .custom( value => value.length >= 8).withMessage('El password debe tener mínimo 8 carácteres'),
    handleInputErrors,
    AuthController.createAccount
)

router.post('/login', 
    body('email')
        .isEmail().withMessage('Email no válido'),
    body('password')
        .custom( value => value.length > 6).withMessage('El password debe tener mínimo 8 carácteres'),
    handleInputErrors,
    AuthController.login
)

router.get('/user',
    AuthValidations.authenticate, 
    AuthController.getUser
)


export default router