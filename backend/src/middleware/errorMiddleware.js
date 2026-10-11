
import logger from "../utils/Logger.js";

const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";

    logger.error(err.message || "Internal server error", {
        statusCode,
        method: req.method,
        path: req.originalUrl,
        ip: req.ip,
        stack: err.stack,
    });

    return res.status(statusCode).json({
        success: false,
        message,
    });
};

export default errorMiddleware;
