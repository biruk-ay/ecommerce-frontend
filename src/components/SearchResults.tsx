import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import topImage from "../assets/cars.png";

const SearchResults: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const query = new URLSearchParams(useLocation().search);
    const searchTerm = query.get('term') || '';
    const navigate = useNavigate();
    const handleProductClick = (productId: string) => {
        navigate(`/productDetails/${productId}`); // Navigate to the product details page
    };
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:5000/product/allProducts'); // Fetch all products
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        // Filter products based on the search term
        if (searchTerm) {
            const filtered = data.filter(item =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredData(filtered);
        } else {
            setFilteredData([]); // Clear filtered data if the search term is empty
        }
    }, [searchTerm, data]); // Depend on searchTerm and data

    return (

        <>
        <Header/>
        <div>
            <h1 className='font-bold text-3xl text-purple-950 text-center mt-4'>Search Results for "{searchTerm}"</h1>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div className='md:w-2/3 lg:w-3/4 py-1  w-11/12 mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-end gap-y-20 gap-x-0 bg-slate-100 mb-5' style={{ marginTop: '20px' }}>
                {filteredData.length > 0 ? (
                    filteredData.map((item) => (
                        <div className="w-72 bg-white shadow-lg rounded-xl overflow-hidden duration-500 hover:scale-105 hover:shadow-xl transition-transform">
                        <img
                          className="w-full h-auto object-cover"
                          src={topImage}
                          alt={item.name}
                        />
                        <div className="px-6 py-4">
                          <h1 className="font-semibold text-lg text-gray-800 hover:text-indigo-600 transition duration-300">
                            {item.name}
                          </h1>
                          <p className="text-gray-600 text-sm mt-1">
                            {item.description}
                          </p>
                          <h2 className="text-gray-800 text-lg mt-2 font-bold">
                            ${item.price.toFixed(2)}
                          </h2>
                          <button onClick={() =>{
                            handleProductClick(item.productId)} }>details</button>
                          {/* <button
                            onClick={() => {
                              console.log("Product ID:", product.productId);
                              console.log("Product ID:", product.name); // Log the product ID
                              addToCart(owner, product.productId);
                            }}
                            className="w-full mt-4 bg-purple-600 text-white font-semibold py-2 rounded-lg hover:bg-purple-700 transition duration-300"
                          >
                            Add to Cart
                          </button> */}
                        </div>
                      </div> // Use _id as the key
                    ))
                ) : (
                    searchTerm && <div>No results found</div> // Only show if searchTerm is not empty
                )}
            </div>
        </div>
        </>
       
    );
};

export default SearchResults;