"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataForm = /** @class */ (function () {
    /**
     * Creates an DataForm
     * @param {any} data - Data to return
     * @param {string} metadata - Metadata
     * @param {number} status - HTTP status code of error.
     * @param {boolean} isPublic - Whether the message should be visible to user or not.
     */
    function DataForm(data, metadata) {
        this.data = data;
        this.metadata = metadata;
        if (metadata) {
            this.metadata = metadata;
        }
    }
    return DataForm;
}());
exports.default = DataForm;
//# sourceMappingURL=data-form.js.map