import PRODUCTS from './mocks/products';
import FilterableProductTable from './components/FilterableProductTable';
import AddProducts from './components/AddProducts';
import { useState } from 'react';

function App() {
  const [products, setProducts] = useState(PRODUCTS);

  const handleAddProduct = (category, name, price, stocked) => {
    const newProduct = { category, name, price, stocked };

    const updatedProducts = [...products, newProduct];

    const sortedProducts = [
      ...updatedProducts.filter((p) => p.category === 'Fruits'),
      ...updatedProducts.filter((p) => p.category !== 'Fruits'),
    ];

    setProducts(sortedProducts);
  };

  return (
    <>
      <AddProducts onAddProduct={handleAddProduct} />
      <FilterableProductTable products={products} />;
    </>
  );
}

export default App;
