// @ts-nocheck
import "./App.css";
import React from "react";
import Resource from "./components/Resource";
import "../global.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginForm from "./apps/auth/presentation/pages/Login";
import { useAppSelector } from "./apps/store/store";
import { selectUserEmail, selectUserName, selectUserToken } from "./apps/auth/application/slice/AuthSlice";
import RegisterForm from "./apps/auth/presentation/pages/Register";
import Admin from "./apps/admin/presentation/pages/Admin";
import Home from "./components/Home";
import Category from "./components/Category";
import UpdateProduct from "./components/UpdateProduct";
import ProductList from "./components/ProductList";
import ProductManagement from "./components/ProductManagement";
import Cart from "./components/Cart";
import ProductDetail from "./components/ProductDetail";
import SearchResult from "./components/SearchResults";
import EditP from "./components/EditP";

const ProtectedRoute = ({ children } : { children: React.ReactNode }) => {
  const navigator = useNavigate();
  const username = useAppSelector(selectUserName);
  const email = useAppSelector(selectUserEmail);
  const token = useAppSelector(selectUserToken);

  if ((!token) && (!email) && (!username)) {
    return navigator("/user/login");
  }
  return <>{children}</>
};

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart  />} />
        <Route path="/addProduct" element={<ProductManagement />} />
        <Route path="/productList" element={<ProductList />} />
        <Route path="/category" element={<Category />} />
        <Route path="/update/:id" element={<UpdateProduct />} />
        <Route path="/user/login" element={<LoginForm />} />
        <Route path="/user/register" element={<RegisterForm />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/search" element={<SearchResult/>} />
        <Route path="/profile" element={<EditP/>} />
        <Route path="/productDetails/:productId" element={<ProductDetail />} />


        <Route 
          path="/*"
          element= {
            <ProtectedRoute>
              <Routes>
                <Route path="/resource" element={<Resource/>} />
              </Routes>
            </ProtectedRoute>
          } 
        />
      </Routes>
    </div>
  );
}

export default App;