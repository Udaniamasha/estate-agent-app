import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import propertiesData from '../data/properties.json';
import { useFavorites } from '../context/FavoritesContext';
import SearchForm from '../components/SearchForm';
import PropertyCard from '../components/PropertyCard';
import '../styles/Home.css'; // We will create this CSS file next

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filters, setFilters] = useState({
    type: 'any', minPrice: 0, maxPrice: 10000000, minBedrooms: 0, maxBedrooms: 10, postcode: '', dateAdded: null,dateAddedMax: null
  });
  const { addFavorite, removeFavorite, favoriteProperties, clearFavorites } = useFavorites();

  useEffect(() => {
    setProperties(propertiesData.properties);
    setFilteredProperties(propertiesData.properties);
  }, []);

  // --- Filter Logic ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFilters(prev => ({ ...prev, dateAdded: date }));
  };

  const createDateFromObject = (dateObj) => {
    const monthMap = { "January": 0, "February": 1, "March": 2, "April": 3, "May": 4, "June": 5, "July": 6, "August": 7, "September": 8, "October": 9, "November": 10, "December": 11 };
    return new Date(dateObj.year, monthMap[dateObj.month], dateObj.day);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const results = properties.filter(property => {
      const typeMatch = filters.type === 'any' || property.type.toLowerCase() === filters.type.toLowerCase();
      const priceMatch = property.price >= parseInt(filters.minPrice) && property.price <= parseInt(filters.maxPrice);
      const bedroomMatch = property.bedrooms >= parseInt(filters.minBedrooms) && property.bedrooms <= parseInt(filters.maxBedrooms);
      const postcodeMatch = filters.postcode === '' || property.location.toLowerCase().includes(filters.postcode.toLowerCase());
      // Date Logic: Check BOTH Min and Max
    let dateMatch = true;
    const propertyDate = createDateFromObject(property.added);
    
    if (filters.dateAdded) {
      dateMatch = dateMatch && (propertyDate >= filters.dateAdded);
    }
    if (filters.dateAddedMax) {
      dateMatch = dateMatch && (propertyDate <= filters.dateAddedMax);
    }

    return typeMatch && priceMatch && bedroomMatch && postcodeMatch && dateMatch;
  });
  setFilteredProperties(results);
};


  const clearFilters = () => {
    setFilteredProperties(properties);
    setFilters({ type: 'any', minPrice: 0, maxPrice: 10000000, minBedrooms: 0, maxBedrooms: 10, postcode: '', dateAdded: null });
  };

  // --- DnD Logic ---
  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    // 1. If dropped outside any list...
    if (!destination) {
      // CHECK: If it came FROM the favorites list, remove it!
      if (source.droppableId === 'favorites-list') {
        removeFavorite(draggableId);
      }
      return;
    }

    // 2. If dropped into the favorites droppable area
    if (destination.droppableId === 'favorites-list' && source.droppableId !== 'favorites-list') {
      const propertyToAdd = properties.find(p => p.id === draggableId);
      if (propertyToAdd) {
        addFavorite(propertyToAdd);
      }
    }
  };

  const isFavorite = (id) => favoriteProperties.some(fav => fav.id === id);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="home-container">
        
        {/* Left/Main Column */}
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
                        style={{ ...provided.draggableProps.style }} // Essential for DnD
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
          {favoriteProperties.length > 0 && (
             <button onClick={clearFavorites} className="clear-fav-btn">Clear All</button>
          )}

          <Droppable droppableId="favorites-list">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="fav-list-droppable">
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
                         <button onClick={() => removeFavorite(fav.id)} className="remove-fav-x">&times;</button>
                         <img src={`/${fav.picture}`} alt="thumb" />
                         <div className="fav-info">
                            <h5>{fav.location}</h5>
                            <span>£{fav.price.toLocaleString()}</span>
                         </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                {favoriteProperties.length === 0 && <p className="empty-msg">Drag properties here</p>}
              </div>
            )}
          </Droppable>
        </div>

      </div>
    </DragDropContext>
  );
};

export default Home;