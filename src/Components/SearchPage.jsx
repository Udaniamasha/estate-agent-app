import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import propertiesData from '../data/properties.json';

const SearchPage = () => {

  // 1. Property state
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);

  // 2. Search filters state
  const [filters, setFilters] = useState({
    type: 'any',
    minPrice: 0,
    maxPrice: 10000000,
    minBedrooms: 0,
    maxBedrooms: 10,
    postcode: '',
    dateAdded: null
  });

  // 3. Load properties on mount
  useEffect(() => {
    setProperties(propertiesData.properties);
    setFilteredProperties(propertiesData.properties);
  }, []);

  // 4. Handle text / select input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // 5. Handle date picker change
  const handleDateChange = (date) => {
    setFilters(prev => ({ ...prev, dateAdded: date }));
  };

  // 6. Convert JSON date object to JavaScript Date
  const createDateFromObject = (dateObj) => {
    const monthMap = {
      January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
      July: 6, August: 7, September: 8, October: 9, November: 10, December: 11
    };
    return new Date(dateObj.year, monthMap[dateObj.month], dateObj.day);
  };

  // 7. Search logic
  const handleSearch = (e) => {
    e.preventDefault();

    const results = properties.filter(property => {

      const typeMatch =
        filters.type === 'any' ||
        property.type.toLowerCase() === filters.type;

      const priceMatch =
        property.price >= parseInt(filters.minPrice) &&
        property.price <= parseInt(filters.maxPrice);

      const bedroomMatch =
        property.bedrooms >= parseInt(filters.minBedrooms) &&
        property.bedrooms <= parseInt(filters.maxBedrooms);

      // Match postcode first part (e.g. BR1)
      const postcodeMatch =
        filters.postcode === '' ||
        property.location
          .split(' ')[0]
          .toLowerCase()
          .startsWith(filters.postcode.toLowerCase());

      let dateMatch = true;
      if (filters.dateAdded) {
        const propertyDate = createDateFromObject(property.added);
        dateMatch = propertyDate >= filters.dateAdded;
      }

      return typeMatch && priceMatch && bedroomMatch && postcodeMatch && dateMatch;
    });

    setFilteredProperties(results);
  };

  // 8. Clear filters
  const clearFilters = () => {
    setFilteredProperties(properties);
    setFilters({
      type: 'any',
      minPrice: 0,
      maxPrice: 10000000,
      minBedrooms: 0,
      maxBedrooms: 10,
      postcode: '',
      dateAdded: null
    });
  };

  return (
    <div className="search-page" style={{ padding: '20px' }}>
      <h1>Find Your Dream Home</h1>

      {/* SEARCH FORM */}
      <form
        onSubmit={handleSearch}
        style={{
          border: '1px solid #ccc',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px'
        }}
      >
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>

          <label>
            Type:
            <select name="type" value={filters.type} onChange={handleInputChange}>
              <option value="any">Any</option>
              <option value="house">House</option>
              <option value="flat">Flat</option>
            </select>
          </label>

          <label>
            Min Price:
            <input type="number" name="minPrice" value={filters.minPrice} onChange={handleInputChange} />
          </label>

          <label>
            Max Price:
            <input type="number" name="maxPrice" value={filters.maxPrice} onChange={handleInputChange} />
          </label>

          <label>
            Min Beds:
            <input type="number" name="minBedrooms" value={filters.minBedrooms} onChange={handleInputChange} style={{ width: '60px' }} />
          </label>

          <label>
            Max Beds:
            <input type="number" name="maxBedrooms" value={filters.maxBedrooms} onChange={handleInputChange} style={{ width: '60px' }} />
          </label>

          <label>
            Postcode:
            <input type="text" name="postcode" value={filters.postcode} onChange={handleInputChange} placeholder="e.g. BR1" />
          </label>

          <label>
            Added After:
            <DatePicker
              selected={filters.dateAdded}
              onChange={handleDateChange}
              placeholderText="Select date"
            />
          </label>
        </div>

        <button type="submit" style={{ marginTop: '10px' }}>
          Search Properties
        </button>

        <button type="button" onClick={clearFilters} style={{ marginLeft: '10px' }}>
          Clear
        </button>
      </form>

      {/* RESULTS */}
      <h3>Results: {filteredProperties.length} properties found</h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {filteredProperties.map(property => (
          <div key={property.id} style={{ border: '1px solid #ddd', padding: '10px' }}>
            <img
              src={property.picture}
              alt={property.type}
              style={{ width: '100%', height: '150px', objectFit: 'cover' }}
            />
            <h4>{property.location}</h4>
            <p>Type: {property.type}</p>
            <p>Bedrooms: {property.bedrooms}</p>
            <p>Price: £{property.price.toLocaleString()}</p>
            <a href={`/property/${property.id}`}>View Details</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
