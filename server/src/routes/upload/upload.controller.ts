import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import { promisify } from 'util';
import * as fileUpload from  '../../helpers/file-upload';
import DataForm from '../../helpers/data-form';
import { InternalServerError } from '../../helpers/api-error';

// TODO: Move to service
const unlinkAsync = promisify(fs.unlink);

/**
 * uploadSingle new user
 * @property {blob} req.file - The username of user.
 * @returns {string}
 */

export const uploadSingle = async(req: Request, res: Response, next: NextFunction) => {
  try
  {
    const uploadImage = await fileUpload.upload(req.file);
    const storedImagePath = uploadImage.Location;

    await unlinkAsync(`${'uploads/' + req.file.filename}`)
    return res.json(new DataForm(storedImagePath));
  }
  catch(err) {
    console.log('Upload error!', err);
    // TODO: Check this
    return next(new InternalServerError(err));
  }
}