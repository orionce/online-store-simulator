import Cart from "./components/Cart";
import CartButton from "./components/CartButton";
import Products from "./components/Products";
import { ProductsProvider } from "./contex/useProductContext";
import { Link, Route, Routes } from "react-router-dom";
import logo from "./assets/logo.png";
import { Toaster } from "react-hot-toast";

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
// Create shop now page

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
          <div className="fluid">
            <Routes>
              <Route path="/" element={<Products />} />
              <Route path="/shopping-cart" element={<Cart />} />
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
