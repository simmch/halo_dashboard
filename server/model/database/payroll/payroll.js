const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PayrollSchema = new Schema({
  EUID: { type: Number, required: false },
  EMP: { type: String, required: false },
  WRKD_FLG: { type: String, required: false },
  HRS_VER_FLG: { type: String, required: false },
  BNS_FLG: { type: String, required: false },
  TIMESHEET_FLG: { type: String, required: false },
  PICKUP_PAY_FLG: { type: String, required: false },
  ADJ_FLG: { type: String, required: false },
  ADJUSTMENT: { type: String, required: false },
  SP_RATE: { type: String, required: false },
  NOTES: { type: String, required: false },
  REG_HRS: { type: Number, required: false },
  SCH_HRS: { type: Number, required: false },
  UNVH: { type: Number, required: false },
  S: { type: String, required: false },
  TS_HRS: { type: Number, required: false },
  SUP: { type: Number, required: false },
  SDP: { type: Number, required: false },
  BNS_HRS: { type: Number, required: false },
  BNS_RATE: { type: Number, required: false },
  BNS_HRS_B: { type: Number, required: false },
  BNS_RATE_B: { type: Number, required: false },
  BNS_HR_C: { type: Number, required: false },
  BNS_RATE_C: { type: Number, required: false },
  BNS_HR_D: { type: Number, required: false },
  BNS_RATE_D: { type: Number, required: false },
  PAYDATE: { type: String, required: false },
  UPDATED: { type: Date, required: false },
});

const Payroll = mongoose.model("payroll", PayrollSchema);

module.exports = Payroll;
