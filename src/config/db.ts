import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'
dotenv.config()

export const db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
{
    host: process.env.DB_HOST,
    port: +process.env.PORT,
    dialect: 'postgres',
    models: [__dirname + '/../models/**/*'],
    logging: false,
    ssl: true,
    dialectOptions: {
        "ssl": {
            require: true,
            rejectUnauthorized: false
        }
    }
})