import { useState, useEffect } from "react";
import "./App.css";

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];

function TodaysFruitRecommendation() {
  const [recommendedFruit, setRecommendedFruit] = useState(null);

  useEffect(() => {
    const fruits = PRODUCTS.filter(product => product.category === "Fruits");
    
    const today = new Date();
    const dayOfMonth = today.getDate();
    
    let fruitIndex = dayOfMonth % fruits.length;
    setRecommendedFruit(fruits[fruitIndex]);
  }, []);

  if (!recommendedFruit) {
    return <div className="recommendation-container">Loading...</div>;
  }

  let emoji = "🍎";
  if (recommendedFruit.name === "Apple") {
    emoji = "🍎";
  } else if (recommendedFruit.name === "Dragonfruit") {
    emoji = "🐉";
  } else if (recommendedFruit.name === "Passionfruit") {
    emoji = "🥭";
  }

  return (
    <div className="recommendation-container">
      <h2>Today's Pick: {recommendedFruit.name} {emoji}</h2>
      <div className="fruit-content">
        <div className="fruit-info">
          <p>Price: {recommendedFruit.price}</p>
        </div>
      </div>
    </div>
  );
}

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

    const newProducts = [
      ...joinProducts.filter((product) => product.category === "Fruits"),
      ...joinProducts.filter((product) => product.category !== "Fruits"),
    ];

    setProducts(newProducts);
  };

  return (
    <main>
      <AddProducts onAddProduct={handleAddProduct} />
      <FilterableProductTable products={products} />
    </main>
  );
}

function AddProducts({ onAddProduct }) {
  function handleSubmit(e) {
    e.preventDefault();
    const category = e.target[0].value;
    const name = e.target[1].value;
    const price = e.target[2].value;
    const stocked = e.target[3].checked;
    onAddProduct(category, name, price, stocked);
  }
  return (
    <form onSubmit={handleSubmit}>
      <select>
        <option value="Fruits">Fruits</option>
        <option value="Vegetables">Vegetables</option>
      </select>
      <input type="text" placeholder="Write new products" />
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
      <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
        <ProductTable
          products={products}
          filterText={filterText}
          inStockOnly={inStockOnly}
        />
        <div style={{ marginTop: "30px" }}>
          <TodaysFruitRecommendation />
        </div>
      </div>
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

  products.forEach((product, index) => {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }

    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category + index}
        />
      );
    }
    rows.push(<ProductRow product={product} key={product.name + index} />);
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