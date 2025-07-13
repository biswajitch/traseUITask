import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProductCardView from './ProductCardView';

describe('ProductCardView', () => {
  const mockProduct = {
    id: 1,
    name: 'Wireless Mouse',
    price: 25.99,
    description: 'A sleek, ergonomic wireless mouse with long battery life.',
    image: 'https://via.placeholder.com/250x150?text=Mouse'
  };

  it('renders product name', () => {
    render(<ProductCardView product={mockProduct} />);
    
    expect(screen.getByText('Wireless Mouse')).toBeInTheDocument();
  });

  it('renders product description', () => {
    render(<ProductCardView product={mockProduct} />);
    
    expect(screen.getByText('A sleek, ergonomic wireless mouse with long battery life.')).toBeInTheDocument();
  });

  it('renders product price formatted correctly', () => {
    render(<ProductCardView product={mockProduct} />);
    
    expect(screen.getByText('$25.99')).toBeInTheDocument();
  });

  it('renders product image with correct src and alt', () => {
    render(<ProductCardView product={mockProduct} />);
    
    const image = screen.getByAltText('Wireless Mouse');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://via.placeholder.com/250x150?text=Mouse');
  });

  it('formats price with two decimal places', () => {
    const productWithWholePrice = { ...mockProduct, price: 30 };
    render(<ProductCardView product={productWithWholePrice} />);
    
    expect(screen.getByText('$30.00')).toBeInTheDocument();
  });

  it('handles long product names', () => {
    const productWithLongName = { 
      ...mockProduct, 
      name: 'Super Ultra Premium Wireless Gaming Mouse with RGB Lighting and Extended Battery Life' 
    };
    render(<ProductCardView product={productWithLongName} />);
    
    expect(screen.getByText('Super Ultra Premium Wireless Gaming Mouse with RGB Lighting and Extended Battery Life')).toBeInTheDocument();
  });

  it('handles high prices', () => {
    const expensiveProduct = { ...mockProduct, price: 1299.99 };
    render(<ProductCardView product={expensiveProduct} />);
    
    expect(screen.getByText('$1299.99')).toBeInTheDocument();
  });

  it('handles products with no description', () => {
    const productWithoutDescription = { ...mockProduct, description: '' };
    const { container } = render(<ProductCardView product={productWithoutDescription} />);
    
    const descriptionElement = container.querySelector('p');
    expect(descriptionElement).toBeInTheDocument();
    expect(descriptionElement).toBeEmptyDOMElement();
  });

  it('has correct CSS class for card view styling', () => {
    const { container } = render(<ProductCardView product={mockProduct} />);
    
    expect(container.querySelector('.product')).toBeInTheDocument();
    expect(container.querySelector('.product-image')).toBeInTheDocument();
  });

  it('renders price as strong element for accessibility', () => {
    render(<ProductCardView product={mockProduct} />);
    
    const priceElement = screen.getByText('$25.99');
    expect(priceElement.tagName).toBe('STRONG');
  });

  it('renders name as h2 heading for accessibility', () => {
    render(<ProductCardView product={mockProduct} />);
    
    const nameElement = screen.getByRole('heading', { level: 2 });
    expect(nameElement).toHaveTextContent('Wireless Mouse');
  });
});