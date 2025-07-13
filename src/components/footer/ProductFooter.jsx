import React from 'react';
import '../shared/ProductCard.css';

function ProductFooter({ totalProducts, averagePrice }) {
  return (
    <footer className="product-footer">
      <div className="stats">
        <span className="stat-item">
          Total Products: <strong>{totalProducts}</strong>
        </span>
        <span className="stat-item">
          Average Price: <strong>${averagePrice.toFixed(2)}</strong>
        </span>
      </div>
    </footer>
  );
}

export default ProductFooter;