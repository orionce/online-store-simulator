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

  const [totalMount, setTotalMount] = useState(0); // totalMount stores the total amount of the purchase

  useEffect(() => {
    if (data?.products && data?.products.length) {
      const newproducts = data?.products?.map((product) => ({
        ...product,
        quantity: parseInt(1), // Add quantity property to object product
      }));
      setProducts(newproducts);
    }
  }, [data]);

  useEffect(() => {
    if (products && products.length) {
      setFiltered([...products]);
    }
  }, [products]);

  useEffect(() => {
    if (products && products.length) {
      setFiltered(filterProducts(products));
    }
  }, [filters]);

  useEffect(() => {
    getTotalBuy();
  }, [cart]);

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

      if (!newItem) {
        newCart.push({ ...addedProduct });
      } else {
        newItem.quantity += addedProduct.quantity;
      }

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
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
    return currency.format(amount);
  };

  const getTotalBuy = () => {
    if (cart.length > 0) {
      let totals = cart?.map((a) => a.price * a.quantity);
      let totalCost = parseFloat(totals.reduce((a, b) => a + b));
      setTotalMount(totalCost);
    } else {
      setTotalMount(0);
    }
  };

  // Product stock update after purchase.
  const finishOrder = () => {
    const productToUpdate = [...filtered, ...cart];
    const updatedProducts = productToUpdate.reduce((acc, current) => {
      let exist = acc.find((item) => item.id === current.id);
      if (exist) {
        exist.stock -= current.quantity;
        exist.quantity = 1;
      } else {
        acc.push(current);
      }
      return acc;
    }, []);
    setFiltered(updatedProducts);
    setCart([]);
  };

  function getSlug(url) {
    // Replace special characters and spaces from url
    const slug = url
      .toLowerCase() // convert text to lowercase
      .replace(/[^\w\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") //  Replace empty spaces with hyphens
      .replace(/--+/g, "-") // Remove duplicate hyphens
      .trim(); // Remove spaces from beginning and end
    return slug;
  }

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
        totalMount,
        getSlug,
        finishOrder,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export { ProductsProvider, useProductContext };
