const express = require('express');
const User = require('../models/User');
const ClaimHistory = require('../models/ClaimHistory');

const router = express.Router();

// Get users
router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Create a user
router.post('/', async (req, res) => {
  const { name } = req.body;
  const newUser = new User({ name });
  await newUser.save();
  res.status(201).json(newUser);
});

// Claim points
router.post('/claim/:id', async (req, res) => {
  const userId = req.params.id;
  const pointsClaimed = Math.floor(Math.random() * 10) + 1;

  const user = await User.findById(userId);
  user.points += pointsClaimed;
  await user.save();

  // Log claim history
  const claimHistory = new ClaimHistory({ userId, pointsClaimed });
  await claimHistory.save();

  res.json({ pointsClaimed, totalPoints: user.points });
});

// Get leaderboard
router.get('/leaderboard', async (req, res) => {
  const users = await User.find().sort({ points: -1 });
  res.json(users);
});

module.exports = router;
