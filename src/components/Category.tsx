// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import Header from "./Header";
// import price from "../assets/Price.png";
// import Footer from "./Footer";
// import topImage from "../assets/cars.png";
// function Category() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [selectedOption, setSelectedOption] = useState<string>("");
//   const [products, setProducts] = useState<any[]>([]); // Update type as needed
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [filteredItems, setFilteredItems] = useState<any[]>([]);
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const ownerId = "673fbfd2871a567d5d885ae2";
 
//   const [price, setPrice] = useState(150);
//   useEffect(() => {
//     const category = new URLSearchParams(location.search).get("category");
//     if (category) {
//       setSelectedOption(category);
//       fetchData(category);
//     }
//   }, [location.search,price, products]);

//   const fetchData = async (category: string) => {
//     try {
//       const apiEndpoint = `http://localhost:5000/product/category/${category}`; // Use your actual API endpoint
//       const response = await axios.get(apiEndpoint);
//       const filteredProducts = response.data.filter(
//         (product: { category: string }) => product.category === category
//       );
//       const filtered = products.filter(product => product.price <= price);
//     setFilteredItems(filtered);
//       setProducts(filteredProducts);
     
//       console.log("products:", filteredItems);
//       console.log("products:", products);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

 
 
//   const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setPrice(Number(event.target.value)); // Update price based on slider value
//   };
//   interface ProductDetails {
//     productId: string;
//     name: string;
//     price: number;
//     description: string;
//   }

//   interface CartItem {
//     productId: string;
//     quantity: number;
//     productDetail: ProductDetails;
//   }
//   const handleProductClick = (productId: string) => {
//     navigate(`/productDetails/${productId}`); // Navigate to the product details page
// };


//   const owner = "673fbfd2871a567d5d885ae2";
//   const productId='67728405536919a461705059';
//   const addToCart = async (owner: string, productId: string) => {
//     try {
//       const response = await fetch("http://localhost:5000/cart/add", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ owner, productId }), // Make sure this is correct
//       });

//       if (!response.ok) {
//         const errorData = await response.json(); // Get error details from the response
//         console.error("Error response:", errorData);
//         throw new Error("Failed to add to cart");
//       }

//       const cartResponse: CartItem = await response.json();
//       alert("Added to cart!");
//       // navigate("/cart");
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//       alert("Error adding to cart. Please try again.");
//     }
//   };

//   return (
//     <div>
//       <Header />
//       <div className="">
//         <h1 className="flex justify-center font-heading text-3xl leading-[1.1] sm:text-3xl mt-22 md:text-6xl">
//           {selectedOption} Products
//         </h1>
//         <div className="w-full flex mt-10 justify-between gap-3 px-3 md:px-16 md:flex-row ">
//           <div className=" sticky top-16 z-10 gap-2 p-2 -ml-11 h-max border rounded-xl w-80 flex flex-col gap-x-5 px-3 md:px-16 md:flex-column">
//           <div>
//             <h2 className="text-2xl font-bold mb-4">Adjust Price</h2>
//             <input
//                 type="range"
//                 min="0"
//                 max="100"
//                 value={price}
//                 onChange={handleSliderChange}
//                 className="w-full"
//             />
//             <p className="mt-2">Selected Price: ${price}</p>

           
//         </div>

