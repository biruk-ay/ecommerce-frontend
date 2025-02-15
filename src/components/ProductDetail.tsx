// import React, { useEffect, useState } from 'react'
// import Header from './Header'
// import Footer from './Footer'
// import topImage from "../assets/cars.png";
// import { useParams } from 'react-router-dom';
// import { useAppSelector } from '../apps/store/store';
// import { selectUserId, selectUserName } from '../apps/auth/application/slice/AuthSlice';
// function ProductDetail() {
//     const productId = useParams<{ productId?: string }>().productId || '';
//     const [products, setProducts] = useState<Product[]>([]);    
//     // const ownerId = "673fb5c0388c0c24f9c6fde6";
//       // const username = useAppSelector(selectUserName);
    
//     const id = useAppSelector(selectUserId) ;   
//   // const productId='67728405536919a461705059';
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
//   useEffect(() => {
//     // Fetch product details based on productId
//     const fetchProduct = async () => {
//         const response = await fetch(`http://localhost:5000/product/see/${productId}`);
//         const data = await response.json();
//         setProducts(data);
//         console.log("pro:",data);
//     };

//     fetchProduct();
// }, [productId]);
// interface ProductDetails {
//     productId: string;
//     name: string;
//     price: number;
//     description: string;
//   }
//   interface Product {
//     _id: string;
//     name: string;
//     price: number;
//     description?: string; // Optional
//     img?: string; // Optional
//     // Add any other properties as needed
// }
//   interface CartItem {
//     productId: string;
//     quantity: number;
//     productDetail: ProductDetails;
//   }
//   return (
//     <>
//     <Header/>
    
//     <>

//     <div className="flex flex-col justify-evenly items-center p-8 h-screen">
//     <div className="flex flex-col justify-evenly items-center gap-10">

//     <div className="flex sm:flex-row flex-col justify-evenly items-center  mx-36 h-1/2">
//     <div className="flex   w-1/3 p-3   sm:h-full h-1/2 justify-evenly  items-center mb-36">
//     <div className="bg-purple-200  p-2  flex flex-col gap-3  text-start rounded-lg  ">
// <h1 className='text-3xl font-roboto  font-bold text-purple-950'>{products.name}</h1>
// <h3>About</h3>

// <h3>{id}</h3>
// <hr className='border-gray-400' />
// <h3>{products.description}</h3>    </div>
    
//     </div>
//     <div className="flex bg-green-300 rounded-full w-96 h-96  justify-evenly ml-6 items-center ">
// <img src={topImage} alt="ff" className=' rounded-full w-96 h-96  ' />
    
//     </div>
//     <div className="flex  text-white w-1/3 justify-evenly h-full mb-24 items-center flex-col">
//     <div className="flex gap-3 w-2/4 flex-col mb-24 mr-52">

//     <div className="bg-purple-200 jusify-evenly items-start rounded-md gap-3   p-2  flex flex-col">
        
//         <div className="flex flex-row gap-4">
//             <h3 className='font-bold text-black text-xl'>Price</h3>
//             <h3 className='font-bold text-black text-xl '>{products.price}</h3>
//         </div>
//         <div className="flex flex-row gap-3  mb-4">
//             <h3 className='font-bold text-black text-xl'>Color</h3>
//             <div className="rounded-full bg-red-400 w-5 h-5"></div>
//             <div className="rounded-full bg-green-400 w-5 h-5 "></div>
//         </div>
//     </div>
//     <div className="">
        
//         <button className='bg-purple-950 rounded-md w-full p-2'>Buy Now</button>
//     </div>
//     <div className="">
//     <button onClick={() => {
//                         addToCart(id, productId);
//                       }} className='bg-purple-950 rounded-md w-full p-2'>Add to carrt</button>
//     </div>
//     </div>
   
    
//     </div>
// </div>
// <div className="flex flex-row justify-around items-center gap-3">
// <div className="flex bg-green-300 rounded-full   justify-evenly  items-center ">
// <img src={topImage} alt="ff" className=' rounded-full w-24 h-24  ' />
    
//     </div>
//     <div className="flex bg-green-300 rounded-full   justify-evenly  items-center ">
// <img src={topImage} alt="ff" className=' rounded-full w-24 h-24  ' />
    
//     </div>
//     <div className="flex bg-green-300 rounded-full   justify-evenly  items-center ">
// <img src={topImage} alt="ff" className=' rounded-full w-24 h-24  ' />
    
//     </div>
//     <div className="flex bg-green-300 rounded-full   justify-evenly  items-center ">
// <img src={topImage} alt="ff" className=' rounded-full w-24 h-24  ' />
    
//     </div>
// </div>
//     </div>

