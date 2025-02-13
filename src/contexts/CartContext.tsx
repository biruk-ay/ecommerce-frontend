// // import React, { createContext, useState, useEffect, ReactNode } from 'react';
// // import axios from 'axios';

// // interface CartItem {
// //   productId: string;
// //   quantity: number;
// //   productDetail: ProductDetails;
// // }

// // interface ProductDetails {
// //   name: string;
// //   price: number;
// //   category: string;
// //   description: string;
// // }

// // interface CartContextType {
// //   cartItems: CartItem[];
// //   addToCart: (productId: string) => Promise<void>;
// //   updateCartItem: (productId: string, quantity: number) => Promise<void>;
// //   removeCartItem: (productId: string) => Promise<void>;
// // }

// // export const CartContext = createContext<CartContextType | undefined>(undefined);

// // export const CartProvider: React.FC<{ owner: string; children: ReactNode }> = ({ owner, children }) => {
// //   const [cartItems, setCartItems] = useState<CartItem[]>([]);

// //   // useEffect(() => {
// //   //   const fetchCart = async () => {
// //   //     try {
// //   //       const response = await axios.get(`http://localhost:5000/api/cart/${owner}`);
// //   //       setCartItems(response.data.items || []);
// //   //     } catch (error) {
// //   //       console.error("Failed to fetch cart items:", error);
// //   //     }
// //   //   };
// //   //   fetchCart();
// //   // }, [owner]);

// //   const addToCart = async (productId: string) => {
// //     try {
// //       const response = await axios.post('http://localhost:5000/api/cart/add', { owner, productId });
// //       setCartItems(response.data.items);
// //     } catch (error) {
// //       console.error("Failed to add item to cart:", error);
// //     }
// //   };

// //   const updateCartItem = async (productId: string, quantity: number) => {
// //     try {
// //       await axios.put('http://localhost:5000/api/cart/update', { owner, productId, quantity });
// //       const updatedItems = cartItems.map(item =>
// //         item.productId === productId ? { ...item, quantity } : item
// //       );
// //       setCartItems(updatedItems);
// //     } catch (error) {
// //       console.error("Failed to update cart item:", error);
// //     }
// //   };

// //   const removeCartItem = async (productId: string) => {
// //     try {
// //       await axios.delete('http://localhost:5000/api/cart/remove', {
// //         data: { owner, productId },
// //       });
// //       setCartItems(cartItems.filter(item => item.productId !== productId));
// //     } catch (error) {
// //       console.error("Failed to remove cart item:", error);
// //     }
// //   };

// //   return (
// //     <CartContext.Provider value={{ cartItems, addToCart, updateCartItem, removeCartItem }}>
// //       {children}
// //     </CartContext.Provider>
// //   );
// // };

// // CartContext.tsx
// // CartContext.tsx
// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';

// interface ProductDetails {
//   productId: string;
//   name: string;
//   price: number;
//   description: string;
// }

// interface CartItem {
//   productId: string;
//   quantity: number;
//   productDetail: ProductDetails;
// }

// interface CartContextType {
//   cartItems: CartItem[];
//   addToCart: (product: ProductDetails) => void;
//   updateCartItem: (productId: string, quantity: number) => void;
//   removeCartItem: (productId: string) => void;
// }

// export const CartContext = createContext<CartContextType | undefined>(undefined);

// export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);

//   useEffect(() => {
//     const fetchCart = async () => {
//       // Replace with your API endpoint
//       const response = await axios.get('https://dummyjson.com/carts/1');
//       setCartItems(response.data.items);
//       console.log(response.data.items);
//     };

//     fetchCart();
//   }, []);

//   const addToCart = (product: ProductDetails) => {
//     setCartItems((prevItems) => {
//       const existingItem = prevItems.find(item => item.productId === product.productId);
//       if (existingItem) {
//         // Update quantity if the item already exists
//         return prevItems.map(item =>
//           item.productId === product.productId
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         // Add new item to cart
//         return [...prevItems, { productId: product.productId, quantity: 1, productDetail: product }];
//       }
//     });
//   };

//   const updateCartItem = (productId: string, quantity: number) => {
//     setCartItems((prevItems) => {
//       return prevItems.map(item =>
//         item.productId === productId
//           ? { ...item, quantity: Math.max(1, quantity) } // Ensure quantity is at least 1
//           : item
//       );
//     });
//   };

//   const removeCartItem = (productId: string) => {
//     setCartItems(prevItems => prevItems.filter(item => item.productId !== productId));
//   };

//   return (
//     <CartContext.Provider value={{ cartItems, addToCart, updateCartItem, removeCartItem }}>
//       {children}
//     </CartContext.Provider>
//   );
// };