//             <ul>
//               <h2>Brand</h2>
//               <li>
//                 {" "}
//                 <div className="flex items-center space-x-2 rounded p-2 hover:bg-gray-100 accent-teal-600">
//                   <input
//                     type="checkbox"
//                     id="htmlCheckbox"
//                     name="languageCheckbox"
//                     className="h-4 w-4 rounded border-gray-300 text-teal-600 shadow-sm focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400"
//                   />
//                   <h1 className="flex w-full space-x-2 text-sm"> brand </h1>
//                 </div>
//               </li>
//               <li>
//                 {" "}
//                 <div className="flex items-center space-x-2 rounded p-2 hover:bg-gray-100 accent-teal-600">
//                   <input
//                     type="checkbox"
//                     id="htmlCheckbox"
//                     name="languageCheckbox"
//                     className="h-4 w-4 rounded border-gray-300 text-teal-600 shadow-sm focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400"
//                   />
//                   <h1 className="flex w-full space-x-2 text-sm"> brand </h1>
//                 </div>
//               </li>
//               <li>
//                 {" "}
//                 <div className="flex items-center space-x-2 rounded p-2 hover:bg-gray-100 accent-teal-600">
//                   <input
//                     type="checkbox"
//                     id="htmlCheckbox"
//                     name="languageCheckbox"
//                     className="h-4 w-4 rounded border-gray-300 text-teal-600 shadow-sm focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400"
//                   />
//                   <h1 className="flex w-full space-x-2 text-sm"> brand </h1>
//                 </div>
//               </li>
//             </ul>
//             <ul>
//               <h2>Seller</h2>
//               <li>
//                 {" "}
//                 <div className="flex items-center space-x-2 rounded p-2 hover:bg-gray-100 accent-teal-600">
//                   <input
//                     type="checkbox"
//                     id="htmlCheckbox"
//                     name="languageCheckbox"
//                     className="h-4 w-4 rounded border-gray-300 text-teal-600 shadow-sm focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400"
//                   />
//                   <h1 className="flex w-full space-x-2 text-sm"> seller </h1>
//                 </div>
//               </li>
//               <li>
//                 {" "}
//                 <div className="flex items-center space-x-2 rounded p-2 hover:bg-gray-100 accent-teal-600">
//                   <input
//                     type="checkbox"
//                     id="htmlCheckbox"
//                     name="languageCheckbox"
//                     className="h-4 w-4 rounded border-gray-300 text-teal-600 shadow-sm focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400"
//                   />
//                   <h1 className="flex w-full space-x-2 text-sm"> seller </h1>
//                 </div>
//               </li>
//               <li>
//                 {" "}
//                 <div className="flex items-center space-x-2 rounded p-2 hover:bg-gray-100 accent-teal-600">
//                   <input
//                     type="checkbox"
//                     id="htmlCheckbox"
//                     name="languageCheckbox"
//                     className="h-4 w-4 rounded border-gray-300 text-teal-600 shadow-sm focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400"
//                   />
//                   <h1 className="flex w-full space-x-2 text-sm"> seller </h1>
//                 </div>
//               </li>
//             </ul>
//             <ul>
//               <h2>Category</h2>
//               <li>
//                 {" "}
//                 <div className="flex items-center space-x-2 rounded p-2 hover:bg-gray-100 accent-teal-600">
//                   <input
//                     type="checkbox"
//                     id="htmlCheckbox"
//                     name="languageCheckbox"
//                     className="h-4 w-4 rounded border-gray-300 text-teal-600 shadow-sm focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400"
//                   />
//                   <h1 className="flex w-full space-x-2 text-sm"> category </h1>
//                 </div>{" "}
//               </li>
//               <li>
//                 {" "}
//                 <div className="flex items-center space-x-2 rounded p-2 hover:bg-gray-100 accent-teal-600">
//                   <input
//                     type="checkbox"
//                     id="htmlCheckbox"
//                     name="languageCheckbox"
//                     className="h-4 w-4 rounded border-gray-300 text-teal-600 shadow-sm focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400"
//                   />
//                   <h1 className="flex w-full space-x-2 text-sm"> category </h1>
//                 </div>{" "}
//               </li>
//               <li>
//                 {" "}
//                 <div className="flex items-center space-x-2 rounded p-2 hover:bg-gray-100 accent-teal-600">
//                   <input
//                     type="checkbox"
//                     id="htmlCheckbox"
//                     name="languageCheckbox"
//                     className="h-4 w-4 rounded border-gray-300 text-teal-600 shadow-sm focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400"
//                   />
//                   <h1 className="flex w-full space-x-2 text-sm"> category </h1>
//                 </div>{" "}
//               </li>
//             </ul>
//           </div>
//           <div className="md:w-2/3 lg:w-3/4 py-1  w-11/12 mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-end gap-y-20 gap-x-0 bg-slate-100 mb-5">
//             {filteredItems.length > 0 ? (
//               filteredItems.map((product) => (
//                 <div className="w-72 bg-white shadow-lg rounded-xl overflow-hidden duration-500 hover:scale-105 hover:shadow-xl transition-transform">
//                   <img
//                     className="w-full h-auto object-cover"
//                     src={topImage}
//                     alt={product.name}
//                   />
//                   <div className="px-6 py-4">
//                     <h1 className="font-semibold text-lg text-gray-800 hover:text-indigo-600 transition duration-300">
//                       {product.name}
//                     </h1>
//                     <p className="text-gray-600 text-sm mt-1">
//                       {product.description}
//                     </p>
//                     <h2 className="text-gray-800 text-lg mt-2 font-bold">
//                       ${product.price.toFixed(2)}
//                     </h2>
//                     <button onClick={() =>{
//                       handleProductClick(product.productId)} }>details</button>
//                     {/* <button
//                       onClick={() => {
//                         console.log("Product ID:", product.productId);
//                         console.log("Product ID:", product.name); // Log the product ID
//                         addToCart(owner, product.productId);
//                       }}
//                       className="w-full mt-4 bg-purple-600 text-white font-semibold py-2 rounded-lg hover:bg-purple-700 transition duration-300"
//                     >
//                       Add to Cart
//                     </button> */}
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p>No products found in this category.</p>
//             )}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default Category;
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import topImage from "../assets/cars.png";

