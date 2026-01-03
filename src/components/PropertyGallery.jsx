import React, { useState, useEffect } from 'react';

// Component to display a property image gallery
// Shows one large main image and a row of clickable thumbnails
const PropertyGallery = ({ images }) => {
  // Start with the first image as the default main view
  const [mainImage, setMainImage] = useState(
    images && images.length > 0 ? images[0] : ''
  );

  // When the user navigates to a new property,
  // this effect resets the main image to the first one in the new array.
  // Without this, the gallery could show the previous property's image.
  useEffect(() => {
    if (images && images.length > 0) {
      setMainImage(images[0]);
    }
  }, [images]);

  // If the property has no images, render a short fallback message.
  // This prevents React from throwing errors on empty arrays.
  if (!images || images.length === 0) {
    return <div className="gallery-section">No images available</div>;
  }

  return (
    <div className="gallery-section">
      {/* Main large image */}
      <div className="main-image-container">
        <img
          src={`/${mainImage}`}
          alt="Main View"
          // Replace broken or missing image links with a neutral placeholder
          onError={(e) => {
            e.target.src =
              'https://via.placeholder.com/800x400?text=Image+Not+Found';
          }}
        />
      </div>

      {/* Thumbnails row */}
      <div className="thumbnails-row">
        {images.map((img, index) => (
          <img
            key={index}
            src={`/${img}`}
            alt={`Thumbnail ${index + 1}`}
            // Clicking a thumbnail changes the main image
            onClick={() => setMainImage(img)}
            // Add a visual highlight to the active thumbnail
            className={`thumbnail ${mainImage === img ? 'active' : ''}`}
            // Placeholder if a thumbnail fails to load
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/100?text=Small';
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertyGallery;
