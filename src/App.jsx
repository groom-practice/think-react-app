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
  let handleAddProduct = (obj) => {
    const selectCategory = products.filter(
      (p) => p.category === obj["category"]
    );
    const unSelectCategory = products.filter(
      (p) => p.category !== obj["category"]
    );
    selectCategory.push(obj);
    const join = [...selectCategory, ...unSelectCategory];
    const newArr = [
      ...join.filter((v) => v.category === "Fruits"),
      ...join.filter((v) => v.category !== "Fruits"),
    ];
    setProducts(newArr);
  };

  return (
    <main>
      <AddProduct products={products} onAddProduct={handleAddProduct} />
      <FilterableProductTable products={products} />
    </main>
  );
}

function AddProduct({ products, onAddProduct }) {
  const rows = [];
  let lastCategory = null;
  products.forEach((product) => {
    if (product.category !== lastCategory) {
      rows.push(product.category);
    }
    lastCategory = product.category;
  });

  const submitFn = (e) => {
    e.preventDefault();
    let data = new FormData(addForm);
    let obj = {};
    for (let [key, value] of data) {
      obj[key] = value;
    }
    obj["stocked"] = e.target["stocked"].checked ? true : false;
    onAddProduct(obj);
  };

  return (
    <form id="addForm" onSubmit={submitFn}>
      <select name="category">
        {rows.map((v) => (
          <option value={v}>{v}</option>
        ))}
      </select>
      <input type="text" name="name" />
      <select name="price">
        <option value="$1">$1</option>
        <option value="$2">$2</option>
        <option value="$3">$3</option>
        <option value="$4">$4</option>
        <option value="$5">$5</option>
      </select>
      <label>
        <input type="checkbox" name="stocked" />
        Stock Status
      </label>
      <button type="submit">Add</button>
    </form>
  );
}

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

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
  const [showAndHide, setShowAndHide] = useState([]);
  const rows = [];
  let lastCategory = null;

  let handleShow = (category) => {
    let newArr = [...showAndHide, category];
    let data = newArr.filter((item, _, self) => {
      return self.indexOf(item) === self.lastIndexOf(item);
    });

    setShowAndHide(data);
  };

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
          onShow={handleShow}
          showAndHide={showAndHide}
        />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name}
        showAndHide={showAndHide}
      />
    );
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

function ProductCategoryRow({ category, onShow, showAndHide }) {
  let showData = "";
  if (showAndHide.length === 0) {
    showData = "▲";
  } else {
    showData = showAndHide.includes(category) ? "▼" : "▲";
  }
  return (
    <tr>
      <th colSpan={2} onClick={() => onShow(category)}>
        {category} <span>{showData}</span>
      </th>
    </tr>
  );
}

function ProductRow({ product, showAndHide }) {
  let showData = "";
  if (showAndHide.length === 0) {
    showData = "";
  } else {
    showData = showAndHide.includes(product.category) ? "hidden" : "";
  }

  const prductName = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: "red" }}>{product.name}</span>
  );
  return (
    <tr hidden={showData}>
      <td>{prductName}</td>
      <td>{product.price}</td>
    </tr>
  );
}
