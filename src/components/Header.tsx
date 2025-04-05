import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../apps/store/store";
import {
  logout,
  selectUserName,
  selectUserRole,
} from "../apps/auth/application/slice/AuthSlice";
import cartIcon from "../assets/Icon.svg";
import searchIcon from "../assets/search-svgrepo-com.svg"

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
    <header className="top-0 flex items-center w-full text-white bg-primary justify-evenly">
      <div className="flex flex-col justify-between">
        <a href="/">
          <img
            className="w-5 h-5 ml-2.5 sm:h-8 sm:w-8 sm:mr-4"
            src="../../logo.png"
            alt="Company Logo"
          ></img>
        <div className="self-start font-semibold font-cursive sm:text-xl">gebeya</div>
        </a>
      </div>

      <div className="flex justify-center">
        <form onSubmit={handleSearch} className="flex">
          <input
            className="font-normal bg-gray-300 outline-none rounded-3xl sm:h-12 text-purple-950 sm:pe-40 sm:ps-12 placeholder-shown:text-white placeholder:text-sm"
            placeholder="Search products..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit"><img src={searchIcon} className="w-4 h-4 sm:w-5 sm:h-5"/></button>
        </form>
      </div>

      <div className="relative gap-1 text-sm font-bold md:flex auto sm:text-lg sm:gap-4 font-roboto">
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
            <Link to={"/user/register"} className="ml-2 hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
