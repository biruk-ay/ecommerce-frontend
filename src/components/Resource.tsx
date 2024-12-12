import { useContext } from "react";
import authCtx from "../auth/state/AuthCtxProvider";
import Header from "./Header";
import Footer from "./Footer";
const Resource = () => {

  const { globalLogOutDispatch } = useContext(authCtx);

  return (
    <>
    <Header />
    <div className="flex justify-center items-center flex-col">
      <h1 className="font-cursive text-6xl font-extrabold text-center text-primary">Welcome!!!</h1>
      <button className="" onClick={globalLogOutDispatch}>Log Out</button>
    </div>
    <Footer />
    </>
  );
};

export default Resource;