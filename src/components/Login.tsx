import { FormEventHandler } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

type Props = {
  onSubmit: FormEventHandler<HTMLFormElement>;
};

const LoginForm = (props: Props) => {
    const { onSubmit } = props;
    return (
      <>
      <Header />
      <div className="flex w-full items-center h-screen justify-center">
          <div className="bg-login bg-opacity-10 flex flex-row items-center justify-center w-1/2 mb-24 h-3/5 rounded-3xl shadow-lg">
              <div className="bg-[#825792] flex flex-col justify-center items-center bg-opacity-5 w-1/2 h-4/5 ml-6 rounded-3xl">
                <div className="text-primary text-3xl font-extrabold font-roboto">
                  Login In
                </div>
                <div className="text-black text-xl font-bold font-roboto">
                  Name
                </div>
              </div>
              <div className="bg-[#652385] bg-opacity-40 w-1/2 h-3/5 mr-6 rounded-3xl">
                Sign Up
              </div>
          </div>
      </div>
      {/* <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Email Address"/>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Password"
          />
        </div>
        <button type="submit">Submit</button>
        <Link to={"/user/register"}>
          Don't have an account? Sign up
        </Link>
      </form> */}
      <Footer />
      </>
    );
  };
  
  export default LoginForm;