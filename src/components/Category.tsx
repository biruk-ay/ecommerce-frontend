import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";

function Category() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [price, setPrice] = useState(10000);
  const [filteredItems, setFilteredItems] = useState<any[]>([]);

  useEffect(() => {
    const category = new URLSearchParams(location.search).get("category");
    if (category) {
      setSelectedOption(category);
      fetchData(category);
    }
  }, [location.search, price]);

  const fetchData = async (category: string) => {
    try {
      const apiEndpoint = `http://localhost:5000/product/category/${category}`;
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
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <p className="text-xl font-semibold text-gray-700 animate-pulse">
                Loading...
            </p>
        </div>
    );
}
  const handleBackClick = () => {
    window.history.back();
  };
  return (
    <div>
      <Header />
      <div className="container mx-auto px-4">
        <h1 className="text-center font-heading text-3xl sm:text-4xl md:text-6xl mt-10">
          <ArrowLeftIcon className="h-6 w-8 mr-2" onClick={handleBackClick} />
          {selectedOption} Products
        </h1>
        <div className="flex flex-col md:flex-row mt-10 justify-between gap-5">
          <div className="sticky top-16 z-10 bg-white border rounded-xl p-5 w-full md:w-80">
            <h2 className="text-2xl font-bold mb-4">Adjust Price</h2>
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
                  <div className="flex items-center space-x-2 rounded p-2 hover:bg-gray-100">
                    <input type="checkbox" className="h-4 w-4" />
                    <span className="text-sm">{brand}</span>
                  </div>
                </li>
              ))}
            </ul>
            <h2 className="mt-4 text-lg font-semibold">Seller</h2>
            <ul>
              {["Seller X", "Seller Y", "Seller Z"].map((seller, index) => (
                <li key={index}>
                  <div className="flex items-center space-x-2 rounded p-2 hover:bg-gray-100">
                    <input type="checkbox" className="h-4 w-4" />
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
                    <div className="flex items-center space-x-2 rounded p-2 hover:bg-gray-100">
                      <input type="checkbox" className="h-4 w-4" />
                      <span className="text-sm">{category}</span>
                    </div>
                  </li>
                )
              )}
            </ul>
          </div>
          <div className="md:w-2/3 lg:w-3/4 py-1 w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.length > 0 ? (
              filteredItems.map((product) => (
                <div
                  key={product.productId}
                  className="bg-white shadow-lg rounded-xl overflow-hidden transition-transform duration-300 hover:scale-105"
                >
                  <img
                    className="w-full h-48 object-cover"
                    src={product.img}
                    alt={product.name}
                  />
                  <div className="p-4">
                    <h1 className="font-semibold text-lg text-gray-800 hover:text-indigo-600 transition duration-300">
                      {product.name}
                    </h1>
                    <p className="text-gray-600 text-sm mt-1">
                      {product.description}
                    </p>
                    <h2 className="text-gray-800 text-lg mt-2 font-bold">
                      ${product.price.toFixed(2)}
                    </h2>
                    <button
                      onClick={() => handleProductClick(product.productId)}
                      className="w-full mt-4 bg-purple-600 text-white font-semibold py-2 rounded-lg hover:bg-purple-700 transition duration-300"
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
