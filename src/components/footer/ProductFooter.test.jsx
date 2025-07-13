import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProductFooter from './ProductFooter';

describe('ProductFooter', () => {
  it('renders total products count', () => {
    render(<ProductFooter totalProducts={10} averagePrice={25.99} />);
    
    expect(screen.getByText('Total Products:')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('renders average price formatted to 2 decimal places', () => {
    render(<ProductFooter totalProducts={5} averagePrice={33.333} />);
    
    expect(screen.getByText('Average Price:')).toBeInTheDocument();
    expect(screen.getByText('$33.33')).toBeInTheDocument();
  });

  it('handles zero products correctly', () => {
    render(<ProductFooter totalProducts={0} averagePrice={0} />);
    
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('$0.00')).toBeInTheDocument();
  });

  it('handles single product correctly', () => {
    render(<ProductFooter totalProducts={1} averagePrice={19.95} />);
    
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('$19.95')).toBeInTheDocument();
  });

  it('formats high prices correctly', () => {
    render(<ProductFooter totalProducts={3} averagePrice={1234.56} />);
    
    expect(screen.getByText('$1234.56')).toBeInTheDocument();
  });

  it('rounds prices properly', () => {
    render(<ProductFooter totalProducts={2} averagePrice={99.999} />);
    
    expect(screen.getByText('$100.00')).toBeInTheDocument();
  });

  it('has correct CSS classes for styling', () => {
    const { container } = render(<ProductFooter totalProducts={5} averagePrice={25.99} />);
    
    expect(container.querySelector('.product-footer')).toBeInTheDocument();
    expect(container.querySelector('.stats')).toBeInTheDocument();
    expect(container.querySelectorAll('.stat-item')).toHaveLength(2);
  });

  it('renders as a footer element', () => {
    render(<ProductFooter totalProducts={5} averagePrice={25.99} />);
    
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    expect(footer.tagName).toBe('FOOTER');
  });
});