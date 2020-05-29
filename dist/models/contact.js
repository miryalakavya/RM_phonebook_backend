"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
const mongoose_1 = require("mongoose");
const contactSchema = new mongoose_1.Schema({
    name: { type: String },
    email: [{ type: String }],
    contactNumber: [{ type: Number }],
    dateOfBirth: { type: Date }
});
exports.Contact = mongoose_1.model('contacts', contactSchema);
//# sourceMappingURL=contact.js.map