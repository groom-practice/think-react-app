import { useEffect, useState } from "react";

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];

export default function App() {
  // 제품 삭제 기능 추가
  const handleDeleteProduct = (indexToDelete) => {
    // 배열에서 조건에 맞는 요소만 남기고 새로운 배열 만들기
    // index는 현재 요소의 인덱스
    // 삭제하려는 인덱스가 아닌 것만 남긴다.
    setProducts((prev) => prev.filter((_, index) => index !== indexToDelete));
  };

  const [products, setProducts] = useState(() => {
    // 로컬스토리지 저장 추가
    const saved = localStorage.getItem("products");
    return saved ? JSON.parse(saved) : PRODUCTS;
  });

  // 자꾸 안돼서 useEffect 사용하니까 되는데 왜그럴까요..
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

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
    <main style={{ padding: "20px" }}>
      <AddProducts onAddProduct={handleAddProduct} />
      <FilterableProductTable
        products={products}
        onDeleteProduct={handleDeleteProduct}
      />
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

function FilterableProductTable({ products, onDeleteProduct }) {
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
        onDeleteProduct={onDeleteProduct}
      />
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

function ProductTable({ products, filterText, inStockOnly, onDeleteProduct }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product, index) => {
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
          key={product.category + index}
        />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name + index}
        onDeleteProduct={onDeleteProduct}
        index={index}
      />
    );
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

function ProductRow({ product, onDeleteProduct, index }) {
  const productName = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: "red" }}>{product.name}</span>
  );

  return (
    <tr>
      <td>{productName}</td>
      <td>{product.price}</td>
      <td>
        {/* 
        
          화살표 함수를 사용해서 클릭 시 특정 동작 실행
          onDeleteProduct를 실행하면서 index값을 인자로 전달
          해당 항목의 인덱스를 삭제!
        
        */}
        <button onClick={() => onDeleteProduct(index)}>Delete</button> &nbsp;
        <button>Edit</button>
      </td>
    </tr>
  );
}
