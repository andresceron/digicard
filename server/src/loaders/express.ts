import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import methodOverride from 'method-override';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';
import path from 'path';
import routes from '../index.route';
import errorHandler from '../helpers/error';
import { NotFoundError } from '../helpers/api-error';

export default ({ app }: { app: express.Application }) => {

  /**
   * App Configuration
   */

  /** Parse body params and attach them to req.body */
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  /** MISSING COMMENT ON WHAT IT IS FOR */
  app.use(cookieParser());
  app.use(compress());
  app.use(methodOverride());

  /**
   * Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
   * It shows the real origin IP in the heroku or Cloudwatch logs
   */
  app.enable('trust proxy');

  /** Secure apps by setting various HTTP headers */
  app.use(helmet());

  /** Enable CORS - Cross Origin Resource Sharing */
  app.use(cors());

  /** Passport configuration */
  app.use(passport.initialize());
  app.use(passport.session());
  require('../config/passport-service');

  // Serve UI dist
  const distDir = path.resolve(__dirname, '../../../ui/dist/angularnode/');
  console.log(':: distDir :: ', distDir);

  app.use(express.static(distDir));

  app.get('/', (req, res) => {
    res.sendFile(distDir);
  });

  // /** Mount all routes on /api path */
  app.use('/api', routes);

  /** catch 404 and forward to error handler */
  app.use((req: Request, res: Response, next: NextFunction) => {
    return next(new NotFoundError('API not found'));
  });

  /** ErrorHandler for all API Error */
  app.use(errorHandler);

}