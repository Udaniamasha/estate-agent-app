import React, { useState } from 'react';

const PropertyGallery = ({ images }) => {
  // We expect an array of image strings.
  // If your JSON only has one string, the parent component should convert it to an array before passing here.
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="gallery-section">
      <div className="main-image-container">
        <img 
          src={`/${mainImage}`} 
          alt="Main View" 
          onError={(e) => {e.target.src='https://via.placeholder.com/800x400?text=No+Image'}} 
        />
      </div>
      <div className="thumbnails-row">
        {images.map((img, index) => (
          <img 
            key={index} 
            src={`/${img}`} 
            alt={`Thumbnail ${index + 1}`} 
            onClick={() => setMainImage(img)} 
            className={`thumbnail ${mainImage === img ? 'active' : ''}`}
            onError={(e) => {e.target.src='https://via.placeholder.com/100?text=Small'}} 
          />
        ))}
      </div>
    </div>
  );
};

export default PropertyGallery;