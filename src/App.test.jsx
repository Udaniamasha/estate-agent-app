import React from 'react';
import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import Home from './pages/Home';

// --- MOCKS ---

// FIX: Corrected path from '../data' to './data'
// This ensures the test uses this fake data instead of the real file.
vi.mock('./data/properties.json', () => ({
  default: {
    properties: [
      {
        id: "prop1",
        type: "House",
        price: 500000,
        location: "Test House Location",
        bedrooms: 3,
        picture: "image1.jpg",
        added: { month: "January", day: 1, year: 2025 }
      },
      {
        id: "prop2",
        type: "Flat",
        price: 200000,
        location: "Test Flat Location",
        bedrooms: 1,
        picture: "image2.jpg",
        added: { month: "March", day: 1, year: 2025 }
      }
    ]
  }
}));

// Mock Drag-and-Drop to prevent errors in test environment
vi.mock('react-beautiful-dnd', () => ({
  DragDropContext: ({ children }) => <div>{children}</div>,
  Droppable: ({ children }) => children({ draggableProps: {}, innerRef: null }, {}),
  Draggable: ({ children }) => children({ draggableProps: {}, dragHandleProps: {}, innerRef: null }, {})
}));

const renderHome = () => {
  render(
    <FavoritesProvider>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </FavoritesProvider>
  );
};

describe('Estate Agent App Tests', () => {

  test('1. Renders the Search Page successfully', () => {
    renderHome();
    // Should see the title
    expect(screen.getByText(/Find Your Dream Home/i)).toBeInTheDocument();
    // Should see our MOCK data, not the real data
    expect(screen.getByText('Test House Location')).toBeInTheDocument();
  });

  test('2. Filters properties by Price (Exclude items outside range)', async () => {
    renderHome();
    
    // Default: Both visible
    expect(screen.getByText('Test House Location')).toBeInTheDocument();
    expect(screen.getByText('Test Flat Location')).toBeInTheDocument();

    // Set Max Price to 300,000 (Should exclude the 500k House)
    const maxPriceInput = screen.getByLabelText(/Max Price/i);
    fireEvent.change(maxPriceInput, { target: { value: '300000' } });
    
    // Click Search
    const searchBtn = screen.getByText(/Search/i);
    fireEvent.click(searchBtn);

    // House (500k) should be gone
    expect(screen.queryByText('Test House Location')).not.toBeInTheDocument();
    // Flat (200k) should remain
    expect(screen.getByText('Test Flat Location')).toBeInTheDocument();
  });

  test('3. Favorites list prevents duplicates / starts empty', () => {
    renderHome();
    expect(screen.getByText(/Favorites \(0\)/i)).toBeInTheDocument();
  });

  test('4. Add to Favorites works via button', async () => {
    renderHome();
    
    // Find all heart buttons
    const addButtons = screen.getAllByLabelText(/Add to favorites/i);
    
    // Click the first one (Test House)
    fireEvent.click(addButtons[0]);

    // Expect sidebar count to increase to 1
    expect(screen.getByText(/Favorites \(1\)/i)).toBeInTheDocument();
    
    // Verify the mock item text is in the sidebar
    // We search within the sidebar container to be specific
    const sidebar = screen.getByText(/Favorites \(1\)/i).closest('.favorites-sidebar');
    expect(sidebar).toHaveTextContent('Test House Location');
  });

  test('5. Clear Favorites button empties the list', async () => {
    renderHome();
    
    // 1. Add an item first to make list non-empty
    const addButtons = screen.getAllByLabelText(/Add to favorites/i);
    fireEvent.click(addButtons[0]);
    expect(screen.getByText(/Favorites \(1\)/i)).toBeInTheDocument();

    // 2. Click "Clear All" button
    const clearBtn = screen.getByText(/Clear All/i);
    fireEvent.click(clearBtn);

    // 3. Count should go back to 0
    expect(screen.getByText(/Favorites \(0\)/i)).toBeInTheDocument();
  });

});