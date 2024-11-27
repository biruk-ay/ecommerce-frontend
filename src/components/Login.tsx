import { FormEventHandler } from "react";
import { Link } from "react-router-dom";

type Props = {
  onSubmit: FormEventHandler<HTMLFormElement>;
};

const LoginForm = (props: Props) => {
    const { onSubmit } = props;
    return (
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Email Address"
          />
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
      </form>
    );
  };
  
  export default LoginForm;