// <div className="bg-white h-1/2 flex flex-col justify-evenly items-start px-36">
// <h3 className='font-bold text-2xl'>Description</h3>
// <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi laborum doloribus ab nesciunt! Expedita, nihil amet odit dolore doloremque fugiat? Voluptatem deserunt debitis, voluptate animi tempore quam reprehenderit velit eveniet dolore. Sint fugiat dicta voluptas tenetur iusto nisi nesciunt quibusdam facilis. A sint rerum odit voluptatem velit, totam in corporis!
// </h4>
// <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi laborum doloribus ab nesciunt! Expedita, nihil amet odit dolore doloremque fugiat? Voluptatem deserunt debitis, voluptate animi tempore quam reprehenderit velit eveniet dolore. Sint fugiat dicta voluptas tenetur iusto nisi nesciunt quibusdam facilis. A sint rerum odit voluptatem velit, totam in corporis!
// </h4>
// <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi laborum doloribus ab nesciunt! Expedita, nihil amet odit dolore doloremque fugiat? Voluptatem deserunt debitis, voluptate animi tempore quam reprehenderit velit eveniet dolore. Sint fugiat dicta voluptas tenetur iusto nisi nesciunt quibusdam facilis. A sint rerum odit voluptatem velit, totam in corporis!
// </h4>
// <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi laborum doloribus ab nesciunt! Expedita, nihil amet odit dolore doloremque fugiat? Voluptatem deserunt debitis, voluptate animi tempore quam reprehenderit velit eveniet dolore. Sint fugiat dicta voluptas tenetur iusto nisi nesciunt quibusdam facilis. A sint rerum odit voluptatem velit, totam in corporis!
// </h4>
// </div>
// </div>
//     </>
    
    



//     <Footer/>
//     </>
//   )
// }

// export default ProductDetail

// // import React, { useEffect, useState } from 'react';
// // import { data, useParams } from 'react-router-dom';

// // interface ProductDetails {
// //     productId: string;
// //     name: string;
// //     price: number;
// //     description: string;
// // }

// // function ProductDetail() {
// //     const productId = useParams<{ productId?: string }>().productId || '';
// //     const [product, setProduct] = useState<ProductDetails | null>(null); // Specify the type

// //     const ownerId = "673fbfd2871a567d5d885ae2";
// // useEffect(() => {
// //     const fetchProduct = async () => {
// //         try {
// //             const response = await fetch(`http://localhost:5000/product/see/${productId}`);
// //             console.log("id:", productId);
// //             if (!response.ok) {
// //                 throw new Error("Failed to fetch product");
// //             }
// //             const data: ProductDetails = await response.json();
// //             setProduct(data);
// //             console.log("Product:", data);
// //         } catch (error) {
// //             console.error("Error fetching product:", error);
// //         }
// //     };

// //     fetchProduct();
// // }, [productId]);



// //     const addToCart = async (owner: string, productId: string) => {
// //         try {
// //             const response = await fetch("http://localhost:5000/cart/add", {
// //                 method: "POST",
// //                 headers: {
// //                     "Content-Type": "application/json",
// //                 },
// //                 body: JSON.stringify({ owner, productId }),
// //             });

// //             if (!response.ok) {
// //                 const errorData = await response.json();
// //                 console.error("Error response:", errorData);
// //                 throw new Error("Failed to add to cart");
// //             }

// //             alert("Added to cart!");
// //         } catch (error) {
// //             console.error("Error adding to cart:", error);
            
// //             alert("Error adding to cart. Please try again.");
// //         }
// //     };

// //     if (!product) return <div>Loading...</div>; // Check for null product

// //     return (
// //         <>
// //           <div>
// //             <h1>{product.name}</h1>
// //             <h2>${product.price.toFixed(2)}</h2>
// //             <p>{productId}</p>
// //             <button
// //     onClick={() => {
// //         console.log("Product ID before calling addToCart:", productId); // Log the product ID
// //         addToCart(ownerId, productId);
// //     }}
// //     className="w-full mt-4 bg-purple-600 text-white font-semibold py-2 rounded-lg hover:bg-purple-700 transition duration-300"
// // >
// //     Add to Cart
// // </button>
// //         </div>
// //         </>
      
// //     );
// // }

// // export default ProductDetail;

import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import topImage from "../assets/cars.png";
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../apps/store/store';
import { selectUserId, selectUserName } from '../apps/auth/application/slice/AuthSlice';

