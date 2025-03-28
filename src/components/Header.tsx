import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../apps/store/store";
import {
  logout,
  selectUserName,
  selectUserRole,
} from "../apps/auth/application/slice/AuthSlice";
import cartIcon from "../assets/Icon.svg";

const Header = () => {
  enum UserType {
    admin = "admin",
    user = "user"
  }
  const navigator = useNavigate();
  const [showPanel, setShowPanel] = useState(false);
  const username = useAppSelector(selectUserName);
  const role = useAppSelector(selectUserRole);
  const dispatch = useAppDispatch();
  const handleLogout = (evt: React.FormEvent) => {
    evt.preventDefault();
    dispatch(logout());
    navigator("/user/login");
  };
  const handleToggle = () => {
    setShowPanel(!showPanel);
  };
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchTerm) {
      navigate(`/search?term=${encodeURIComponent(searchTerm)}`); // Navigate to search results page
    }
  };
  return (
    <header className="bg-primary flex top-0 w-full justify-evenly items-center text-white">
      <div className="flex justify-between mt-2 mb-2">
        <a href="/">
          <img
            className="h-5 w-5 sm:h-11 sm:w-11 sm:mr-4"
            src="../../logo.png"
            alt="Company Logo"
          ></img>
        </a>
        <div className="font-cursive font-semibold sm:text-2xl">gebeya</div>
      </div>

      <div className="flex justify-center -space-x-12">
        <form onSubmit={handleSearch}>
          <input
            className="bg-gray-300 rounded-3xl font-normal mr-4 sm:h-12 outline-none text-purple-950 sm:pe-40 sm:ps-12"
            placeholder="Search products..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="md:hidden ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
          onClick={handleToggle}
        >
          <path
            fillRule="evenodd"
            d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <div className=" md:flex auto gap-1 text-sm sm:text-lg relative sm:gap-4 font-roboto  font-bold">
        {username ? (
          (role as UserType) === UserType.admin ? (
            <>
              <Link to="/admin" className="flex flex-col items-center">
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span className="text-center">{username}</span>
              </Link>

              <button className="hover:underline" onClick={handleLogout}>
                Logout
              </button>
              <Link to={"/cart"}>
                <img className="hover:underline" src={cartIcon}></img>{" "}
              </Link>
            </>
          ) : (
            <div
              className={`flex ${
                showPanel
                  ? "flex-col absolute mt-8 -ml-20 p-3 z-0 bg-slate-100 rounded-md text-purple-950"
                  : "hidden md:flex md:flex-row"
              } p-2 md:relative`}
            >
              {" "}
              <Link to="/profile" className="flex flex-col items-center">
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span className="text-center">{username}</span>
              </Link>
              <button className="hover:underline" onClick={handleLogout}>
                Logout
              </button>
              <Link to={"/cart"}>
                <img className="hover:underline" src={cartIcon}></img>{" "}
              </Link>
            </div>
          )
        ) : (
          <>
            <Link to={"/user/login"} className="hover:underline">
              Login
            </Link>
            <Link to={"/user/register"} className="hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
