import { useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function SearchForm({ onSearch, onClear }) {
  const [filters, setFilters] = useState({
    type: null,
    minPrice: '',
    maxPrice: '',
    minBeds: null,
    maxBeds: null,
    startDate: null,
    endDate: null,
    postcode: ''
  });

  const propertyTypes = [
    { value: 'Any', label: 'Any' },
    { value: 'House', label: 'House' },
    { value: 'Flat', label: 'Flat' }
  ];

  const bedroomOptions = [
    { value: 1, label: '1+' },
    { value: 2, label: '2+' },
    { value: 3, label: '3+' },
    { value: 4, label: '4+' },
    { value: 5, label: '5+' }
  ];

  const handleChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  const handleClear = () => {
    setFilters({
      type: null,
      minPrice: '',
      maxPrice: '',
      minBeds: null,
      maxBeds: null,
      startDate: null,
      endDate: null,
      postcode: ''
    });
    onClear();
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <h2>Search Properties</h2>

      <label>Property Type</label>
      <Select
        options={propertyTypes}
        value={propertyTypes.find(o => o.value === filters.type) || null}
        onChange={(selected) => handleChange('type', selected.value)}
      />

      <label>Min Price (£)</label>
      <input
        type="number"
        value={filters.minPrice}
        onChange={(e) => handleChange('minPrice', e.target.value)}
      />

      <label>Max Price (£)</label>
      <input
        type="number"
        value={filters.maxPrice}
        onChange={(e) => handleChange('maxPrice', e.target.value)}
      />

      <label>Bedrooms (Min)</label>
      <Select
        options={bedroomOptions}
        value={bedroomOptions.find(o => o.value === filters.minBeds) || null}
        onChange={(selected) => handleChange('minBeds', selected.value)}
      />

      <label>Bedrooms (Max)</label>
      <Select
        options={bedroomOptions}
        value={bedroomOptions.find(o => o.value === filters.maxBeds) || null}
        onChange={(selected) => handleChange('maxBeds', selected.value)}
      />

      <label>Date Added</label>
      <DatePicker
        selected={filters.startDate}
        onChange={(date) => handleChange('startDate', date)}
        placeholderText="From"
      />
      <DatePicker
        selected={filters.endDate}
        onChange={(date) => handleChange('endDate', date)}
        placeholderText="To"
      />

      <label>Postcode Area</label>
      <input
        type="text"
        value={filters.postcode}
        onChange={(e) => handleChange('postcode', e.target.value.toUpperCase())}
      />

      <button type="submit">Search</button>
      <button type="button" onClick={handleClear}>Clear</button>
    </form>
  );
}

export default SearchForm;
