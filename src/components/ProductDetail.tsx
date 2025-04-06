// @ts-nocheck
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import topImage from "../assets/cars.png";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../apps/store/store";
import {
  selectUserId,
  selectUserName,
} from "../apps/auth/application/slice/AuthSlice";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { BASE_URL } from "../configs/config";
import Loading from "./Loading";

function ProductDetail() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const productId = useParams<{ productId?: string }>().productId || "";

  const [products, setProducts] = useState<ProductDetails[]>([]);
  const username = useAppSelector(selectUserName);
  const ownerId = useAppSelector(selectUserId) || "";

  const addToCart = async (owner: string, productId: string) => {
    try {
      const response = await fetch(`${BASE_URL}cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ owner, productId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error("Failed to add to cart");
      }

      const cartResponse: CartItem = await response.json();

      alert("Added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Error adding to cart. Please try again.");
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${BASE_URL}product/see/${productId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setProducts(data);
        //   // Parse the image URL
        //   const parsedImageUrl = JSON.parse(data.img.replace(/'/g, '"'))[0]; // Adjust based on your actual data structure
        //   setProducts({ ...data, img: parsedImageUrl }); // Include parsed image URL in state
        //   console.log("Product data:", data);
        //
      } catch (err) {
        // setError(err.message); // Capture error message
        // console.error("Fetch error:", err);
      } finally {
        setLoading(false); // End loading
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]); // Fetch when productId changes
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
  if (error) return <div>Error: {error}</div>;

  interface ProductDetails {
    productId: string;
    name: string;
    price: number;
    description: string;
    img: string;
  }

  interface Product {
    _id: string;
    name: string;
    price: number;
    description?: string;
    img?: string;
  }

  interface CartItem {
    productId: string;
    quantity: number;
    productDetail: ProductDetails;
  }
  const handleBackClick = () => {
    window.history.back();
  };
  return (
    <>
      <Header />

      <>
        <div className="flex flex-col items-center h-auto p-8 justify-evenly">
          <div className="justify-start w-full">
            <h3>
              <ArrowLeftIcon
                className="w-8 h-6 mr-2"
                onClick={handleBackClick}
              />{" "}
              Goback
            </h3>
          </div>
          <div className="grid items-center w-full h-auto grid-cols-1 md:grid-cols-3 md:gap-1 gap-y-4 justify-evenly">
            <div className="flex justify-center md:justify-end">
              <div className="flex flex-col w-7/12 h-auto gap-6 p-3 bg-purple-200 rounded-lg text-start">
                <h1 className="text-3xl font-bold font-roboto text-purple-950">
                  {products.name}
                </h1>
                <h3>About</h3>
                <h3>{products.name}</h3>
                <hr className="border-gray-400" />
                <h3>{products.description}</h3>
              </div>
            </div>
            <div className="flex items-center justify-evenly">
              <div className="flex items-center w-full h-auto ">
                <img
                  src={products.img}
                  alt="Product"
                  className="mx-auto border-4 rounded-full shadow-lg w-72 h-72 i"
                />
              </div>
            </div>
            <div className="flex justify-center md:justify-start">
              <div className="flex flex-col w-7/12 gap-3 mb-6 text-white">
                <div className="flex flex-col items-start w-auto gap-3 p-2 bg-purple-200 rounded-md justify-evenly">
                  <div className="flex flex-row gap-4">
                    <h3 className="text-xl font-bold text-black">Price</h3>
                    <h3 className="text-xl font-bold text-black">
                      {products.price}
                    </h3>
                  </div>
                  <div className="flex flex-row gap-3 mb-4">
                    <h3 className="text-xl font-bold text-black">Color</h3>
                    <div className="w-5 h-5 bg-red-400 rounded-full"></div>
                    <div className="w-5 h-5 bg-green-400 rounded-full"></div>
                  </div>
                </div>
                <button className="w-full p-2 rounded-md bg-purple-950">
                  Buy Now
                </button>
                <button
                  onClick={() => addToCart(ownerId, productId)}
                  className="w-full p-2 rounded-md bg-purple-950"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-row items-center justify-around gap-3">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-center bg-green-300 rounded-full"
              >
                <img
                  src={products.img}
                  alt={`Thumbnail ${index}`}
                  className="w-16 h-16 rounded-full md:w-24 md:h-24"
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col items-start w-full p-4 bg-white justify-evenly">
            <h3 className="text-2xl font-bold">Description</h3>
            <h4>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi
              laborum doloribus ab nesciunt! Expedita, nihil amet odit dolore
              doloremque fugiat? Voluptatem deserunt debitis, voluptate animi
              tempore quam reprehenderit velit eveniet dolore.
            </h4>
            <h4>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi
              laborum doloribus ab nesciunt! Expedita, nihil amet odit dolore
              doloremque fugiat? Voluptatem deserunt debitis, voluptate animi
              tempore quam reprehenderit velit eveniet dolore.
            </h4>
            <h4>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi
              laborum doloribus ab nesciunt! Expedita, nihil amet odit dolore
              doloremque fugiat? Voluptatem deserunt debitis, voluptate animi
              tempore quam reprehenderit velit eveniet dolore.
            </h4>
            <h4>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi
              laborum doloribus ab nesciunt! Expedita, nihil amet odit dolore
              doloremque fugiat? Voluptatem deserunt debitis, voluptate animi
              tempore quam reprehenderit velit eveniet dolore.
            </h4>
          </div>
        </div>
      </>

      <Footer />
    </>
  );
}

export default ProductDetail;
