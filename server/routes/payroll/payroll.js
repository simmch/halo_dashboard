const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const fileData = require("../../common/xlsx/xlsx");
const path = require("path");
const payDates = require("../../common/paydates");
const multer = require("multer");
const moment = require("moment");
const Payroll = require("../../model/database/payroll/payroll");
const PayDates = require("../../model/database/payroll/paydates");
const fs = require('fs');

// @Type File Uploader Settings
// @desc Settings for uploading file from Client
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'files');
  },
  filename: (req, file, cb) => {
    cb(null, moment().format("MMMM Do YYYY") + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("file");

// @route   POST payroll/upload
// @desc    Save file data to database
// @access  Admin
router.post("/upload", auth, (req, res) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ errors: [{ msg: err }] });
    } else if (err) {
      return res.status(500).json({ errors: [{ msg: err }] });
    }

    try {
      let filename = req.file.filename;
      let data = fileData(filename);
      let paydates = payDates(filename);

      console.log("FILENAME: " + filename + ", " + "DATA: " + data)

      const exist = paydates.map(record => {
        var exists = PayDates.find({
          PAYDATE: record.PAYDATE
        })
        return exists;
      })

      Promise.all(exist).then(response => {

        const recordsArray = [];

        response.map(record => {
          record.map(item => {
            recordsArray.push(item)
          })
        });

        let isExist = null;

        recordsArray.map(record => {
          if (record.PAYDATE) {
            isExist = record.UPDATED;
          }
        })

        if (isExist) {
          return res.status(500).send({ errors: [{ msg: "Record already exists. Added on: " + isExist }] })
        }

        paydates.map((record) => {
          new PayDates({
            PAYDATE: record.PAYDATE,
            UPDATED: record.UPDATED,
          })
            .save()
            .then(() => {
              console.log("SUCCESS SAVING PAYDATES TO DB!");
            })
            .catch((err) => {
              console.error("ERROR SAVING PAYDATES DATA: " + err);
            });
        });

        data.map((record) => {
          new Payroll({
            EUID: record.EUID,
            EMP: record.EMP,
            WRKD_FLG: record.WRKD_FLG,
            HRS_VER_FLG: record.HRS_VER_FLG,
            BNS_FLG: record.BNS_FLG,
            TIMESHEET_FLG: record.TIMESHEET_FLG,
            PICKUP_PAY_FLG: record.PICKUP_PAY_FLG,
            ADJ_FLG: record.ADJ_FLG,
            ADJUSTMENT: record.ADJUSTMENT,
            SP_RATE: record.SP_RATE,
            NOTES: record.NOTES,
            REG_HRS: record.REG_HRS,
            SCH_HRS: record.SCH_HRS,
            UNVH: record.UNVH,
            S: record.S,
            TS_HRS: record.TS_HRS,
            SUP: record.SUP,
            SDP: record.SDP,
            BNS_HRS: record.BNS_HRS,
            BNS_RATE: record.BNS_RATE,
            BNS_HRS_B: record.BNS_HRS_B,
            BNS_RATE_B: record.BNS_RATE_B,
            BNS_HR_C: record.BNS_HR_C,
            BNS_RATE_C: record.BNS_RATE_C,
            BNS_HR_D: record.BNS_HR_D,
            BNS_RATE_D: record.BNS_RATE_D,
            PAYDATE: record.PAYDATE,
            UPDATED: record.UPDATED,
          })
            .save()
            .catch((err) => {
              console.error("ERROR SAVING FILE DATA: " + err);
            });
        });
        res.status(200).send({ success: [{ msg: "File uploaded successfully." }] })
      }).catch(err => console.log(err));
      // const path = '/Users/csim15/Desktop/halo_dashboard/server/files/' + filename;
      // fs.unlinkSync(path);
    } catch (err) {
      res.status(500).json({ errors: [{ msg: "ERROR SAVING TO Database: " + err }] });
    }
  });
});

// @route POST payroll/records/new
// @desc  Save new record
// @acc   Admin
router.post("/records/new", auth, async (req, res) => {

  if (!req.body.EMP || !req.body.EUID || !req.body.PAYDATE) {
    res.status(500).json({ errors: [{ msg: "INVALID RECORD" }] });
  } else {
    try {
      const exists = await Payroll.find({
        EUID: req.body.EUID,
        EMP: req.body.EMP,
        PAYDATE: req.body.PAYDATE,
      });

      if (exists.UPDATED) {
        console.log("EXISTS" + exists);
        throw new Error(0);
      }

      const record = new Payroll({
        EUID: req.body.EUID || 0,
        EMP: req.body.EMP || 'N/A',
        WRKD_FLG: req.body.WRKD_FLG || 'N/A',
        HRS_VER_FLG: req.body.HRS_VER_FLG || 'N/A',
        BNS_FLG: req.body.BNS_FLG || 'N/A',
        TIMESHEET_FLG: req.body.TIMESHEET_FLG || 'N/A',
        PICKUP_PAY_FLG: req.body.PICKUP_PAY_FLG || 'N/A',
        ADJ_FLG: req.body.ADJ_FLG || 'N/A',
        ADJUSTMENT: req.body.ADJUSTMENT || 'N/A',
        SP_RATE: req.body.SP_RATE || 'N/A',
        NOTES: req.body.NOTES || 'N/A',
        REG_HRS: req.body.REG_HRS || 0,
        SCH_HRS: req.body.SCH_HRS || 0,
        UNVH: req.body.UNVH || 0,
        S: req.body.S || 'N/A',
        TS_HRS: req.body.TS_HRS || 0,
        SUP: req.body.SUP || 0,
        SDP: req.body.SDP || 0,
        BNS_HRS: req.body.BNS_HRS || 0,
        BNS_RATE: req.body.BNS_RATE || 0,
        BNS_HRS_B: req.body.BNS_HRS_B || 0,
        BNS_RATE_B: req.body.BNS_RATE_B || 0,
        BNS_HR_C: req.body.BNS_HR_C || 0,
        BNS_RATE_C: req.body.BNS_RATE_C || 0,
        BNS_HR_D: req.body.BNS_HR_D || 0,
        BNS_RATE_D: req.body.BNS_RATE_D || 0,
        PAYDATE: req.body.PAYDATE,
        UPDATED: moment().format(),
      });

      await record.save();

      const paydates = new PayDates({
        PAYDATE: req.body.PAYDATE,
        UPDATED: moment().format(),
      });
      await paydates.save().then(() => {
        console.log("Paydates Saved.")
      }).catch((err) => {
        console.log(err)
      })
      res.status(200).json({ success: [{ msg: "Record has been saved." }] });
    } catch (err) {
      res.status(500).json({ errors: [{ msg: "Error saving new record: " + err }] });
    }
  }
});

