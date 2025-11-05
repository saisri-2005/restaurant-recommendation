const mongoose = require('mongoose');
const Restaurant = require('./models/Restaurant');

const MONGO_URI = 'mongodb://localhost:27017/restaurantDB';

// Inline restaurant data (add as many as you like)
const data = [
  { name: "Tandoori Delight", cuisine: ["Indian","North Indian"], location:"Delhi", rating:4.5, lat:28.6139, lng:77.209 },
  { name: "Sushi World", cuisine: ["Japanese","Seafood"], location:"Bangalore", rating:4.2, lat:12.9716, lng:77.5946 },
  { name: "Pizza Planet", cuisine: ["Italian","Fast Food"], location:"Mumbai", rating:3.8, lat:19.076, lng:72.8777 },
  { name: "Burger Hub", cuisine: ["American","Fast Food"], location:"Hyderabad", rating:4.0, lat:17.385, lng:78.4867 },
  { name: "Curry Corner", cuisine: ["Indian","South Indian"], location:"Chennai", rating:4.3, lat:13.0827, lng:80.2707 },
  { name: "Dragon Express", cuisine: ["Chinese","Asian"], location:"Kolkata", rating:4.1, lat:22.5726, lng:88.3639 },
  { name: "BBQ Nation", cuisine: ["Indian","BBQ"], location:"Delhi", rating:4.6, lat:28.7041, lng:77.1025 },
  { name: "Punjab Grill", cuisine: ["North Indian","Mughlai"], location:"Amritsar", rating:4.5, lat:31.634, lng:74.8723 },
  { name: "Biryani House", cuisine: ["Indian","Hyderabadi"], location:"Hyderabad", rating:4.3, lat:17.4065, lng:78.4772 },
  { name: "Taste of Kerala", cuisine: ["South Indian","Seafood"], location:"Kochi", rating:4.2, lat:9.9312, lng:76.2673 },
  { name: "Rajdhani Thali", cuisine: ["Rajasthani","Gujarati"], location:"Jaipur", rating:4.4, lat:26.9124, lng:75.7873 },
  { name: "Spice Route", cuisine: ["Indian","Asian"], location:"Bangalore", rating:4.1, lat:12.9719, lng:77.5937 },
  { name: "Urban Tadka", cuisine: ["Punjabi","North Indian"], location:"Mumbai", rating:4.2, lat:19.0896, lng:72.8656 },
  { name: "Madras Café", cuisine: ["South Indian","Vegetarian"], location:"Chennai", rating:4.0, lat:13.0674, lng:80.2376 },
  { name: "Goa Shack", cuisine: ["Seafood","Continental"], location:"Goa", rating:4.5, lat:15.2993, lng:74.124 },
  { name: "The Great Kabab Factory", cuisine: ["Indian","Mughlai"], location:"Delhi", rating:4.6, lat:28.5355, lng:77.391 },
  { name: "Wok This Way", cuisine: ["Chinese","Thai"], location:"Pune", rating:4.3, lat:18.5196, lng:73.8553 },
  { name: "Café Coffee Day", cuisine: ["Cafe","Beverages"], location:"Bangalore", rating:4.0, lat:12.97, lng:77.59 },
  { name: "Domino's Pizza", cuisine: ["Italian","Fast Food"], location:"Mumbai", rating:3.9, lat:19.07, lng:72.88 }
];

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('✅ Connected to MongoDB...');
    await Restaurant.deleteMany();
    await Restaurant.insertMany(data);
    console.log('🍽️ Restaurant data seeded successfully!');
    process.exit();
  })
  .catch(err => console.error(err));