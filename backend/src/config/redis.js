import { createClient } from "redis"
import logger from "../utils/Logger.js"

const redisClient = createClient({
    url: process.env.REDIS_URL,
})

redisClient.on("connect",()=>{
    logger.info("Redis connection established")
})

redisClient.on("error",(error) => {
    logger.error("Redis connection error",{
        message: error.message,
    })
})

export default redisClient;