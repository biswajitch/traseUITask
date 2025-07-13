import { useEffect, useState, useMemo } from 'react';
import ProductCardView from './content/ProductCardView';
import ProductListView from './content/ProductListView';
import ProductHeader from './header/ProductHeader';
import ProductFooter from './footer/ProductFooter';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://gist.githubusercontent.com/biswajitch/1ee5579ebb718236f344148cdf008fab/raw/b84cfb813202fab96ae7ab719023c030d02c5bf1/products.json')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const [view, setView] = useState('card');
  const [sortOrder, setSortOrder] = useState('none'); // 'none', 'asc', 'desc'

  const handleSortChange = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : sortOrder === 'desc' ? 'none' : 'asc');
  };

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product =>
      product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );

    if (sortOrder === 'asc') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [products, debouncedSearchTerm, sortOrder]);

  const stats = useMemo(() => {
    const totalProducts = filteredProducts.length;
    const averagePrice = totalProducts > 0 
      ? filteredProducts.reduce((sum, product) => sum + product.price, 0) / totalProducts 
      : 0;
    return { totalProducts, averagePrice };
  }, [filteredProducts]);

  return (
    <div>
      <ProductHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        view={view}
        onViewChange={setView}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
      />
      <div className={view === 'card' ? 'product-grid' : 'product-list'}>
        {filteredProducts.map((product) => (
          view === 'card' ? (
            <ProductCardView key={product.id} product={product} />
          ) : (
            <ProductListView key={product.id} product={product} />
          )
        ))}
      </div>
      <ProductFooter
        totalProducts={stats.totalProducts}
        averagePrice={stats.averagePrice}
      />
    </div>
  );
}

export default ProductList;