const Joi = require('joi');

// require and configure dotenv, will load vars in .env in PROCESS.ENV
const dotenv = require('dotenv');

const envFound = dotenv.config();
if (process.env.ENV === 'local' && envFound.error) {
    // This error should crash whole process
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

// define validation for all the env vars
const envVarsSchema = Joi.object({
    LOG_LEVEL: Joi.string().allow(['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly']).default('info'),
    NODE_ENV: Joi.string().allow(['development', 'production', 'test', 'provision']).default('development'),
    PORT: Joi.number().default(3000),
    MONGOOSE_DEBUG: Joi.boolean().when('NODE_ENV', {
        is: Joi.string().equal('development'),
        then: Joi.boolean().default(true),
        otherwise: Joi.boolean().default(false),
    }),
    JWT_SECRET: Joi.string().required().description('JWT Secret required to sign'),
    MONGO_HOST: Joi.string().required().description('Mongo DB host url'),
    MONGO_PORT: Joi.number().default(27017),
})
    .unknown()
    .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  logs: {
    level: envVars.LOG_LEVEL
  },
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongooseDebug: envVars.MONGOOSE_DEBUG,
  jwtSecret: envVars.JWT_SECRET,
  mongo: {
    host: envVars.MONGO_HOST,
    port: envVars.MONGO_PORT
  },
};

console.log(config);

module.exports = config;
