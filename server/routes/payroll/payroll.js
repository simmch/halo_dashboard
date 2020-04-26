const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const fileData = require("../../common/xlsx/xlsx");
const path = require("path");
const payDates = require("../../common/xlsx/paydates");
const multer = require("multer");
const moment = require("moment");
const Payroll = require("../../model/database/payroll/payroll");
const PayDates = require("../../model/database/payroll/paydates");
const Associate = require("../../model/database/associate/associates");
const fs = require('fs');

// @Type File Uploader Settings
// @desc Settings for uploading file from Client
let fileDestination = '';

if (process.env.NODE_ENV !== 'production') {
  fileDestination = 'files';
} else {
  fileDestination = path.resolve(__dirname, './');
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, fileDestination);
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
              console.log("Success saving Pay Date to Database");
            })
            .catch((err) => {
              console.error("Error saving Pay Date to Database: " + err);
            });
        });

        data.map((record) => {
          new Associate({
            ID: record.ID,
            POSITION: record.POSITION,
            FIRSTNAME: record.FIRSTNAME,
            LASTNAME: record.LASTNAME,
            UPDATED: record.UPDATED
          }).save()
            .catch((err) => {
              console.error("Error saving New Associate: " + err);
            });
        })

        data.map((record) => {
          new Payroll({
            ID: record.ID,
            POSITION: record.POSITION,
            FIRSTNAME: record.FIRSTNAME,
            LASTNAME: record.LASTNAME,
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
            VRF_HRS: record.VRF_HRS,
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
              console.error("Error saving File Data: " + err);
            });
        });
        res.status(200).send({ success: [{ msg: "File uploaded successfully." }] })
      }).catch(err => console.log(err));
      // DELETES FILE
      // const path = '/Users/csim15/Desktop/halo_dashboard/server/files/' + filename;
      // fs.unlinkSync(path);
    } catch (err) {
      res.status(500).json({ errors: [{ msg: "Error saving to Database: " + err }] });
    }
  });
});

