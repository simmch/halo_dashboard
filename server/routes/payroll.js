const express = require("express");
const router = express.Router();
const fileData = require("../common/xlsx/xlsx");
const cors = require("cors");
const multer = require("multer");
const moment = require("moment");
const Payroll = require("../model/database/payroll");

// @Type File Uploader Settings
// @desc Settings for uploading file from Client
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "files");
  },
  filename: (req, file, cb) => {
    cb(null, moment().format("MMMM Do YYYY") + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage }).single("file");

router.get("/test", (req, res) => {
  console.log("Payroll hit by frontend");
});

// @route   POST payroll/upload
// @desc    Save file data to database
// @access  Admin
router.post("/upload", (req, res) => {
  upload(req, res, err => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }

    try {
      let filename = req.file.filename;
      let data = fileData(filename);

      data.map(record => {
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
          SHEET_DATE: record.SHEET_DATE,
          UPDATED: record.UPDATED
        })
          .save()
          .catch(err => {
            console.error("ERROR SAVING FILE DATA: " + err);
          });
      });
      console.log("SUCCESS SAVING TO DB");
      res.status(200).send(req.file);
    } catch (err) {
      console.error("ERROR SAVING TO DB: " + err);
      res.status(500).json({ msg: err });
    }
  });
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
    res.status(500).send(err);
  }
});

// @route  GET payroll/records/:euid
// @desc   Get records by EUID
// @access Public
router.get("/records/euid/:EUID", async (req, res) => {
  try {
    const record = await Payroll.findOne({
      EUID: req.params.EUID
    });
    res.status(200).json(record);
    console.log(record);
  } catch (err) {
    console.error("ERROR GETTING RECORD BY EUID: " + err);
    res.status(404).send(err);
  }
});

// @route  GET payroll/records/:sheet_date
// @desc   Get all records by SHEET_DATE
// @access Public
router.get("/records/sheet_date/:SHEET_DATE", async (req, res) => {
  try {
    const record = await Payroll.find({
      SHEET_DATE: req.params.SHEET_DATE
    });
    res.status(200).json(record);
  } catch (err) {
    res.status(500).json({ msg: "ERROR FETCHING BY SHEET DATE" + err });
    console.error("ERROR FETCHING BY SHEET DATE: " + err);
  }
});

// @route POST payroll/records/new
// @desc  Save new record
// @acc   Public
router.post("/records/new", async (req, res) => {
  if (!req.body.EMP || !req.body.EUID || !req.body.SHEET_DATE) {
    res.status(500).json({ msg: "EMPTY RECORD" });
  } else {
    try {
      const exists = await Payroll.find({
        EUID: req.body.EUID,
        EMP: req.body.EMP,
        SHEET_DATE: req.body.SHEET_DATE
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
        SHEET_DATE: req.body.SHEET_DATE,
        UPDATED: moment().format()
      });

      await record.save();
      res.status(200).json({ msg: "RECORD SAVED" });
    } catch (err) {
      res.status(500).json({ msg: "ERROR SAVING NEW RECORD: " + err });
      console.error("ERROR SAVING NEW RECORD: " + err);
      console.log(req.body);
    }
  }
});

// @route DELETE payroll/record/remove
// @desc  Removes record
// @acc   Public
router.delete("/records/remove/:id", async (req, res) => {
  try {
    const record = await Payroll.findById(req.params.id);
    if (!record) {
      res.status(404).json({ msg: "Record Not found" });
    }

    record.remove();
    res.status(200).json({ msg: "RECORD DELETED" });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
});

module.exports = router;
