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
  const [products, setProducts] = useState(PRODUCTS);

  const handleAddProduct = (category, name, price, stocked) => {
    const newProduct = { category, name, price, stocked };
    const newProducts = [...products, newProduct];

    const sortedProducts = [
      ...newProducts.filter((p) => p.category === "Fruits"),
      ...newProducts.filter((p) => p.category !== "Fruits"),
    ];

    setProducts(sortedProducts);
  };

  return (
    <main>
      <AddProduct onAddProduct={handleAddProduct} />
      <FilterableProductTable products={products} />
    </main>
  );
}

function FilterableProductTable({ products }) {
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
      />
    </div>
  );
}

function AddProduct({ onAddProduct }) {
  function handleSubmit(e) {
    e.preventDefault();
    const category = e.target[0].value;
    const name = e.target[1].value;
    const price = e.target[2].value;
    const stocked = e.target[3].checked;
    onAddProduct(category, name, price, stocked);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select>
          <option value="Fruits">Fruits</option>
          <option value="Vegetables">Vegetables</option>
        </select>
        <input type="text" placeholder="Product Name" />
        <select>
          <option value="$1">$1</option>
          <option value="$2">$2</option>
          <option value="$3">$3</option>
          <option value="$4">$4</option>
          <option value="$5">$5</option>
        </select>
        <input type="checkbox" />
        <label>Stock Status</label>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange,
}) {
  return (
    <form>
      <input
        type="text"
        value={filterText}
        onChange={(e) => onFilterTextChange(e.target.value)}
        placeholder="Search..."
      />
      <br />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
        />
        &nbsp;Only show products in stock
      </label>
    </form>
  );
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    // 겹치는 문자가 하나도 없으면 -1을 반환
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }

    // stock true 체크하면 stock가 false인 것들은 걸러내기
    if (inStockOnly && !product.stocked) {
      return;
    }

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
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  );
}

function ProductRow({ product }) {
  const productName = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: "red" }}>{product.name}</span>
  );
  return (
    <tr>
      <td>{productName}</td>
      <td>{product.price}</td>
    </tr>
  );
}
