import { Request, Response } from "express"
import { User } from "../models/User"
import { hashPassword, verifyPassword } from "../utils/bcrypt"
import { signJwt } from "../utils/jwt"

export class AuthController {
    static async createAccount(req: Request, res: Response) {
        try {
            const { name, email, password} = req.body
            const user = await User.findOne({where: {email}})
            
            if(user) {
                const error = new Error('El correo ya está en uso')
                res.status(400).json({error: error.message})
                return
            }

            req.body.password = await hashPassword(password)

            await User.create(req.body)

            res.json('Cuenta creada correctamente')

        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body

            const user = await User.findOne({where: {email}})
            
            if(!user) {
                const error= new Error('Este usuario no existe')
                res.status(403).json({error: error.message})
                return
            }
            
            const isCorrectPassword = await verifyPassword(password, user.password)

            if(!isCorrectPassword) {
                const error = new Error('Password incorrecto')
                res.status(403).json({error: error.message})
                return
            }

            const token = signJwt(user.id, process.env.JWT_SECRET)

            res.json(token)

        } catch (error) {
            console.log(error)
            res.status(500).json({error: 'Hubo un error'})
        }
    }


    static getUser(req: Request, res: Response) {
        res.json(req.user)
    }
}