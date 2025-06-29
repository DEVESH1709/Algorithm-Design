const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(async () => {
    console.log('Seeding DB...');

    await User.deleteMany();

    const sampleUsers = [
      {
        name: 'Alice', age: 20, gender: 'F', city: 'Mumbai',
        university: 'Univ A', degree: 'CS', graduationYear: 2024,
        preferences: { dietary: 'vegetarian', budget: '500-800', languages: ['English'], alcohol: 'no', relationshipStatus: 'single' },
        interests: ['music', 'reading']
      },
      {
        name: 'Bob', age: 21, gender: 'M', city: 'Mumbai',
        university: 'Univ B', degree: 'ECE', graduationYear: 2023,
        preferences: { dietary: 'none', budget: '800-1200', languages: ['English'], alcohol: 'yes', relationshipStatus: 'single' },
        interests: ['sports', 'music']
      },
      {
        name: 'Charlie', age: 22, gender: 'M', city: 'Mumbai',
        university: 'Univ A', degree: 'CS', graduationYear: 2025,
        preferences: { dietary: 'vegetarian', budget: '500-800', languages: ['English'], alcohol: 'no', relationshipStatus: 'single' },
        interests: ['reading', 'gaming']
      },
      {
        name: 'Daisy', age: 23, gender: 'F', city: 'Mumbai',
        university: 'Univ C', degree: 'IT', graduationYear: 2024,
        preferences: { dietary: 'none', budget: '800-1200', languages: ['English'], alcohol: 'yes', relationshipStatus: 'single' },
        interests: ['dancing', 'travel']
      },
      {
        name: 'Ethan', age: 21, gender: 'M', city: 'Mumbai',
        university: 'Univ B', degree: 'ECE', graduationYear: 2023,
        preferences: { dietary: 'vegetarian', budget: '500-800', languages: ['English'], alcohol: 'no', relationshipStatus: 'single' },
        interests: ['coding', 'music']
      },
      {
        name: 'Fiona', age: 22, gender: 'F', city: 'Mumbai',
        university: 'Univ A', degree: 'CS', graduationYear: 2024,
        preferences: { dietary: 'vegetarian', budget: '500-800', languages: ['English'], alcohol: 'no', relationshipStatus: 'single' },
        interests: ['art', 'books']
      },
      {
        name: 'George', age: 23, gender: 'M', city: 'Mumbai',
        university: 'Univ D', degree: 'Mech', graduationYear: 2022,
        preferences: { dietary: 'vegetarian', budget: '500-800', languages: ['English'], alcohol: 'no', relationshipStatus: 'single' },
        interests: ['photography', 'hiking']
      },
      {
        name: 'Hannah', age: 24, gender: 'F', city: 'Mumbai',
        university: 'Univ E', degree: 'IT', graduationYear: 2024,
        preferences: { dietary: 'none', budget: '800-1200', languages: ['English'], alcohol: 'yes', relationshipStatus: 'single' },
        interests: ['dance', 'music']
      },
      {
        name: 'Ishan', age: 21, gender: 'M', city: 'Mumbai',
        university: 'Univ B', degree: 'ECE', graduationYear: 2023,
        preferences: { dietary: 'vegetarian', budget: '500-800', languages: ['English'], alcohol: 'no', relationshipStatus: 'single' },
        interests: ['AI', 'reading']
      },
      {
        name: 'Jia', age: 20, gender: 'F', city: 'Mumbai',
        university: 'Univ F', degree: 'CS', graduationYear: 2025,
        preferences: { dietary: 'vegetarian', budget: '500-800', languages: ['English'], alcohol: 'no', relationshipStatus: 'single' },
        interests: ['yoga', 'cooking']
      },
      {
        name: 'Karan', age: 22, gender: 'M', city: 'Mumbai',
        university: 'Univ G', degree: 'IT', graduationYear: 2023,
        preferences: { dietary: 'none', budget: '800-1200', languages: ['English'], alcohol: 'yes', relationshipStatus: 'single' },
        interests: ['travel', 'football']
      },
      {
        name: 'Lina', age: 23, gender: 'F', city: 'Mumbai',
        university: 'Univ H', degree: 'CS', graduationYear: 2024,
        preferences: { dietary: 'none', budget: '800-1200', languages: ['English'], alcohol: 'yes', relationshipStatus: 'single' },
        interests: ['blogging', 'photography']
      }
    ];

    const insertedUsers = await User.insertMany(sampleUsers);
    console.log('✅ Inserted users:');
    insertedUsers.forEach(u => console.log(`${u.name}: ${u._id}`));

    mongoose.disconnect();
  })
  .catch(err => console.error(err));

