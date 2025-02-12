import "./App.css";
import React from "react";
import Resource from "./components/Resource";
import "../global.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginForm from "./apps/auth/presentation/pages/Login";
import { useAppSelector } from "./apps/store/store";
import {
  selectUserEmail,
  selectUserName,
  selectUserToken,
} from "./apps/auth/application/slice/AuthSlice";
import RegisterForm from "./apps/auth/presentation/pages/Register";
import Admin from "./apps/admin/presentation/pages/Admin";

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
        <Route path="/user/login" element={<LoginForm />} />
        <Route path="/user/register" element={<RegisterForm />} />
        <Route path="/admin" element={<Admin />} />
        <Route 
          path="/*"
          element= {
            <ProtectedRoute>
              <Routes>
                <Route path="/resource" element={<Resource />} />
              </Routes>
            </ProtectedRoute>
          } 
        />
      </Routes>
    </div>
  );
}

export default App;
