import winston from 'winston';

export const logger = winston.createLogger({
  exitOnError: false,
  transports: [
    new winston.transports.File({
      filename: './logs/logs.log',
      handleExceptions: true,
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf((log) => {
          if (log instanceof Error) {
            return `[${log.level}] : ${log.timestamp} : ${log.message} ${log.stack}`;
          }
          return `[${log.level}] : ${log.timestamp} : ${log.message}`;
        })
      ),
    }),
    new winston.transports.Console({
      level: process.env.NODE_ENV === 'development' ? 'silly' : 'error',
      handleExceptions: true,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.prettyPrint(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf((log) => {
          if (log instanceof Error) {
            return `[${log.level}] : ${log.timestamp} : ${log.message} ${log.stack}`;
          }
          return `[${log.level}] : ${log.timestamp} : ${log.message}`;
        })
      ),
    }),
  ],
});
