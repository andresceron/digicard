import 'reflect-metadata';
import config from './config/config';
import Logger from './loaders/logger';
import express from 'express';
import mongooseConfig from './config/mongoose';

async function startServer() {
  const app = express();

  if (!config.port) {
    process.exit(1);
  }

  await require('./loaders').default({ expressApp: app });

  // configure mongoose
  mongooseConfig();

  /**
   * Server Application
   */
  app.listen(config.port, () => {
    Logger.info(`⚡️[server] Running on port: ${config.port} ⚡️`);
  });

  /**
   * Unhandled promise rejections are deprecated.
   * In the future, promise rejections that are not handled
   * will terminate the Node.js process with a non-zero exit code.
   * This function will prevent app from crashing.
   */
  process.on('unhandledRejection', (error) => {
    Logger.error('unhandledRejection', error);
  });
}

startServer();
