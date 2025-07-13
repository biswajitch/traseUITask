import React from 'react';
import '../shared/ProductCard.css';

function ProductCardView({ product }) {
  return (
    <div className="product">
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <strong>${product.price.toFixed(2)}</strong>
    </div>
  );
}

export default ProductCardView;