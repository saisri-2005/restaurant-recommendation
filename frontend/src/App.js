import React, { useState } from 'react';
import MapComponent from './components/MapComponent';

const restaurantsData = [
 { _id: 1, name: 'Tandoori Delight', cuisine: ['Indian', 'North Indian'], location: 'Delhi', rating: 4.5, lat: 28.6139, lng: 77.209 },
  { _id: 2, name: 'Sushi World', cuisine: ['Japanese', 'Seafood'], location: 'Bangalore', rating: 4.2, lat: 12.9716, lng: 77.5946 },
  { _id: 3, name: 'Pizza Planet', cuisine: ['Italian', 'Fast Food'], location: 'Mumbai', rating: 3.8, lat: 19.076, lng: 72.8777 },
  { _id: 4, name: 'Burger Hub', cuisine: ['American', 'Fast Food'], location: 'Delhi', rating: 4, lat: 28.7041, lng: 77.1025 },
  { _id: 5, name: 'Curry Corner', cuisine: ['Indian', 'South Indian'], location: 'Chennai', rating: 4.3, lat: 13.0827, lng: 80.2707 },
  { _id: 6, name: 'Dragon Express', cuisine: ['Chinese', 'Asian'], location: 'Kolkata', rating: 4.1, lat: 22.5726, lng: 88.3639 },
  { _id: 7, name: 'The Green Leaf', cuisine: ['Vegan', 'Healthy'], location: 'Pune', rating: 4.4, lat: 18.5204, lng: 73.8567 },
  { _id: 8, name: 'BBQ Nation', cuisine: ['Indian', 'BBQ'], location: 'Delhi', rating: 4.6, lat: 28.7041, lng: 77.1025 },
  { _id: 9, name: 'Punjab Grill', cuisine: ['North Indian', 'Mughlai'], location: 'Amritsar', rating: 4.5, lat: 31.634, lng: 74.8723 },
  { _id: 10, name: 'Biryani House', cuisine: ['Indian', 'Hyderabadi'], location: 'Hyderabad', rating: 4.3, lat: 17.4065, lng: 78.4772 },
  { _id: 11, name: 'Taste of Kerala', cuisine: ['South Indian', 'Seafood'], location: 'Kochi', rating: 4.2, lat: 9.9312, lng: 76.2673 },
  { _id: 12, name: 'Rajdhani Thali', cuisine: ['Rajasthani', 'Gujarati'], location: 'Jaipur', rating: 2.9, lat: 26.9124, lng: 75.7873 },
  { _id: 13, name: 'Spice Route', cuisine: ['Indian', 'Asian'], location: 'Bangalore', rating: 4.1, lat: 12.9719, lng: 77.5937 },
  { _id: 14, name: 'Urban Tadka', cuisine: ['Punjabi', 'North Indian'], location: 'Mumbai', rating: 4.2, lat: 19.0896, lng: 72.8656 },
  { _id: 15, name: 'Madras Café', cuisine: ['South Indian', 'Vegetarian'], location: 'Chennai', rating: 4.0, lat: 13.0674, lng: 80.2376 },
  { _id: 16, name: 'Goa Shack', cuisine: ['Seafood', 'Continental'], location: 'Goa', rating: 4.5, lat: 15.2993, lng: 74.124 },
  { _id: 17, name: 'The Great Kabab Factory', cuisine: ['Indian', 'Mughlai'], location: 'Delhi', rating: 4.6, lat: 28.5355, lng: 77.391 },
  { _id: 18, name: 'Wok This Way', cuisine: ['Chinese', 'Thai'], location: 'Pune', rating: 4.3, lat: 18.5196, lng: 73.8553 },
  { _id: 19, name: 'Café Coffee Day', cuisine: ['Cafe', 'Beverages'], location: 'Bangalore', rating: 4.0, lat: 12.97, lng: 77.59 },
  { _id: 20, name: "Domino's Pizza", cuisine: ['Italian', 'Fast Food'], location: 'Mumbai', rating: 3.9, lat: 19.07, lng: 72.88 },
  // Add more restaurants here
  { _id: 21, name: "Cafe Mocha", cuisine: ["Cafe", "Bakery"], location: "Delhi", rating: 4.2, lat: 28.61, lng: 77.20 },
  { _id: 22, name: "The Hungry Hippo", cuisine: ["American", "Fast Food"], location: "Mumbai", rating: 4.1, lat: 19.08, lng: 72.88 },
  { _id: 23, name: "Spicy Hub", cuisine: ["Indian", "Chinese"], location: "Bangalore", rating: 4.3, lat: 12.97, lng: 77.59 },
  { _id: 24, name: "Olive Garden", cuisine: ["Italian", "Mediterranean"], location: "Pune", rating: 4.4, lat: 18.52, lng: 73.85 },
  { _id: 25, name: "Royal Rasoi", cuisine: ["Indian", "Vegetarian"], location: "Delhi", rating: 4.5, lat: 28.63, lng: 77.21 },
  { _id: 26, name: "Noodle House", cuisine: ["Chinese", "Asian"], location: "Hyderabad", rating: 4.2, lat: 17.40, lng: 78.48 },
  { _id: 27, name: "Burger Palace", cuisine: ["American", "Fast Food"], location: "Chennai", rating: 4.0, lat: 13.08, lng: 80.27 },
  { _id: 28, name: "Seafood Delight", cuisine: ["Seafood", "Continental"], location: "Goa", rating: 4.5, lat: 15.29, lng: 74.12 },
  { _id: 29, name: "The Vegan Bowl", cuisine: ["Vegan", "Healthy"], location: "Bangalore", rating: 4.3, lat: 12.97, lng: 77.59 },
  { _id: 30, name: "King's Curry", cuisine: ["Indian", "North Indian"], location: "Jaipur", rating: 4.4, lat: 26.91, lng: 75.79 },
  { _id: 31, name: "Cafe Latte", cuisine: ["Cafe", "Bakery"], location: "Mumbai", rating: 4.1, lat: 19.08, lng: 72.88 },
  { _id: 32, name: "Taj Mahal Restaurant", cuisine: ["Indian", "Mughlai"], location: "Agra", rating: 4.6, lat: 27.18, lng: 78.01 },
  { _id: 33, name: "Spice Junction", cuisine: ["Indian", "Asian"], location: "Bangalore", rating: 4.2, lat: 12.97, lng: 77.59 },
  { _id: 34, name: "Mediterraneo", cuisine: ["Italian", "Mediterranean"], location: "Pune", rating: 4.3, lat: 18.52, lng: 73.85 },
  { _id: 35, name: "Royal Feast", cuisine: ["Indian", "North Indian"], location: "Delhi", rating: 4.4, lat: 28.61, lng: 77.21 },
  { _id: 36, name: "Waffle Corner", cuisine: ["Bakery", "Cafe"], location: "Bangalore", rating: 4.0, lat: 12.97, lng: 77.59 },
  { _id: 37, name: "The Coastal Curry", cuisine: ["Indian", "Seafood"], location: "Kochi", rating: 4.3, lat: 9.93, lng: 76.26 },
  { _id: 38, name: "China Express", cuisine: ["Chinese", "Asian"], location: "Kolkata", rating: 4.1, lat: 22.57, lng: 88.36 },
  { _id: 39, name: "Bistro Café", cuisine: ["Cafe", "Bakery"], location: "Chennai", rating: 4.2, lat: 13.07, lng: 80.23 },
  { _id: 40, name: "Pasta Fiesta", cuisine: ["Italian", "Fast Food"], location: "Mumbai", rating: 4.0, lat: 19.07, lng: 72.88 },
  { _id: 41, name: "Kebab House", cuisine: ["Indian", "BBQ"], location: "Delhi", rating: 4.5, lat: 28.63, lng: 77.20 },
  { _id: 42, name: "Sushi Express", cuisine: ["Japanese", "Seafood"], location: "Bangalore", rating: 4.2, lat: 12.97, lng: 77.59 },
  { _id: 43, name: "Cafe Aroma", cuisine: ["Cafe", "Bakery"], location: "Pune", rating: 4.1, lat: 18.52, lng: 73.85 },
  { _id: 44, name: "Royal Tandoor", cuisine: ["Indian", "North Indian"], location: "Delhi", rating: 4.4, lat: 28.61, lng: 77.21 },
  { _id: 45, name: "Momo Hut", cuisine: ["Chinese", "Asian"], location: "Kolkata", rating: 4.0, lat: 22.57, lng: 88.36 },
  { _id: 46, name: "Veggie Delight", cuisine: ["Vegan", "Healthy"], location: "Bangalore", rating: 4.3, lat: 12.97, lng: 77.59 },
  { _id: 47, name: "Spicy Bites", cuisine: ["Indian", "Fast Food"], location: "Delhi", rating: 4.2, lat: 28.61, lng: 77.21 },
  { _id: 48, name: "Café Bliss", cuisine: ["Cafe", "Bakery"], location: "Pune", rating: 4.1, lat: 18.52, lng: 73.85 },
  { _id: 49, name: "The Curry House", cuisine: ["Indian", "Asian"], location: "Bangalore", rating: 4.3, lat: 12.97, lng: 77.59 },
  { _id: 50, name: "Pizza Paradise", cuisine: ["Italian", "Fast Food"], location: "Mumbai", rating: 4.0, lat: 19.07, lng: 72.88 },
  // add more restaurants...
];

