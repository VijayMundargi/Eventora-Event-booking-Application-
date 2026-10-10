import winston from "winston";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const logFile = path.resolve(__dirname, "app.log");

const customLevels = {
    levels: {
        critical: 0,
        error: 1,
        warn: 2,
        info: 3,
        debug: 4
    },

    colors: {
        critical: "red",
        error: "red",
        warn: "yellow",
        info: "green",
        debug: "blue"
    }
};

winston.addColors(customLevels.colors);

const logFormat = winston.format.combine(
    winston.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss"
    }),
    winston.format.printf(({ timestamp, level, message }) => {
        return `${timestamp} [${level.toUpperCase()}] ${message}`;
    })
);

const logger = winston.createLogger({
    levels: customLevels.levels,
    level: "info",

    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.timestamp({
                    format: "YYYY-MM-DD HH:mm:ss"
                }),
                winston.format.printf(
                    ({ timestamp, level, message }) =>
                        `${timestamp} [${level}] ${message}`
                )
            )
        }),

        new winston.transports.File({
            filename: logFile,
            format: logFormat
        })
    ]
});

export default logger;