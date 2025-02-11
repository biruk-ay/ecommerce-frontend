import React, {useContext, useEffect, useState} from "react";
import Header from "./Header";
import topImage from "../assets/topImage.png";
import { ArchiveBoxXMarkIcon } from "@heroicons/react/20/solid";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import Footer from "./Footer";
import { CartContext } from "../contexts/CartContext";

interface CartItem {
  productId: string; // or mongoose.Schema.Types.ObjectId
  quantity: number;
  name: string;
  price: number;
  description: string;
  category: string;
  img?: string; // Optional field
}
function Cart() {
  
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
     const [loading, setLoading] = useState<boolean>(true);
     const [error, setError] = useState<string | null>(null);
 const ownerId="673fbfd2871a567d5d885ae2";
     useEffect(() => {
         const fetchCart = async () => {
             try {
                 const response = await fetch('http://localhost:5000/cart/673fbfd2871a567d5d885ae2');
                 if (!response.ok) {
                     throw new Error('Failed to fetch cart');
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
 
         fetchCart();
     }, []);
 
     if (loading) {
         return <p>Loading...</p>;
     }
 
     if (error) {
         return <p>Error: {error}</p>;
     }
     const handleDelete = async (ownerId: string, productId: string) => {
      try {
          const response = await fetch('http://localhost:5000/cart/remove', {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ owner: ownerId, productId }),
          });
  
          if (!response.ok) {
              const errorData = await response.json();
              console.error('Error removing item:', errorData.message);
          } else {
              // Update UI here
              console.log('Item removed successfully');
              setCartItems((prevItems) => prevItems.filter(item => item.productId !== productId));
          }
      } catch (error) {
          console.error('Fetch error:', error);
      }
  };

  const handleUpdateQuantity = async (ownerId: string, productId: string, newQuantity: number) => {
    if (newQuantity < 0) return; // Prevent negative quantities

    try {
        const response = await fetch('http://localhost:5000/cart/update', {
            method: 'PUT', // Use PUT for updates
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                owner: ownerId, // Pass the owner ID
                productId: productId,
                quantity: newQuantity,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error updating cart item:', errorData.message);
            // Handle error (e.g., show a message to the user)
        } else {
            // Optionally, refresh the cart items or update the UI accordingly
            console.log('Cart item updated successfully');
            const updatedItems = cartItems.map(item => 
              item.productId === productId ? { ...item, quantity: newQuantity } : item
          );
          setCartItems(updatedItems);
      }
        }
     catch (error) {
        console.error('Fetch error:', error);
    }
};
const deliveryFee=25;
  const totalAmount= cartItems.reduce((total,item) => total + item.price * item.quantity,0); 
  const totalWithDelivery = totalAmount + deliveryFee; 
  return (
    <>
      <Header />
      <div className="flex top-0  w-full justify-evenly z-10 items-center text-black">
        <img
          className="w-11/12 justify-evenly z-0 items-center"
          src={topImage}
          alt="top image"

        />
      </div>
      <div className="w-full bg-gray-50 -mt-36 mb-10 rounded-3xl border z-30 h-max flex justify-evenly items-center">
        <div className="flex flex-col sm:flex-row  p-20 w-full sm:w-10/12 justify-between items-center mt-36 bg-gray-50 ">
          
         
            <div className=" flex flex-col  w-full sm:w-1/2 bg-gray-50">
          <h3 className="flex items-center text-2xl font-bold m-2">
            <ArrowLeftIcon className="h-6 w-8 mr-2" />
            Back to shopping
        </h3>            
        <hr className="border-gray-400" />
            <h2 className="text-2xl font-bold m-2">Shopping Cart</h2>
            <h4 className="text-2xl font-bold m-2">
              You have {cartItems.length} items in your cart
            </h4>
            {cartItems.map((item)=><>
              <div className="flex flex-col justify-evenly items-center">
              <div className="flex flex-row m-2 py-5 rounded bg-gray-200 shadow-lg w-11/12 justify-between items-center">
                <div className="flex w-3/12 justify-evenly items-center ">
                  <img className="w-11/12  rounded-lg" src={topImage} alt="" />
                </div>
                <div className="flex  -ml-44 flex-col  justify-evenly items-center text-black  font-bold">
                  
                  <div className="text-start">
                  <h3>{item.name}</h3>
                  <h3>{item.description}</h3>
                  </div>
                  <button
                  type="button"
                  onClick={() =>handleDelete(ownerId,item.productId)}
                   className="bg-gray-100 w-7 h-10">
                    <ArchiveBoxXMarkIcon className="h-9 w-6" />
                  </button>
                </div>
                <div className="flex  mr-5 flex-col">
                  <div className="flex flex-row text-black">
                    <button
                    onClick={() => handleUpdateQuantity(ownerId,item.productId, item.quantity - 1)} 
                    disabled={item.quantity <= 1}
                      type="button"
                      className="inline-block rounded bg-primary px-4  text-md font-extrabold mr-1 text-white shadow-[0_4px_9px_-4px_#3b71ca] "
                    >
                      -
                    </button>
                    <input
                    value={item.quantity}
                      type="number"
                      placeholder="1"
                      className="resizable-input rounded bg-gray-200 text-center text-md font-bold text-black shadow-xl min-w-[30px] w-10"
                      onChange={(e) => {
                        const newQuantity = Number(e.target.value);
                        handleUpdateQuantity(ownerId, item.productId, newQuantity);
                    }}/>
                    <button
                     onClick={() => handleUpdateQuantity(ownerId,item.productId, item.quantity + 1)} 
                     
                      type="button"
                      className="inline-block rounded bg-primary px-4  text-md font-extrabold ml-1 mr-1 text-white shadow-[0_4px_9px_-4px_#3b71ca]  "
                    >
                      +
                    </button>
                  </div>
                  <div className="mt-3 flex justify-evenly items-center ">
                    <div className="inline-block rounded bg-gray-200 px-4  text-md font-extrabold ml-1 mr-1 text-black shadow-[0_4px_9px_-4px_#3b71ca] ">
                      {item.price}
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="flex flex-row m-2 py-5 rounded bg-gray-200 shadow-lg w-11/12 justify-between items-center">
                <div className="flex w-3/12   justify-evenly items-center ">
                  <img className="w-11/12  rounded-lg" src={topImage} alt="" />
                </div>
                <div className="flex  -ml-44 flex-col  justify-evenly items-center text-black  font-bold">
                  
                  <div className="text-start">
                  <h3>Product Name</h3>
                  <h3>Specific Description</h3>
                  </div>
                  <button className="bg-gray-100 w-7 h-10">
                    <ArchiveBoxXMarkIcon className="h-9 w-6" />
                  </button>
                </div>
                <div className="flex  mr-5 flex-col">
                  <div className="flex flex-row text-black">
                    <button
                      type="button"
                      className="inline-block rounded bg-primary px-4  text-md font-extrabold mr-1 text-white shadow-[0_4px_9px_-4px_#3b71ca] "
                    >
                      -
                    </button>
                    <input
                      type="number"
                      placeholder="1"
                      className="resizable-input rounded bg-gray-200 text-center text-md font-bold text-black shadow-xl min-w-[30px] w-10"
                    />
                    <button
                      type="button"
                      className="inline-block rounded bg-primary px-4  text-md font-extrabold ml-1 mr-1 text-white shadow-[0_4px_9px_-4px_#3b71ca]  "
                    >
                      +
                    </button>
                  </div>
                  <div className="mt-3 flex justify-evenly items-center ">
                    <div className="inline-block rounded bg-gray-200 px-4  text-md font-extrabold ml-1 mr-1 text-black shadow-[0_4px_9px_-4px_#3b71ca] ">
                      54.00 Birr
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row m-2 py-5 rounded bg-gray-200 shadow-lg w-11/12 justify-between items-center">
                <div className="flex w-3/12   justify-evenly items-center ">
                  <img className="w-11/12  rounded-lg" src={topImage} alt="" />
                </div>
                <div className="flex  -ml-44 flex-col  justify-evenly items-center text-black  font-bold">
                  
                  <div className="text-start">
                  <h3>Product Name</h3>
                  <h3>Specific Description</h3>
                  </div>
                  <button className="bg-gray-100 w-7 h-10">
                    <ArchiveBoxXMarkIcon className="h-9 w-6" />
                  </button>
                </div>
                <div className="flex  mr-5 flex-col">
                  <div className="flex flex-row text-black">
                    <button
                      type="button"
                      className="inline-block rounded bg-primary px-4  text-md font-extrabold mr-1 text-white shadow-[0_4px_9px_-4px_#3b71ca] "
                    >
                      -
                    </button>
                    <input
                      type="number"
                      placeholder="1"
                      className="resizable-input rounded bg-gray-200 text-center text-md font-bold text-black shadow-xl min-w-[30px] w-10"
                    />
                    <button
                      type="button"
                      className="inline-block rounded bg-primary px-4  text-md font-extrabold ml-1 mr-1 text-white shadow-[0_4px_9px_-4px_#3b71ca]  "
                    >
                      +
                    </button>
                  </div>
                  <div className="mt-3 flex justify-evenly items-center ">
                    <div className="inline-block rounded bg-gray-200 px-4  text-md font-extrabold ml-1 mr-1 text-black shadow-[0_4px_9px_-4px_#3b71ca] ">
                      54.00 Birr
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row m-2 py-5 rounded bg-gray-200 shadow-lg w-11/12 justify-between items-center">
                <div className="flex w-3/12   justify-evenly items-center ">
                  <img className="w-11/12  rounded-lg" src={topImage} alt="" />
                </div>
                <div className="flex  -ml-44 flex-col  justify-evenly items-center text-black  font-bold">
                  
                  <div className="text-start">
                  <h3>Product Name</h3>
                  <h3>Specific Description</h3>
                  </div>
                  <button className="bg-gray-100 w-7 h-10">
                    <ArchiveBoxXMarkIcon className="h-9 w-6" />
                  </button>
                </div>
                <div className="flex  mr-5 flex-col">
                  <div className="flex flex-row text-black">
                    <button
                      type="button"
                      className="inline-block rounded bg-primary px-4  text-md font-extrabold mr-1 text-white shadow-[0_4px_9px_-4px_#3b71ca] "
                    >
                      -
                    </button>
                    <input
                      type="number"
                      placeholder="1"
                      className="resizable-input rounded bg-gray-200 text-center text-md font-bold text-black shadow-xl min-w-[30px] w-10"
                    />
                    <button
                      type="button"
                      className="inline-block rounded bg-primary px-4  text-md font-extrabold ml-1 mr-1 text-white shadow-[0_4px_9px_-4px_#3b71ca]  "
                    >
                      +
                    </button>
                  </div>
                  <div className="mt-3 flex justify-evenly items-center ">
                    <div className="inline-block rounded bg-gray-200 px-4  text-md font-extrabold ml-1 mr-1 text-black shadow-[0_4px_9px_-4px_#3b71ca] ">
                      54.00 Birr
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row m-2 py-5 rounded bg-gray-200 shadow-lg w-11/12 justify-between items-center">
                <div className="flex w-3/12   justify-evenly items-center ">
                  <img className="w-11/12  rounded-lg" src={topImage} alt="" />
                </div>
                <div className="flex  -ml-44 flex-col  justify-evenly items-center text-black  font-bold">
                  
                  <div className="text-start">
                  <h3>{item.productId.price}</h3>
                  <h3>Specific Description</h3>
                  </div>
                  <button className="bg-gray-100 w-7 h-10">
                    <ArchiveBoxXMarkIcon className="h-9 w-6" />
                  </button>
                </div>
                <div className="flex  mr-5 flex-col">
                  <div className="flex flex-row text-black">
                    <button
                      type="button"
                      className="inline-block rounded bg-primary px-4  text-md font-extrabold mr-1 text-white shadow-[0_4px_9px_-4px_#3b71ca] "
                    >
                      -
                    </button>
                    <input
                      type="number"
                      placeholder="1"
                      className="resizable-input rounded bg-gray-200 text-center text-md font-bold text-black shadow-xl min-w-[30px] w-10"
                    />
                    <button
                      type="button"
                      className="inline-block rounded bg-primary px-4  text-md font-extrabold ml-1 mr-1 text-white shadow-[0_4px_9px_-4px_#3b71ca]  "
                    >
                      +
                    </button>
                  </div>
                  <div className="mt-3 flex justify-evenly items-center ">
                    <div className="inline-block rounded bg-gray-200 px-4  text-md font-extrabold ml-1 mr-1 text-black shadow-[0_4px_9px_-4px_#3b71ca] ">
                      54.00 Birr
                    </div>
                  </div>
                </div>
              </div> */}
            </div></>)}
           
            </div>
           
          
          <div className=" flex flex-col rounded-3xl h-full justify-evenly items-center  w-full sm:w-1/2">
            <div className="bg-primary flex flex-col rounded-3xl    w-full sm:w-11/12 ">
            <div className="flex justify-evenly items-center">
                <h3 className="font-extrabold text-4xl text-white m-5 mt-2" >Card Details</h3></div>
              <div className="flex flex-col  ml-10">
                <h2 className="font-bold text-3xl text-white mb-5">Card type</h2>
                <div className="flex flex-row w-1/2  ">
                  <div className="flex-1 p-1  text-center bg-gray-200 mr-3">b</div>
                  <div className="flex-1 p-1  text-center bg-gray-200">k</div>
                  <div className="flex-1 p-1 text-center bg-gray-200 ml-3">9</div>
                </div>
              </div>
             <div className="flex flex-col justify-evenly items-center mt-14">

             <input 
            className="shadow appearance-none text-xl mb-9  bg-purple-600   w-full sm:w-9/12 py-5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
             type="text" 
             placeholder="card holder's name "/>

            <input 
            className="shadow appearance-none mb-9 text-xl  bg-purple-600   w-full sm:w-9/12 py-5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
             type="text" 
             placeholder="card number"/>
              <div className="flex flex-row justify-evenly items-center w-10/12">
                <input
            className="shadow appearance-none text-center bg-purple-600 text-xl mb-9  rounded w-4/12 py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
                  placeholder="number"
                />
                <input
            className="shadow appearance-none text-center bg-purple-600 text-xl mb-14  rounded w-4/12 py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
                  placeholder="cvv"
                />
              </div>
             </div>
           <hr className="border-gray-400" />
           <div className="flex flex-col  text-white justify-around items-center">
            <div className="flex flex-row w-full font-bold text-lg ">
                <div className="flex flex-col w-1/2"> 
                <div className="flex ">sub total</div>
                <div className="flex ">Delivery</div>
                <div className="flex ">Total(incl.taxes)</div>
                </div>
                <div className="flex flex-col  w-1/2"> 
                <div className="flex">{totalAmount.toFixed(2)}</div>             
                <div className="flex">{deliveryFee.toFixed(2)}</div>
                <div className="flex"><div className="flex">{totalWithDelivery.toFixed(2)} birr</div></div>
                </div>
               
                

            </div>
                

           
             
            <div className="bg-slate-100 mt-9 mb-10 text-center rounded-lg text-black font-bold text-xl p-3 w-5/12">
                <button>Check Out</button></div>       
              </div>
           
            </div>
          </div>
            
           
          
         
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Cart;



// import React, { useContext, useEffect, useState } from 'react';
// import { CartContext } from '../contexts/CartContext';
// import Header from './Header';
// import Footer from './Footer';
// import axios from 'axios';

// function Cart() {
//   const [cartItems, setCartItems] = useState();

//   useEffect(() => {
//     const fetchCart = async () => {
//       // Replace with your API endpoint
//       const response = await axios.get('http://localhost:5000/api/cart/owner');
//       setCartItems(response.data.items);
//     };

//     fetchCart();
//   }, []);

//   // const addToCart = (product: ProductDetails) => {
//   //   setCartItems((prevItems) => {
//   //     const existingItem = prevItems.find(item => item.productId === product.productId);
//   //     if (existingItem) {
//   //       // Update quantity if the item already exists
//   //       return prevItems.map(item =>
//   //         item.productId === product.productId
//   //           ? { ...item, quantity: item.quantity + 1 }
//   //           : item
//   //       );
//   //     } else {
//   //       // Add new item to cart
//   //       return [...prevItems, { productId: product.productId, quantity: 1, productDetail: product }];
//   //     }
//   //   });
//   // };

//   // const updateCartItem = (productId: string, quantity: number) => {
//   //   setCartItems((prevItems: { productId: string; }[]) => {
//   //     return prevItems.map((item: { productId: string; }) =>
//   //       item.productId === productId
//   //         ? { ...item, quantity: Math.max(1, quantity) } // Ensure quantity is at least 1
//   //         : item
//   //     );
//   //   });
//   // };

//   // const removeCartItem = (productId: string) => {
//   //   setCartItems((prevItems: any[]) => prevItems.filter((item: { productId: string; }) => item.productId !== productId));
//   // };
//   // const cartContext = useContext(CartContext);

//   // if (!cartContext) {
//   //   return <div>Error: Cart context is not available.</div>;
//   // }

//   // const { cartItems, updateCartItem, removeCartItem } = cartContext;

//   // const totalAmount = cartItems.reduce((total: number, item: { productDetail: { price: number; }; quantity: number; }) => total + item.productDetail.price * item.quantity, 0);

//   return (
//     <>
//       <Header />
//       <div>
//         <h2>Shopping Cart</h2>
//         <h4>You have {cartItems.length} items in your cart</h4>
//         {cartItems.map(item => (
//           <div key={item.productId}>
//             <h3>{item.productDetail.name}</h3>
//             <p>{item.productDetail.description}</p>
//             <div>
//               <button onClick={() => updateCartItem(item.productId, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
//               <span>{item.quantity}</span>
//               <button onClick={() => updateCartItem(item.productId, item.quantity + 1)}>+</button>
//               <button onClick={() => removeCartItem(item.productId)}>Remove</button>
//             </div>
//             <div>Price: {item.productDetail.price} Birr</div>
//           </div>
//         ))}
//         <div>Total Amount: {totalAmount.toFixed(2)} Birr</div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default Cart;








// import React, { useEffect, useState } from 'react';

// interface ProductDetails {
//     productId: string;
//     name: string;
//     price: number;
//     description: string;
//     category: string;
//     owner: string;
//     __v: number;
// }
  
// interface CartItem {
//     productId: string;
//     quantity: number;
//     productDetail: ProductDetails | undefined; // Allow for undefined
// }

// const Cart = () => {
//     const [cartItems, setCartItems] = useState<CartItem[]>([]);
//     const owner = '673fbfd2871a567d5d885ae2'; // Hardcoded owner ID

//     useEffect(() => {
//         const fetchCartItems = async () => {
//             try {
//                 const response = await fetch(`http://localhost:5000/cart/${owner}`, {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                 });
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch cart items');
//                 }
//                 const data = await response.json();
//                 console.log("Fetched data:", data); // Log the fetched data

//                 setCartItems(data.items); // Use data.items to set state

//             } catch (error) {
//                 console.error('Error fetching cart items:', error);
//             }
//         };

//         fetchCartItems();
//     }, []); // Empty dependency array to run only once on mount

//     return (
//         <div>
//             <h1>Your Cart length {cartItems.length}</h1>
//             {/* <ul>
//                 {cartItems.length > 0 ? (
//                     cartItems.map((item) => {
//                         console.log("Rendering item:", item); // Log each item
//                         return (
//                             <li key={item.productId}>
//                                 <div>
//                                     <strong>Product ID:</strong> {item.productId}
//                                 </div>
//                                 <div>
//                                     <strong>Name:</strong> {item.productDetail?.name || "Unnamed Product"}
//                                 </div>
//                                 <div>
//                                     <strong>Price:</strong> {item.productDetail?.price !== undefined ? `$${item.productDetail.price.toFixed(2)}` : "N/A"}
//                                 </div>
//                                 <div>
//                                     <strong>Quantity:</strong> {item.quantity}
//                                 </div>
//                             </li>
//                         );
//                     })
//                 ) : (
//                     <li>No items in cart.</li>
//                 )}
//             </ul> */}
//         </div>
//     );
// };

// export default Cart;