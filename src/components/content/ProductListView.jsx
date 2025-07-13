import React from 'react';
import '../shared/ProductCard.css';

function ProductListView({ product }) {
  return (
    <div className="product-card list-view">
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />
      <div className="product-details">
        <h2 className="product-title">{product.name}</h2>
        <p className="product-description">{product.description}</p>
      </div>
      <strong className="product-price">${product.price.toFixed(2)}</strong>
    </div>
  );
}

export default ProductListView;