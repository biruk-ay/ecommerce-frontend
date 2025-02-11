import "./App.css";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import AuthContext from "./auth/state/AuthCtxProvider";
import { useContext } from "react";
import Auth from "./components/Auth";
import Resource from "./components/Resource";
import '../global.css';
import Home from "./components/Home";
import Category from "./components/Category";
import UpdateProduct from "./components/UpdateProduct";
import ProductList from "./components/ProductList";
import ProductManagement from "./components/ProductManagement";
import Cart from "./components/Cart";
import { CartProvider } from "./contexts/CartContext";
// import { CartProvider } from "./contexts/CartContext";

function App() {
  const { authState } = useContext(AuthContext);
  // const location = useLocation();
  // const owner = "owner"; // Replace with actual owner logic as needed
  const ownerId = 'YOUR_USER_ID_HERE';
  return (
    
    <div className="App">
      <CartProvider >
        <Routes>
          <Route
            path="/"
            element={
              <Home />
              // <Navigate
              //   to={authState.isLoggedIn ? location.pathname : "/user/login"}
              // />
            }
          />
          {!authState.isLoggedIn && (
            <Route path="user">
              <Route path="register" element={<Auth />} />
              <Route path="login" element={<Auth />} />
            </Route>
          )}
          {authState.isLoggedIn && (
            <Route path="resource" element={<Resource />} />
          )}
          <Route path="/cart" element={<Cart  />} />
          <Route path="/addProduct" element={<ProductManagement />} />
          <Route path="/productList" element={<ProductList />} />
          <Route path="/category" element={<Category />} />
          <Route path="/update/:id" element={<UpdateProduct />} />
          <Route path="*" element={<Auth />} />
        </Routes>
      </CartProvider>
    </div>
  );
}

export default App;