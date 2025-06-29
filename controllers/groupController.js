const User = require('../models/User');
const { formGroups } = require('../utils/groupMatcher');

exports.formGroups = async (req, res) => {
  const city = req.params.city;
  try {
    const users = await User.find({ city });
    if (users.length === 0) {
      return res.status(404).send('No users found in this city.');
    }
    const groups = formGroups(users);
    res.json(groups);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
  
};
