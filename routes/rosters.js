const express = require("express");
const router = express.Router();
const Roster = require("../models/Roster");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const colors = require("colors");

// @route   GET  api/rosters
// @desc    Get all rosters
// @access  Public
router.get("/", async (req, res) => {
  const { location, weekday } = req.query;
  try {
    const rosters = await Roster.find({
      location: location,
      weekday: weekday,
    }).sort({
      sort: 1,
    });
    res.json(rosters);
  } catch (err) {
    console.error(`${err.message}`.red.bold);
    res.status(500).send("Server Error");
  }
});

// @route   PUT  api/roster/:id
// @desc    Edit roster
// @access  Private
router.put("/:id", auth, async (req, res) => {
  const { id, sort, location, weekday, time, spots } = req.body;
  // Build roster object
  const rosterFields = {};
  if (id) rosterFields._id = id;
  if (sort) rosterFields.sort = sort;
  if (location) rosterFields.location = location;
  if (weekday) rosterFields.weekday = weekday;
  if (time) rosterFields.time = time;
  if (spots) rosterFields.spots = spots;

  try {
    let roster;
    if (id) {
      roster = await Roster.findById(req.params.id);
    } else {
      roster = await Roster.findOne({
        location: location,
        weekday: weekday,
        time: time,
      });
      rosterFields.spots = roster.spots + 1;
    }

    if (!roster) return res.status(404).json({ msg: "Roster not found" });

    await Roster.findByIdAndUpdate(
      roster._id,
      { $set: rosterFields },
      { new: true }
    );

    const rosters = await Roster.find({
      location: location,
      weekday: weekday,
    }).sort({
      sort: 1,
    });
    res.json(rosters);
  } catch (err) {
    console.error(`${err.message}`.red.bold);
    res.status(500).send("Server Error");
  }
});

