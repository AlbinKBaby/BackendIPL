// controllers/teamController.js
const users = require('../Models/userSchema');

// Get all teams
exports.getTeam = async (req, res) => {
  try {
    const teams = await users.find({role}); // Fetch all documents
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching team', error });
  }
};
