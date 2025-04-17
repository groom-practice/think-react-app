import React, { useState } from 'react'
import SearchBar from '../SearchBar/index.jsx'
import ProductTable from '../ProductTable/index.jsx'


const FilterableProductTable = ({ products }) => {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <ProductTable 
       products={products}
       filterText={filterText}
       inStockOnly={inStockOnly}
      />
    </div>
  )
}

export default FilterableProductTable