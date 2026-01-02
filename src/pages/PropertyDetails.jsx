import React from 'react';
import { useParams, Link } from 'react-router-dom';
import propertiesData from '../data/properties.json';
import { useFavorites } from '../context/FavoritesContext';
import PropertyGallery from '../components/PropertyGallery';
import PropertyTabs from '../components/PropertyTabs';
import '../styles/PropertyDetails.css'; 

const PropertyDetails = () => {
  const { id } = useParams();
  const property = propertiesData.properties.find(p => p.id === id);
  const { addFavorite, removeFavorite, favoriteProperties } = useFavorites();

  // Handle case where property doesn't exist (e.g. wrong URL)
  if (!property) return <div className="details-page-container"><h2>Property not found</h2><Link to="/">Back to Search</Link></div>;

  const isFavorite = favoriteProperties.some(fav => fav.id === property.id);
  
  // Use the 'images' array from JSON, or fallback to the main picture if array is missing
  const galleryImages = property.images && property.images.length > 0 
    ? property.images 
    : [property.picture, property.picture, property.picture, property.picture];

   return (
    <div className="details-page-container">
      <Link to="/" className="back-link">&larr; Back to Search</Link>

      {/* Grid Wrapper */}
      <div className="details-grid">
        
        {/* Left Column: Gallery */}
        <div className="left-column gallery-section">
          <PropertyGallery images={galleryImages} />
        </div>

        {/* Right Column: Info & Tabs */}
        <div className="right-column info-section">
          <div className="header-text">
            <h1>{property.location}</h1>
            <h2 className="price-tag">£{property.price.toLocaleString()}</h2>
            <p className="meta-info">{property.type} • {property.bedrooms} Beds • {property.tenure}</p>
          </div>

          <button 
            onClick={() => isFavorite ? removeFavorite(property.id) : addFavorite(property)}
            className={`fav-btn-large ${isFavorite ? 'active' : ''}`}
          >
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'} {isFavorite ? '❤️' : '🤍'}
          </button>

           {/* Tabs section (Description, Floorplan, Map) */}
           <PropertyTabs
             description={property.description}
             floorPlanImg={property.floorplan}
             location={property.location} 
           />
           
           {/* REMOVED DUPLICATE GALLERY FROM HERE */}
        </div>

      </div>
    </div>
  );
};

export default PropertyDetails;