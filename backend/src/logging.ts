import winston from "winston";
import path from "path";
import fs from "fs";

const logLevel = process.env.LOG_LEVEL ?? "info";

// Ensure logs directory exists
const logsDir = path.join(process.cwd(), "jippity-logs");
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

export const log = winston.createLogger({
    level: logLevel,
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        debug: 3
    },
    transports: [
        // Console transport with colorized output
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.errors({ stack: true }),
                winston.format.cli()
            )
        }),
        // File transport with JSON format for easy analysis
        new winston.transports.File({
            filename: path.join(logsDir, "error.log"),
            level: "error",
            format: winston.format.combine(
                winston.format.errors({ stack: true }),
                winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
                winston.format.json()
            )
        }),
        // Combined log file
        new winston.transports.File({
            filename: path.join(logsDir, "combined.log"),
            format: winston.format.combine(
                winston.format.errors({ stack: true }),
                winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
                winston.format.json()
            )
        })
    ]
});
