
import logger from "../utils/Logger.js";

const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";

    logger.error(message, {
        statusCode,
        method: req.method,
        path: req.originalUrl,
    });

    return res.status(statusCode).json({
        success: false,
        message,
    });
};

export default errorMiddleware;
