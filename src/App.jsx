import { useState } from "react";
import AddProducts from "./_components/AddProducts";
import FilterableProductTable from "./_components/FilterableProductTable";

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

    selectCategoryProducts.push({ category, name, price, stocked });

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
      <FilterableProductTable products={PRODUCTS} />
    </main>
  );
}
