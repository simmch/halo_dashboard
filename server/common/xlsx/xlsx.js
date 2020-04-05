const xlsx = require("xlsx");
const fileData = filename => {
  var moment = require("moment");
  var wb = xlsx.readFile("./files/" + filename, { cellDates: true });

  var sheets = wb.SheetNames;

  var res = sheets.map(sheetname => {
    var ws = wb.Sheets[sheetname];
    var data = xlsx.utils.sheet_to_json(ws);

    var mappedData = data
      .map(record => {
        if (record.Employee) {
          var payload = {
            EUID: record.EUID || null,
            EMP: record.Employee || null,
            WRKD_FLG: record.__EMPTY || "N/A",
            HRS_VER_FLG: record.__EMPTY_1 || "N/A",
            BNS_FLG: record.__EMPTY_2 || "N/A",
            TIMESHEET_FLG: record.__EMPTY_3 || "N/A",
            PICKUP_PAY_FLG: record.__EMPTY_4 || "N/A",
            ADJ_FLG: record.__EMPTY_5 || "N/A",
            ADJUSTMENT: record.Adjustment || "N/A",
            SP_RATE: record.Special_Rate || "N/A",
            NOTES: record.notes || "N/A",
            REG_HRS: record.REG_HOURS || 0,
            SCH_HRS: record.SCH_HOURS || 0,
            UNVH: record.UNVH || 0,
            S: record.S || "N/A",
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
            SHEET_DATE: sheetname || null,
            UPDATED: moment().format()
          };
        }
        return payload;
      })
      // Filters out undefined (empty) values
      .filter(items => {
        return items !== undefined;
      });
    return mappedData;
  });

  var final = res.reduce((acc, val) => acc.concat(val), []);
  return final;
};

module.exports = fileData;
