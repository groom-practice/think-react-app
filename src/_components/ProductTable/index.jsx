import React from 'react'
import ProductCategoryRow from '../ProductCategoryRow/index.jsx'
import ProductRow from '../ProductRow/index.jsx'

const ProdcutTable = ({ products, filterText, inStockOnly }) => {
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
  )
}

export default ProdcutTable