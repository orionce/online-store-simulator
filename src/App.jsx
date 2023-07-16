import { ProductsProvider } from "./contex/useProductContext";
import { Link, Route, Routes } from "react-router-dom";
import logo from "./assets/logo.png";
import Products from "./components/Products";
import Cart from "./components/Cart";
import CartButton from "./components/CartButton";
import { Toaster } from "react-hot-toast";
import ProductDetail from "./components/ProductDetail";
import Category from "./components/Category";

// Create context ✔️
// Get Product list ✔️
// Print products - Products component✔️
// Create filters : category filter ✔️ - search filter ✔️
// Add items to cart ✔️
// Delete items from cart ✔️
// Add Cart Button✔️
// Add bill details✔️
// Implement Router✔️
// Add Cart warnings (react hot toast)✔️
// Add axios ✔️
// Get categories list from data ✔️
// Create Category page ✔️
// Create Product details page ✔️
// Create Prev and Next product buttons in product detail page ✔️
// Create shop now page
// Create slug url

function App() {
  return (
    <>
      <ProductsProvider>
        <div>
          <header>
            <div className="fluid head">
              <div>
                <Link to="/">
                  <img src={logo} alt="" />
                </Link>
              </div>
              <nav>
                <Link to="/shopping-cart">
                  <CartButton />
                </Link>
              </nav>
            </div>
          </header>
          <div className="">
            <Routes>
              <Route path="/" element={<Products />} />
              <Route path="/shopping-cart" element={<Cart />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/category/:category" element={<Category />} />
            </Routes>
          </div>
        </div>

        <Toaster
          toastOptions={{
            className: "notify",
            duration: 1500,
            success: {
              iconTheme: {
                primary: "#ff7f50",
                secondary: "#fff",
              },
            },
          }}
        />
      </ProductsProvider>
    </>
  );
}

export default App;
