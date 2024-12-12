import { useEffect, useState, useContext, FormEventHandler } from "react";

// Project dependencies
import useApi from "../hooks/auth/UseApi";
import AuthContext from "../auth/state/AuthCtxProvider";
import { AuthData } from "../hooks/auth/AuthApiData";
import { useLocation } from "react-router-dom";
import LoginForm from "./Login";
import RegisterForm from "./Register";

const Auth = () => {
  const [authData, setAuthData] = useState<AuthData>();
  const { request, setError } = useApi();
  const { globalLogInDispatch } = useContext(AuthContext);
  const location = useLocation();
  const currentPathArray = location.pathname.split('/');
  const isLogin = currentPathArray[currentPathArray.length - 1] === 'login';

  // Upon successful response from the api for login user, dispatch global auth LOG_IN event
  useEffect(() => {
    if (authData && "success" in authData) {
      globalLogInDispatch({
        authToken: authData.user.auth_token,
        userId: authData.user.user_id,
        name: authData.user.name,
        email: authData.user.email,
      });
      console.log(authData)
    }
  }, [authData, globalLogInDispatch]);

  const authHandler: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // Validations first!
    const userEmail = data.get("email");
    const userPassword = data.get("password");
    const userName = data.get("name");
    try {
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          password: userPassword,
          name: userName,
        }),
      };

      const endpoint = `/user/${isLogin ? 'login' : 'register'}`
      await request(endpoint, params, setAuthData);
    } catch (error: any) {
      setError(error.message || error);
    }
  };

  return (
    <>
      {/* <h2>{isLogin ? 'Log In' : 'Sign Up'}</h2> */}
      {
        isLogin
          ? <LoginForm onSubmit={authHandler} />
          : <RegisterForm onSubmit={authHandler} />
      }
    </>
  );
};

export default Auth;