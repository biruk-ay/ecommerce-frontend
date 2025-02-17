import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { BASE_URL } from "../configs/config";

const SearchResults: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [price, setPrice] = useState(10000);
  const [showPanel, setShowPanel] = useState(false);
  const query = new URLSearchParams(useLocation().search);
  const searchTerm = query.get("term") || "";
  const navigate = useNavigate();
  const handleProductClick = (productId: string) => {
    navigate(`/productDetails/${productId}`);
  };
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${BASE_URL}product/allProducts`
        ); 
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        // setError(
        //   err instanceof Error ? err.message : "An unknown error occurred"
        // );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const filteredPrceSearch = filtered.filter(
        (product: { price: number }) => product.price <= price
      );
      setFilteredData(filteredPrceSearch);
    } else {
      setFilteredData([]);
    }
  }, [searchTerm, data]);
  const togglePanel = () => {
    setShowPanel(!showPanel);
  };
  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(event.target.value));
  };
  return (
    <>
      <Header />
      <div>
        <h1 className="font-bold text-3xl text-purple-950 text-center mt-4">
          Search Results for "{searchTerm}"
        </h1>
        {loading && <p>Loading...</p>}

        <div className="flex flex-col md:flex-row mt-10 justify-between gap-5">
          <div className="md:hidden sticky top-0 w-full  ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
              onClick={togglePanel}
            >
              <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <div
            className={`sticky top-16 z-10 bg-white border rounded-xl p-5 w-full md:w-80 ${
              showPanel ? "" : "hidden md:block"
            }`}
          >
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

          <div
            className="md:w-2/3 lg:w-3/4 py-1  w-11/12 mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-end gap-y-20 gap-x-0 bg-slate-100 mb-5"
            style={{ marginTop: "20px" }}
          >
            {filteredData.length > 0
              ? filteredData.map((item) => (
                  <div className="w-72 bg-white shadow-lg rounded-xl overflow-hidden ">
                    <img
                      className="w-full h-auto object-cover"
                      src={item.img}
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

                      <button
                        onClick={() => handleProductClick(item.productId)}
                        className="w-full mt-4 bg-purple-600 text-white font-semibold py-2 rounded-lg hover:bg-purple-700 transition duration-300"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                ))
              : searchTerm && <div>No results found</div>}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SearchResults;
