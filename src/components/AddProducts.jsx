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

export default AddProducts;