import React from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import "react-datepicker/dist/react-datepicker.css";

const SearchForm = ({ filters, handleInputChange, handleDateChange, handleSearch, clearFilters }) => {
  // Options for React Select
  const typeOptions = [
    { value: 'any', label: 'Any' },
    { value: 'House', label: 'House' },
    { value: 'Flat', label: 'Flat' }
  ];

  // Handler for React Select
  const handleTypeChange = (selectedOption) => {
    // Mimic the event object so your parent component doesn't break
    handleInputChange({ target: { name: 'type', value: selectedOption.value } });
  };
    return (
    <form onSubmit={handleSearch} className="search-form">
      <div className="search-grid">
        <label>
          Type:
          <Select 
            options={typeOptions}
            value={typeOptions.find(op => op.value === filters.type)}
            onChange={handleTypeChange}
            className="react-select-container"
            classNamePrefix="react-select"/>
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