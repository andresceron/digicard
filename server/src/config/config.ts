import Joi from '@hapi/joi';
import dotenv from 'dotenv';
import { LOCAL, LOG_LEVELS, NODE_ENV } from '../constants/constants';

const envFound = dotenv.config();
if (process.env.ENV === LOCAL && envFound.error) {
  throw new Error("Could not find .env file");
}

console.log('!!!!! PORT !!!!!! ', process.env.PORT);
console.log('!!!!! NODE_ENV !!!!!! ', process.env.NODE_ENV);

const envVarsSchema = Joi.object({
  LOG_LEVEL: Joi.string().valid(LOG_LEVELS.ERROR, LOG_LEVELS.WARNING, LOG_LEVELS.INFO, LOG_LEVELS.HTTP, LOG_LEVELS.VERBOSE, LOG_LEVELS.DEBUG).default(LOG_LEVELS.INFO),
  NODE_ENV: Joi.string().valid(NODE_ENV.DEV, NODE_ENV.TEST, NODE_ENV.PROD).default(NODE_ENV.DEV),
  PORT: Joi.number(),
  MONGOOSE_DEBUG: Joi.boolean().when('NODE_ENV', {
    is: Joi.string().equal(NODE_ENV.DEV),
    then: Joi.boolean().default(true),
    otherwise: Joi.boolean().default(false),
  }),
  JWT_SECRET: Joi.string().required().description('JWT Secret required to sign'),
  MONGO_HOST: Joi.string().required().description('Mongo DB host url'),
  MONGO_PORT: Joi.number().default(27017),
  AWS_ID: Joi.string(),
  AWS_SECRET: Joi.string(),
  AWS_REGION: Joi.string(), // .default('eu-west-1'),
  AWS_BUCKET_NAME: Joi.string() //.default('angularnode2')
}).unknown().required();

const { error, value: envVars } = envVarsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  logs: {
    level: envVars.LOG_LEVEL
  },
  env: envVars.NODE_ENV,
  port: envVars.PORT || 80,
  mongooseDebug: envVars.MONGOOSE_DEBUG,
  jwtSecret: envVars.JWT_SECRET,
  mongo: {
    host: envVars.MONGODB_URI || envVars.MONGO_HOST,
    port: envVars.MONGO_PORT
  },
  aws: {
    id: envVars.AWS_ID,
    secret: envVars.AWS_SECRET,
    region: envVars.AWS_REGION,
    bucket_name: envVars.AWS_BUCKET_NAME
  }
};

export default config;