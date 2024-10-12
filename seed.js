const User = require('./models/User');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    const users = [
      'Rahul', 'Kamal', 'Sanaki', 'Jatin', 'Roshni', 'Muskan', 'Gaurav', 'Atul', 'Ishita', 'Saroj'
    ];

    for (const name of users) {
      const user = new User({ name });
      await user.save();
    }

    console.log('Users seeded successfully');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });
