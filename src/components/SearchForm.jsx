import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const SearchForm = ({ filters, handleInputChange, handleDateChange, handleSearch, clearFilters }) => {
  return (
    <form onSubmit={handleSearch} className="search-form">
      <div className="search-grid">
        <label>
          Type:
          <select name="type" value={filters.type} onChange={handleInputChange}>
            <option value="any">Any</option>
            <option value="House">House</option>
            <option value="Flat">Flat</option>
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
          <input type="number" name="minBedrooms" value={filters.minBedrooms} onChange={handleInputChange} />
        </label>
        <label>
          Max Beds:
          <input type="number" name="maxBedrooms" value={filters.maxBedrooms} onChange={handleInputChange} />
        </label>
        <label>
          Postcode:
          <input type="text" name="postcode" value={filters.postcode} onChange={handleInputChange} placeholder="e.g. BR1" />
        </label>
        <label>
          Added After:
          <DatePicker selected={filters.dateAdded} onChange={handleDateChange} placeholderText="Select a date" className="date-picker" />
        </label>
      </div>
      
      <div className="form-actions">
        <button type="submit" className="btn-primary">Search</button>
        <button type="button" onClick={clearFilters} className="btn-secondary">Clear</button>
      </div>
    </form>
  );
};

export default SearchForm;