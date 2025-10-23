import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapComponent from './components/MapComponent';

function App() {
  const [restaurantsData, setRestaurantsData] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [filters, setFilters] = useState({ location: '', cuisine: '', minRating: '' });

  // Fetch data from backend (MongoDB)
  useEffect(() => {
    axios.get('http://localhost:5000/api/restaurants') // Replace with your deployed backend URL when live
      .then(res => setRestaurantsData(res.data))
      .catch(err => console.error(err));
  }, []);

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
    if (rating >= 4.5) return '#16a34a';
    if (rating >= 4) return '#facc15';
    return '#ef4444';
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
        .panel { padding: 20px; box-sizing: border-box; }
        .filters-panel {
          width: 35%;
          overflow-y: auto;
          background: linear-gradient(to bottom, #fff7ed, #ffe4b5);
          border-right: 1px solid #ddd;
        }
        .hero { text-align: center; margin-bottom: 20px; }
        .title {
          font-size: 2.2rem;
          font-weight: 900;
          color: #f97316;
          text-shadow: 2px 2px 10px rgba(0,0,0,0.1);
          margin-bottom: 10px;
          animation: bounce 2s infinite;
          white-space: normal;
          word-wrap: break-word;
          overflow-wrap: anywhere;
          text-align: center;
        }
        .subtitle { font-size: 1rem; color: #555; font-weight: 500; }
        @keyframes bounce { 0%,20%,50%,80%,100%{transform:translateY(0);}40%{transform:translateY(-8px);}60%{transform:translateY(-4px);} }
        .filters input { width:100%; padding:12px; margin-bottom:12px; border-radius:10px; border:1px solid #ccc; outline:none; font-size:1rem; transition:0.3s; }
        .restaurant-card {
          padding: 16px; margin-bottom: 14px; border-radius: 12px;
          background: #ffffffcc; box-shadow: 0 6px 12px rgba(0,0,0,0.1);
          cursor: pointer; transition: 0.3s; word-wrap: break-word;
        }
        .restaurant-name { font-size:1.1rem; font-weight:700; margin-bottom:5px; white-space: normal; }
        .cuisine-badges span { display:inline-block; background:#f97316; color:#fff; padding:3px 8px; border-radius:6px; margin-right:5px; font-size:0.8rem; transition:0.3s; }
        .rating { font-weight:bold; margin:5px 0; font-size:0.95rem; }
        .map-panel { width:65%; height:100%; transition:0.5s; }
        @media(max-width:1024px) {
          .app-container { flex-direction: column; height:auto; }
          .filters-panel { width:100%; border-right:none; border-bottom:1px solid #ddd; }
          .map-panel { width:100%; height:55vh; }
        }
        @media(max-width:600px) {
          .title { font-size:1.6rem; }
          .subtitle { font-size:0.9rem; }
          .restaurant-name { font-size:1rem; }
          .filters input { font-size:0.9rem; padding:10px; }
          .restaurant-card { padding:12px; }
          .rating, .location { font-size:0.85rem; }
          .cuisine-badges span { font-size:0.75rem; padding:2px 6px; }
        }
      `}</style>
    </div>
  );
}

export default App;
