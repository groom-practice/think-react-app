export default function SearchBar({
  filterText,
  inStockkOnly,
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
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
          checked={inStockkOnly}
        />
        &nbsp;Only show products in stock
      </label>
    </form>
  );
}
