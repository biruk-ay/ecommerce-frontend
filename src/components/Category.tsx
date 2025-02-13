import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import price from "../assets/Price.png";
import Footer from "./Footer";
import topImage from "../assets/cars.png";
function Category() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [products, setProducts] = useState<any[]>([]); // Update type as needed
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const ownerId = "673fbfd2871a567d5d885ae2";
  const fetchCart = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/cart/673fbfd2871a567d5d885ae2"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch cart");
      }
      const data = await response.json();
      console.log(data);
      setCartItems(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleUpdateQuantity = async (
    ownerId: string,
    productId: string,
    newQuantity: number
  ) => {
    if (newQuantity < 0) return; // Prevent negative quantities

    try {
      const response = await fetch("http://localhost:5000/cart/update", {
        method: "PUT", // Use PUT for updates
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          owner: ownerId, // Pass the owner ID
          productId: productId,
          quantity: newQuantity,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error updating cart item:", errorData.message);
        // Handle error (e.g., show a message to the user)
      } else {
        // Optionally, refresh the cart items or update the UI accordingly
        console.log("Cart item updated successfully");
        const updatedItems = cartItems.map((item) =>
          item.productId === productId
            ? { ...item, quantity: newQuantity }
            : item
        );
        setCartItems(updatedItems);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  useEffect(() => {
    const category = new URLSearchParams(location.search).get("category");
    if (category) {
      setSelectedOption(category);
      fetchData(category);
    }
  }, [location.search]);

  const fetchData = async (category: string) => {
    try {
      const apiEndpoint = `http://localhost:5000/product/category/${category}`; // Use your actual API endpoint
      const response = await axios.get(apiEndpoint);
      const filteredProducts = response.data.filter(
        (product: { category: string }) => product.category === category
      );
      setProducts(filteredProducts);
      console.log("products:", products);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  interface ProductDetails {
    productId: string;
    name: string;
    price: number;
    description: string;
  }

  interface CartItem {
    productId: string;
    quantity: number;
    productDetail: ProductDetails;
  }

  const owner = "673fbfd2871a567d5d885ae2";
  // const productId='67728405536919a461705059';
  const addToCart = async (owner: string, productId: string) => {
    try {
      const response = await fetch("http://localhost:5000/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ owner, productId }), // Make sure this is correct
      });

      if (!response.ok) {
        const errorData = await response.json(); // Get error details from the response
        console.error("Error response:", errorData);
        throw new Error("Failed to add to cart");
      }

      const cartResponse: CartItem = await response.json();
      alert("Added to cart!");
      navigate("/cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Error adding to cart. Please try again.");
    }
  };

  return (
    <div>
      <Header />
      <div className="">
        <h1 className="flex justify-center font-heading text-3xl leading-[1.1] sm:text-3xl mt-22 md:text-6xl">
          {selectedOption} Products
        </h1>
        <div className="w-full flex mt-10 justify-between gap-3 px-3 md:px-16 md:flex-row ">
          <div className=" sticky top-16 z-10 gap-2 p-2 -ml-11 h-max border rounded-xl w-80 flex flex-col gap-x-5 px-3 md:px-16 md:flex-column">
            <img src={price}></img>

            <ul>
              <h2>Brand</h2>
              <li>
                {" "}
                <div className="flex items-center space-x-2 rounded p-2 hover:bg-gray-100 accent-teal-600">
                  <input
                    type="checkbox"
                    id="htmlCheckbox"
                    name="languageCheckbox"
                    className="h-4 w-4 rounded border-gray-300 text-teal-600 shadow-sm focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400"
                  />
                  <h1 className="flex w-full space-x-2 text-sm"> brand </h1>
                </div>
              </li>
              <li>
                {" "}
                <div className="flex items-center space-x-2 rounded p-2 hover:bg-gray-100 accent-teal-600">
                  <input
                    type="checkbox"
                    id="htmlCheckbox"
                    name="languageCheckbox"
                    className="h-4 w-4 rounded border-gray-300 text-teal-600 shadow-sm focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400"
                  />
                  <h1 className="flex w-full space-x-2 text-sm"> brand </h1>
                </div>
              </li>
              <li>
                {" "}
                <div className="flex items-center space-x-2 rounded p-2 hover:bg-gray-100 accent-teal-600">
                  <input
                    type="checkbox"
                    id="htmlCheckbox"
                    name="languageCheckbox"
                    className="h-4 w-4 rounded border-gray-300 text-teal-600 shadow-sm focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400"
                  />
                  <h1 className="flex w-full space-x-2 text-sm"> brand </h1>
                </div>
              </li>
            </ul>
            <ul>
              <h2>Seller</h2>
              <li>
                {" "}
                <div className="flex items-center space-x-2 rounded p-2 hover:bg-gray-100 accent-teal-600">
                  <input
                    type="checkbox"
                    id="htmlCheckbox"
                    name="languageCheckbox"
                    className="h-4 w-4 rounded border-gray-300 text-teal-600 shadow-sm focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400"
                  />
                  <h1 className="flex w-full space-x-2 text-sm"> seller </h1>
                </div>
              </li>
              <li>
                {" "}
                <div className="flex items-center space-x-2 rounded p-2 hover:bg-gray-100 accent-teal-600">
                  <input
                    type="checkbox"
                    id="htmlCheckbox"
                    name="languageCheckbox"
                    className="h-4 w-4 rounded border-gray-300 text-teal-600 shadow-sm focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400"
                  />
                  <h1 className="flex w-full space-x-2 text-sm"> seller </h1>
                </div>
              </li>
              <li>
                {" "}
                <div className="flex items-center space-x-2 rounded p-2 hover:bg-gray-100 accent-teal-600">
                  <input
                    type="checkbox"
                    id="htmlCheckbox"
                    name="languageCheckbox"
                    className="h-4 w-4 rounded border-gray-300 text-teal-600 shadow-sm focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400"
                  />
                  <h1 className="flex w-full space-x-2 text-sm"> seller </h1>
                </div>
              </li>
            </ul>
            <ul>
              <h2>Category</h2>
              <li>
                {" "}
                <div className="flex items-center space-x-2 rounded p-2 hover:bg-gray-100 accent-teal-600">
                  <input
                    type="checkbox"
                    id="htmlCheckbox"
                    name="languageCheckbox"
                    className="h-4 w-4 rounded border-gray-300 text-teal-600 shadow-sm focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400"
                  />
                  <h1 className="flex w-full space-x-2 text-sm"> category </h1>
                </div>{" "}
              </li>
              <li>
                {" "}
                <div className="flex items-center space-x-2 rounded p-2 hover:bg-gray-100 accent-teal-600">
                  <input
                    type="checkbox"
                    id="htmlCheckbox"
                    name="languageCheckbox"
                    className="h-4 w-4 rounded border-gray-300 text-teal-600 shadow-sm focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400"
                  />
                  <h1 className="flex w-full space-x-2 text-sm"> category </h1>
                </div>{" "}
              </li>
              <li>
                {" "}
                <div className="flex items-center space-x-2 rounded p-2 hover:bg-gray-100 accent-teal-600">
                  <input
                    type="checkbox"
                    id="htmlCheckbox"
                    name="languageCheckbox"
                    className="h-4 w-4 rounded border-gray-300 text-teal-600 shadow-sm focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400"
                  />
                  <h1 className="flex w-full space-x-2 text-sm"> category </h1>
                </div>{" "}
              </li>
            </ul>
          </div>
          <div className="md:w-2/3 lg:w-3/4 py-1  w-11/12 mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-end gap-y-20 gap-x-0 bg-slate-100 mb-5">
            {products.length > 0 ? (
              products.map((product) => (
                <div className="w-72 bg-white shadow-lg rounded-xl overflow-hidden duration-500 hover:scale-105 hover:shadow-xl transition-transform">
                  <img
                    className="w-full h-auto object-cover"
                    src={topImage}
                    alt={product.name}
                  />
                  <div className="px-6 py-4">
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
                      onClick={() => {
                        console.log("Product ID:", product.productId);
                        console.log("Product ID:", product.name); // Log the product ID
                        addToCart(owner, product.productId);
                      }}
                      className="w-full mt-4 bg-purple-600 text-white font-semibold py-2 rounded-lg hover:bg-purple-700 transition duration-300"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No products found in this category.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Category;
