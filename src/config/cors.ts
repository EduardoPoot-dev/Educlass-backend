import { CorsOptions } from "cors";

export const corsConfig : CorsOptions = {
    origin: function(origin, callback) {
        const blackList = [process.env.FRONTEND_URL]
        
        if(process.argv[2] === '--api') {
            blackList.push(undefined)
        }
console.log(blackList, origin)
        if(blackList.includes(origin)) {
            console.log(origin)
            callback(null, true)
        } else {
            callback(new Error('Error de cors'))
        }
    }
}