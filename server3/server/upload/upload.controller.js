const DataForm = require( '../helpers/DataForm' );
const FileUpload = require( '../helpers/FileUpload' );
const fs = require('fs');
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);
const passport = require('passport');

/**
 * uploadSingle new user
 * @property {blob} req.file - The username of user.
 * @returns {string}
 */
async function uploadSingle(req, res, next) {
  try
  {
    console.log( 'inside uploadSingle!! ' );
    const uploadImage = await FileUpload.upload(req.file);
    const storedImagePath = uploadImage.Location;

    console.log( 'inside uploadSingle!! PATH ' , storedImagePath);

    await unlinkAsync(`${'uploads/' + req.file.filename}`)

    return res.json(new DataForm(storedImagePath));
  }
  catch(err) {
    console.log('Upload error!', err);
    next(err);
  }
}

module.exports = { uploadSingle };
