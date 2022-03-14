import winston from 'winston';

export const logger = winston.createLogger({
  exitOnError: false,
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.prettyPrint(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf((log) => {
      if (log.stack) {
        return `[${log.level}] : ${log.timestamp} : ${log.stack}`;
      }
      return `[${log.level}] : ${log.timestamp} : ${log.message}`;
    })
  ),
  transports: [
    new winston.transports.File({
      level: 'error',
      filename: './logs/logs.log',
      handleExceptions: true,
    }),
    new winston.transports.Console({
      level: process.env.NODE_ENV === 'development' ? 'silly' : 'error',
      handleExceptions: true,
    }),
  ],
});
