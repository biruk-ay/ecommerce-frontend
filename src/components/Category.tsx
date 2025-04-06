import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { BASE_URL } from "../configs/config";
import Loading from "./Loading";

function Category() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [price, setPrice] = useState(10000);
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    const category = new URLSearchParams(location.search).get("category");
    if (category) {
      setSelectedOption(category);
      fetchData(category);
    }
  }, [location.search, price]);

  const fetchData = async (category: string) => {
    try {
      const apiEndpoint =  `${BASE_URL}product/category/${category}`;
      // const apiEndpoint = `http://localhost:5000/product/category/${category}`;
      const response = await axios.get(apiEndpoint);
      const filteredProducts = response.data.filter(
        (product: { category: string }) => product.category === category
      );
      const filtered = filteredProducts.filter(
        (product: { price: number }) => product.price <= price
      );

      setFilteredItems(filtered);
      setProducts(filteredProducts);
    } catch (error) {
      //   try {
      //     const apiEndpoint = `http://localhost:5000/product/category/${category}`;
      //     const response = await fetch(apiEndpoint);
      //     if (!response.ok) {
      //         throw new Error("Network response was not ok");
      //     }
      //     const data = await response.json();
      //     // Filter products by category
      //     const filteredProducts = data.filter(
      //         (product: { category: string }) => product.category === category
      //     );
      //     // Further filter products by price
      //     const filtered = filteredProducts.filter(
      //         (product: { price: number }) => product.price <= price
      //     );
      //     // Parse image URLs (assuming each product has an 'img' property)
      //     const updatedFiltered = filtered.map((product: { img: string; }) => {
      //         const parsedImageUrl = JSON.parse(product.img.replace(/'/g, '"'))[0]; // Adjust based on actual structure
      //         return { ...product, img: parsedImageUrl }; // Include parsed image URL
      //     });
      //     // Update state with filtered products and their images
      //     setFilteredItems(updatedFiltered);
      //     setProducts(filteredProducts);
      //     console.log("Filtered products:", updatedFiltered);
      // }
    } finally {
      setLoading(false);
    }
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(event.target.value));
  };

  const handleProductClick = (productId: string) => {
    navigate(`/productDetails/${productId}`);
  };

  if (loading) {
    return (
      // <div className="flex items-center justify-center h-screen bg-gray-100">
      //   <p className="text-xl font-semibold text-gray-700 animate-pulse">
      //     Loading...
      //   </p>
      // </div>
      <Loading />
    );
  }
  const handleBackClick = () => {
    window.history.back();
  };
  const togglePanel = () => {
    setShowPanel(!showPanel);
  };
  return (
    <div>
      <Header />
      <div className="container px-4 mx-auto">
        <h1 className="mt-10 text-3xl text-center font-heading sm:text-4xl md:text-6xl">
          <ArrowLeftIcon className="w-8 h-6 mr-2" onClick={handleBackClick} />
          {selectedOption} Products
        </h1>
        <div className="flex flex-col justify-between gap-5 mt-10 md:flex-row">
          <div className="sticky top-0 w-full md:hidden ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
              onClick={togglePanel}
            >
              <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <div
            className={`sticky top-16 z-10 bg-white border rounded-xl p-5 w-full md:w-80 ${
              showPanel ? "" : "hidden md:block"
            }`}
          >
            <h2 className="mb-4 text-2xl font-bold">Adjust Price</h2>
            <input
              type="range"
              min="0"
              max="10000"
              value={price}
              onChange={handleSliderChange}
              className="w-full"
            />
            <p className="mt-2">Selected Price: ${price}</p>
            <h2 className="mt-4 text-lg font-semibold">Brand</h2>
            <ul>
              {["Brand A", "Brand B", "Brand C"].map((brand, index) => (
                <li key={index}>
                  <div className="flex items-center p-2 space-x-2 rounded hover:bg-gray-100">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="text-sm">{brand}</span>
                  </div>
                </li>
              ))}
            </ul>
            <h2 className="mt-4 text-lg font-semibold">Seller</h2>
            <ul>
              {["Seller X", "Seller Y", "Seller Z"].map((seller, index) => (
                <li key={index}>
                  <div className="flex items-center p-2 space-x-2 rounded hover:bg-gray-100">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="text-sm">{seller}</span>
                  </div>
                </li>
              ))}
            </ul>
            <h2 className="mt-4 text-lg font-semibold">Category</h2>
            <ul>
              {["Category 1", "Category 2", "Category 3"].map(
                (category, index) => (
                  <li key={index}>
                    <div className="flex items-center p-2 space-x-2 rounded hover:bg-gray-100">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">{category}</span>
                    </div>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="grid w-full grid-cols-1 gap-6 py-1 mx-auto md:w-2/3 lg:w-3/4 md:grid-cols-2 lg:grid-cols-3">
            {filteredItems.length > 0 ? (
              filteredItems.map((product) => (
                <div
                  key={product.productId}
                  className="overflow-hidden transition-transform duration-300 bg-white shadow-lg rounded-xl hover:scale-105"
                >
                  <img
                    className="object-cover w-full h-48"
                    src={product.img}
                    alt={product.name}
                  />
                  <div className="p-4">
                    <h1 className="text-lg font-semibold text-gray-800 transition duration-300 hover:text-indigo-600">
                      {product.name}
                    </h1>
                    <p className="mt-1 text-sm text-gray-600">
                      {product.description}
                    </p>
                    <h2 className="mt-2 text-lg font-bold text-gray-800">
                      ${product.price.toFixed(2)}
                    </h2>
                    <button
                      onClick={() => handleProductClick(product.productId)}
                      className="w-full py-2 mt-4 font-semibold text-white transition duration-300 bg-purple-600 rounded-lg hover:bg-purple-700"
                    >
                      Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center col-span-full">
                No products found in this category.
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Category;
