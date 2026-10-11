import http from "http"
import { ENV } from "./src/config/ENV.js";
import connectDb from "./src/config/connectDB.js"
import logger from "./src/utils/Logger.js";
import redisClient from "./src/config/redis.js";


const PORT = ENV.PORT;



const startServer = async() =>{
    try {


        if(!redisClient.isOpen){
            await redisClient.connect();
        }

         const { default: app } = await import("./src/app.js");
         const server = http.createServer(app);

        await connectDb();
        server.listen(PORT,()=>{
            logger.info(`server is running on PORT:${PORT}`);
        })
    } catch (error) {
        logger.error(`Failed to start server`, {
            error: error.message
        })
    }
}

startServer();