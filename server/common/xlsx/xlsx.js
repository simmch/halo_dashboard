const xlsx = require("xlsx");
const fileData = (filename) => {
  var moment = require("moment");
  if (process.env.NODE_ENV !== 'production') {
    var wb = xlsx.readFile("./files/" + filename, { cellDates: true });
  } else {
    var wb = xlsx.readFile("/app/server/routes/payroll/" + filename, { cellDates: true });
  }


  // Sheetnames from Excel
  // Also referred to as PAYDATE
  // Array
  var sheets = wb.SheetNames;

  var res = sheets.map((sheetname) => {
    var ws = wb.Sheets[sheetname];
    var data = xlsx.utils.sheet_to_json(ws);

    var mappedData = data
      .map((record) => {
        if (record.ID) {
          var payload = {
            ID: record.ID || 0,
            POSITION: record.Position || 0,
            FIRSTNAME: record.F_name || "N",
            LASTNAME: record.L_name || "N",
            WRKD_FLG: record.__EMPTY || "N",
            HRS_VER_FLG: record.__EMPTY_1 || "N",
            BNS_FLG: record.__EMPTY_2 || "N",
            TIMESHEET_FLG: record.__EMPTY_3 || "N",
            PICKUP_PAY_FLG: record.__EMPTY_4 || "N",
            ADJ_FLG: record.__EMPTY_5 || "N",
            ADJUSTMENT: record.Adjustment || "N",
            SP_RATE: record.Special_Rate || "N",
            NOTES: record.notes || "N",
            REG_HRS: record.REG_HOURS || 0,
            SCH_HRS: record.SCH_HOURS || 0,
            UNVH: record.UNVH || 0,
            VRF_HRS: record.Verified_Hours || 0,
            TS_HRS: record.TS_HOURS || 0,
            SUP: record.SUP || 0,
            SDP: record.SDP || 0,
            BNS_HRS: record.BONUS_HOURS || 0,
            BNS_RATE: record.BONUS_RATE || 0,
            BNS_HRS_B: record.BONUS_HOURS_B || 0,
            BNS_RATE_B: record.BONUS_HOURS_B || 0,
            BNS_HR_C: record.BONUS_HR_C || 0,
            BNS_RATE_C: record.BONUS_RATE_C || 0,
            BNS_HR_D: record.BONUS_HR_D || 0,
            BNS_RATE_D: record.BONUS_RATE_D || 0,
            PAYDATE: sheetname || '',
            UPDATED: moment().format(),
          };
        }
        return payload;
      })
      // Filters out undefined (empty) values
      .filter((items) => {
        return items !== undefined;
      });
    return mappedData;
  });

  var final = res.reduce((acc, val) => acc.concat(val), []);

  return final;
};

module.exports = fileData;
