import { CorsOptions } from "cors";

export const corsConfig : CorsOptions = {
    origin: function(origin, callback) {
        const blackList = [process.env.FRONTEND_URL]

        if(process.argv[2] === '--api') {
            return blackList.push(undefined)
        }

        if(blackList.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Error de cors'))
        }
    }
}