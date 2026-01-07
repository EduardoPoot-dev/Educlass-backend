import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express"

export function handleInputErrors(req: Request, res: Response, next: NextFunction) {
    const result = validationResult(req);

    if(!result.isEmpty()) {
        res.status(500).json({errors: result.array()})
        return
    }

    next()
}