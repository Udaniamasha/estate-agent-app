import React from 'react';
import { useParams } from 'react-router-dom';

const PropertyDetails = () => {
  const { id } = useParams(); // This grabs the ID from the URL (e.g., prop1)

  return (
    <div className="property-details">
      <h1>Property Details</h1>
      <p>Displaying details for property ID: {id}</p>
    </div>
  );
};

export default PropertyDetails;