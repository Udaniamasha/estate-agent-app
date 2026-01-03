import React from 'react';
import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import Home from './pages/Home';

// --- MOCKS ---

// 1️ Mock JSON data file to avoid loading external files during tests
// This ensures tests are independent from your real dataset
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

// 2️ Mock the Drag-and-Drop library
// React Beautiful DnD cannot run in jsdom (browser simulation), so we mock its components
vi.mock('react-beautiful-dnd', () => ({
  DragDropContext: ({ children }) => <div>{children}</div>,
  Droppable: ({ children }) => children({ draggableProps: {}, innerRef: null }, {}),
  Draggable: ({ children }) => children({ draggableProps: {}, dragHandleProps: {}, innerRef: null }, {})
}));

// Helper function to render the Home page with context and router wrappers
const renderHome = () => {
  render(
    <FavoritesProvider>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </FavoritesProvider>
  );
};

// --- MAIN TEST SUITE ---

describe('Estate Agent App Tests', () => {

  // Test 1: Renders correctly and shows title + mock data
  test('1. Renders the Search Page and Title', () => {
    renderHome();

    // Checks for main heading (hero section title)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/believe in finding it/i);

    // Confirms a mock property from the data appears in the UI
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

  // Test 3: Favourites panel initially empty
  test('3. Favorites list starts empty', () => {
    renderHome();
    expect(screen.getByText(/Saved Properties \(0\)/i)).toBeInTheDocument();
  });

  //  Test 4: Add to Favourites updates sidebar and counter
  test('4. Add to Favorites works via button', async () => {
    renderHome();
    
    // Select the "heart" button on a property card
    const addButtons = screen.getAllByLabelText(/Add to favorites/i);
    fireEvent.click(addButtons[0]);

    // The counter should increase
    expect(screen.getByText(/Saved Properties \(1\)/i)).toBeInTheDocument();

    // Sidebar should display the property that was added
    const sidebar = document.querySelector('.favorites-sidebar');
    expect(sidebar).toHaveTextContent('Test House Location');
  });

  // Test 5: Clear button resets favourites correctly
  test('5. Clear Favorites button empties the list', async () => {
    renderHome();

    // Add a favourite
    const addButtons = screen.getAllByLabelText(/Add to favorites/i);
    fireEvent.click(addButtons[0]);
    expect(screen.getByText(/Saved Properties \(1\)/i)).toBeInTheDocument();

    // Click "Clear List" to remove all favourites
    const clearBtn = screen.getByText(/Clear List/i);
    fireEvent.click(clearBtn);

    // Expect sidebar to show zero favourites again
    expect(screen.getByText(/Saved Properties \(0\)/i)).toBeInTheDocument();
  });
});
