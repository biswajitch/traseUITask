import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProductListView from './ProductListView';

describe('ProductListView', () => {
  const mockProduct = {
    id: 2,
    name: 'Bluetooth Speaker',
    price: 45.50,
    description: 'Portable speaker with rich bass and crystal-clear sound.',
    image: 'https://via.placeholder.com/250x150?text=Speaker'
  };

  it('renders product name', () => {
    render(<ProductListView product={mockProduct} />);
    
    expect(screen.getByText('Bluetooth Speaker')).toBeInTheDocument();
  });

  it('renders product description', () => {
    render(<ProductListView product={mockProduct} />);
    
    expect(screen.getByText('Portable speaker with rich bass and crystal-clear sound.')).toBeInTheDocument();
  });

  it('renders product price formatted correctly', () => {
    render(<ProductListView product={mockProduct} />);
    
    expect(screen.getByText('$45.50')).toBeInTheDocument();
  });

  it('renders product image with correct src and alt', () => {
    render(<ProductListView product={mockProduct} />);
    
    const image = screen.getByAltText('Bluetooth Speaker');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://via.placeholder.com/250x150?text=Speaker');
  });

  it('formats price with two decimal places', () => {
    const productWithWholePrice = { ...mockProduct, price: 50 };
    render(<ProductListView product={productWithWholePrice} />);
    
    expect(screen.getByText('$50.00')).toBeInTheDocument();
  });

  it('handles decimal prices correctly', () => {
    const productWithDecimalPrice = { ...mockProduct, price: 99.99 };
    render(<ProductListView product={productWithDecimalPrice} />);
    
    expect(screen.getByText('$99.99')).toBeInTheDocument();
  });

  it('has correct CSS classes for list view styling', () => {
    const { container } = render(<ProductListView product={mockProduct} />);
    
    expect(container.querySelector('.product-card.list-view')).toBeInTheDocument();
    expect(container.querySelector('.product-image')).toBeInTheDocument();
    expect(container.querySelector('.product-details')).toBeInTheDocument();
  });

  it('renders title with correct CSS class', () => {
    const { container } = render(<ProductListView product={mockProduct} />);
    
    const titleElement = container.querySelector('.product-title');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent('Bluetooth Speaker');
  });

  it('renders description with correct CSS class', () => {
    const { container } = render(<ProductListView product={mockProduct} />);
    
    const descriptionElement = container.querySelector('.product-description');
    expect(descriptionElement).toBeInTheDocument();
    expect(descriptionElement).toHaveTextContent('Portable speaker with rich bass and crystal-clear sound.');
  });

  it('renders price with correct CSS class', () => {
    const { container } = render(<ProductListView product={mockProduct} />);
    
    const priceElement = container.querySelector('.product-price');
    expect(priceElement).toBeInTheDocument();
    expect(priceElement).toHaveTextContent('$45.50');
  });

  it('renders price as strong element for emphasis', () => {
    render(<ProductListView product={mockProduct} />);
    
    const priceElement = screen.getByText('$45.50');
    expect(priceElement.tagName).toBe('STRONG');
  });

  it('renders name as h2 heading for accessibility', () => {
    render(<ProductListView product={mockProduct} />);
    
    const nameElement = screen.getByRole('heading', { level: 2 });
    expect(nameElement).toHaveTextContent('Bluetooth Speaker');
  });

  it('wraps title and description in product-details container', () => {
    const { container } = render(<ProductListView product={mockProduct} />);
    
    const detailsContainer = container.querySelector('.product-details');
    const title = detailsContainer.querySelector('.product-title');
    const description = detailsContainer.querySelector('.product-description');
    
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
});