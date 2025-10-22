import React, { useState } from 'react';
import MapComponent from './components/MapComponent';

const restaurantsData = [
  { _id: 1, name: 'Tandoori Delight', cuisine: ['Indian', 'North Indian'], location: 'Delhi', rating: 4.5, lat: 28.6139, lng: 77.209 },
  { _id: 2, name: 'Sushi World', cuisine: ['Japanese', 'Seafood'], location: 'Bangalore', rating: 4.2, lat: 12.9716, lng: 77.5946 },
  { _id: 3, name: 'Pizza Planet', cuisine: ['Italian', 'Fast Food'], location: 'Mumbai', rating: 3.8, lat: 19.076, lng: 72.8777 },
  { _id: 4, name: 'Burger Hub', cuisine: ['American', 'Fast Food'], location: 'Delhi', rating: 4, lat: 28.7041, lng: 77.1025 },
  { _id: 5, name: 'Curry Corner', cuisine: ['Indian', 'South Indian'], location: 'Chennai', rating: 4.3, lat: 13.0827, lng: 80.2707 },
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

  return (
    <div className="app-container">
      {/* Left panel */}
      <div className="panel filters-panel">
        <h2>Restaurant Recommendation</h2>

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

        {/* Restaurant list */}
        {isFilterApplied ? (
          filteredRestaurants.length > 0 ? (
            filteredRestaurants.map(r => (
              <div
                key={r._id}
                className={`restaurant-card ${selectedRestaurant?._id === r._id ? 'selected' : ''}`}
                onClick={() => setSelectedRestaurant(r)}
              >
                <strong>{r.name}</strong>
                <div className="cuisine-badges">
                  {r.cuisine.map(c => <span key={c}>{c}</span>)}
                </div>
                <div>⭐ {r.rating}</div>
                <div>{r.location}</div>
              </div>
            ))
          ) : <p className="no-results">No restaurants match your filters.</p>
        ) : <p className="no-results">Apply filters to see restaurants</p>}
      </div>

      {/* Right panel: Map */}
      <div className="panel map-panel">
        <MapComponent
          restaurants={filteredRestaurants}
          selectedRestaurant={selectedRestaurant}
          setSelectedRestaurant={setSelectedRestaurant}
        />
      </div>

      {/* Responsive CSS */}
      <style>{`
        .app-container {
          display: flex;
          flex-direction: row;
          height: 100vh;
          font-family: Poppins, sans-serif;
        }
        .panel {
          padding: 15px;
          box-sizing: border-box;
        }
        .filters-panel {
          width: 35%;
          overflow-y: auto;
          background: #fff;
          border-right: 1px solid #ddd;
        }
        .filters input {
          width: 100%;
          padding: 10px;
          margin-bottom: 10px;
          border-radius: 8px;
          border: 1px solid #ccc;
          outline: none;
        }
        .restaurant-card {
          padding: 12px;
          margin-bottom: 10px;
          border-radius: 10px;
          background: #fafafa;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          cursor: pointer;
          transition: 0.3s;
        }
        .restaurant-card.selected {
          background: linear-gradient(90deg, #e0f7ff, #c0eaff);
        }
        .restaurant-card:hover {
          box-shadow: 0 8px 16px rgba(0,0,0,0.2);
        }
        .cuisine-badges span {
          display: inline-block;
          background: #007bff;
          color: #fff;
          padding: 2px 6px;
          border-radius: 5px;
          margin-right: 5px;
          font-size: 12px;
        }
        .map-panel {
          width: 65%;
          height: 100%;
        }
        .no-results {
          text-align: center;
          color: #999;
          margin-top: 50px;
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .app-container {
            flex-direction: column;
          }
          .filters-panel {
            width: 100%;
            border-right: none;
            border-bottom: 1px solid #ddd;
          }
          .map-panel {
            width: 100%;
            height: 50vh;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
