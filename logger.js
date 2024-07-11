import { createLogger, transports, format } from 'winston';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logger = createLogger({
    level: 'error',
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new transports.File({ filename: path.join(__dirname, 'errors.log'), level: 'error' })
    ]
});

export class Logger {
    static write({ msg }) {
        console.log(msg);
        logger.error(msg);
    }
}


