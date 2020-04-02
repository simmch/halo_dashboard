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
// @desc    Save date to database
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
          DATE: record.DATE
        }).save();
      });
      console.log("SUCCESS SAVING TO DB");
      res.status(200).send(req.file);
    } catch (err) {
      console.error("ERROR SAVING TO DB: " + err);
      res.status(500).send(err);
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
router.get("/records/:EUID", async (req, res) => {
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

module.exports = router;
