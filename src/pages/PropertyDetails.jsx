import React from 'react';
import { useParams, Link } from 'react-router-dom';
import propertiesData from '../data/properties.json';
import { useFavorites } from '../context/FavoritesContext';
import PropertyGallery from '../components/PropertyGallery';
import PropertyTabs from '../components/PropertyTabs';
import '../styles/PropertyDetails.css'; 

const PropertyDetails = () => {
  // Get the dynamic property ID from the URL (e.g., /property/prop1)
  const { id } = useParams();

  // Find the matching property in the JSON data using its ID
  const property = propertiesData.properties.find(p => p.id === id);

  // Access favourites context functions and current favourites list
  const { addFavorite, removeFavorite, favoriteProperties } = useFavorites();

  // Handle cases where the property ID is invalid or missing
  // This prevents the page from breaking and shows a friendly message instead
  if (!property) {
    return (
      <div className="details-page-container">
        <h2>Property not found</h2>
        <Link to="/">Back to Search</Link>
      </div>
    );
  }

  // Check if the current property is already marked as a favourite
  const isFavorite = favoriteProperties.some(fav => fav.id === property.id);
  
  // Use property images from JSON if available,
  // otherwise fall back to repeating the main picture to avoid blank sections
  const galleryImages = property.images && property.images.length > 0 
    ? property.images 
    : [property.picture, property.picture, property.picture, property.picture];

  return (
    <div className="details-page-container">
      {/* Navigation link to return to main search page */}
      <Link to="/" className="back-link">&larr; Back to Search</Link>

      {/* Main two-column layout */}
      <div className="details-grid">
        
        {/* Left Column: property image gallery */}
        <div className="left-column gallery-section">
          <PropertyGallery images={galleryImages} />
        </div>

        {/* Right Column: property details, price, and tabs */}
        <div className="right-column info-section">

          {/* Main information: location, price, and quick facts */}
          <div className="header-text">
            <h1>{property.location}</h1>
            <h2 className="price-tag">£{property.price.toLocaleString()}</h2>
            <p className="meta-info">
              {property.type} • {property.bedrooms} Beds • {property.tenure}
            </p>
          </div>

          {/* Button to add/remove from favourites (updates in real-time) */}
          <button 
            onClick={() => isFavorite ? removeFavorite(property.id) : addFavorite(property)}
            className={`fav-btn-large ${isFavorite ? 'active' : ''}`}
          >
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}{' '}
            {isFavorite ? '❤️' : '🤍'}
          </button>

          {/* Tabs for Description, Floor Plan, and Map */}
          <PropertyTabs
            description={property.description}
            floorPlanImg={property.floorplan}
            location={property.location} 
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
