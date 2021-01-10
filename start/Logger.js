
const winston = require('winston');
const path = require('path');
const { format } = require('winston');
const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ 
      filename: `${path.resolve(__dirname, '..', 'log', 'Error.log')}`, 
      level: 'error' ,
      format:format.combine(format.timestamp(),format.simple())
    }),
    new winston.transports.File({ 
      filename: `${path.resolve(__dirname, '..', 'log', 'Info.log')}`, 
      level: 'info' ,
      format:format.combine(format.timestamp(),format.simple())
    }),
    new winston.transports.File({ 
      filename: `${path.resolve(__dirname, '..', 'log', 'Debug.log')}`, 
      level: 'debug' ,
      format:format.combine(format.timestamp(),format.simple())
    }),
  ]
});
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}
module.exports = {
    logger
}