import app from "./src/app.js";
import http from "http"
import { ENV } from "./src/config/ENV.js";
import connectDb from "./src/config/connectDB.js"
import logger from "./src/utils/Logger.js";
const server = http.createServer(app);

const PORT = ENV.PORT;

const startServer = async() =>{
    try {
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