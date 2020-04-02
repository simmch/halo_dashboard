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
            EUID: record.EUID || "",
            EMP: record.Employee || "",
            WRKD_FLG: record.__EMPTY || "",
            HRS_VER_FLG: record.__EMPTY_1 || "",
            BNS_FLG: record.__EMPTY_2 || "",
            TIMESHEET_FLG: record.__EMPTY_3 || "",
            PICKUP_PAY_FLG: record.__EMPTY_4 || "",
            ADJ_FLG: record.__EMPTY_5 || "",
            ADJUSTMENT: record.Adjustment || "",
            SP_RATE: record.Special_Rate || "",
            NOTES: record.notes || "",
            REG_HRS: record.REG_HOURS || "",
            SCH_HRS: record.SCH_HOURS || "",
            UNVH: record.UNVH || "",
            S: record.S || "",
            TS_HRS: record.TS_HOURS || "",
            SUP: record.SUP || "",
            SDP: record.SDP || "",
            BNS_HRS: record.BONUS_HOURS || "",
            BNS_RATE: record.BONUS_RATE || "",
            BNS_HRS_B: record.BONUS_HOURS_B || "",
            BNS_RATE_B: record.BONUS_HOURS_B || "",
            BNS_HR_C: record.BONUS_HR_C || "",
            BNS_RATE_C: record.BONUS_RATE_C || "",
            BNS_HR_D: record.BONUS_HR_D || "",
            BNS_RATE_D: record.BONUS_RATE_D || "",
            DATE: sheetname
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
