import React, { useState, useEffect } from 'react';

const PropertyGallery = ({ images }) => {
  // Initialize with the first image
  const [mainImage, setMainImage] = useState(images && images.length > 0 ? images[0] : '');

  // --- CRITICAL FIX START ---
  // This ensures the main image updates when you switch properties
  useEffect(() => {
    if (images && images.length > 0) {
      setMainImage(images[0]);
    }
  }, [images]);
  // --- CRITICAL FIX END ---

  // Safety check: if no images provided, don't crash
  if (!images || images.length === 0) {
    return <div className="gallery-section">No images available</div>;
  }

  return (
    <div className="gallery-section">
      <div className="main-image-container">
        <img 
          src={`/${mainImage}`} 
          alt="Main View" 
          onError={(e) => {e.target.src='https://via.placeholder.com/800x400?text=Image+Not+Found'}} 
        />
      </div>
      
      <div className="thumbnails-row">
        {images.map((img, index) => (
          <img 
            key={index} 
            src={`/${img}`} 
            alt={`Thumbnail ${index + 1}`} 
            onClick={() => setMainImage(img)} 
            // Adds 'active' class if this thumbnail matches the main image
            className={`thumbnail ${mainImage === img ? 'active' : ''}`} 
            onError={(e) => {e.target.src='https://via.placeholder.com/100?text=Small'}} 
          />
        ))}
      </div>
    </div>
  );
};

export default PropertyGallery;