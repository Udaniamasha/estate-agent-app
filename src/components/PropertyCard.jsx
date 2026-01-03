import React from 'react';
import { Link } from 'react-router-dom';

// Small reusable card component for displaying a single property
// Used inside the main search results grid
const PropertyCard = ({ property, isFavorite, onToggleFavorite, isDragging }) => {
  return (
    // Apply a 'dragging' class when the card is being dragged into favourites
    <div className={`property-card ${isDragging ? 'dragging' : ''}`}>

      {/* Heart button to add or remove from favourites */}
      {/* e.preventDefault() stops the link navigation when the heart is clicked */}
      <button 
        onClick={(e) => {
          e.preventDefault();
          onToggleFavorite(property);
        }}
        className={`fav-btn ${isFavorite ? 'active' : ''}`}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>
      
      {/* Main property image */}
      <img src={property.picture} alt={property.type} onError={(e) => { e.target.src = 'https://via.placeholder.com/250x150?text=No+Image' }} />

      {/* Card content area with text details */}
      <div className="card-content">
        <h4>{property.location}</h4>

        {/* Small line showing type and bedroom count */}
        <div className="card-details">
          <span>{property.type}</span> • <span>{property.bedrooms} Bed</span>
        </div>

        {/* Price formatted with commas for readability */}
        <p className="price">£{property.price.toLocaleString()}</p>

        {/* Link navigates to the detailed property page */}
        <Link to={`/property/${property.id}`} className="details-link">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
