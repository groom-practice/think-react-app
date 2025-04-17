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
    const selectCategoryProducts = products.filter(
      (product) => product.category === category
    );
    const unSelectCategoryProducts = products.filter(
      (product) => product.category !== category
    );

    selectCategoryProducts.push({
      category,
      price,
      stocked,
      name,
    });

    const joinProducts = [
      ...selectCategoryProducts,
      ...unSelectCategoryProducts,
    ];

    // Fruits 카테고리의 제품을 맨 위로 올리기
    const newProducts = [
      ...joinProducts.filter((product) => product.category === "Fruits"),
      ...joinProducts.filter((product) => product.category !== "Fruits"),
    ];

    setProducts(newProducts);
  };
  return (
    <main>
      <AddProduct onAddProduct={handleAddProduct} />
      <FilterableProductTable products={products} />
    </main>
  );
}

function AddProduct({ onAddProduct }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const category = e.target[0].value;
    const name = e.target[1].value;
    const price = e.target[2].value;
    const stocked = e.target[3].checked;
    onAddProduct(category, name, price, stocked);
  };
  return (
    <form onSubmit={handleSubmit}>
      <select className="category">
        <option value="Fruits">Fruits</option>
        <option value="Vegetables">Vegetables</option>
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

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

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
      />
      <ProductTable
        products={products}
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
}) {
  return (
    <form>
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
