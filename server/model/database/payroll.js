const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PayrollSchema = new Schema({
  EUID: Number,
  EMP: String,
  C: String,
  D: String,
  E: String,
  F: String,
  G: String,
  H: String,
  SP_RATE: String,
  NOTES: String,
  REG_HRS: Number,
  SCH_HRS: Number,
  UNVH: Number,
  S: String,
  TS_HRS: String,
  SUP: Number,
  SDP: Number,
  BNS_HRS: Number,
  BNS_RATE: Number,
  BNS_HRS_B: Number,
  BNS_RATE_B: Number,
  BNS_HR_C: Number,
  BNS_RATE_C: Number,
  BNS_HR_D: Number,
  BNS_RATE_D: Number,
  DATE: String
});

const Payroll = mongoose.model("payroll", PayrollSchema);

module.exports = Payroll;
