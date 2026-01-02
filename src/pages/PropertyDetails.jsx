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

  if (!property) return <div className="error-container"><h2>Property not found</h2><Link to="/">Back to Search</Link></div>;

  const isFavorite = favoriteProperties.some(fav => fav.id === property.id);
  
  // Fake gallery array
  const galleryImages = Array(6).fill(property.picture);

   return (
    <div className="details-page-container">
      <Link to="/" className="back-link">&larr; Back to Search</Link>

      {/* NEW LAYOUT: Grid Wrapper */}
      <div className="details-grid">
        
        {/* Left Column */}
        <div className="left-column">
          <PropertyGallery images={galleryImages} />
        </div>

        {/* Right Column */}
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

          <PropertyTabs 
            description={property.description}
            floorPlanImg={property.floorplan} // <<< WE WILL ADD THIS NEXT
            mapUrl={property.mapUrl} 
          />
        </div>

      </div>
    </div>
  );
};

export default PropertyDetails;