// @route   POST  api/rosters
// @desc    Add rosters
// @access  Admin
// router.post("/", admin, async (req, res) => {
//   const rosters = [];
//   const m0 = {
//     sort: 1,
//     time: "08:00 - 09:15",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Monday",
//   };
//   const m1 = {
//     sort: 2,
//     time: "09:15 - 10:30",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Monday",
//   };
//   const m2 = {
//     sort: 3,
//     time: "10:30 - 12:00",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Monday",
//   };
//   const m3 = {
//     sort: 4,
//     time: "12:00 - 13:15",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Monday",
//   };
//   const m4 = {
//     sort: 5,
//     time: "13:15 - 14:30",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Monday",
//   };
//   const m5 = {
//     sort: 6,
//     time: "14:30 - 15:45",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Monday",
//   };
//   const m6 = {
//     sort: 7,
//     time: "15:45 - 17:00",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Monday",
//   };
//   const m7 = {
//     sort: 8,
//     time: "17:00 - 18:15",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Monday",
//   };
//   const m8 = {
//     sort: 9,
//     time: "18:15 - 19:30",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Monday",
//   };
//   const m9 = {
//     sort: 10,
//     time: "19:30 - 20:45",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Monday",
//   };
//   const m10 = {
//     sort: 11,
//     time: "20:45 - 22:00",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Monday",
//   };
//   const m20 = {
//     sort: 1,
//     time: "08:00 - 09:15",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Monday",
//   };
//   const m21 = {
//     sort: 2,
//     time: "09:15 - 10:30",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Monday",
//   };
//   const m22 = {
//     sort: 3,
//     time: "10:30 - 12:00",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Monday",
//   };
//   const m23 = {
//     sort: 4,
//     time: "12:00 - 13:15",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Monday",
//   };
//   const m24 = {
//     sort: 5,
//     time: "13:15 - 14:30",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Monday",
//   };
//   const m25 = {
//     sort: 6,
//     time: "14:30 - 15:45",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Monday",
//   };
//   const m26 = {
//     sort: 7,
//     time: "15:45 - 17:00",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Monday",
//   };
//   const m27 = {
//     sort: 8,
//     time: "17:00 - 18:15",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Monday",
//   };
//   const m28 = {
//     sort: 9,
//     time: "18:15 - 19:30",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Monday",
//   };
//   const m29 = {
//     sort: 10,
//     time: "19:30 - 20:45",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Monday",
//   };
//   const m210 = {
//     sort: 11,
//     time: "20:45 - 22:00",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Monday",
//   };
//   const m30 = {
//     sort: 1,
//     time: "08:00 - 09:15",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Monday",
//   };
//   const m31 = {
//     sort: 2,
//     time: "09:15 - 10:30",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Monday",
//   };
//   const m32 = {
//     sort: 3,
//     time: "10:30 - 12:00",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Monday",
//   };
//   const m33 = {
//     sort: 4,
//     time: "12:00 - 13:15",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Monday",
//   };
//   const m34 = {
//     sort: 5,
//     time: "13:15 - 14:30",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Monday",
//   };
//   const m35 = {
//     sort: 6,
//     time: "14:30 - 15:45",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Monday",
//   };
//   const m36 = {
//     sort: 7,
//     time: "15:45 - 17:00",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Monday",
//   };
//   const m37 = {
//     sort: 8,
//     time: "17:00 - 18:15",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Monday",
//   };
//   const m38 = {
//     sort: 9,
//     time: "18:15 - 19:30",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Monday",
//   };
//   const m39 = {
//     sort: 10,
//     time: "19:30 - 20:45",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Monday",
//   };
//   const m310 = {
//     sort: 11,
//     time: "20:45 - 22:00",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Monday",
//   };
//   // Tuesday
//   const t0 = {
//     sort: 1,
//     time: "08:00 - 09:15",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Tuesday",
//   };
//   const t1 = {
//     sort: 2,
//     time: "09:15 - 10:30",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Tuesday",
//   };
//   const t2 = {
//     sort: 3,
//     time: "10:30 - 12:00",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Tuesday",
//   };
//   const t3 = {
//     sort: 4,
//     time: "12:00 - 13:15",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Tuesday",
//   };
//   const t4 = {
//     sort: 5,
//     time: "13:15 - 14:30",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Tuesday",
//   };
//   const t5 = {
//     sort: 6,
//     time: "14:30 - 15:45",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Tuesday",
//   };
//   const t6 = {
//     sort: 7,
//     time: "15:45 - 17:00",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Tuesday",
//   };
//   const t7 = {
//     sort: 8,
//     time: "17:00 - 18:15",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Tuesday",
//   };
//   const t8 = {
//     sort: 9,
//     time: "18:15 - 19:30",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Tuesday",
//   };
//   const t9 = {
//     sort: 10,
//     time: "19:30 - 20:45",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Tuesday",
//   };
//   const t10 = {
//     sort: 11,
//     time: "20:45 - 22:00",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Tuesday",
//   };
//   const t20 = {
//     sort: 1,
//     time: "08:00 - 09:15",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Tuesday",
//   };
//   const t21 = {
//     sort: 2,
//     time: "09:15 - 10:30",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Tuesday",
//   };
//   const t22 = {
//     sort: 3,
//     time: "10:30 - 12:00",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Tuesday",
//   };
//   const t23 = {
//     sort: 4,
//     time: "12:00 - 13:15",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Tuesday",
//   };
//   const t24 = {
//     sort: 5,
//     time: "13:15 - 14:30",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Tuesday",
//   };
//   const t25 = {
//     sort: 6,
//     time: "14:30 - 15:45",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Tuesday",
//   };
//   const t26 = {
//     sort: 7,
//     time: "15:45 - 17:00",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Tuesday",
//   };
//   const t27 = {
//     sort: 8,
//     time: "17:00 - 18:15",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Tuesday",
//   };
//   const t28 = {
//     sort: 9,
//     time: "18:15 - 19:30",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Tuesday",
//   };
//   const t29 = {
//     sort: 10,
//     time: "19:30 - 20:45",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Tuesday",
//   };
//   const t210 = {
//     sort: 11,
//     time: "20:45 - 22:00",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Tuesday",
//   };
//   const t30 = {
//     sort: 1,
//     time: "08:00 - 09:15",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Tuesday",
//   };
//   const t31 = {
//     sort: 2,
//     time: "09:15 - 10:30",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Tuesday",
//   };
//   const t32 = {
//     sort: 3,
//     time: "10:30 - 12:00",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Tuesday",
//   };
//   const t33 = {
//     sort: 4,
//     time: "12:00 - 13:15",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Tuesday",
//   };
//   const t34 = {
//     sort: 5,
//     time: "13:15 - 14:30",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Tuesday",
//   };
//   const t35 = {
//     sort: 6,
//     time: "14:30 - 15:45",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Tuesday",
//   };
//   const t36 = {
//     sort: 7,
//     time: "15:45 - 17:00",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Tuesday",
//   };
//   const t37 = {
//     sort: 8,
//     time: "17:00 - 18:15",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Tuesday",
//   };
//   const t38 = {
//     sort: 9,
//     time: "18:15 - 19:30",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Tuesday",
//   };
//   const t39 = {
//     sort: 10,
//     time: "19:30 - 20:45",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Tuesday",
//   };
//   const t310 = {
//     sort: 11,
//     time: "20:45 - 22:00",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Tuesday",
//   };
//   const w0 = {
//     sort: 1,
//     time: "08:00 - 09:15",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Wednesday",
//   };
//   const w1 = {
//     sort: 2,
//     time: "09:15 - 10:30",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Wednesday",
//   };
//   const w2 = {
//     sort: 3,
//     time: "10:30 - 12:00",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Wednesday",
//   };
//   const w3 = {
//     sort: 4,
//     time: "12:00 - 13:15",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Wednesday",
//   };
//   const w4 = {
//     sort: 5,
//     time: "13:15 - 14:30",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Wednesday",
//   };
//   const w5 = {
//     sort: 6,
//     time: "14:30 - 15:45",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Wednesday",
//   };
//   const w6 = {
//     sort: 7,
//     time: "15:45 - 17:00",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Wednesday",
//   };
//   const w7 = {
//     sort: 8,
//     time: "17:00 - 18:15",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Wednesday",
//   };
//   const w8 = {
//     sort: 9,
//     time: "18:15 - 19:30",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Wednesday",
//   };
//   const w9 = {
//     sort: 10,
//     time: "19:30 - 20:45",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Wednesday",
//   };
//   const w10 = {
//     sort: 11,
//     time: "20:45 - 22:00",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Wednesday",
//   };
//   const w20 = {
//     sort: 1,
//     time: "08:00 - 09:15",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Wednesday",
//   };
//   const w21 = {
//     sort: 2,
//     time: "09:15 - 10:30",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Wednesday",
//   };
//   const w22 = {
//     sort: 3,
//     time: "10:30 - 12:00",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Wednesday",
//   };
//   const w23 = {
//     sort: 4,
//     time: "12:00 - 13:15",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Wednesday",
//   };
//   const w24 = {
//     sort: 5,
//     time: "13:15 - 14:30",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Wednesday",
//   };
//   const w25 = {
//     sort: 6,
//     time: "14:30 - 15:45",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Wednesday",
//   };
//   const w26 = {
//     sort: 7,
//     time: "15:45 - 17:00",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Wednesday",
//   };
//   const w27 = {
//     sort: 8,
//     time: "17:00 - 18:15",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Wednesday",
//   };
//   const w28 = {
//     sort: 9,
//     time: "18:15 - 19:30",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Wednesday",
//   };
//   const w29 = {
//     sort: 10,
//     time: "19:30 - 20:45",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Wednesday",
//   };
//   const w210 = {
//     sort: 11,
//     time: "20:45 - 22:00",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Wednesday",
//   };
//   const w30 = {
//     sort: 1,
//     time: "08:00 - 09:15",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Wednesday",
//   };
//   const w31 = {
//     sort: 2,
//     time: "09:15 - 10:30",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Wednesday",
//   };
//   const w32 = {
//     sort: 3,
//     time: "10:30 - 12:00",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Wednesday",
//   };
//   const w33 = {
//     sort: 4,
//     time: "12:00 - 13:15",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Wednesday",
//   };
//   const w34 = {
//     sort: 5,
//     time: "13:15 - 14:30",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Wednesday",
//   };
//   const w35 = {
//     sort: 6,
//     time: "14:30 - 15:45",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Wednesday",
//   };
//   const w36 = {
//     sort: 7,
//     time: "15:45 - 17:00",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Wednesday",
//   };
//   const w37 = {
//     sort: 8,
//     time: "17:00 - 18:15",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Wednesday",
//   };
//   const w38 = {
//     sort: 9,
//     time: "18:15 - 19:30",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Wednesday",
//   };
//   const w39 = {
//     sort: 10,
//     time: "19:30 - 20:45",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Wednesday",
//   };
//   const w310 = {
//     sort: 11,
//     time: "20:45 - 22:00",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Wednesday",
//   };
//   const th0 = {
//     sort: 1,
//     time: "08:00 - 09:15",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Thursday",
//   };
//   const th1 = {
//     sort: 2,
//     time: "09:15 - 10:30",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Thursday",
//   };
//   const th2 = {
//     sort: 3,
//     time: "10:30 - 12:00",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Thursday",
//   };
//   const th3 = {
//     sort: 4,
//     time: "12:00 - 13:15",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Thursday",
//   };
//   const th4 = {
//     sort: 5,
//     time: "13:15 - 14:30",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Thursday",
//   };
//   const th5 = {
//     sort: 6,
//     time: "14:30 - 15:45",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Thursday",
//   };
//   const th6 = {
//     sort: 7,
//     time: "15:45 - 17:00",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Thursday",
//   };
//   const th7 = {
//     sort: 8,
//     time: "17:00 - 18:15",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Thursday",
//   };
//   const th8 = {
//     sort: 9,
//     time: "18:15 - 19:30",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Thursday",
//   };
//   const th9 = {
//     sort: 10,
//     time: "19:30 - 20:45",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Thursday",
//   };
//   const th10 = {
//     sort: 11,
//     time: "20:45 - 22:00",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Thursday",
//   };
//   const th20 = {
//     sort: 1,
//     time: "08:00 - 09:15",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Thursday",
//   };
//   const th21 = {
//     sort: 2,
//     time: "09:15 - 10:30",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Thursday",
//   };
//   const th22 = {
//     sort: 3,
//     time: "10:30 - 12:00",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Thursday",
//   };
//   const th23 = {
//     sort: 4,
//     time: "12:00 - 13:15",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Thursday",
//   };
//   const th24 = {
//     sort: 5,
//     time: "13:15 - 14:30",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Thursday",
//   };
//   const th25 = {
//     sort: 6,
//     time: "14:30 - 15:45",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Thursday",
//   };
//   const th26 = {
//     sort: 7,
//     time: "15:45 - 17:00",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Thursday",
//   };
//   const th27 = {
//     sort: 8,
//     time: "17:00 - 18:15",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Thursday",
//   };
//   const th28 = {
//     sort: 9,
//     time: "18:15 - 19:30",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Thursday",
//   };
//   const th29 = {
//     sort: 10,
//     time: "19:30 - 20:45",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Thursday",
//   };
//   const th210 = {
//     sort: 11,
//     time: "20:45 - 22:00",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Thursday",
//   };
//   const th30 = {
//     sort: 1,
//     time: "08:00 - 09:15",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Thursday",
//   };
//   const th31 = {
//     sort: 2,
//     time: "09:15 - 10:30",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Thursday",
//   };
//   const th32 = {
//     sort: 3,
//     time: "10:30 - 12:00",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Thursday",
//   };
//   const th33 = {
//     sort: 4,
//     time: "12:00 - 13:15",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Thursday",
//   };
//   const th34 = {
//     sort: 5,
//     time: "13:15 - 14:30",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Thursday",
//   };
//   const th35 = {
//     sort: 6,
//     time: "14:30 - 15:45",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Thursday",
//   };
//   const th36 = {
//     sort: 7,
//     time: "15:45 - 17:00",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Thursday",
//   };
//   const th37 = {
//     sort: 8,
//     time: "17:00 - 18:15",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Thursday",
//   };
//   const th38 = {
//     sort: 9,
//     time: "18:15 - 19:30",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Thursday",
//   };
//   const th39 = {
//     sort: 10,
//     time: "19:30 - 20:45",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Thursday",
//   };
//   const th310 = {
//     sort: 11,
//     time: "20:45 - 22:00",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Thursday",
//   };
//   const fr0 = {
//     sort: 1,
//     time: "08:00 - 09:15",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Friday",
//   };
//   const fr1 = {
//     sort: 2,
//     time: "09:15 - 10:30",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Friday",
//   };
//   const fr2 = {
//     sort: 3,
//     time: "10:30 - 12:00",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Friday",
//   };
//   const fr3 = {
//     sort: 4,
//     time: "12:00 - 13:15",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Friday",
//   };
//   const fr4 = {
//     sort: 5,
//     time: "13:15 - 14:30",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Friday",
//   };
//   const fr5 = {
//     sort: 6,
//     time: "14:30 - 15:45",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Friday",
//   };
//   const fr6 = {
//     sort: 7,
//     time: "15:45 - 17:00",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Friday",
//   };
//   const fr7 = {
//     sort: 8,
//     time: "17:00 - 18:15",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Friday",
//   };
//   const fr8 = {
//     sort: 9,
//     time: "18:15 - 19:30",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Friday",
//   };
//   const fr9 = {
//     sort: 10,
//     time: "19:30 - 20:45",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Friday",
//   };
//   const fr10 = {
//     sort: 11,
//     time: "20:45 - 22:00",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Friday",
//   };
//   const fr20 = {
//     sort: 1,
//     time: "08:00 - 09:15",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Friday",
//   };
//   const fr21 = {
//     sort: 2,
//     time: "09:15 - 10:30",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Friday",
//   };
//   const fr22 = {
//     sort: 3,
//     time: "10:30 - 12:00",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Friday",
//   };
//   const fr23 = {
//     sort: 4,
//     time: "12:00 - 13:15",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Friday",
//   };
//   const fr24 = {
//     sort: 5,
//     time: "13:15 - 14:30",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Friday",
//   };
//   const fr25 = {
//     sort: 6,
//     time: "14:30 - 15:45",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Friday",
//   };
//   const fr26 = {
//     sort: 7,
//     time: "15:45 - 17:00",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Friday",
//   };
//   const fr27 = {
//     sort: 8,
//     time: "17:00 - 18:15",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Friday",
//   };
//   const fr28 = {
//     sort: 9,
//     time: "18:15 - 19:30",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Friday",
//   };
//   const fr29 = {
//     sort: 10,
//     time: "19:30 - 20:45",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Friday",
//   };
//   const fr210 = {
//     sort: 11,
//     time: "20:45 - 22:00",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Friday",
//   };
//   const fr30 = {
//     sort: 1,
//     time: "08:00 - 09:15",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Friday",
//   };
//   const fr31 = {
//     sort: 2,
//     time: "09:15 - 10:30",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Friday",
//   };
//   const fr32 = {
//     sort: 3,
//     time: "10:30 - 12:00",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Friday",
//   };
//   const fr33 = {
//     sort: 4,
//     time: "12:00 - 13:15",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Friday",
//   };
//   const fr34 = {
//     sort: 5,
//     time: "13:15 - 14:30",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Friday",
//   };
//   const fr35 = {
//     sort: 6,
//     time: "14:30 - 15:45",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Friday",
//   };
//   const fr36 = {
//     sort: 7,
//     time: "15:45 - 17:00",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Friday",
//   };
//   const fr37 = {
//     sort: 8,
//     time: "17:00 - 18:15",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Friday",
//   };
//   const fr38 = {
//     sort: 9,
//     time: "18:15 - 19:30",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Friday",
//   };
//   const fr39 = {
//     sort: 10,
//     time: "19:30 - 20:45",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Friday",
//   };
//   const fr310 = {
//     sort: 11,
//     time: "20:45 - 22:00",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Friday",
//   };
//   const sa0 = {
//     sort: 1,
//     time: "08:00 - 09:15",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Saturday",
//   };
//   const sa1 = {
//     sort: 2,
//     time: "09:15 - 10:30",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Saturday",
//   };
//   const sa2 = {
//     sort: 3,
//     time: "10:30 - 12:00",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Saturday",
//   };
//   const sa3 = {
//     sort: 4,
//     time: "12:00 - 13:15",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Saturday",
//   };
//   const sa4 = {
//     sort: 5,
//     time: "13:15 - 14:30",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Saturday",
//   };
//   const sa5 = {
//     sort: 6,
//     time: "14:30 - 15:45",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Saturday",
//   };
//   const sa6 = {
//     sort: 7,
//     time: "15:45 - 17:00",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Saturday",
//   };
//   const sa7 = {
//     sort: 8,
//     time: "17:00 - 18:15",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Saturday",
//   };
//   const sa8 = {
//     sort: 9,
//     time: "18:15 - 19:30",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Saturday",
//   };
//   const sa9 = {
//     sort: 10,
//     time: "19:30 - 20:45",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Saturday",
//   };
//   const sa10 = {
//     sort: 11,
//     time: "20:45 - 22:00",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Saturday",
//   };
//   const sa20 = {
//     sort: 1,
//     time: "08:00 - 09:15",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Saturday",
//   };
//   const sa21 = {
//     sort: 2,
//     time: "09:15 - 10:30",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Saturday",
//   };
//   const sa22 = {
//     sort: 3,
//     time: "10:30 - 12:00",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Saturday",
//   };
//   const sa23 = {
//     sort: 4,
//     time: "12:00 - 13:15",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Saturday",
//   };
//   const sa24 = {
//     sort: 5,
//     time: "13:15 - 14:30",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Saturday",
//   };
//   const sa25 = {
//     sort: 6,
//     time: "14:30 - 15:45",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Saturday",
//   };
//   const sa26 = {
//     sort: 7,
//     time: "15:45 - 17:00",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Saturday",
//   };
//   const sa27 = {
//     sort: 8,
//     time: "17:00 - 18:15",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Saturday",
//   };
//   const sa28 = {
//     sort: 9,
//     time: "18:15 - 19:30",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Saturday",
//   };
//   const sa29 = {
//     sort: 10,
//     time: "19:30 - 20:45",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Saturday",
//   };
//   const sa210 = {
//     sort: 11,
//     time: "20:45 - 22:00",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Saturday",
//   };
//   const sa30 = {
//     sort: 1,
//     time: "08:00 - 09:15",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Saturday",
//   };
//   const sa31 = {
//     sort: 2,
//     time: "09:15 - 10:30",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Saturday",
//   };
//   const sa32 = {
//     sort: 3,
//     time: "10:30 - 12:00",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Saturday",
//   };
//   const sa33 = {
//     sort: 4,
//     time: "12:00 - 13:15",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Saturday",
//   };
//   const sa34 = {
//     sort: 5,
//     time: "13:15 - 14:30",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Saturday",
//   };
//   const sa35 = {
//     sort: 6,
//     time: "14:30 - 15:45",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Saturday",
//   };
//   const sa36 = {
//     sort: 7,
//     time: "15:45 - 17:00",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Saturday",
//   };
//   const sa37 = {
//     sort: 8,
//     time: "17:00 - 18:15",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Saturday",
//   };
//   const sa38 = {
//     sort: 9,
//     time: "18:15 - 19:30",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Saturday",
//   };
//   const sa39 = {
//     sort: 10,
//     time: "19:30 - 20:45",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Saturday",
//   };
//   const sa310 = {
//     sort: 11,
//     time: "20:45 - 22:00",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Saturday",
//   };
//   const su0 = {
//     sort: 1,
//     time: "08:00 - 09:15",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Sunday",
//   };
//   const su1 = {
//     sort: 2,
//     time: "09:15 - 10:30",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Sunday",
//   };
//   const su2 = {
//     sort: 3,
//     time: "10:30 - 12:00",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Sunday",
//   };
//   const su3 = {
//     sort: 4,
//     time: "12:00 - 13:15",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Sunday",
//   };
//   const su4 = {
//     sort: 5,
//     time: "13:15 - 14:30",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Sunday",
//   };
//   const su5 = {
//     sort: 6,
//     time: "14:30 - 15:45",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Sunday",
//   };
//   const su6 = {
//     sort: 7,
//     time: "15:45 - 17:00",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Sunday",
//   };
//   const su7 = {
//     sort: 8,
//     time: "17:00 - 18:15",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Sunday",
//   };
//   const su8 = {
//     sort: 9,
//     time: "18:15 - 19:30",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Sunday",
//   };
//   const su9 = {
//     sort: 10,
//     time: "19:30 - 20:45",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Sunday",
//   };
//   const su10 = {
//     sort: 11,
//     time: "20:45 - 22:00",
//     spots: 45,
//     location: "Utrecht",
//     weekday: "Sunday",
//   };
//   const su20 = {
//     sort: 1,
//     time: "08:00 - 09:15",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Sunday",
//   };
//   const su21 = {
//     sort: 2,
//     time: "09:15 - 10:30",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Sunday",
//   };
//   const su22 = {
//     sort: 3,
//     time: "10:30 - 12:00",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Sunday",
//   };
//   const su23 = {
//     sort: 4,
//     time: "12:00 - 13:15",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Sunday",
//   };
//   const su24 = {
//     sort: 5,
//     time: "13:15 - 14:30",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Sunday",
//   };
//   const su25 = {
//     sort: 6,
//     time: "14:30 - 15:45",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Sunday",
//   };
//   const su26 = {
//     sort: 7,
//     time: "15:45 - 17:00",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Sunday",
//   };
//   const su27 = {
//     sort: 8,
//     time: "17:00 - 18:15",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Sunday",
//   };
//   const su28 = {
//     sort: 9,
//     time: "18:15 - 19:30",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Sunday",
//   };
//   const su29 = {
//     sort: 10,
//     time: "19:30 - 20:45",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Sunday",
//   };
//   const su210 = {
//     sort: 11,
//     time: "20:45 - 22:00",
//     spots: 45,
//     location: "Amsterdam",
//     weekday: "Sunday",
//   };
//   const su30 = {
//     sort: 1,
//     time: "08:00 - 09:15",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Sunday",
//   };
//   const su31 = {
//     sort: 2,
//     time: "09:15 - 10:30",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Sunday",
//   };
//   const su32 = {
//     sort: 3,
//     time: "10:30 - 12:00",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Sunday",
//   };
//   const su33 = {
//     sort: 4,
//     time: "12:00 - 13:15",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Sunday",
//   };
//   const su34 = {
//     sort: 5,
//     time: "13:15 - 14:30",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Sunday",
//   };
//   const su35 = {
//     sort: 6,
//     time: "14:30 - 15:45",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Sunday",
//   };
//   const su36 = {
//     sort: 7,
//     time: "15:45 - 17:00",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Sunday",
//   };
//   const su37 = {
//     sort: 8,
//     time: "17:00 - 18:15",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Sunday",
//   };
//   const su38 = {
//     sort: 9,
//     time: "18:15 - 19:30",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Sunday",
//   };
//   const su39 = {
//     sort: 10,
//     time: "19:30 - 20:45",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Sunday",
//   };
//   const su310 = {
//     sort: 11,
//     time: "20:45 - 22:00",
//     spots: 45,
//     location: "Groningen",
//     weekday: "Sunday",
//   };
//   rosters.push(
//     m0,
//     m1,
//     m2,
//     m3,
//     m4,
//     m5,
//     m6,
//     m7,
//     m8,
//     m9,
//     m10,
//     m20,
//     m21,
//     m22,
//     m23,
//     m24,
//     m25,
//     m26,
//     m27,
//     m28,
//     m29,
//     m210,
//     m30,
//     m31,
//     m32,
//     m33,
//     m34,
//     m35,
//     m36,
//     m37,
//     m38,
//     m39,
//     m310
//   );
//   rosters.push(
//     t0,
//     t1,
//     t2,
//     t3,
//     t4,
//     t5,
//     t6,
//     t7,
//     t8,
//     t9,
//     t10,
//     t20,
//     t21,
//     t22,
//     t23,
//     t24,
//     t25,
//     t26,
//     t27,
//     t28,
//     t29,
//     t210,
//     t30,
//     t31,
//     t32,
//     t33,
//     t34,
//     t35,
//     t36,
//     t37,
//     t38,
//     t39,
//     t310
//   );
//   rosters.push(
//     w0,
//     w1,
//     w2,
//     w3,
//     w4,
//     w5,
//     w6,
//     w7,
//     w8,
//     w9,
//     w10,
//     w20,
//     w21,
//     w22,
//     w23,
//     w24,
//     w25,
//     w26,
//     w27,
//     w28,
//     w29,
//     w210,
//     w30,
//     w31,
//     w32,
//     w33,
//     w34,
//     w35,
//     w36,
//     w37,
//     w38,
//     w39,
//     w310
//   );
//   rosters.push(
//     th0,
//     th1,
//     th2,
//     th3,
//     th4,
//     th5,
//     th6,
//     th7,
//     th8,
//     th9,
//     th10,
//     th20,
//     th21,
//     th22,
//     th23,
//     th24,
//     th25,
//     th26,
//     th27,
//     th28,
//     th29,
//     th210,
//     th30,
//     th31,
//     th32,
//     th33,
//     th34,
//     th35,
//     th36,
//     th37,
//     th38,
//     th39,
//     th310
//   );
//   rosters.push(
//     fr0,
//     fr1,
//     fr2,
//     fr3,
//     fr4,
//     fr5,
//     fr6,
//     fr7,
//     fr8,
//     fr9,
//     fr10,
//     fr20,
//     fr21,
//     fr22,
//     fr23,
//     fr24,
//     fr25,
//     fr26,
//     fr27,
//     fr28,
//     fr29,
//     fr210,
//     fr30,
//     fr31,
//     fr32,
//     fr33,
//     fr34,
//     fr35,
//     fr36,
//     fr37,
//     fr38,
//     fr39,
//     fr310
//   );
//   rosters.push(
//     sa0,
//     sa1,
//     sa2,
//     sa3,
//     sa4,
//     sa5,
//     sa6,
//     sa7,
//     sa8,
//     sa9,
//     sa10,
//     sa20,
//     sa21,
//     sa22,
//     sa23,
//     sa24,
//     sa25,
//     sa26,
//     sa27,
//     sa28,
//     sa29,
//     sa210,
//     sa30,
//     sa31,
//     sa32,
//     sa33,
//     sa34,
//     sa35,
//     sa36,
//     sa37,
//     sa38,
//     sa39,
//     sa310
//   );
//   rosters.push(
//     su0,
//     su1,
//     su2,
//     su3,
//     su4,
//     su5,
//     su6,
//     su7,
//     su8,
//     su9,
//     su10,
//     su20,
//     su21,
//     su22,
//     su23,
//     su24,
//     su25,
//     su26,
//     su27,
//     su28,
//     su29,
//     su210,
//     su30,
//     su31,
//     su32,
//     su33,
//     su34,
//     su35,
//     su36,
//     su37,
//     su38,
//     su39,
//     su310
//   );
// rosters.forEach((roster) => {
//   const newRoster = new Roster({
//     sort: roster.sort,
//     location: roster.location,
//     weekday: roster.weekday,
//     time: roster.time,
//     spots: roster.spots,
//   });
//   newRoster.save();
// });
// });

module.exports = router;
