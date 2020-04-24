const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AssociateSchema = new Schema({
    ID: { type: String, required: true, unique: true },
    FIRSTNAME: { type: String, required: true },
    LASTNAME: { type: String, required: true },
    POSITION: { type: String, required: true },
    UPDATED: { type: Date, required: true },
})

const Associates = mongoose.model('associates', AssociateSchema);

module.exports = Associates;