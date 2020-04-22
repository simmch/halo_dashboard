const xlsx = require("xlsx");
const payDates = (filename) => {
  var moment = require("moment");
  var wb = xlsx.readFile("/app/server/routes/payroll/" + filename, { cellDates: true });

  // Sheetnames from Excel
  // Also referred to as PAYDATE
  // Array
  var sheets = wb.SheetNames;

  const paydates = sheets.map((sheetname) => {
    var ws = wb.Sheets[sheetname];
    var data = xlsx.utils.sheet_to_json(ws);

    var payload = {
      PAYDATE: sheetname,
      UPDATED: moment().format(),
    };
    return payload;
  });

  return paydates;
};

module.exports = payDates;
