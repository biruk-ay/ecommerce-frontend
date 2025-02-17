import React, { useState } from "react";
import Header from "./Header";
import { ArrowLeftIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { Bars3Icon } from "@heroicons/react/20/solid";
import img from "../assets/img.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import StorageProvider from "../di/StorageProvider";
import { selectUserId } from "../apps/auth/application/slice/AuthSlice";
import { useAppSelector } from "../apps/store/store";
import { BASE_URL } from "../configs/config";

function ProductManagement() {
  const ownerId = useAppSelector(selectUserId);
  const [UploadedImages, setUploadedImages] = useState<string[]>([]);
  const [originalFiles, setOriginalFiles] = useState<File[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [clicked, setClicked] = useState(false);
  const [opened, setOpened] = useState(false);
  const [update, setUpdate] = useState(false);
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [selectedcategory, setSelectedCategory] = useState("");
  const [activeLink, setActiveLink] = useState("");

  const handleUpload = async (files: File[]) => {
    try {
      const storage = StorageProvider.provideHostingStorage();
      const UploadedImagesUrls: string[] = [];
      for (const file of files) {
        const uploadResult = await storage?.upload(file);
        UploadedImagesUrls.push(uploadResult);
      }
      setUploadedImages((prevUrls) => [...prevUrls, ...UploadedImagesUrls]);
      console.log("upload successful", UploadedImagesUrls);
    } catch (error) {
      console.error("upload failed ", error);
    }
  };
  
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files || []);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...newImages]);
    setOriginalFiles((prevFiles) => [...prevFiles, ...files]);
    await handleUpload(files);
  };

  const OnclickHandler = () => {
    setClicked(!clicked);
  };

  const Upload = () => {
    setUpdate(true);
  };

  const sideBarDisplay = () => {
    setOpened(!opened);
  };
  const navigate = useNavigate();
  const handleLinkClick = (path: React.SetStateAction<string>) => {
    setActiveLink(path);
  };
  interface Product {
    _id: string;
    name: string;
    price: number;
    description?: string;
    img?: string;
  }

  const handleCategorySelect = (
    selectedCategory: React.SetStateAction<string>
  ) => {
    setCategory(selectedCategory);
    setClicked(false); // Close the dropdown after selection
  };

  const productAdd = async () => {
    const productData = {
      name,
      price,
      description,
      category,
      img: UploadedImages[0] || "",
      owner: ownerId,
    };

    try {
      const response = await fetch(`${BASE_URL}product/pro`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData), // Send productData directly
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error("Failed to add to cart");
      }

      const cartResponse: Product = await response.json();

      alert("Added to product!");
    } catch (error) {
      console.error("Error adding to product:", error);
      console.log("product data:", productData);
      alert("Error adding to cart. Please try again.");
    }
  };
  const handleBackClick = () => {
    window.history.back();
  };
  return (
    <>
      <Header />
      <div className="w-full h-full flex flex-col">
        <div className="w-full flex-grow flex">
          <div
            className={`relative ${
              opened ? "w-64" : "w-16"
            } bg-white h-screen transition-width duration-300`}
          >
            <div className="flex flex-col">
              <Bars3Icon
                onClick={sideBarDisplay}
                className="w-8 h-8 ml-3 mt-3 cursor-pointer z-10"
              />
              {opened && (
                <div className="absolute top-0 left-0 w-full h-full bg-slate-100 z-9">
                  <ul className="h-full mt-16">
                    <li className="p-4">
                      <Link
                        to="/addProduct"
                        className={`hover:underline ${
                          activeLink === "/Add" ? "underline" : ""
                        }`}
                        onClick={() => handleLinkClick("/Add")}
                      >
                        Add Product
                      </Link>
                    </li>
                    <li className="p-4">
                      <Link
                        to="/productList"
                        className={`hover:underline ${
                          activeLink === "/List" ? "underline" : ""
                        }`}
                        onClick={() => handleLinkClick("/List")}
                      >
                        List Product
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="bg-white flex-grow flex flex-col sm:flex-row justify-evenly p-4">
            <div className="flex flex-col text-black w-full max-w-lg">
              <h1 className="text-4xl">           <ArrowLeftIcon className="h-6 w-8 mr-2" onClick={handleBackClick} />
              Add Product</h1>
              <div className="mt-5">
                <h3 className="text-2xl">Description</h3>
                <div className="border-2 border-gray-300 w-full h-[434px] mt-5 shadow-md rounded-xl">
                  <div className="m-4">
                    <label>Product Name</label>
                    <input
                      className="h-16 w-full border-2 rounded-lg border-gray-300 focus:outline-none p-2"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="m-4">
                    <label>Product Detail</label>
                    <textarea
                      className="h-44 w-full border-2 rounded-lg border-gray-300 focus:outline-none p-2"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-2xl">Category</h3>
                <div className="border-2 border-gray-300 w-full h-[176px] mt-5 shadow-md rounded-xl p-4">
                  <h3 className="pt-2">Product Category</h3>
                  <div className="flex items-center w-full h-16 border shadow-md rounded-xl border-gray-300">
                    <input
                      type="text"
                      placeholder={selectedcategory}
                      readOnly
                      className="flex-grow p-2 rounded-l focus:outline-none cursor-pointer"
                      onClick={OnclickHandler}
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                    <span
                      onClick={OnclickHandler}
                      className="flex items-center justify-center p-2 cursor-pointer"
                    >
                      <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                    </span>
                  </div>
                  {clicked && (
                    <div className=" bg-slate-50 ml-64 border mb-36 max-h-40 w-56 overflow-x-hidden overflow-y-auto border-gray-300 rounded flex">
                      <ul className="text-center    w-56 ">
                        {[
                          "clothes",
                          "cars",
                          "supplements",
                          "houses",
                          "electronics",
                          "shoes",
                          "books",
                          "kitchen",
                          "toys",
                        ].map((category) => (
                          <li
                            key={category}
                            className="py-2 border shadow-md rounded-sm hover:bg-fuchsia-900 cursor-pointer"
                            onClick={() => handleCategorySelect(category)}
                          >
                            {category}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col mt-14 w-full max-w-lg">
              <h3 className="text-2xl">Product Images</h3>
              <div className="border-2 border-gray-300 w-full h-[220px] mt-5 shadow-md rounded-xl flex flex-col">
                <div className="h-[130px] place-items-center mt-2">
                  <img className="pt-10" src={img} alt="Placeholder" />
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer text-blue-600 underline"
                    onClick={Upload}
                  >
                    Click to upload
                  </label>
                </div>
                <hr />
                <div className="flex flex-row flex-wrap">
                  {update && images.length === 0 ? (
                    <div>Add</div>
                  ) : (
                    images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Uploaded ${index}`}
                        className="w-14 h-14 object-cover m-1 shadow-md rounded-xl"
                      />
                    ))
                  )}
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-2xl">Pricing</h3>
                <div className="border-2 border-gray-300 w-full h-[176px] mt-3 shadow-md rounded-xl">
                  <h3 className="mx-8 pt-2 pb-3">Price</h3>
                  <div className="flex items-center mx-8 h-16 border shadow-md rounded-xl border-gray-300">
                    <span className="flex items-center justify-center cursor-pointer">
                      <h3 className="bg-slate-100 w-16 h-16 border pt-5 text-center shadow-md rounded-xl border-gray-300">
                        ETB
                      </h3>
                    </span>
                    <input
                      type="number"
                      className="flex-grow p-2 rounded-l focus:outline-none cursor-pointer"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </div>
                <hr />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center mt-10">
          <hr className="border-gray-400 w-[444px]" />
        </div>

        <div className="flex justify-center items-center mt-5">
          <button
            className="border border-gray-500 rounded-3xl bg-violet-600 text-white w-56 h-10"
            onClick={productAdd}
          >         

            Add Product
          </button>
        </div>
      </div>
    </>
  );
}

export default ProductManagement;
