import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import "react-datepicker/dist/react-datepicker.css";
import '../styles/SearchForm.css';

const SearchForm = ({
  filters,
  handleInputChange,
  handleDateChange,
  handleSearch,
  clearFilters
}) => {

  /* Tracks which tab is active (UI only, does not affect filtering logic) */
  const [activeTab, setActiveTab] = useState('buy');

  /* Property type options */
  const typeOptions = [
    { value: 'any', label: 'Any' },
    { value: 'House', label: 'House' },
    { value: 'Flat', label: 'Flat' }
  ];

  /* Bedroom dropdown values */
  const bedOptions = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5+' }
  ];

  /* Common UK property price points */
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

      {/* Buy / Rent tabs (visual only) */}
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

      {/* Main search form */}
      <form onSubmit={handleSearch} className="rm-form-body">

        {/* Area and property type */}
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
              value={typeOptions.find(op => op.value === filters.type)}
              onChange={(op) =>
                handleInputChange({
                  target: { name: 'type', value: op.value }
                })
              }
              className="rm-select-container"
              classNamePrefix="rm-select"
              placeholder="Any"
              isSearchable={false}
            />
          </div>
        </div>

        {/* Prices, bedrooms and date filters */}
        <div className="rm-row-secondary">

          <div className="rm-input-group">
            <label>Price Range (£)</label>
            <div className="split-inputs">
              <Select
                options={priceOptions}
                placeholder="No min"
                className="rm-select-container"
                classNamePrefix="rm-select"
                onChange={(op) =>
                  handleInputChange({
                    target: {
                      name: 'minPrice',
                      value: op ? op.value : 0
                    }
                  })
                }
                value={
                  priceOptions.find(op => op.value === filters.minPrice) || null
                }
                isClearable
              />
              <span className="dash">-</span>
              <Select
                options={priceOptions}
                placeholder="No max"
                className="rm-select-container"
                classNamePrefix="rm-select"
                onChange={(op) =>
                  handleInputChange({
                    target: {
                      name: 'maxPrice',
                      value: op ? op.value : 10000000
                    }
                  })
                }
                value={
                  priceOptions.find(op => op.value === filters.maxPrice) || null
                }
                isClearable
              />
            </div>
          </div>

          <div className="rm-input-group">
            <label>No. of Bedrooms</label>
            <div className="split-inputs">
              <Select
                options={bedOptions}
                placeholder="No min"
                className="rm-select-container"
                classNamePrefix="rm-select"
                onChange={(op) =>
                  handleInputChange({
                    target: {
                      name: 'minBedrooms',
                      value: op ? op.value : 0
                    }
                  })
                }
                value={
                  bedOptions.find(op => op.value === filters.minBedrooms) || null
                }
                isClearable
                isSearchable={false}
              />
              <span className="dash">-</span>
              <Select
                options={bedOptions}
                placeholder="No max"
                className="rm-select-container"
                classNamePrefix="rm-select"
                onChange={(op) =>
                  handleInputChange({
                    target: {
                      name: 'maxBedrooms',
                      value: op ? op.value : 10
                    }
                  })
                }
                value={
                  bedOptions.find(op => op.value === filters.maxBedrooms) || null
                }
                isClearable
                isSearchable={false}
              />
            </div>
          </div>

          <div className="rm-input-group">
            <label>Added to site</label>
            <div className="split-inputs">
              <DatePicker
                selected={filters.dateAdded}
                onChange={handleDateChange}
                placeholderText="From"
                className="rm-date-input"
                dateFormat="dd/MM/yyyy"
                isClearable
              />
              <span className="dash">-</span>
              <DatePicker
                selected={filters.dateAddedMax}
                onChange={(date) =>
                  handleInputChange({
                    target: {
                      name: 'dateAddedMax',
                      value: date
                    }
                  })
                }
                placeholderText="To"
                className="rm-date-input"
                dateFormat="dd/MM/yyyy"
                isClearable
              />
            </div>
          </div>

        </div>

        {/* Form actions */}
        <div className="rm-actions">
          <button
            type="button"
            onClick={clearFilters}
            className="rm-clear-btn"
          >
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
