import React from 'react';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property, isFavorite, onToggleFavorite, isDragging }) => {
  return (
    <div className={`property-card ${isDragging ? 'dragging' : ''}`}>
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
      
      <img 
        src={`/${property.picture}`} 
        alt={property.type} 
        onError={(e) => {e.target.src='https://via.placeholder.com/250x150?text=No+Image'}} 
      />
      
      <div className="card-content">
        <h4>{property.location}</h4>
        <div className="card-details">
          <span>{property.type}</span> • <span>{property.bedrooms} Bed</span>
        </div>
        <p className="price">£{property.price.toLocaleString()}</p>
        <Link to={`/property/${property.id}`} className="details-link">View Details</Link>
      </div>
    </div>
  );
};

export default PropertyCard;