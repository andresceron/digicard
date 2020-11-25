export default class DataForm {
  data: Record<string, unknown>;
  metadata: string | undefined;

  /**
   * Creates an DataForm
   * @param {any} data - Data to return
   * @param {string} metadata - Metadata
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */

  constructor(data: any, metadata?: string | undefined) {
    this.data = data;
    this.metadata = metadata;

    if (metadata) {
      this.metadata = metadata;
    }
  }
}
