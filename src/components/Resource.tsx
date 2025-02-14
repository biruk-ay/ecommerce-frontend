import Header from "./Header";
import Footer from "./Footer";
import { useAppSelector } from "../apps/store/store";
import { selectUserEmail, selectUserId, selectUserName, selectUserRole, selectUserToken } from "../apps/auth/application/slice/AuthSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import StorageProvider from "../di/StorageProvider";
import Admin from "../apps/admin/presentation/pages/Admin";


const Resource = () => {
  const [file, setFile] = useState(null);
  const handleFileChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const file = evt.target.files?.[0];
    if(file) setFile(file);
  };
  const handleUpload = async() => {
    try {
      const storage = StorageProvider.provideHostingStorage();
      await storage?.upload(file);
      console.log("upload successful");
    } catch (error) {
      console.error("upload failed ", error);
    }

  }
  const navigator = useNavigate()
  const email = useAppSelector(selectUserEmail);
  const username = useAppSelector(selectUserName);
  const token = useAppSelector(selectUserToken);
  const role = useAppSelector(selectUserRole);
  const id = useAppSelector(selectUserId);
  if(!username) {
    return navigator("/user/login")
  }
  return (
    <>
    <Header />
    <div className="flex justify-center items-center flex-col">
      <h1 className="font-cursive text-6xl font-extrabold text-center text-primary">Welcome { username } !!!</h1>
    <div className="mb-20">
      <input type="file" onChange={handleFileChange}></input>
      <button onClick={handleUpload}>upload</button>
      <h1>{email}</h1>
      <h1>{username}</h1>
      <h1>{token}</h1>
      <h1>{role}</h1>
      <h1>{id}</h1>
    </div>
    </div>
    <Admin />
    <Footer />
    </>
  );
};

export default Resource;