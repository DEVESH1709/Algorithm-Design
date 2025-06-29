const mongoose = require('mongoose');
const { Schema } = mongoose;

const FeedbackSchema = new Schema({
 from: { type: String, ref: 'User' },
to: { type: String, ref: 'User' },
  like: Boolean,                                      
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
