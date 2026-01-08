import { db } from "./config/db"
import express from "express"
import authRouter from "./routes/authRoutes"
import courseRouter from "./routes/coursesRoutes"
import taskRouter from "./routes/tasksRoutes"
import submitRouter from "./routes/submitRoutes"
import cors from "cors"
import { corsConfig } from "./config/cors"

const connectDb = async () => {
    try {
        await db.authenticate()
        db.sync()
        console.log('DB is connceted')
    } catch (error) {
        console.log(error)
    }
}

connectDb()

const app = express()

app.use('/api', cors(corsConfig))

app.use(express.json());

app.use('/api/auth', authRouter)
app.use('/api/course', courseRouter )
app.use('/api/tasks', taskRouter)
app.use('/api/submit', submitRouter)

export default app


