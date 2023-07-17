import { useProductContext } from "../contex/useProductContext";

const Filters = () => {
  const { setFilters, filters, products } = useProductContext();

  // Get categories from products
  const getCategories = products.map((category) => category.category);

  // filter duplicate categories
  const categories = getCategories.filter(
    (category, index) => getCategories.indexOf(category) === index
  );

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
          {categories?.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Filters;
