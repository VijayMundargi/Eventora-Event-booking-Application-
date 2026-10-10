import dotenv from "dotenv"
dotenv.config();

export const ENV = {
    PORT: process.env.PORT,
    JWT_SECREAT: process.env.JWT_SECREAT,
    MONGO_URI: process.env.MONGO_URI,
}