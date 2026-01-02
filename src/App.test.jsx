import React from 'react';
import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import Home from './pages/Home';

// --- MOCKS ---

// 1. Mock properties data
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

// 2. Mock Drag-and-Drop (Critical for testing)
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

  test('1. Renders the Search Page and Title', () => {
    renderHome();
    // Use a flexible regex matcher for the title to handle new lines/spans
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/believe in finding it/i);
    
    // Check if the mock property is rendered
    expect(screen.getByText('Test House Location')).toBeInTheDocument();
  });

  test('2. Filters properties by Postcode (Search Logic)', async () => {
    renderHome();
    
    // Check initial state (Both visible)
    expect(screen.getByText('Test House Location')).toBeInTheDocument();
    expect(screen.getByText('Test Flat Location')).toBeInTheDocument();
    
    // Find the Postcode Input (Standard text input)
    // In SearchForm.jsx: placeholder="e.g. NW1, BR1, Leeds"
    const postcodeInput = screen.getByPlaceholderText(/e.g. NW1/i);
    
    // Type "Flat" to match the second property
    fireEvent.change(postcodeInput, { target: { value: 'Flat' } });
    
    // Click Search
    const searchBtn = screen.getByText(/Search Properties/i);
    fireEvent.click(searchBtn);

    // House should disappear (location is "Test House Location")
    // Flat should remain (location is "Test Flat Location")
    await waitFor(() => {
        expect(screen.queryByText('Test House Location')).not.toBeInTheDocument();
    });
    
    expect(screen.getByText('Test Flat Location')).toBeInTheDocument();
  });

  test('3. Favorites list starts empty', () => {
    renderHome();
    // Your new layout uses "Saved Properties (0)"
    expect(screen.getByText(/Saved Properties \(0\)/i)).toBeInTheDocument();
  });

  test('4. Add to Favorites works via button', async () => {
    renderHome();
    
    // Find heart buttons. Your PropertyCard has aria-label="Add to favorites"
    const addButtons = screen.getAllByLabelText(/Add to favorites/i);
    
    // Click the first one
    fireEvent.click(addButtons[0]);

    // Check count increases
    expect(screen.getByText(/Saved Properties \(1\)/i)).toBeInTheDocument();
    
    // Check item appears in sidebar. 
    // We look for the text specifically within the sidebar container.
    const sidebar = document.querySelector('.favorites-sidebar');
    expect(sidebar).toHaveTextContent('Test House Location');
  });

  test('5. Clear Favorites button empties the list', async () => {
    renderHome();
    
    // 1. Add item
    const addButtons = screen.getAllByLabelText(/Add to favorites/i);
    fireEvent.click(addButtons[0]);
    expect(screen.getByText(/Saved Properties \(1\)/i)).toBeInTheDocument();

    // 2. Click "Clear List" button
    const clearBtn = screen.getByText(/Clear List/i);
    fireEvent.click(clearBtn);

    // 3. Count should go back to 0
    expect(screen.getByText(/Saved Properties \(0\)/i)).toBeInTheDocument();
  });

});