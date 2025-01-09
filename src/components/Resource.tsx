import Header from "./Header";
import Footer from "./Footer";
import { useAppSelector } from "../apps/store/store";
import { selectUserName } from "../apps/auth/application/slice/AuthSlice";
import { useNavigate } from "react-router-dom";
const Resource = () => {
  const navigator = useNavigate()
  const username = useAppSelector(selectUserName);
  if(!username) {
    return navigator("/user/login")
  }
  return (
    <>
    <Header />
    <div className="flex justify-center items-center flex-col">
      <h1 className="font-cursive text-6xl font-extrabold text-center text-primary">Welcome { username } !!!</h1>
    </div>
    <Footer />
    </>
  );
};

export default Resource;