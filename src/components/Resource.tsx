import { useContext } from "react";
import authCtx from "../auth/state/AuthCtxProvider";
import Header from "./Header";
const Resource = () => {

  const { globalLogOutDispatch } = useContext(authCtx);

  return (
    <>
    <Header />
    <div>
      <h1 className="font-cursive font-extrabold text-center text-primary">Sept 15</h1>
      <button onClick={globalLogOutDispatch}>Log Out</button>
    </div>
    </>
  );
};

export default Resource;