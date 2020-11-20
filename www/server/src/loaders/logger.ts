import winston from 'winston';
import config from '../config/config';

const errorStackTracerFormat = winston.format((info) => {
  if (info.meta && info.meta instanceof Error) {
    info.message = `${info.message} ${info.meta.stack}`;
  }

  return info;
});

const format = {
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.prettyPrint({
      colorize: true
    }),
    winston.format.splat(),
    errorStackTracerFormat()
  ),
  stderrLevels: ['error']
};

const Logger = winston.createLogger({
  level: config.logs.level,
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    })
  ),
  transports: [new winston.transports.Console(format)],
  exceptionHandlers: [new winston.transports.Console(format)]
});

Logger.exitOnError = false;

export default Logger;