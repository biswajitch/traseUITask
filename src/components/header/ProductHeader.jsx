import React from 'react';
import '../shared/ProductCard.css';

function ProductHeader({ 
  searchTerm, 
  onSearchChange, 
  view, 
  onViewChange, 
  sortOrder, 
  onSortChange 
}) {
  return (
    <div className="controls-row" style={{ marginBottom: '1rem' }}>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-bar"
        />
      </div>
      <div className="view-toggle">
        <button
          onClick={() => onViewChange('card')}
          disabled={view === 'card'}
          className={`icon-button ${view === 'card' ? 'active' : ''}`}
          title="Card View"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 3h7v7H3V3zm9 0h7v7h-7V3zM3 12h7v7H3v-7zm9 0h7v7h-7v-7z"/>
          </svg>
        </button>
        <button
          onClick={() => onViewChange('list')}
          disabled={view === 'list'}
          className={`icon-button ${view === 'list' ? 'active' : ''}`}
          title="List View"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z"/>
          </svg>
        </button>
        <button
          onClick={onSortChange}
          className="sort-button"
          title={`Sort by price ${sortOrder === 'asc' ? '(ascending)' : sortOrder === 'desc' ? '(descending)' : '(none)'}`}
        >
          <span>Price</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 4V2C7 1.45 7.45 1 8 1S9 1.45 9 2V4H11L8 7L5 4H7ZM17 20V22C17 22.55 16.55 23 16 23S15 22.55 15 22V20H13L16 17L19 20H17ZM9 12H15V14H9V12ZM7 16H17V18H7V16ZM5 8H19V10H5V8Z"/>
          </svg>
          {sortOrder === 'asc' && <span className="sort-indicator">↑</span>}
          {sortOrder === 'desc' && <span className="sort-indicator">↓</span>}
        </button>
      </div>
    </div>
  );
}

export default ProductHeader;