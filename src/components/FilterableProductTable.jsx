import { useState } from "react";
import SearchBar from "./SearchBar";
import ProductTable from "./ProductTable";

function FilterableProductTable({ products, onDelete }) {
  const [filterText, setFilterText] = useState("");
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
        onDelete={onDelete}
      />
    </div>
  );
}

export default FilterableProductTable;