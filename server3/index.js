const mongoose = require('mongoose');
const util = require('util');
const Logger = require('./config/logger');

const debug = require('debug')('express-mongoose-es6-rest-api:index');

// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign


// config should be imported before importing any other file
const config = require('./config/config');
const app = require('./config/express');

if (!config.port) {
    process.exit(1);
}

// plugin bluebird promise in mongoose
mongoose.Promise = Promise;

// connect to mongo db
const mongoUri = config.mongo.host;
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive: 1,
});

mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${mongoUri}`);
});

// print mongoose logs in dev env
if (config.mongooseDebug) {
    mongoose.set('debug', (collectionName, method, query, doc) => {
        debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
    });
}


// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {

    app.listen(config.port, (err) => {
        if (err) {
            Logger.error(err);
            process.exit(1);

            return;
        }

        Logger.info(`###### Server listening on port: ${config.port} (${config.env}) ######`);
    });

}

/**
 * Unhandled promise rejections are deprecated.
 * In the future, promise rejections that are not handled
 * will terminate the Node.js process with a non-zero exit code.
 * This function will prevent app from crashing.
 * */
process.on('unhandledRejection', (error) => {
  Logger.error('unhandledRejection', error);
});

module.exports = app;
