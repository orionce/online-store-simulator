import { useProductContext } from "../contex/useProductContext";
const Filters = () => {
  const { setFilters, filters } = useProductContext();

  return (
    <>
      <div className="filterContent">
        <input
          value={filters.title || ""}
          onChange={(e) => {
            setFilters((filters) => {
              return { ...filters, title: e.target.value };
            });
          }}
          type="text"
          placeholder="Search products"
        />
        <select
          id="category"
          value={filters.category || "all"}
          onChange={(e) => {
            setFilters((filters) => {
              return { ...filters, category: e.target.value };
            });
          }}
        >
          <option value="all">All</option>
          <option value="laptops">Laptops</option>
          <option value="fragrances">Fragances</option>
          <option value="groceries">Groceries</option>
          <option value="skincare">Skincare</option>
        </select>
      </div>
    </>
  );
};

export default Filters;