// @route POST payroll/records/new
// @desc  Save new record
// @acc   Admin
router.post("/records/new", auth, async (req, res) => {

  if (!req.body.ID || !req.body.PAYDATE) {
    res.status(500).json({ errors: [{ msg: "Invalid Format" }] });
  } else {
    try {
      const exists = await Payroll.find({
        ID: req.body.ID,
        PAYDATE: req.body.PAYDATE,
      });

      if (exists.UPDATED) {
        console.log("EXISTS" + exists);
        throw new Error(0);
      }

      const record = new Payroll({
        ID: req.body.ID || 0,
        POSITION: req.body.POSITION || 0,
        FIRSTNAME: req.body.FIRSTNAME || 'N',
        LASTNAME: req.body.LASTNAME || 'N',
        WRKD_FLG: req.body.WRKD_FLG || 'N',
        HRS_VER_FLG: req.body.HRS_VER_FLG || 'N',
        BNS_FLG: req.body.BNS_FLG || 'N',
        TIMESHEET_FLG: req.body.TIMESHEET_FLG || 'N',
        PICKUP_PAY_FLG: req.body.PICKUP_PAY_FLG || 'N',
        ADJ_FLG: req.body.ADJ_FLG || 'N',
        ADJUSTMENT: req.body.ADJUSTMENT || 'N',
        SP_RATE: req.body.SP_RATE || 'N',
        NOTES: req.body.NOTES || 'N',
        REG_HRS: req.body.REG_HRS || 0,
        SCH_HRS: req.body.SCH_HRS || 0,
        UNVH: req.body.UNVH || 0,
        VRF_HRS: req.body.VRF_HRS || 0,
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
    res.status(500).json({ errors: [{ msg: "Invalid Format" }] });
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

// @route POST payroll/associate/new
// @desc  Save new Pay Date
// @acc   Admin
router.post("/associate/new", auth, async (req, res) => {
  if (!req.body.ID) {
    res.status(500).json({ errors: [{ msg: "Invalid Format" }] });
  } else {
    try {

      const associate = new Associate({
        ID: req.body.ID,
        POSITION: req.body.POSITION,
        FIRSTNAME: req.body.FIRSTNAME,
        LASTNAME: req.body.LASTNAME,
        UPDATED: moment().format(),
      });
      await associate.save();
      res.status(200).json({ success: [{ msg: "Associate has been saved." }] });
    } catch (err) {
      res.status(500).json({ errors: [{ msg: "Error saving new Associate: " + err }] });
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
    console.error("Error getting ALL records: " + err);
    res.status(500).send({ errors: [{ msg: err }] });
  }
});

// @route  GET payroll/paydates/all
// @desc   Get all paydates
// @access Public
router.get("/records/paydates/all", async (req, res) => {
  try {
    const paydates = await PayDates.find();
    res.status(200).json(paydates)
  } catch (err) {
    console.log("Error getting ALL Pay Dates: " + err);
    res.status(500).send({ errors: [{ msg: err }] });
  }
})

// @route  GET payroll/associate/all
// @desc   Get all associates
// @access Public
router.get("/records/associates/all", async (req, res) => {
  try {
    const associate = await Associate.find();
    res.status(200).json(associate)
  } catch (err) {
    console.log("Error getting ALL Associates: " + err);
    res.status(500).send({ errors: [{ msg: "Can not retrieve associates: " + err }] });
  }
})

// @route  GET payroll/associate/id/:id
// @desc   Get records by ID
// @access Public
router.get("/records/associate/id/:ID", async (req, res) => {
  try {
    const associate = await Associate.find({
      ID: req.params.ID,
    });

    if (associate.length !== 0) {
      res.status(200).json(associate);
    } else {
      res.status(500).send({ errors: [{ msg: "Associate does not exist." }] })
    }
  } catch (err) {
    res.status(404).send({ errors: [{ msg: "Error getting associate by ID: " + err }] });
  }
});

// @route  GET payroll/records/euid/:euid
// @desc   Get records by EUID
// @access Public
router.get("/records/euid/:ID", async (req, res) => {
  try {
    const record = await Payroll.find({
      ID: req.params.ID,
    });

    if (record.length !== 0) {
      res.status(200).json(record);
    } else {
      res.status(500).send({ errors: [{ msg: "No Payroll for Associate." }] })
    }
  } catch (err) {
    res.status(404).send({ errors: [{ msg: "Error getting record by ID: " + err }] });
  }
});

// @route  GET payroll/records/:pay_date
// @desc   Get all records by PAYDATE
// @access Public
router.get("/records/sheet_date/:PAYDATE", async (req, res) => {
  try {
    const record = await Payroll.find({
      PAYDATE: req.params.PAYDATE,
    })

    if (!record[0]) {
      res.status(400).json({ errors: [{ msg: "No Payroll Data for this Pay Date." }] })
    } else {
      res.status(200).json(record);
    }
  } catch (err) {
    res.status(500).json({ errors: [{ msg: "Error Fetching Pay Date: " + err }] });
  }
});


// @route DELETE payroll/records/remove
// @desc  Removes Record
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

// @route DELETE payroll/associates/remove
// @desc  Removes Associate
// @acc   Admin
router.delete("/records/associate/remove/:id", auth, async (req, res) => {
  try {
    const associate = await Associate.findById(req.params.id);

    associate.remove();
    res.status(200).json({ success: [{ msg: "Associate has been deleted." }] });
  } catch (err) {
    res.status(500).json({ errors: [{ msg: err }] });
  }
});

// @route DELETE payroll/records/paydate/remove
// @desc  Removes Pay Date
// @acc   Admin
router.delete("/records/paydate/remove/:id", async (req, res) => {
  try {
    const paydate = await PayDates.findById(req.params.id);

    paydate.remove();
    res.status(200).json({ success: [{ msg: "Pay Date has been deleted." }] });
  } catch (err) {
    res.status(500).json({ errors: [{ msg: "Pay Date error: " + err }] });
  }
})

// @route UPDATE payroll/records/update
// @desc Updates record
// @acc Admin
router.put("/records/update/:id", async (req, res) => {
  try {
    const data = {
      ID: req.body.ID,
      POSITION: req.body.POSITION,
      FIRSTNAME: req.body.FIRSTNAME,
      LASTNAME: req.body.LASTNAME,
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
      VRF_HRS: req.body.VRF_HRS,
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

// @route UPDATE payroll/associate/update
// @desc Updates associate
// @acc Admin
router.put("/associate/update/:id", async (req, res) => {
  try {
    const data = {
      ID: req.body.ID,
      POSITION: req.body.POSITION,
      FIRSTNAME: req.body.FIRSTNAME,
      LASTNAME: req.body.LASTNAME,
      UPDATED: moment().format(),
    };
    const associate = await Associate.findByIdAndUpdate(req.params.id, data, (err, result) => {
      if (err) {
        res.status(500).send({ errors: [{ msg: err }] });
      } else {
        res.status(200).send({ success: [{ msg: "Successfully updated Associate data." }] });
      }
    });

  } catch (err) {
    console.log(err)
  }
})

module.exports = router;
