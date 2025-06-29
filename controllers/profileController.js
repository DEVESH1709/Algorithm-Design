const User = require('../models/User');
const Feedback = require('../models/Feedback');
const { selectNextProfile } = require('../utils/profileEngine');

exports.getNextProfile = async (req, res) => {
  const userId = req.params.userId;
  try {
   
    const user = await User.findById(userId);
    const feedbacks = await Feedback.find({ from: userId });
    const ratedIds = feedbacks.map(f => String(f.to));
    ratedIds.push(userId); 

    const candidates = await User.find({ _id: { $nin: ratedIds } });

    if (candidates.length === 0) {
      return res.json({ message: 'No more profiles to show.' });
    }

    const nextProfile = selectNextProfile(user, candidates, feedbacks);
    res.json(nextProfile);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};


exports.postFeedback = async (req, res) => {
  const userId = req.params.userId;
  const { to, like } = req.body;
  try {

    await Feedback.create({ from: userId, to, like });
    return this.getNextProfile(req, res);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
