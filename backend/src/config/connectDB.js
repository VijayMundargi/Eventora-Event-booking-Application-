
import mongoose from "mongoose";
import logger from "../utils/Logger.js";
import { ENV } from "./ENV.js";

const connectDb = async () => {
    try {
        await mongoose.connect(ENV.MONGO_URI);

        logger.info("Database connected successfully!", {
            database: mongoose.connection.name,
            host: mongoose.connection.host,
        });
    } catch (error) {
        logger.error("Failed to connect to database", {
            error: error.message,
        });

        process.exit(1);
    }
};

export default connectDb;
