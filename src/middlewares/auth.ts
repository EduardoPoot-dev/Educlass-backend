import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import { User } from "../models/User"

declare global {
    namespace Express {
        interface Request {
            user?: User
        }
    }
}

export class AuthValidations {
    static async authenticate(req: Request, res: Response, next: NextFunction) {
        try {
            const beaerToken = req.headers.authorization
            
            if(!beaerToken) {
                const error = new Error('Token no proporcionado')
                res.status(401).json({error: error.message})
                return
            }

            const [, token] = beaerToken.split(' ')
            
            const validToken = jwt.verify(token, process.env.JWT_SECRET)

            if(typeof validToken === 'object' && validToken.id) {
                const user = await User.findByPk(validToken.id, {
                    attributes: ['id', 'name', 'email'],
                    
                })

                if(!user) {
                    const error = new Error('Usuario no encontrado')
                    res.status(401).json({error: error.message})
                    return
                }

                req.user = user
                next()
            }
        } catch (error) {
            res.status(500).json({error: 'No autorizado'})
        }
    }
}