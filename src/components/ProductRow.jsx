function ProductRow({ product, onDelete }) {
  const productName = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: "red" }}>{product.name}</span>
  );
  return (
    <tr>
      <td><button onClick={(e) => onDelete(product.name)}>x</button></td>
      <td>{productName}</td>
      <td>{product.price}</td>
    </tr>
  );
}

export default ProductRow;