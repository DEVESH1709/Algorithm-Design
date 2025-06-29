require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const profileRoutes = require('./routes/profileRoutes');
const groupRoutes = require('./routes/groupRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/profiles', profileRoutes);
app.use('/groups', groupRoutes);


app.get('/', (req, res) => {
  res.send('Citadel Matcher API is running');
});


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}).catch(err => {
  console.error('DB connection error:', err);
});
