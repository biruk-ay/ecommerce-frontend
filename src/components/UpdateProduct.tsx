import React, { useEffect, useState } from "react";
import Header from "./Header";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

function UpdateProduct() {
  const { id } = useParams();
  const [data, setData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    img: "",
  });
  const { name, price, category, description, img } = data;
  let navigate = useNavigate();
  const [images, setImages] = useState<string[]>([]);
  const [clicked, setClicked] = useState(false);
  const [opened, setOpened] = useState(false);
  const [update, setUpdate] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [selectedcategory, setSelectedCategory] = useState("");
  const [activeLink, setActiveLink] = useState("");

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...newImages]);
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
  const handleLinkClick = (path: React.SetStateAction<string>) => {
    setActiveLink(path);
  };
  useEffect(() => {
    loadUser();
  }, []);
  const loadUser = async () => {
    try {
      const response = await fetch(`http://localhost:5000/product/see/${id}`);

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };
  const handleCategorySelect = (
    selectedCategory: React.SetStateAction<string>
  ) => {
    setCategoryName(selectedCategory);
    setClicked(false);
  };

  const productUpdate = async () => {
    const productData = {
      name,
      description,
      price,
      images,
      category,
      img,
    };

    const apiUrl = `http://localhost:5000/product/${id}`;
    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error(`Error updating product: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Product updated successfully", data);
      alert("Updated successfully");
      navigate("/productList");
    } catch (error) {
      console.error("Failed to update product", error);
      alert(error);
    }
  };

  return (
    <>
      <Header />
      <div className="w-full h-full flex flex-col">
        <div className="w-full h-11/12 flex  ">
          <div className="relative w-[216px] bg-white h-screen">
            {" "}
            <div className="flex flex-col">
              <Bars3Icon
                onClick={sideBarDisplay}
                className="w-[30px] h-[30px] ml-9 mt-10 cursor-pointer z-10"
              />

              {opened && (
                <div className="absolute top-0  left-0 w-full h-full bg-slate-100 z-9">
                  <ul className="h-full mt-40  ">
                    <li className="p-6 pl-16">
                      <Link
                        to="/category"
                        className={`hover:underline ${
                          activeLink === "/Add" ? "underline" : ""
                        }`}
                        onClick={() => handleLinkClick("/Add")}
                      >
                        Add Product
                      </Link>
                    </li>
                    <li className="p-6 pl-16">
                      <Link
                        to="/login"
                        className={`hover:underline ${
                          activeLink === "/List" ? "underline" : ""
                        }`}
                        onClick={() => handleLinkClick("/List")}
                      >
                        List Product
                      </Link>
                    </li>
                    <li className="p-6 pl-16">
                      <Link
                        to="/category"
                        className={`hover:underline ${
                          activeLink === "/Update" ? "underline" : ""
                        }`}
                        onClick={() => handleLinkClick("/Update")}
                      >
                        Update Product
                      </Link>
                    </li>
                    <li className="p-6 pl-16">
                      <Link
                        to="/"
                        className={`hover:underline ${
                          activeLink === "/Delete" ? "underline" : ""
                        }`}
                        onClick={() => handleLinkClick("/Delete")}
                      >
                        Delete Product
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="bg-white mt-10 flex flex-col sm:flex-row justify-evenly w-11/12">
            <div className="flex-row  text-black">
              <div className="flex text-4xl">
                {" "}
                <h1>Update Product</h1>
              </div>
              <div className="flex-row mt-5">
                <h3 className="text-2xl">Description</h3>
                <div className="flex-row  text-black  border-2 border-gray-300 w-[515px] h-[434px] mt-5   shadow-md rounded-xl">
                  <div className="flex-row m-8 ">
                    <div className="pb-3">
                      <label className="">Product Name</label>
                    </div>
                    <div className="border-2 rounded-lg border-gray-300 ">
                      <input
                        className="h-[72px] w-[443px] focus:outline-none"
                        type="text"
                        name="name"
                        placeholder=""
                        value={name}
                        onChange={handleChange}
                      ></input>
                    </div>
                  </div>
                  <div className="flex-row m-8 ">
                    <div className="pb-3">
                      <label>Product Detail</label>
                    </div>
                    <div className="border-2 rounded-lg border-gray-300  ">
                      <textarea
                        className="h-[179px] w-[443px] focus:outline-none"
                        placeholder=""
                        name="description"
                        value={description}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-row mt-8">
                <h3 className="text-2xl"> Category</h3>
                <div className="flex-row  text-black  border-2 border-gray-300 w-[515px] h-[176px] mt-5  shadow-md rounded-xl">
                  <h3 className=" mx-8 pt-8 pb-3"> Product Category</h3>
                  <div className="flex items-center w-[443px] mx-8  h-[72px] border shadow-md rounded-xl border-gray-300  ">
                    <input
                      type="text"
                      placeholder={selectedcategory}
                      readOnly
                      name="category"
                      className="flex-grow p-2 rounded-l focus:outline-none cursor-pointer"
                      onClick={OnclickHandler}
                      value={category}
                      onChange={handleChange}
                    />
                    <span
                      onClick={OnclickHandler}
                      className="flex items-center justify-center p-2 cursor-pointer"
                    >
                      <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                    </span>
                  </div>
                  {clicked && (
                    <div className="bg-white w-52 mt-2 m-8  border border-gray-300 rounded flex ">
                      <ul className=" text-center">
                        <li
                          className="  py-2 w-52 border  shadow-md rounded-sm hover:bg-fuchsia-900  hover:border-slate-300  cursor-pointer"
                          onClick={() => handleCategorySelect("Category A")}
                        >
                          Category A
                        </li>
                        <li
                          className="  py-2 w-52 border  shadow-md rounded-sm hover:bg-fuchsia-900  hover:border-slate-300  cursor-pointer"
                          onClick={() => handleCategorySelect("Category A")}
                        >
                          Category A
                        </li>
                        <li
                          className="  py-2 w-52 border  shadow-md rounded-sm hover:bg-fuchsia-900  hover:border-slate-300  cursor-pointer"
                          onClick={() => handleCategorySelect("Category A")}
                        >
                          Category A
                        </li>
                        <li
                          className="  py-2 w-52 border  shadow-md rounded-sm hover:bg-fuchsia-900  hover:border-slate-300  cursor-pointer"
                          onClick={() => handleCategorySelect("Category A")}
                        >
                          Category A
                        </li>
                        <li
                          className="  py-2 w-52 border  shadow-md rounded-sm hover:bg-fuchsia-900  hover:border-slate-300  cursor-pointer"
                          onClick={() => handleCategorySelect("Category A")}
                        >
                          Category A
                        </li>
                        <li
                          className="  py-2 w-52 border  shadow-md rounded-sm hover:bg-fuchsia-900  hover:border-slate-300cursor-pointer"
                          onClick={() => handleCategorySelect("Category B")}
                        >
                          Category B
                        </li>
                        <li
                          className="  py-2 w-52 border  shadow-md rounded-sm hover:bg-fuchsia-900  hover:border-slate-300cursor-pointer"
                          onClick={() => handleCategorySelect("Category C")}
                        >
                          Category C
                        </li>
                        <li
                          className="  py-2 w-52 border  shadow-md rounded-sm hover:bg-fuchsia-900  hover:border-slate-300 cursor-pointer"
                          onClick={() => handleCategorySelect("Category D")}
                        >
                          Category D
                        </li>{" "}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex-row mt-14 ">
              <h3 className="text-2xl">Product Images</h3>
              <div className="flex-row text-black  border-2 border-gray-300 w-[515px] h-[220px] mt-5   shadow-md rounded-xl">
                <div className=" h-[130px] place-items-center mt-2">
                  <img className="pt-10" src={img}></img>

                  <input
                    type="file"
                    multiple
                    name="image"
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
                <hr></hr>
                <div className="  flex flex-row">
                  {update && images.length === 0 ? (
                    <div> add</div>
                  ) : (
                    images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Uploaded ${index}`}
                        className="w-14 h-14 object-cover m-1   shadow-md rounded-xl"
                      />
                    ))
                  )}
                </div>
              </div>
              <div className="flex-row mt-8 text-black">
                <h3 className="text-2xl">Pricing</h3>

                <div className="flex-row text-black  border-2 border-gray-300 w-[515px] h-[176px] mt-3   shadow-md rounded-xl">
                  <h3 className=" mx-8 pt-8 pb-3"> Price</h3>
                  <div className="flex items-center w-[443px] mx-8  h-[72px] border shadow-md rounded-xl border-gray-300  ">
                    <span className="flex items-center justify-center cursor-pointer">
                      <h3 className="bg-slate-100 w-[72px] h-[72px] border pt-5 text-center shadow-md rounded-xl border-gray-300">
                        ETB
                      </h3>
                    </span>
                    <input
                      type="number"
                      className="flex-grow p-2 rounded-l focus:outline-none  cursor-pointer"
                      value={price}
                      name="price"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <hr className="flex-row" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <hr className="mt-10 border-gray-400   w-[444px]" />
        </div>

        <div className=" flex justify-center items-center mt-5">
          <button
            className="border border-gray-500 rounded-3xl bg-violet-600 text-white w-[228.8px] h-[40px] "
            onClick={productUpdate}
          >
            Update Product
          </button>
        </div>
      </div>
    </>
  );
}

export default UpdateProduct;
