// import React, { useEffect, useState } from 'react';

// interface CartItem {
//     productId: string; // or mongoose.Schema.Types.ObjectId
//     quantity: number;
//     name: string;
//     price: number;
//     description: string;
//     category: string;
//     img?: string; // Optional field
// }

// const Try = () => {
//     const [cartItems, setCartItems] = useState<CartItem[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchCart = async () => {
//             try {
//                 const response = await fetch('http://localhost:5000/cart/673fbfd2871a567d5d885ae2');
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch cart');
//                 }
//                 const data = await response.json();
//                 console.log(data);
//                 setCartItems(data);
//             } catch (error) {
//                 setError(error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchCart();
//     }, []);

//     if (loading) {
//         return <p>Loading...</p>;
//     }

//     if (error) {
//         return <p>Error: {error}</p>;
//     }

//     return (
//         <div>
//             <h2>Your Cart</h2>
//                 <ul>
//                     {cartItems.map(item => (
//                         <li key={item.productId}>
                           
//                             <h3>{item.name}</h3>
//                             <p>Price: ${item.price}</p>
//                             <p>Quantity: {item.quantity}</p>
//                             <img src={item.img} alt={item.name} />
//                         </li>
//                     ))}
//                 </ul>
//         </div>
//     );
// };


// export default Try