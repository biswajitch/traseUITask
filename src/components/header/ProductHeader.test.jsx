import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductHeader from './ProductHeader';

describe('ProductHeader', () => {
  const defaultProps = {
    searchTerm: '',
    onSearchChange: vi.fn(),
    view: 'card',
    onViewChange: vi.fn(),
    sortOrder: 'none',
    onSortChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders search input with correct placeholder', () => {
    render(<ProductHeader {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText('Search products...');
    expect(searchInput).toBeInTheDocument();
  });

  it('displays current search term in input', () => {
    render(<ProductHeader {...defaultProps} searchTerm="test search" />);
    
    const searchInput = screen.getByDisplayValue('test search');
    expect(searchInput).toBeInTheDocument();
  });

  it('calls onSearchChange when user types in search input', async () => {
    const user = userEvent.setup();
    const onSearchChange = vi.fn();
    
    render(<ProductHeader {...defaultProps} onSearchChange={onSearchChange} />);
    
    const searchInput = screen.getByPlaceholderText('Search products...');
    await user.type(searchInput, 'mouse');
    
    // userEvent.type calls onChange for each character
    expect(onSearchChange).toHaveBeenCalledTimes(5);
    expect(onSearchChange).toHaveBeenLastCalledWith('e'); // last character typed
  });

  it('renders view toggle buttons', () => {
    render(<ProductHeader {...defaultProps} />);
    
    const cardViewButton = screen.getByTitle('Card View');
    const listViewButton = screen.getByTitle('List View');
    
    expect(cardViewButton).toBeInTheDocument();
    expect(listViewButton).toBeInTheDocument();
  });

  it('shows card view as active by default', () => {
    render(<ProductHeader {...defaultProps} view="card" />);
    
    const cardViewButton = screen.getByTitle('Card View');
    expect(cardViewButton).toHaveClass('active');
    expect(cardViewButton).toBeDisabled();
  });

  it('shows list view as active when selected', () => {
    render(<ProductHeader {...defaultProps} view="list" />);
    
    const listViewButton = screen.getByTitle('List View');
    expect(listViewButton).toHaveClass('active');
    expect(listViewButton).toBeDisabled();
  });

  it('calls onViewChange when view buttons are clicked', async () => {
    const user = userEvent.setup();
    const onViewChange = vi.fn();
    
    render(<ProductHeader {...defaultProps} onViewChange={onViewChange} />);
    
    const listViewButton = screen.getByTitle('List View');
    await user.click(listViewButton);
    
    expect(onViewChange).toHaveBeenCalledWith('list');
  });

  it('renders sort button with correct label', () => {
    render(<ProductHeader {...defaultProps} />);
    
    const sortButton = screen.getByRole('button', { name: /price/i });
    expect(sortButton).toBeInTheDocument();
    expect(sortButton).toHaveTextContent('Price');
  });

  it('shows ascending indicator when sortOrder is asc', () => {
    render(<ProductHeader {...defaultProps} sortOrder="asc" />);
    
    const sortButton = screen.getByRole('button', { name: /price/i });
    expect(sortButton).toHaveTextContent('↑');
  });

  it('shows descending indicator when sortOrder is desc', () => {
    render(<ProductHeader {...defaultProps} sortOrder="desc" />);
    
    const sortButton = screen.getByRole('button', { name: /price/i });
    expect(sortButton).toHaveTextContent('↓');
  });

  it('shows no indicator when sortOrder is none', () => {
    render(<ProductHeader {...defaultProps} sortOrder="none" />);
    
    const sortButton = screen.getByRole('button', { name: /price/i });
    expect(sortButton).not.toHaveTextContent('↑');
    expect(sortButton).not.toHaveTextContent('↓');
  });

  it('calls onSortChange when sort button is clicked', async () => {
    const user = userEvent.setup();
    const onSortChange = vi.fn();
    
    render(<ProductHeader {...defaultProps} onSortChange={onSortChange} />);
    
    const sortButton = screen.getByRole('button', { name: /price/i });
    await user.click(sortButton);
    
    expect(onSortChange).toHaveBeenCalledTimes(1);
  });

  it('has correct title attribute for sort button based on state', () => {
    const { rerender } = render(<ProductHeader {...defaultProps} sortOrder="none" />);
    
    let sortButton = screen.getByRole('button', { name: /price/i });
    expect(sortButton).toHaveAttribute('title', 'Sort by price (none)');
    
    rerender(<ProductHeader {...defaultProps} sortOrder="asc" />);
    sortButton = screen.getByRole('button', { name: /price/i });
    expect(sortButton).toHaveAttribute('title', 'Sort by price (ascending)');
    
    rerender(<ProductHeader {...defaultProps} sortOrder="desc" />);
    sortButton = screen.getByRole('button', { name: /price/i });
    expect(sortButton).toHaveAttribute('title', 'Sort by price (descending)');
  });
});