const httpStatus = require('http-status');

class DataForm {
  /**
   * Creates an DataForm
   * @param {any} data - Data to return
   * @param {string} metadata - Metadata
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor(data, metadata) {
    this.data = data;

    if (metadata) {
      this.metadata = metadata;
    }
  }

}

module.exports = DataForm;
