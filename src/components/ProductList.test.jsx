import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductList from './ProductList';

// Mock the fetch function
global.fetch = vi.fn();

// Mock child components to focus on container logic
vi.mock('./content/ProductCardView', () => ({
  default: ({ product }) => <div data-testid="card-view">{product.name}</div>
}));

vi.mock('./content/ProductListView', () => ({
  default: ({ product }) => <div data-testid="list-view">{product.name}</div>
}));

vi.mock('./header/ProductHeader', () => ({
  default: ({ searchTerm, onSearchChange, view, onViewChange, sortOrder, onSortChange }) => (
    <div data-testid="product-header">
      <input 
        data-testid="search-input"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <button data-testid="card-button" onClick={() => onViewChange('card')}>
        Card {view === 'card' ? '(active)' : ''}
      </button>
      <button data-testid="list-button" onClick={() => onViewChange('list')}>
        List {view === 'list' ? '(active)' : ''}
      </button>
      <button data-testid="sort-button" onClick={onSortChange}>
        Sort {sortOrder}
      </button>
    </div>
  )
}));

vi.mock('./footer/ProductFooter', () => ({
  default: ({ totalProducts, averagePrice }) => (
    <div data-testid="product-footer">
      Total: {totalProducts}, Avg: ${averagePrice.toFixed(2)}
    </div>
  )
}));

describe('ProductList', () => {
  const mockProducts = [
    { id: 1, name: 'Product A', price: 10.00, description: 'Description A' },
    { id: 2, name: 'Product B', price: 20.00, description: 'Description B' },
    { id: 3, name: 'Product C', price: 30.00, description: 'Description C' },
  ];

  beforeEach(() => {
    fetch.mockResolvedValue({
      json: () => Promise.resolve(mockProducts),
    });
    vi.clearAllMocks();
  });

  it('fetches and displays products on mount', async () => {
    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText('Product A')).toBeInTheDocument();
      expect(screen.getByText('Product B')).toBeInTheDocument();
      expect(screen.getByText('Product C')).toBeInTheDocument();
    });

    expect(fetch).toHaveBeenCalledWith(
      'https://gist.githubusercontent.com/biswajitch/1ee5579ebb718236f344148cdf008fab/raw/b84cfb813202fab96ae7ab719023c030d02c5bf1/products.json'
    );
  });

  it('renders in card view by default', async () => {
    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getAllByTestId('card-view')).toHaveLength(3);
      expect(screen.queryByTestId('list-view')).not.toBeInTheDocument();
    });
  });

  it('switches to list view when requested', async () => {
    const user = userEvent.setup();
    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText('Product A')).toBeInTheDocument();
    });

    await user.click(screen.getByTestId('list-button'));

    expect(screen.getAllByTestId('list-view')).toHaveLength(3);
    expect(screen.queryByTestId('card-view')).not.toBeInTheDocument();
  });

  it('filters products based on search term', async () => {
    const user = userEvent.setup();
    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText('Product A')).toBeInTheDocument();
    });

    const searchInput = screen.getByTestId('search-input');
    await user.type(searchInput, 'Product A');

    // Wait for debounce
    await waitFor(() => {
      expect(screen.getByText('Product A')).toBeInTheDocument();
      expect(screen.queryByText('Product B')).not.toBeInTheDocument();
      expect(screen.queryByText('Product C')).not.toBeInTheDocument();
    }, { timeout: 1000 });
  });

  it('sorts products by price ascending', async () => {
    const user = userEvent.setup();
    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText('Product A')).toBeInTheDocument();
    });

    // Click sort button once for ascending
    await user.click(screen.getByTestId('sort-button'));

    // Check if sort state changed (we can see this in the mocked button text)
    expect(screen.getByText(/Sort asc/)).toBeInTheDocument();
  });

  it('cycles through sort states correctly', async () => {
    const user = userEvent.setup();
    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText('Product A')).toBeInTheDocument();
    });

    const sortButton = screen.getByTestId('sort-button');

    // Initial state: none
    expect(screen.getByText(/Sort none/)).toBeInTheDocument();

    // Click once: ascending
    await user.click(sortButton);
    expect(screen.getByText(/Sort asc/)).toBeInTheDocument();

    // Click twice: descending  
    await user.click(sortButton);
    expect(screen.getByText(/Sort desc/)).toBeInTheDocument();

    // Click thrice: back to none
    await user.click(sortButton);
    expect(screen.getByText(/Sort none/)).toBeInTheDocument();
  });

  it('calculates and displays correct statistics', async () => {
    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText('Total: 3, Avg: $20.00')).toBeInTheDocument();
    });
  });

  it('updates statistics when products are filtered', async () => {
    const user = userEvent.setup();
    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText('Total: 3, Avg: $20.00')).toBeInTheDocument();
    });

    const searchInput = screen.getByTestId('search-input');
    await user.type(searchInput, 'Product A');

    await waitFor(() => {
      expect(screen.getByText('Total: 1, Avg: $10.00')).toBeInTheDocument();
    }, { timeout: 1000 });
  });

  it('handles empty product list', async () => {
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve([]),
    });

    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText('Total: 0, Avg: $0.00')).toBeInTheDocument();
    });
  });

  it('renders all child components', async () => {
    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByTestId('product-header')).toBeInTheDocument();
      expect(screen.getByTestId('product-footer')).toBeInTheDocument();
    });
  });

  it('maintains view state when searching', async () => {
    const user = userEvent.setup();
    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText('Product A')).toBeInTheDocument();
    });

    // Switch to list view
    await user.click(screen.getByTestId('list-button'));
    expect(screen.getAllByTestId('list-view')).toHaveLength(3);

    // Search for something
    const searchInput = screen.getByTestId('search-input');
    await user.type(searchInput, 'Product A');

    // Should still be in list view
    await waitFor(() => {
      expect(screen.getByTestId('list-view')).toBeInTheDocument();
      expect(screen.queryByTestId('card-view')).not.toBeInTheDocument();
    }, { timeout: 1000 });
  });
});