function ProductDetail() {
 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const productId = useParams<{ productId?: string }>().productId || '';
    const [products, setProducts] = useState<ProductDetails[]>([]);
    const username = useAppSelector(selectUserName);
    const ownerId = useAppSelector(selectUserId) || '';

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

    // useEffect(() => {
    //     const fetchProduct = async () => {
    //         const response = await fetch("http://localhost:5000/product/see/67aee4f59ba2b188b9140a0d");
    //         const data = await response.json();
    //         setProducts(data);
    //         console.log("pro:", data);
    //     };

    //     fetchProduct();
    // }, [productId]);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true); // Start loading
            setError(null);   // Reset any previous error
            try {
                const response = await fetch("http://localhost:5000/product/see/67aee4f59ba2b188b9140a0d");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                
                // Parse the image URL
                const parsedImageUrl = JSON.parse(data.img.replace(/'/g, '"'))[0]; // Adjust based on your actual data structure
                setProducts({ ...data, img: parsedImageUrl }); // Include parsed image URL in state
                console.log("Product data:", data);
            } catch (err) {
                setError(err.message); // Capture error message
                console.error("Fetch error:", err);
            } finally {
                setLoading(false); // End loading
            }
        };

        if (productId) {
            fetchProduct();
        }
    }, [productId]); // Fetch when productId changes

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    interface ProductDetails {
        productId: string;
        name: string;
        price: number;
        description: string;
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

    return (
        <>
            <Header />
           
            <>
            
            <div className="flex flex-col justify-evenly items-center p-8 h-auto">
                <div className="flex flex-col justify-evenly items-center gap-10">
                    <div className="flex flex-col sm:flex-row justify-evenly items-center mx-4 sm:mx-36 h-auto sm:h-1/2">
                        <div className="flex w-full sm:w-1/3 p-3 sm:h-full h-1/2 justify-center items-center mb-6 sm:mb-0">
                            <div className="bg-purple-200 p-2 flex flex-col gap-3 text-start rounded-lg">
                                <h1 className='text-3xl font-roboto font-bold text-purple-950'>{products.name}</h1>
                                <h3>About</h3>
                                <h3>{products.img}</h3>
                                <hr className='border-gray-400' />
                                <h3>{products.description}</h3>
                            </div>
                        </div>

                        <div className="flex bg-green-300 rounded-full w-96 h-72 justify-center items-center mx-4">
                            <img src={products.img} alt="Product" className='rounded-full w-96 h-72' />
                        </div>

                        <div className="flex flex-col text-white w-full sm:w-1/3 justify-center items-center mb-6 sm:mb-0">
                            <div className="flex gap-3 w-full flex-col mb-6">
                                <div className="bg-purple-200 justify-evenly items-start rounded-md gap-3 p-2 flex flex-col">
                                    <div className="flex flex-row gap-4">
                                        <h3 className='font-bold text-black text-xl'>Price</h3>
                                        <h3 className='font-bold text-black text-xl'>{products.price}</h3>
                                    </div>
                                    <div className="flex flex-row gap-3 mb-4">
                                        <h3 className='font-bold text-black text-xl'>Color</h3>
                                        <div className="rounded-full bg-red-400 w-5 h-5"></div>
                                        <div className="rounded-full bg-green-400 w-5 h-5"></div>
                                    </div>
                                </div>
                                <button className='bg-purple-950 rounded-md w-full p-2'>Buy Now</button>
                                <button onClick={() => addToCart(ownerId, productId)} className='bg-purple-950 rounded-md w-full p-2'>Add to Cart</button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row justify-around items-center gap-3">
                        {[...Array(4)].map((_, index) => (
                            <div key={index} className="flex bg-green-300 rounded-full justify-center items-center">
                                <img src={topImage} alt={`Thumbnail ${index}`} className='rounded-full w-24 h-24' />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white w-full flex flex-col justify-evenly items-start p-4">
                    <h3 className='font-bold text-2xl'>Description</h3>
                    <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi laborum doloribus ab nesciunt! Expedita, nihil amet odit dolore doloremque fugiat? Voluptatem deserunt debitis, voluptate animi tempore quam reprehenderit velit eveniet dolore.</h4>
                    <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi laborum doloribus ab nesciunt! Expedita, nihil amet odit dolore doloremque fugiat? Voluptatem deserunt debitis, voluptate animi tempore quam reprehenderit velit eveniet dolore.</h4>
                    <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi laborum doloribus ab nesciunt! Expedita, nihil amet odit dolore doloremque fugiat? Voluptatem deserunt debitis, voluptate animi tempore quam reprehenderit velit eveniet dolore.</h4>
                    <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi laborum doloribus ab nesciunt! Expedita, nihil amet odit dolore doloremque fugiat? Voluptatem deserunt debitis, voluptate animi tempore quam reprehenderit velit eveniet dolore.</h4>
                </div>
            </div>
            </>
            
            
            <Footer />
        </>
    );
}

export default ProductDetail;