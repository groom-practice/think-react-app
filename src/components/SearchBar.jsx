function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange,
}) {
  return (
    <>
      <form>
        <input
          type='text'
          value={filterText}
          onChange={(e) => onFilterTextChange(e.target.value)}
          placeholder='Search...'
        />
        <br />
        <label>
          <input
            type='checkbox'
            checked={inStockOnly}
            onChange={(e) => onInStockOnlyChange(e.target.checked)}
          />
          &nbsp;Only show products in stock
        </label>
      </form>
    </>
  );
}

export default SearchBar;
