#  DreamEstate — Client-Side Web Application

> **Module:** 5COSC026W Advanced Client-Side Web Development  
> **Final Coursework Submission**  
> **Student ID:** w2120299  
> **Author:** M.V. Udani Amasha  

---

##  Live Demo
**[View the Deployed Application](https://Udaniamasha.github.io/estate-agent-app/)**

---

##  Project Overview
**DreamEstate** is a responsive, React-based Single Page Application (SPA) simulating a modern real estate platform similar to *Rightmove*.  
Users can search for properties using advanced filters, view detailed listings, and manage their favourites interactively with drag-and-drop functionality.

The system emphasizes:
- **Reusable React components**
- **Clean, secure code**
- **Responsive design principles**
- **Comprehensive testing and state management**

---

##  Core Features (Aligned with Marking Criteria)

### Advanced Search Functionality
- Multi-criteria search: Type, Price Range, Bedrooms, Postcode, and Date Added  
- Client-side filtering using JSON data  
- Interactive React widgets (`react-select`, `react-datepicker`)  
- Smart handling of partial or empty criteria  

### Property Details Page
- Dynamic routing via `react-router-dom` (`/property/:id`)  
- Image gallery with active thumbnail switching  
- Tabbed interface: **Description**, **Floor Plan**, **Google Map**  
- Data sanitation using `DOMPurify` to prevent XSS attacks  

### Favorites Management
- Global state handled through the **React Context API**  
- Drag & Drop via `react-beautiful-dnd`  
  - Add properties by dragging or clicking  
  - Remove by drag-out or delete button  
- Prevents duplicates and supports “Clear All”  

### Responsive & Aesthetic Design
- Clean, professional layout inspired by *Rightmove*  
- **Hero Search Section**, **Navy–Teal theme**, and **hover effects**  
- Optimized for mobile with **hamburger menu** and **stacked layouts**  
- Media queries for adaptive grid behaviour  

### Testing & Quality Assurance
- **5 meaningful unit tests** written with **Vitest** and **React Testing Library**  
  - Search filtering  
  - Favorites add/remove  
  - Clear favourites  
  - Component rendering  
- Proper commenting, indentation, and naming conventions maintained  

### Security Practices
- **Content Security Policy (CSP)** applied in `index.html`  
- **DOMPurify** ensures safe HTML rendering  
- All external dependencies are trusted and up-to-date  

---

## Technologies Used
| Category | Tools & Libraries |
|-----------|------------------|
| **Frontend** | React.js, CSS3 (Flexbox, Grid) |
| **Build Tool** | Vite |
| **Routing** | React Router DOM |
| **State Management** | React Context API |
| **UI Components** | React-Select, React-Datepicker, React-Beautiful-DND |
| **Security** | DOMPurify, CSP Meta Policy |
| **Testing** | Vitest, React Testing Library, Happy-DOM |

---

## Run the Project Locally

1. **Clone the Repository**
   git clone https://github.com/Udaniamasha/estate-agent-app.git
   cd estate-agent-app

2. **Install Dependencies**
   npm install

3. **Start Development Server**
   npm run dev


4. **Run Unit Tests**
   npm test

Summary

DreamEstate demonstrates modern front-end development practices by combining React’s component architecture with user-focused design, interactivity, and secure coding.
It fulfills all key coursework requirements for Advanced Client-Side Web Development, including responsiveness, functionality, testing, and maintainable code quality.   

👤 Author
Student ID: w2120299
Name :M.V.U Amasha
Module: 5COSC026W
University of Westminster