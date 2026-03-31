const express = require("express");
const router = express.Router();
const Queue = require("../models/Queue");

// Join queue
router.post("/join", async (req, res) => {
  try {
    const totalUsers = await Queue.countDocuments();

    const newQueue = new Queue({
      tokenNumber: totalUsers + 1,
      userName: req.body.userName,
      status: "waiting"
    });

    await newQueue.save();

    res.status(201).json({
      token: newQueue.tokenNumber
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// Get queue
router.get("/current", async (req, res) => {
  try {
    const queue = await Queue.find().sort({
      tokenNumber: 1
    });

    res.status(200).json(queue);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// Call next token
router.put("/next", async (req, res) => {
  try {
    const nextUser = await Queue.findOneAndUpdate(
      { status: "waiting" },
      { status: "serving" },
      {
        new: true,
        sort: { tokenNumber: 1 }
      }
    );

    res.status(200).json({
      token: nextUser
        ? nextUser.tokenNumber
        : null
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// Complete token
router.put("/complete", async (req, res) => {
  try {
    await Queue.findOneAndUpdate(
      { status: "serving" },
      { status: "completed" }
    );

    res.status(200).json({
      message: "Completed"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// Skip token
router.put("/skip", async (req, res) => {
  try {
    await Queue.findOneAndUpdate(
      { status: "serving" },
      { status: "skipped" }
    );

    res.status(200).json({
      message: "Skipped"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// Reset
router.delete("/reset", async (req, res) => {
  try {
    await Queue.deleteMany({});

    res.status(200).json({
      message: "Queue reset"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// PRIORITY urgent approval
router.put("/priority/:token", async (req, res) => {
  try {
    const token = req.params.token;

    await Queue.updateMany(
      { status: "serving" },
      { status: "waiting" }
    );

    const urgentUser =
      await Queue.findOneAndUpdate(
        { tokenNumber: token },
        { status: "serving" },
        { new: true }
      );

    res.status(200).json({
      token: urgentUser.tokenNumber
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;