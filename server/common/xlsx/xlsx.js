const xlsx = require("xlsx");
const fileData = filename => {
  var moment = require("moment");
  var wb = xlsx.readFile("./files/" + filename, { cellDates: true });
  // TODO
  // Find way to auto pull first Sheet
  // in Excel (xlsx) File
  var ws = wb.Sheets["March 28, 2020"];

  // Converts to json object
  var data = xlsx.utils.sheet_to_json(ws);

  // Maps over each record in the
  // Excel (xlsx) file and assign values
  // for storing in the database. Easy to
  // manage in case of additional values or
  // tweaks
  var mappedData = data
    .map(record => {
      if (record.Employee) {
        var payload = {
          EUID: record.EUID || "",
          EMP: record.Employee || "",
          C: record.__EMPTY || "",
          D: record.__EMPTY_1 || "",
          E: record.__EMPTY_2 || "",
          F: record.__EMPTY_3 || "",
          G: record.__EMPTY_4 || "",
          H: record.__EMPTY_5 || "",
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
          DATE: moment().format("MMMM Do YYYY")
        };
      }
      return payload;
    })
    // Filters out undefined (empty) values
    .filter(items => {
      return items !== undefined;
    });

  return mappedData;
};

module.exports = fileData;
