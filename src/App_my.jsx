import { useState } from "react";

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [newProduct, setNewProduct] = useState(products);

  const handleAddNewData = (newData) => {
    document;
  };

  return (
    <div style={{ padding: "20px" }}>
      <SearchBar
        filterText={filterText}
        onFilterTextChange={setFilterText}
        inStockOnly={inStockOnly}
        onInStockOnly={setInStockOnly}
        products={newProduct}
        onAddNewData={handleAddNewData}
      />
      <ProductTable
        products={newProduct}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  );
}

function SearchBar({
  filterText,
  onFilterTextChange,
  inStockOnly,
  onInStockOnly,
  products,
  onAddNewData,
}) {
  return (
    <form>
      <AddProduct products={products} onAddNewData={onAddNewData} />
      <input
        type="text"
        vlaue={filterText}
        onChange={(e) => onFilterTextChange(e.target.value)}
        placeholder="Search..."
      />
      <br />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockOnly(e.target.checked)}
        />
        &nbsp;Only show products in stock
      </label>
    </form>
  );
}

function AddProduct({ products, onAddNewData }) {
  const rows = [];
  let lastCategory = null;
  products.forEach((product) => {
    if (product.category !== lastCategory) {
      rows.push(product.category);
    }
    lastCategory = product.category;
  });
  return (
    <form id="addForm" onSubmit={onAddNewData}>
      <select className="category">
        {rows.map((v) => (
          <option value={v}>{v}</option>
        ))}
      </select>
      <input type="text" className="name" />
      <select className="price">
        <option value="$1">$1</option>
        <option value="$2">$2</option>
        <option value="$3">$3</option>
        <option value="$4">$4</option>
        <option value="$5">$5</option>
      </select>
      <label>
        <input type="checkbox" className="stocked" />
        Stock Status
      </label>
      <button type="submit">Add</button>
    </form>
  );
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    // 겹치는 문자가 없으면 -1
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }

    if (inStockOnly && !product.stocked) {
      return;
    }

    //이전 카테고리와 다르면 productCategoryrow 호출한다
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />
      );
    }
    rows.push(<ProductRow product={product} key={product.name} />);
    lastCategory = product.category;
  });
  return (
    <table>
      <thead>
        <tr>
          <td>Name</td>
          <td>Price</td>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan={2}>{category}</th>
    </tr>
  );
}

function ProductRow({ product }) {
  const prductName = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: "red" }}>{product.name}</span>
  );
  return (
    <tr>
      <td>{prductName}</td>
      <td>{product.price}</td>
    </tr>
  );
}
