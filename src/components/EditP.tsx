import React, { useEffect, useState } from "react";
// import "./EditP.css";

import { Link, useNavigate, useParams } from "react-router-dom";


import axios from "axios";
import Header from "./Header";
import { useAppDispatch, useAppSelector } from "../apps/store/store";
import { logout, selectUserId, selectUserName, selectUserRole } from "../apps/auth/application/slice/AuthSlice";
function EditP() {
//   const [user, setUser] = useState({
//     phone: "",
//     username: "",
//     email: "",
//   });
const [user,setUser]=useState([]);
const navigator = useNavigate();
  //   const { id } = useParams();
const dispatch = useAppDispatch();
const id = useAppSelector(selectUserId);
 const role = useAppSelector(selectUserRole);
  const handleLogout = (evt: React.FormEvent) => {
    evt.preventDefault();
    dispatch(logout());
    navigator("/user/login");
  };
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:5000/user/${id}`);
    setUser(result.data);
  };
  return (
    <>
    <Header/>
      <div className="edit-wrraper">
        <div className="flex flex-row mt-10  justify-evenly items-center">
          
          <div className="flex flex-row justify-around items-center  w-1/2 ">
            <div className="flex flex-col pt-12 bg-purple-100 rounded-3xl px-4 w-7/12 gap-10 h-96  ">
              <div className="personal-info ">
                <div className="person-icon">
                    
                  {/* <IoPersonCircleSharp className="profile-icon"/> */}
                </div>
                <div className="personal-details">
                  <div className=" text-3xl font-black text-center">
                    <Link className="edit-link" to={""}>
                      <h3>Personal Profile</h3>
                    </Link>
                  </div>
                  <div className="flex flex-row  items-center">
                    
                   
                    <span ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-20">
  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
</svg></span><span className="font-bold text-xl "> {user.name}</span>
                  </div>
                  <div className="font-semibold flex flex-row"><h3 className="font-bold text-xl ">Role: {role}</h3> </div>
                </div>
              </div>

              <div className="">
                <div className="font-semibold font-roboto">
                  <span>
                    You can add your product here! 
                    
                  </span>
                </div>
                <div className=" flex flex-row mt-7 justify-evenly items-center">
                  <Link to="/addproduct">
                    <button  className="    px-5  bg-purple-950 text-white font-semibold py-2 rounded-lg hover:bg-purple-700 transition duration-300">Add Product</button>
                  </Link>
                </div>
              </div>

              
                 
                
              </div>
            </div>

            <div className="bg-purple-950 pt-12 mb-8 text-white gap-7  w-1/5 h-96 -ml-52 px-6 flex flex-col  rounded-2xl ">
              <h2 className="font-bold text-white text-center text-2xl" >Profile</h2>
              <div className="flex flex-row items-center gap-3">
    <Link to="/productList" className="flex items-center gap-3">
        <span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10">
                <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
            </svg>
        </span>
        <h3 className="text-xl font-bold">Products</h3>
    </Link>
</div>
             
            <div className="flex flex-row gap-3">
<span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10">
  <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
</svg>
</span>
         <h3 className="text-xl font-bold cursor-pointer" onClick={handleLogout}>Log out</h3>
            
            </div>
            
             
              {/* <div className="links">
                <Link to="/landlord" className="left-lnk">
                  <span>
                    
                    <span>Landlord property</span>
                  </span>
                </Link>
                <hr className="small"></hr>
               
                <hr className="small"></hr>
                
                <hr className="small"></hr>

                <Link to="/signin" className="left-lnk">
                  <span>
            
                    <span>Logout</span>
                  </span>
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      
    </>
  );
}

export default EditP;
