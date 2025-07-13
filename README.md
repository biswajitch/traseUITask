# Product Listing App

A modern React product listing application with search, filtering, and sorting capabilities.

## Features

- **Product Display**: Card and list view modes
- **Search**: Real-time search with debouncing (300ms)
- **Sorting**: Price sorting (ascending/descending/none)
- **Statistics**: Footer showing total products and average price
- **Responsive Design**: Clean, modern UI with proper spacing
- **Performance**: Memoized filtering and sorting operations

## Tech Stack

- **React 19** with hooks (useState, useEffect, useMemo)
- **Vite** for fast development and building
- **CSS3** with flexbox for responsive layout
- **Cypress** for end-to-end testing

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd product-listing-app

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run cypress:open` - Open Cypress test runner
- `npm run cypress:run` - Run Cypress tests headlessly
- `npm run test:e2e` - Run all e2e tests

## Testing

### End-to-End Tests

Run the complete test suite:

```bash
# Start the dev server first
npm run dev

# In another terminal, run tests
npm run test:e2e
```

Or use the interactive test runner:

```bash
npm run cypress:open
```

### Test Coverage

The e2e tests cover:

- ✅ **Search functionality** - Text filtering with debounce
- ✅ **View switching** - Card/list view toggles  
- ✅ **Price sorting** - Ascending/descending/none states
- ✅ **Footer statistics** - Dynamic count and average price
- ✅ **Combined scenarios** - Search + sort + view interactions

## Component Structure

```
src/
├── App.jsx                 # Main app component
├── components/
│   ├── ProductList.jsx     # Main container with search/controls
│   ├── ProductCardView.jsx # Card view component
│   ├── ProductListView.jsx # List view component
│   └── ProductCard.css     # Shared styles
└── main.jsx               # React entry point
```

## Performance Optimizations

- **Debounced Search**: 300ms delay prevents excessive API calls
- **Memoized Filtering**: `useMemo` caches filtered results
- **Memoized Statistics**: Footer stats only recalculate when data changes
- **Efficient Sorting**: Applied after filtering for optimal performance

## API Integration

Currently uses a static JSON file hosted on GitHub Gist. Easy to replace with a real API endpoint in `ProductList.jsx`.

