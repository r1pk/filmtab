import winston from 'winston';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  timestamp: true,
  transports: [],
});

if (process.env.NODE_ENV === 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.cli()),
    })
  );
} else if (process.env.NODE_ENV === 'development') {
  logger.add(
    new winston.transports.Console({
      level: 'silly',
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.prettyPrint(),
        winston.format.printf((log) => {
          if (log instanceof Error) {
            return `[${log.level}] : ${log.timestamp} : ${log.message} ${log.stack}`;
          }
          return `[${log.level}] : ${log.timestamp} : ${log.message}`;
        })
      ),
      timestamp: true,
      handleExceptions: true,
      humanReadableUnhandledException: true,
      exitOnError: false,
    })
  );
}
