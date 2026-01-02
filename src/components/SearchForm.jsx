import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import "react-datepicker/dist/react-datepicker.css";
import '../styles/SearchForm.css';

const SearchForm = ({ filters, handleInputChange, handleDateChange, handleSearch, clearFilters }) => {
  const [activeTab, setActiveTab] = useState('buy'); // Changed default to 'buy' to match typical use

  // --- OPTIONS DATA ---

  // Property Types
  const typeOptions = [
    { value: 'any', label: 'Any' },
    { value: 'House', label: 'House' },
    { value: 'Flat', label: 'Flat' }
  ];

  // Bedroom Options (0 = Studio)
  const bedOptions = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5+' }
  ];

  // Price Options (Generate a list or hardcode common UK price points)
  const priceOptions = [
    { value: 50000, label: '£50,000' },
    { value: 100000, label: '£100,000' },
    { value: 150000, label: '£150,000' },
    { value: 200000, label: '£200,000' },
    { value: 250000, label: '£250,000' },
    { value: 300000, label: '£300,000' },
    { value: 400000, label: '£400,000' },
    { value: 500000, label: '£500,000' },
    { value: 600000, label: '£600,000' },
    { value: 700000, label: '£700,000' },
    { value: 800000, label: '£800,000' },
    { value: 900000, label: '£900,000' },
    { value: 1000000, label: '£1,000,000' },
  ];

  return (
    <div className="rightmove-search-container">
      
      {/* TABS */}
      <div className="search-tabs">
        <button 
          type="button"
          className={`tab-btn ${activeTab === 'buy' ? 'active' : ''}`}
          onClick={() => setActiveTab('buy')}
        >
          Buy
        </button>
        <button 
          type="button"
          className={`tab-btn ${activeTab === 'rent' ? 'active' : ''}`}
          onClick={() => setActiveTab('rent')}
        >
          Rent
        </button>
      </div>

      {/* FORM BODY */}
      <form onSubmit={handleSearch} className="rm-form-body">
        
        <div className="rm-title">
          <h2>Properties for sale in <span className="highlight">UK</span></h2>
          <p>Search the latest homes available now</p>
        </div>

        {/* TOP ROW: Postcode & Type */}
        <div className="rm-row-main">
          <div className="rm-input-group big-input">
            <label>Search Area</label>
            <input 
              type="text" 
              name="postcode" 
              value={filters.postcode} 
              onChange={handleInputChange} 
              placeholder="e.g. NW1, BR1, Leeds" 
            />
          </div>

          <div className="rm-input-group">
            <label>Property Type</label>
            <Select 
              options={typeOptions}
              // Find the object that matches the current string value
              value={typeOptions.find(op => op.value === filters.type)}
              onChange={(op) => handleInputChange({ target: { name: 'type', value: op.value } })}
              className="rm-select-container"
              classNamePrefix="rm-select"
              placeholder="Any"
              isSearchable={false}
            />
          </div>
        </div>

        {/* MIDDLE ROW: Prices & Beds (UPDATED TO DROPDOWNS) */}
        <div className="rm-row-secondary">
          
          {/* Price Range */}
          <div className="rm-input-group">
            <label>Price Range (£)</label>
            <div className="split-inputs">
              {/* MIN PRICE DROPDOWN */}
              <Select 
                options={priceOptions}
                placeholder="No min"
                className="rm-select-container"
                classNamePrefix="rm-select"
                onChange={(op) => handleInputChange({ target: { name: 'minPrice', value: op ? op.value : 0 } })}
                value={priceOptions.find(op => op.value === filters.minPrice) || null}
                isClearable
              />
              <span className="dash">-</span>
              {/* MAX PRICE DROPDOWN */}
              <Select 
                options={priceOptions}
                placeholder="No max"
                className="rm-select-container"
                classNamePrefix="rm-select"
                onChange={(op) => handleInputChange({ target: { name: 'maxPrice', value: op ? op.value : 10000000 } })}
                value={priceOptions.find(op => op.value === filters.maxPrice) || null}
                isClearable
              />
            </div>
          </div>

          {/* Bedrooms */}
          <div className="rm-input-group">
            <label>No. of Bedrooms</label>
            <div className="split-inputs">
              {/* MIN BEDS DROPDOWN */}
              <Select 
                options={bedOptions}
                placeholder="No min"
                className="rm-select-container"
                classNamePrefix="rm-select"
                onChange={(op) => handleInputChange({ target: { name: 'minBedrooms', value: op ? op.value : 0 } })}
                value={bedOptions.find(op => op.value === filters.minBedrooms) || null}
                isClearable
                isSearchable={false}
              />
              <span className="dash">-</span>
              {/* MAX BEDS DROPDOWN */}
              <Select 
                options={bedOptions}
                placeholder="No max"
                className="rm-select-container"
                classNamePrefix="rm-select"
                onChange={(op) => handleInputChange({ target: { name: 'maxBedrooms', value: op ? op.value : 10 } })}
                value={bedOptions.find(op => op.value === filters.maxBedrooms) || null}
                isClearable
                isSearchable={false}
              />
            </div>
          </div>

          {/* Dates */}
          <div className="rm-input-group">
            <label>Added to site</label>
            <div className="split-inputs">
              <DatePicker 
                selected={filters.dateAdded} 
                onChange={handleDateChange} 
                placeholderText="Anytime" 
                className="rm-date-input" 
                dateFormat="dd/MM/yyyy"
                isClearable
              />
              <span className="dash">-</span>
              <DatePicker 
                selected={filters.dateAddedMax} 
                onChange={(date) => handleInputChange({ target: { name: 'dateAddedMax', value: date } })} 
                placeholderText="To" 
                className="rm-date-input"
                dateFormat="dd/MM/yyyy"
                isClearable
              />
            </div>
          </div>

        </div>

        {/* ACTIONS */}
        <div className="rm-actions">
          <button type="button" onClick={clearFilters} className="rm-clear-btn">
             Reset Filters
          </button>
          <button type="submit" className="rm-search-btn">
            Search Properties
          </button>
        </div>

      </form>
    </div>
  );
};

export default SearchForm;