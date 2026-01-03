import React, { createContext, useState, useContext } from 'react';

// Create a new context to hold all favourite property data across the app
const FavoritesContext = createContext();

// Custom hook for easy access to the context
// This avoids having to import useContext and FavoritesContext separately
export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  // Store the user's favourite properties in state
  // Using an array makes it easy to list, add, or remove items
  const [favoriteProperties, setFavoriteProperties] = useState([]);

  // Add a property to favourites, but skip it if it’s already there
  // Prevents duplicate entries when users click "heart" multiple times
  const addFavorite = (property) => {
    if (!favoriteProperties.some(fav => fav.id === property.id)) {
      setFavoriteProperties(prev => [...prev, property]);
    }
  };

  // Remove a specific property by its ID
  // The filter method creates a new array without mutating state directly
  const removeFavorite = (propertyId) => {
    setFavoriteProperties(prev => prev.filter(fav => fav.id !== propertyId));
  };

  // Remove all favourites at once
  // Useful for a “Clear All” button
  const clearFavorites = () => {
    setFavoriteProperties([]);
  };

  // Bundle all data and functions so any component can access them
  const value = {
    favoriteProperties,
    addFavorite,
    removeFavorite,
    clearFavorites,
  };

  // Wrap children components so they can use the same favourites data
  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
