export default function ProductsFiltration({
  handleSortChange,
  handleFilterChange,
  filterCriteria,
}) {
  return (
    <section className="products-filtering">
      <div>
        <label htmlFor="sort">Sort by</label>
        <select id="sort" onChange={handleSortChange}>
          <option value="Newest">Newest</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="0-1">0-1</option>
          <option value="1-0">1-0</option>
        </select>
      </div>
      <div>
        <label htmlFor="category">Category</label>
        <select onChange={handleFilterChange} id="category">
          <option value="All">All</option>
          <option value="men's clothing">Men's clothing</option>
          <option value="women's clothing">Women's clothing</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
        </select>
      </div>
    </section>
  );
}