function Category() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [price, setPrice] = useState(150);
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
      const filtered = filteredProducts.filter((product: { price: number; }) => product.price <= price);
      setFilteredItems(filtered);
      setProducts(filteredProducts);
    } catch (error) {
      console.error(error);
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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4">
        <h1 className="text-center font-heading text-3xl sm:text-4xl md:text-6xl mt-10">
          {selectedOption} Products
        </h1>
        <div className="flex flex-col md:flex-row mt-10 justify-between gap-5">
          <div className="sticky top-16 z-10 bg-white border rounded-xl p-5 w-full md:w-80">
            <h2 className="text-2xl font-bold mb-4">Adjust Price</h2>
            <input
              type="range"
              min="0"
              max="100"
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
              {["Category 1", "Category 2", "Category 3"].map((category, index) => (
                <li key={index}>
                  <div className="flex items-center space-x-2 rounded p-2 hover:bg-gray-100">
                    <input type="checkbox" className="h-4 w-4" />
                    <span className="text-sm">{category}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:w-2/3 lg:w-3/4 py-1 w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.length > 0 ? (
              filteredItems.map((product) => (
                <div key={product.productId} className="bg-white shadow-lg rounded-xl overflow-hidden transition-transform duration-300 hover:scale-105">
                  <img className="w-full h-48 object-cover" src={topImage} alt={product.name} />
                  <div className="p-4">
                    <h1 className="font-semibold text-lg text-gray-800 hover:text-indigo-600 transition duration-300">{product.name}</h1>
                    <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                    <h2 className="text-gray-800 text-lg mt-2 font-bold">${product.price.toFixed(2)}</h2>
                    <button onClick={() => handleProductClick(product.productId)} className="w-full mt-4 bg-purple-600 text-white font-semibold py-2 rounded-lg hover:bg-purple-700 transition duration-300">
                      Details
                    </button>
                    {/* Uncomment to enable cart functionality */}
                    {/* <button onClick={() => addToCart(ownerId, product.productId)} className="w-full mt-2 bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition duration-300">
                      Add to Cart
                    </button> */}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center col-span-full">No products found in this category.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Category;