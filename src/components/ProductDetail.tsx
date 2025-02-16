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

function ProductDetail() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const productId = useParams<{ productId?: string }>().productId || "";

  const [products, setProducts] = useState<ProductDetails[]>([]);
  const username = useAppSelector(selectUserName);
  const ownerId = useAppSelector(selectUserId) || "";

  const addToCart = async (owner: string, productId: string) => {
    try {
      const response = await fetch("http://localhost:5000/cart/add", {
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
          `http://localhost:5000/product/see/${productId}`
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
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-xl font-semibold text-gray-700 animate-pulse">
          Loading...
        </p>
      </div>
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
        <div className="flex flex-col justify-evenly items-center p-8 h-auto">
          <div className="w-full justify-start">
            <h3>
              <ArrowLeftIcon
                className="h-6 w-8 mr-2"
                onClick={handleBackClick}
              />{" "}
              Goback
            </h3>
          </div>
          <div className=" grid md:grid-cols-3 grid-cols-1 md:gap-1 gap-y-4 justify-evenly items-center h-auto w-full">
            <div className=" flex md:justify-end justify-center  ">
              <div className="bg-purple-200  p-3 flex flex-col gap-6 text-start h-auto w-7/12 rounded-lg">
                <h1 className="text-3xl font-roboto font-bold text-purple-950">
                  {products.name}
                </h1>
                <h3>About</h3>
                <h3>{products.name}</h3>
                <hr className="border-gray-400" />
                <h3>{products.description}</h3>
              </div>
            </div>
            <div className=" flex justify-evenly items-center">
              <div className=" flex items-center w-full h-auto">
                <img
                  src={products.img}
                  alt="Product"
                  className="rounded-full mx-auto w-72 h-72 i border-4 shadow-lg"
                />
              </div>
            </div>
            <div className=" flex md:justify-start justify-center">
              <div className="flex gap-3 w-7/12 text-white flex-col mb-6">
                <div className="bg-purple-200 justify-evenly items-start w-auto rounded-md gap-3 p-2 flex flex-col">
                  <div className="flex flex-row gap-4">
                    <h3 className="font-bold text-black text-xl">Price</h3>
                    <h3 className="font-bold text-black text-xl">
                      {products.price}
                    </h3>
                  </div>
                  <div className="flex flex-row gap-3 mb-4">
                    <h3 className="font-bold text-black text-xl">Color</h3>
                    <div className="rounded-full bg-red-400 w-5 h-5"></div>
                    <div className="rounded-full bg-green-400 w-5 h-5"></div>
                  </div>
                </div>
                <button className="bg-purple-950 rounded-md w-full p-2">
                  Buy Now
                </button>
                <button
                  onClick={() => addToCart(ownerId, productId)}
                  className="bg-purple-950 rounded-md w-full p-2"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-row justify-around items-center gap-3">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="flex bg-green-300 rounded-full justify-center items-center"
              >
                <img
                  src={products.img}
                  alt={`Thumbnail ${index}`}
                  className="rounded-full md:w-24 md:h-24 w-16 h-16"
                />
              </div>
            ))}
          </div>
          <div className="bg-white w-full flex flex-col justify-evenly items-start p-4">
            <h3 className="font-bold text-2xl">Description</h3>
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
