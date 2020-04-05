const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PayDateSchema = new Schema({
  PAYDATE: { type: String, required: true, unique: true },
  UPDATED: { type: Date, required: true },
});

const PayDates = mongoose.model("paydates", PayDateSchema);

module.exports = PayDates;
