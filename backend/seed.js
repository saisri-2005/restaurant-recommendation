const mongoose = require('mongoose');
require('dotenv').config();
const Restaurant = require('./models/Restaurant'); // same schema as server.js
const restaurantsData = require('./restaurantsData.json'); // your 50+ restaurants

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Restaurant.deleteMany();      // clear existing
    await Restaurant.insertMany(restaurantsData); // insert new
    console.log('Seeded successfully');
    mongoose.disconnect();
  })
  .catch(err => console.error(err));
