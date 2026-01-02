import React, { createContext, useState, useContext } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favoriteProperties, setFavoriteProperties] = useState([]);

  // Add to favorites (prevent duplicates)
  const addFavorite = (property) => {
    if (!favoriteProperties.some(fav => fav.id === property.id)) {
      setFavoriteProperties(prev => [...prev, property]);
    }
  };

  // Remove from favorites
  const removeFavorite = (propertyId) => {
    setFavoriteProperties(prev => prev.filter(fav => fav.id !== propertyId));
  };

  // Clear all
  const clearFavorites = () => {
    setFavoriteProperties([]);
  };

  const value = {
    favoriteProperties,
    addFavorite,
    removeFavorite,
    clearFavorites,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};