// @route POST payroll/records/date/new
// @desc  Save new Pay Date
// @acc   Admin
router.post("/records/date/new", auth, async (req, res) => {
  if (!req.body.NEWPAYDATE) {
    res.status(500).json({ errors: [{ msg: "INVALID RECORD" }] });
  } else {
    try {

      const paydates = new PayDates({
        PAYDATE: req.body.NEWPAYDATE,
        UPDATED: moment().format(),
      });
      await paydates.save();
      res.status(200).json({ success: [{ msg: "Pay Date has been saved." }] });
    } catch (err) {
      res.status(500).json({ errors: [{ msg: "Error saving new Pay Date: " + err }] });
    }
  }
});

// @route  GET payroll/records/all
// @desc   Get all records
// @access Public
router.get("/records/all", async (req, res) => {
  try {
    const records = await Payroll.find();
    res.status(200).json(records);
  } catch (err) {
    console.error("ERROR GETTING ALL RECORDS: " + err);
    res.status(500).send({ errors: [{ msg: err }] });
  }
});

router.get("/records/paydates/all", async (req, res) => {
  try {
    const paydates = await PayDates.find();
    res.status(200).json(paydates)
  } catch (err) {
    console.log("ERROR GETTING PAYDATES: " + err);
    res.status(500).send({ errors: [{ msg: err }] });
  }
})

// @route  GET payroll/records/euid/:euid
// @desc   Get records by EUID
// @access Public
router.get("/records/euid/:EUID", async (req, res) => {
  try {
    const record = await Payroll.find({
      EUID: req.params.EUID,
    });

    if (record.length !== 0) {
      res.status(200).json(record);
    } else {
      res.status(500).send({ errors: [{ msg: "Record does not exist" }] })
    }
  } catch (err) {
    res.status(404).send({ errors: [{ msg: "ERROR GETTING RECORD BY EUID: " + err }] });
  }
});

// @route  GET payroll/records/:pay_date
// @desc   Get all records by PAYDATE
// @access Public
router.get("/records/sheet_date/:PAYDATE", async (req, res) => {
  try {
    const record = await Payroll.find({
      PAYDATE: req.params.PAYDATE,
    });
    res.status(200).json(record);
  } catch (err) {
    res.status(500).json({ errors: [{ msg: "ERROR FETCHING BY SHEET DATE" + err }] });
  }
});


// @route DELETE payroll/records/remove
// @desc  Removes record
// @acc   Admin
router.delete("/records/remove/:id", auth, async (req, res) => {
  try {
    const record = await Payroll.findById(req.params.id);

    record.remove();
    res.status(200).json({ success: [{ msg: "Record has been deleted." }] });
  } catch (err) {
    res.status(500).json({ errors: [{ msg: err }] });
  }
});

// @route UPDATE payroll/records/update
// @desc Updates record
// @acc Admin
router.put("/records/update/:id", async (req, res) => {
  try {
    const data = {
      EUID: req.body.EUID,
      EMP: req.body.EMP,
      WRKD_FLG: req.body.WRKD_FLG,
      HRS_VER_FLG: req.body.HRS_VER_FLG,
      BNS_FLG: req.body.BNS_FLG,
      TIMESHEET_FLG: req.body.TIMESHEET_FLG,
      PICKUP_PAY_FLG: req.body.PICKUP_PAY_FLG,
      ADJ_FLG: req.body.ADJ_FLG,
      ADJUSTMENT: req.body.ADJUSTMENT,
      SP_RATE: req.body.SP_RATE,
      NOTES: req.body.NOTES,
      REG_HRS: req.body.REG_HRS,
      SCH_HRS: req.body.SCH_HRS,
      UNVH: req.body.UNVH,
      S: req.body.S,
      TS_HRS: req.body.TS_HRS,
      SUP: req.body.SUP,
      SDP: req.body.SDP,
      BNS_HRS: req.body.BNS_HRS,
      BNS_RATE: req.body.BNS_RATE,
      BNS_HRS_B: req.body.BNS_HRS_B,
      BNS_RATE_B: req.body.BNS_RATE_B,
      BNS_HR_C: req.body.BNS_HR_C,
      BNS_RATE_C: req.body.BNS_RATE_C,
      BNS_HR_D: req.body.BNS_HR_D,
      BNS_RATE_D: req.body.BNS_RATE_D,
      PAYDATE: req.body.PAYDATE,
      UPDATED: moment().format(),
    };
    const record = await Payroll.findByIdAndUpdate(req.params.id, data, (err, result) => {
      if (err) {
        res.status(500).send({ errors: [{ msg: err }] });
      } else {
        res.status(200).send({ success: [{ msg: "Successfully updated the record." }] });
      }
    });

  } catch (err) {
    console.log(err)
  }
})

module.exports = router;
