const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const fileData = require("../../common/xlsx/xlsx");
const payDates = require("../../common/payDates");
const multer = require("multer");
const moment = require("moment");
const Payroll = require("../../model/database/payroll/payroll");
const PayDates = require("../../model/database/payroll/paydates");
const User = require("../../model/database/user/user");

// @Type File Uploader Settings
// @desc Settings for uploading file from Client
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "files");
  },
  filename: (req, file, cb) => {
    cb(null, moment().format("MMMM Do YYYY") + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("file");

// @route   POST payroll/upload
// @desc    Save file data to database
// @access  Admin
router.post("/upload", (req, res) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ errors: [{ msg: err }] });
    } else if (err) {
      return res.status(500).json({ errors: [{ msg: err }] });
    }

    try {
      // const user = await User.findOne({ user: req.user.id });
      // console.log(user);
      let filename = req.file.filename;
      let data = fileData(filename);
      let paydates = payDates(filename);

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
            PAY_DATE: record.PAY_DATE,
            UPDATED: record.UPDATED,
          })
            .save()
            .catch((err) => {
              console.error("ERROR SAVING FILE DATA: " + err);
            });
        });
        res.status(200).send({ success: [{ msg: "File uploaded successfully." }] })
      }).catch(err => console.log(err));
    } catch (err) {
      res.status(500).json({ errors: [{ msg: "ERROR SAVING TO Database: " + err }] });
    }
  });
});

// @route POST payroll/records/new
// @desc  Save new record
// @acc   Public
router.post("/records/new", async (req, res) => {
  if (!req.body.EMP || !req.body.EUID || !req.body.PAY_DATE) {
    res.status(500).json({ errors: [{ msg: "INVALID RECORD" }] });
  } else {
    try {
      const exists = await Payroll.find({
        EUID: req.body.EUID,
        EMP: req.body.EMP,
        PAY_DATE: req.body.PAY_DATE,
      });

      if (exists.UPDATED) {
        console.log("EXISTS" + exists);
        throw new Error(0);
      }

      const record = new Payroll({
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
        PAY_DATE: req.body.PAY_DATE,
        UPDATED: moment().format(),
      });

      const paydates = new PayDates({
        PAYDATE: record.PAYDATE,
        UPDATED: moment().format(),
      });

      await record.save();
      await paydates.save();
      res.status(200).json({ success: [{ msg: "Record has been saved." }] });
    } catch (err) {
      res.status(500).json({ errors: [{ msg: "Error saving new record: " + err }] });
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
    res.status(200).json(record);
    console.log(record);
  } catch (err) {
    res.status(404).send({ errors: [{ msg: "ERROR GETTING RECORD BY EUID: " + err }] });
  }
});

// @route  GET payroll/records/:pay_date
// @desc   Get all records by PAY_DATE
// @access Public
router.get("/records/sheet_date/:PAY_DATE", async (req, res) => {
  try {
    const record = await Payroll.find({
      PAY_DATE: req.params.PAY_DATE,
    });
    res.status(200).json(record);
  } catch (err) {
    res.status(500).json({ errors: [{ msg: "ERROR FETCHING BY SHEET DATE" + err }] });
  }
});


// @route DELETE payroll/record/remove
// @desc  Removes record
// @acc   Public
router.delete("/records/remove/:id", async (req, res) => {
  try {
    const record = await Payroll.findById(req.params.id);
    if (!record) {
      res.status(404).json({ errors: [{ msg: "Record Not found" }] });
    }

    record.remove();
    res.status(200).json({ success: [{ msg: "RECORD DELETED" }] });
  } catch (err) {
    res.status(500).json({ errors: [{ msg: err }] });
  }
});

module.exports = router;
