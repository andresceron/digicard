import mongoose from 'mongoose';
import util from 'util';
import config from './config';

const debug = require('debug')('express-mongoose-es6-rest-api:index');

// make bluebird default Promise
import Promise from 'bluebird'; // eslint-disable-line no-global-assign
import Logger from '../loaders/logger';
import { LOG_LEVELS } from '../constants/constants';

export default () => {
  // plugin bluebird promise in mongoose
  mongoose.Promise = Promise;

  // connect to mongo db
  mongoose.connect(
    config.mongo.host,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      keepAlive: true
    },
    () => {
      Logger.info(`⚡️[db] Connected to mongo database ⚡️`);
    }
  );

  console.log('config.NODE_ENV!! ', config.env);
  console.log('config.PORT!! ', config.port);

  mongoose.connection.on('error', () => {
    Logger.error(`unable to connect to database: ${config.mongo.host}`);
    throw new Error(`unable to connect to database: ${config.mongo.host}`);
  });

  // print mongoose logs in dev env
  if (config.mongooseDebug) {
    mongoose.set(LOG_LEVELS.DEBUG, (collectionName: any, method: any, query: any, doc: any) => {
      debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
    });
  }

  return;
};
