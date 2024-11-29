import "./App.css";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import AuthContext from "./auth/state/AuthCtxProvider";
import { useContext } from "react";
import Auth from "./components/Auth";
import Resource from "./components/Resource";
import '../global.css';

function App() {
  const { authState } = useContext(AuthContext);
  const location = useLocation();

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to={authState.isLoggedIn ? location.pathname : "/user/login"}
            />
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
      </Routes>
    </div>
  );
}

export default App;
