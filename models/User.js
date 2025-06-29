const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  age: Number,
  gender: String,
  city: String,
  university: String,
  degree: String,
  graduationYear: Number,
  preferences: {
    dietary: String,     
    budget: String,      
    languages: [String], 
    alcohol: String,   
    relationshipStatus: String
  },
  interests: [String]  
});

module.exports = mongoose.model('User', UserSchema);
