import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import propertiesData from '../data/properties.json';
import { useFavorites } from '../context/FavoritesContext';
import SearchForm from '../components/SearchForm';
import PropertyCard from '../components/PropertyCard';
import '../styles/Home.css';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  
  // State for all filters
  const [filters, setFilters] = useState({
    type: 'any', 
    minPrice: 0, 
    maxPrice: 10000000, 
    minBedrooms: 0, 
    maxBedrooms: 10, 
    postcode: '', 
    dateAdded: null,
    dateAddedMax: null // Ensure this exists in initial state
  });

  const { addFavorite, removeFavorite, favoriteProperties, clearFavorites } = useFavorites();

  // Load initial data
  useEffect(() => {
    setProperties(propertiesData.properties);
    setFilteredProperties(propertiesData.properties);
  }, []);

  // --- Filter Logic ---
  
  // Handles standard inputs (Text, Numbers, Selects)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Handles the "Start Date" picker specifically
  const handleDateChange = (date) => {
    setFilters(prev => ({ ...prev, dateAdded: date }));
  };

  // Helper to convert JSON Month names to JS Dates
  const createDateFromObject = (dateObj) => {
    const monthMap = { 
      "January": 0, "February": 1, "March": 2, "April": 3, "May": 4, "June": 5, 
      "July": 6, "August": 7, "September": 8, "October": 9, "November": 10, "December": 11 
    };
    return new Date(dateObj.year, monthMap[dateObj.month], dateObj.day);
  };

  // Main Search Function
  const handleSearch = (e) => {
    e.preventDefault();
    
    const results = properties.filter(property => {
      // Type
      const typeMatch = filters.type === 'any' || property.type.toLowerCase() === filters.type.toLowerCase();
      
      // Price (Use Number() to handle empty strings safely)
      const priceMatch = property.price >= Number(filters.minPrice) && property.price <= Number(filters.maxPrice);
      
      // Bedrooms
      const bedroomMatch = property.bedrooms >= Number(filters.minBedrooms) && property.bedrooms <= Number(filters.maxBedrooms);
      
      // Postcode
      const postcodeMatch = filters.postcode === '' || property.location.toLowerCase().includes(filters.postcode.toLowerCase());
      
      // Date Logic: Check BOTH Min and Max
      let dateMatch = true;
      const propertyDate = createDateFromObject(property.added);
      
      // After Start Date
      if (filters.dateAdded) {
        dateMatch = dateMatch && (propertyDate >= filters.dateAdded);
      }
      // Before End Date
      if (filters.dateAddedMax) {
        dateMatch = dateMatch && (propertyDate <= filters.dateAddedMax);
      }

      return typeMatch && priceMatch && bedroomMatch && postcodeMatch && dateMatch;
    });
    
    setFilteredProperties(results);
  };

  // Clear all filters and reset list
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
      dateAddedMax: null // <--- CRITICAL FIX: Reset the Max Date too!
    });
  };

  // --- Drag and Drop Logic ---
  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    // 1. If dropped outside any list (e.g. dragged into empty space)
    if (!destination) {
      // Feature: Drag out to remove from favorites
      if (source.droppableId === 'favorites-list') {
        removeFavorite(draggableId);
      }
      return;
    }

    // 2. If dropped INTO the favorites list
    if (destination.droppableId === 'favorites-list' && source.droppableId !== 'favorites-list') {
      const propertyToAdd = properties.find(p => p.id === draggableId);
      if (propertyToAdd) {
        addFavorite(propertyToAdd);
      }
    }
  };

  // Helper to check if item is in favorites
  const isFavorite = (id) => favoriteProperties.some(fav => fav.id === id);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="home-container">
        
        {/* Left/Main Column: Search & Results */}
        <div className="main-content">
          <h1>Find Your Dream Home</h1>
          <SearchForm 
            filters={filters} 
            handleInputChange={handleInputChange} 
            handleDateChange={handleDateChange} 
            handleSearch={handleSearch} 
            clearFilters={clearFilters} 
          />

          <div className="results-header">
            <h3>{filteredProperties.length} properties found</h3>
          </div>

          <Droppable droppableId="search-results" direction="horizontal">
            {(provided) => (
              <div 
                ref={provided.innerRef} 
                {...provided.droppableProps} 
                className="property-grid"
              >
                {filteredProperties.map((property, index) => (
                  <Draggable key={property.id} draggableId={property.id} index={index}>
                    {(provided, snapshot) => (
                      <div 
                        ref={provided.innerRef} 
                        {...provided.draggableProps} 
                        {...provided.dragHandleProps}
                        style={{ ...provided.draggableProps.style }} // Essential for DnD movement
                      >
                        <PropertyCard 
                          property={property} 
                          isFavorite={isFavorite(property.id)} 
                          onToggleFavorite={(p) => isFavorite(p.id) ? removeFavorite(p.id) : addFavorite(p)}
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

        {/* Right Sidebar: Favorites */}
        <div className="favorites-sidebar">
          <h3>Favorites ({favoriteProperties.length})</h3>
          
          <div className="favorites-drop-zone">
            {favoriteProperties.length === 0 ? (
                <p style={{ fontSize: '0.9rem', color: '#888', marginBottom: '10px' }}>
                  Drag properties here to save them.
                </p>
            ) : (
                <button onClick={clearFavorites} className="clear-fav-btn">Clear All</button>
            )}

            <Droppable droppableId="favorites-list">
              {(provided) => (
                <div 
                  ref={provided.innerRef} 
                  {...provided.droppableProps} 
                  className="fav-list-droppable"
                >
                  {favoriteProperties.map((fav, index) => (
                    <Draggable key={fav.id} draggableId={fav.id} index={index}>
                      {(provided) => (
                        <div 
                          ref={provided.innerRef} 
                          {...provided.draggableProps} 
                          {...provided.dragHandleProps}
                          className="fav-item-mini"
                          style={{ ...provided.draggableProps.style }}
                        >
                          <button onClick={() => removeFavorite(fav.id)} className="remove-fav-x" aria-label="Remove">&times;</button>
                          <img src={`/${fav.picture}`} alt="thumb" onError={(e) => e.target.src='https://via.placeholder.com/60?text=NA'} />
                          <div className="fav-info">
                              <h5>{fav.location}</h5>
                              <span>£{fav.price.toLocaleString()}</span>
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