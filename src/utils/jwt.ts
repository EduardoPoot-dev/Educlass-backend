import jwt from "jsonwebtoken"

export function signJwt(id: string, secret: string) {
    return jwt.sign({id}, secret, {
        expiresIn: '7d'
    })
}