function App() {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [filters, setFilters] = useState({ location: '', cuisine: '', minRating: '' });

  const isFilterApplied = filters.location || filters.cuisine || filters.minRating;

  const filteredRestaurants = isFilterApplied
    ? restaurantsData.filter(r => {
        const locationMatch = filters.location ? r.location.toLowerCase().includes(filters.location.toLowerCase()) : true;
        const cuisineMatch = filters.cuisine ? r.cuisine.some(c => c.toLowerCase().includes(filters.cuisine.toLowerCase())) : true;
        const ratingMatch = filters.minRating ? r.rating >= parseFloat(filters.minRating) : true;
        return locationMatch && cuisineMatch && ratingMatch;
      })
    : [];

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return '#16a34a'; // green
    if (rating >= 4) return '#facc15';   // yellow
    return '#ef4444';                     // red
  };

  return (
    <div className="app-container">
      {/* Left Panel - Hero + Filters */}
      <div className="panel filters-panel">
        <div className="hero">
          <h1 className="title">🍽️ Restaurant Recommendation</h1>
          <p className="subtitle">Find the best restaurants near you with your favorite cuisines & ratings!</p>
        </div>

        {/* Filters */}
        <div className="filters">
          <input
            type="text"
            placeholder="Enter location"
            value={filters.location}
            onChange={e => setFilters({ ...filters, location: e.target.value })}
          />
          <input
            type="text"
            placeholder="Enter cuisine"
            value={filters.cuisine}
            onChange={e => setFilters({ ...filters, cuisine: e.target.value })}
          />
          <input
            type="number"
            min="0"
            max="5"
            step="0.1"
            placeholder="Min Rating e.g. 3"
            value={filters.minRating}
            onChange={e => setFilters({ ...filters, minRating: e.target.value })}
          />
        </div>

        {/* Restaurant List */}
        {isFilterApplied ? (
          filteredRestaurants.length > 0 ? (
            filteredRestaurants.map(r => (
              <div
                key={r._id}
                className={`restaurant-card ${selectedRestaurant?._id === r._id ? 'selected' : ''}`}
                onClick={() => setSelectedRestaurant(r)}
              >
                <h2 className="restaurant-name">{r.name}</h2>
                <div className="cuisine-badges">
                  {r.cuisine.map(c => <span key={c}>{c}</span>)}
                </div>
                <div className="rating" style={{ color: getRatingColor(r.rating) }}>⭐ {r.rating}</div>
                <div className="location">📍 {r.location}</div>
              </div>
            ))
          ) : <p className="no-results">No restaurants match your filters.</p>
        ) : <p className="no-results">Apply filters to see restaurants</p>}
      </div>

      {/* Right Panel - Map */}
      <div className="panel map-panel">
        <MapComponent
          restaurants={filteredRestaurants}
          selectedRestaurant={selectedRestaurant}
          setSelectedRestaurant={setSelectedRestaurant}
        />
      </div>

      {/* Styles */}
      <style>{`
  .app-container {
    display: flex;
    flex-direction: row;
    height: 100vh;
    font-family: 'Poppins', sans-serif;
    background: linear-gradient(to bottom right, #fff7ed, #ffe4b5);
  }
  .panel {
    padding: 20px;
    box-sizing: border-box;
  }
  .filters-panel {
    width: 35%;
    overflow-y: auto;
    background: linear-gradient(to bottom, #fff7ed, #ffe4b5);
    border-right: 1px solid #ddd;
  }
  .hero {
    text-align: center;
    margin-bottom: 20px;
  }
  .title {
    font-size: 2.2rem;
    font-weight: 900;
    color: #f97316;
    text-shadow: 2px 2px 10px rgba(0,0,0,0.1);
    margin-bottom: 10px;
    animation: bounce 2s infinite;
  }
  .subtitle {
    font-size: 1rem;
    color: #555;
    font-weight: 500;
  }
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-8px); }
    60% { transform: translateY(-4px); }
  }

  .filters input {
    width: 100%;
    padding: 12px;
    margin-bottom: 12px;
    border-radius: 10px;
    border: 1px solid #ccc;
    outline: none;
    font-size: 1rem;
    transition: 0.3s;
  }

  .restaurant-card {
    padding: 16px;
    margin-bottom: 14px;
    border-radius: 12px;
    background: #ffffffcc;
    box-shadow: 0 6px 12px rgba(0,0,0,0.1);
    cursor: pointer;
    transition: 0.3s;
    word-wrap: break-word;
  }
  .restaurant-name {
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 5px;
    white-space: normal;
  }

  .cuisine-badges span {
    display: inline-block;
    background: #f97316;
    color: #fff;
    padding: 3px 8px;
    border-radius: 6px;
    margin-right: 5px;
    font-size: 0.8rem;
    transition: 0.3s;
  }

  .rating {
    font-weight: bold;
    margin: 5px 0;
    font-size: 0.95rem;
  }

  .map-panel {
    width: 65%;
    height: 100%;
    transition: 0.5s;
  }

  /* ✅ Mobile responsiveness */
  @media (max-width: 1024px) {
    .app-container {
      flex-direction: column;
      height: auto;
    }
    .filters-panel {
      width: 100%;
      border-right: none;
      border-bottom: 1px solid #ddd;
    }
    .map-panel {
      width: 100%;
      height: 55vh;
    }
  }

  @media (max-width: 600px) {
    .title {
      font-size: 1.6rem;
    }
    .subtitle {
      font-size: 0.9rem;
    }
    .restaurant-name {
      font-size: 1rem;
    }
    .filters input {
      font-size: 0.9rem;
      padding: 10px;
    }
    .restaurant-card {
      padding: 12px;
    }
    .rating, .location {
      font-size: 0.85rem;
    }
    .cuisine-badges span {
      font-size: 0.75rem;
      padding: 2px 6px;
    }
      .heading {
  font-size: 2rem;           /* adjust for desktop */
  font-weight: bold;
  white-space: normal;       /* allow text to wrap */
  word-wrap: break-word;     /* break long words if needed */
  overflow-wrap: anywhere;   /* extra safety for long words */
  text-align: center;        /* optional: center align */
  margin: 10px 0;
}
@media screen and (max-width: 600px) {
  .heading {
    font-size: 1.2rem;       /* smaller on mobile */
  }
}
.header-container {
  width: 100%;              /* full width of screen */
  padding: 0 10px;          /* some padding */
  box-sizing: border-box;   /* include padding in width */
}

  }
`}</style>

    </div>
  );
}

export default App;
