function ProductRow({ product }) {
  const productName = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: "red" }}>{product.name}</span>
  );
  return (
    <tr>
      <td style={{width: "50%"}}>{productName}</td>
      <td>{product.price}</td>
    </tr>
  );
}

export default ProductRow;