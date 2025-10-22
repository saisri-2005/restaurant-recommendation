const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

const cities = [
  { name: 'Mumbai', lat: 19.07609, lng: 72.877426 },
  { name: 'Delhi', lat: 28.613939, lng: 77.209023 },
  { name: 'Bangalore', lat: 12.971599, lng: 77.594566 },
  { name: 'Hyderabad', lat: 17.385044, lng: 78.486671 },
  { name: 'Chennai', lat: 13.08268, lng: 80.270718 },
  { name: 'Kolkata', lat: 22.572646, lng: 88.363895 },
  { name: 'Pune', lat: 18.5204, lng: 73.8567 },
  { name: 'Ahmedabad', lat: 23.0225, lng: 72.5714 },
  { name: 'Jaipur', lat: 26.9124, lng: 75.7873 },
  { name: 'Lucknow', lat: 26.8467, lng: 80.9462 },
];

const cuisines = [
  'Indian', 'North Indian', 'South Indian', 'Chinese', 'Japanese', 'Italian',
  'Mexican', 'Continental', 'Seafood', 'Fast Food', 'Cafe', 'Desserts'
];

const restaurants = [];

for (let i = 1; i <= 50; i++) {
  const city = cities[Math.floor(Math.random() * cities.length)];
  const numCuisines = Math.floor(Math.random() * 3) + 1;
  const restaurantCuisines = [];

  while (restaurantCuisines.length < numCuisines) {
    const cuisine = cuisines[Math.floor(Math.random() * cuisines.length)];
    if (!restaurantCuisines.includes(cuisine)) restaurantCuisines.push(cuisine);
  }

  restaurants.push({
    _id: i.toString(),
    name: `Restaurant ${i}`,
    cuisine: restaurantCuisines,
    location: city.name,
    rating: +(Math.random() * 2 + 3).toFixed(1), // rating between 3.0 and 5.0
    lat: city.lat + (Math.random() - 0.5) * 0.1, // small random offset
    lng: city.lng + (Math.random() - 0.5) * 0.1
  });
}

app.get('/api/restaurants', (req, res) => {
  const { location, cuisine, minRating } = req.query;
  let filtered = [...restaurants];

  if (location) {
    filtered = filtered.filter(r => r.location.toLowerCase().includes(location.toLowerCase()));
  }
  if (cuisine) {
    filtered = filtered.filter(r => r.cuisine.some(c => c.toLowerCase() === cuisine.toLowerCase()));
  }
  if (minRating) {
    filtered = filtered.filter(r => r.rating >= Number(minRating));
  }

  res.json({ success: true, data: filtered });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
