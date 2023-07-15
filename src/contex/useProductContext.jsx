import { createContext, useContext, useEffect, useState } from "react";
import useGetData from "../services/useGetData";
import toast from "react-hot-toast";

const ProductsContext = createContext();
const useProductContext = () => {
  return useContext(ProductsContext);
};

const ProductsProvider = ({ children }) => {
  const { data } = useGetData("https://dummyjson.com/products");
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [cart, setCart] = useState([]);
  const [filters, setFilters] = useState({
    category: "all",
    title: "",
  });

  useEffect(() => {
    if (data?.products && data?.products.length) {
      const newproducts = data?.products?.map((product) => ({
        ...product,
        // Add quantity property to each product
        quantity: parseInt(1),
      }));
      setProducts(newproducts);
    }
  }, [data]);

  useEffect(() => {
    setFiltered(products);
  }, [products]);

  useEffect(() => {
    if (products && products.length) {
      setFiltered(filterProducts(products));
    }
  }, [filters]);

  // filter products
  const filterProducts = (list) => {
    return list.filter(
      (product) =>
        product.title.toLowerCase().includes(filters.title.toLowerCase()) &&
        (filters.category === "all" || product.category === filters.category)
    );
  };

  function updateQuantity(id, quantity) {
    const updatedList = [...filtered];
    const product = updatedList.find((item) => item.id === id);
    product.quantity = parseInt(quantity.value);
    setFiltered(updatedList);
    quantity.value = 1; // Reset value of quantity selector
  }

  // add a new product to cart
  const addToCart = (addedProduct, getQuantity) => {
    const quantity = getQuantity.current; // get quantity of units to buy

    if (quantity.value > 0) {
      updateQuantity(addedProduct.id, quantity);

      const newCart = [...cart];
      let newItem = newCart.find((item) => item.id === addedProduct.id);

      !newItem
        ? newCart.push({ ...addedProduct })
        : (newItem.quantity = addedProduct.quantity + newItem.quantity);

      setCart(newCart);
      toast.success(
        `Product ${addedProduct.title} added to cart successfully.`
      );
    } else {
      toast.error("select a quantity.");
    }
  };

  // delete item from cart
  const deleteItem = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
    toast.success("Product deleted.");
  };

  // set amounts to currency format
  const setCurrency = (amount) => {
    const currency = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
    });
    return currency.format(amount);
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        filters,
        setFilters,
        filtered,
        cart,
        addToCart,
        deleteItem,
        setCurrency,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export { ProductsProvider, useProductContext };
