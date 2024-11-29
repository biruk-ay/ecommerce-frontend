import { useContext } from "react";
import authCtx from "../auth/state/AuthCtxProvider";

const Resource = () => {

  const { globalLogOutDispatch } = useContext(authCtx);

  return (
    <div>
      <h1>Sept 15</h1>
      <button onClick={globalLogOutDispatch}>Log Out</button>
    </div>
  );
};

export default Resource;