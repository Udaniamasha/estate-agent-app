import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import propertiesData from '../data/properties.json';
import { useFavorites } from '../context/FavoritesContext';
import SearchForm from '../components/SearchForm';
import PropertyCard from '../components/PropertyCard';
import '../styles/Home.css';
import heroImage from '../assets/hero-bg.jpg';

const Home = () => {

  /* Stores all properties loaded from JSON */
  const [properties, setProperties] = useState([]);

  /* Stores properties after applying filters */
  const [filteredProperties, setFilteredProperties] = useState([]);
  
  /* Search filter values controlled from the search form */
  const [filters, setFilters] = useState({
    type: 'any',
    minPrice: 0,
    maxPrice: 10000000,
    minBedrooms: 0,
    maxBedrooms: 10,
    postcode: '',
    dateAdded: null,
    dateAddedMax: null
  });

  /* Favourite-related actions and state from Context */
  const {
    addFavorite,
    removeFavorite,
    favoriteProperties,
    clearFavorites
  } = useFavorites();

  /* Load property data once when the page mounts */
  useEffect(() => {
    setProperties(propertiesData.properties);
    setFilteredProperties(propertiesData.properties);
  }, []);

  /* Handle text and number input changes from the search form */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  /* Handle date picker changes */
  const handleDateChange = (date) => {
    setFilters(prev => ({ ...prev, dateAdded: date }));
  };

  /* Convert date object from JSON into a JavaScript Date */
  const createDateFromObject = (dateObj) => {
    const monthMap = {
      "January": 0, "February": 1, "March": 2, "April": 3,
      "May": 4, "June": 5, "July": 6, "August": 7,
      "September": 8, "October": 9, "November": 10, "December": 11
    };
    return new Date(dateObj.year, monthMap[dateObj.month], dateObj.day);
  };

  /* Apply all filters and update results */
  const handleSearch = (e) => {
    e.preventDefault();

    const results = properties.filter(property => {
      const typeMatch =
        filters.type === 'any' ||
        property.type.toLowerCase() === filters.type.toLowerCase();

      const priceMatch =
        property.price >= Number(filters.minPrice) &&
        property.price <= Number(filters.maxPrice);

      const bedroomMatch =
        property.bedrooms >= Number(filters.minBedrooms) &&
        property.bedrooms <= Number(filters.maxBedrooms);

      const postcodeMatch =
        filters.postcode === '' ||
        property.location.toLowerCase().includes(filters.postcode.toLowerCase());

      /* Date filtering */
      let dateMatch = true;
      const propertyDate = createDateFromObject(property.added);

      if (filters.dateAdded) {
        dateMatch = propertyDate >= filters.dateAdded;
      }

      if (filters.dateAddedMax) {
        dateMatch = dateMatch && propertyDate <= filters.dateAddedMax;
      }

      return (
        typeMatch &&
        priceMatch &&
        bedroomMatch &&
        postcodeMatch &&
        dateMatch
      );
    });

    setFilteredProperties(results);
  };

  /* Reset filters and show all properties again */
  const clearFilters = () => {
    setFilteredProperties(properties);
    setFilters({
      type: 'any',
      minPrice: 0,
      maxPrice: 10000000,
      minBedrooms: 0,
      maxBedrooms: 10,
      postcode: '',
      dateAdded: null,
      dateAddedMax: null
    });
  };

  /* Handle drag-and-drop interactions */
  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    /* If dropped outside any droppable area */
    if (!destination) {
      if (source.droppableId === 'favorites-list') {
        removeFavorite(draggableId);
      }
      return;
    }

    /* Dragging from search results into favourites */
    if (
      destination.droppableId === 'favorites-list' &&
      source.droppableId !== 'favorites-list'
    ) {
      const propertyToAdd = properties.find(p => p.id === draggableId);
      if (propertyToAdd) addFavorite(propertyToAdd);
    }
  };

  /* Check if a property is already saved */
  const isFavorite = (id) =>
    favoriteProperties.some(fav => fav.id === id);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="home-page">

        {/* Hero section with search */}
        <div className="hero-section" style={{ backgroundImage: `url(${heroImage})` }}>
          <div className="hero-overlay">

            <div className="hero-text-content">
              <h1>
                <span className="hero-highlight">believe</span> in finding it
              </h1>
              <p>with the UK’s widest choice of homes</p>
            </div>

            <div className="search-container">
              <SearchForm
                filters={filters}
                handleInputChange={handleInputChange}
                handleDateChange={handleDateChange}
                handleSearch={handleSearch}
                clearFilters={clearFilters}
              />
            </div>

          </div>
        </div>

        {/* Results and favourites layout */}
        <div className="content-wrapper">

          {/* Property results */}
          <div className="results-column">
            <div className="results-header">
              <h3>{filteredProperties.length} Properties For Sale</h3>
            </div>

            <Droppable droppableId="search-results" direction="horizontal">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="property-grid"
                >
                  {filteredProperties.map((property, index) => (
                    <Draggable
                      key={property.id}
                      draggableId={property.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{ ...provided.draggableProps.style }}
                        >
                          <PropertyCard
                            property={property}
                            isFavorite={isFavorite(property.id)}
                            onToggleFavorite={(p) =>
                              isFavorite(p.id)
                                ? removeFavorite(p.id)
                                : addFavorite(p)
                            }
                            isDragging={snapshot.isDragging}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          {/* Favourites sidebar */}
          <div className="favorites-sidebar">
            <h3>Saved Properties ({favoriteProperties.length})</h3>

            {favoriteProperties.length > 0 && (
              <button
                onClick={clearFavorites}
                className="clear-fav-btn"
              >
                Clear List
              </button>
            )}

            <Droppable droppableId="favorites-list">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="fav-list-droppable"
                  style={{ minHeight: '100px' }}
                >
                  {favoriteProperties.length === 0 && (
                    <p style={{ color: '#999', fontSize: '0.9rem' }}>
                      Drag properties here...
                    </p>
                  )}

                  {favoriteProperties.map((fav, index) => (
                    <Draggable
                      key={fav.id}
                      draggableId={fav.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="fav-item-mini"
                          style={{ ...provided.draggableProps.style }}
                        >
                          <button
                            onClick={() => removeFavorite(fav.id)}
                            className="remove-fav-x"
                          >
                            &times;
                          </button>

                          {/* REMOVED THE LEADING SLASH */}
                          <img src={fav.picture} alt="thumb" onError={(e) => e.target.src = 'https://via.placeholder.com/60'} />

                          <div className="fav-info">
                            <h5 style={{ margin: 0 }}>{fav.location}</h5>
                            <span
                              style={{
                                color: '#00d68f',
                                fontWeight: 'bold'
                              }}
                            >
                              £{fav.price.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

        </div>
      </div>
    </DragDropContext>
  );
};

export default Home;
