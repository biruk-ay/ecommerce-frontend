import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { Link } from "react-router-dom";
import { Bars3Icon } from "@heroicons/react/16/solid";

// Define the Product interface
interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
}

// Define a type for your location state

function ProductList() {
  const [clicked, setClicked] = useState(false);
  const [opened, setOpened] = useState(false);
  const [update, setUpdate] = useState(false);

  const [activeLink, setActiveLink] = useState("");

  const OnclickHandler = () => {
    setClicked(!clicked);
  };
  const Upload = () => {
    setUpdate(true);
  };
  const sideBarDisplay = () => {
    setOpened(!opened);
  };
  const handleLinkClick = (path: React.SetStateAction<string>) => {
    setActiveLink(path);
  };
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page
  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>(
        "https://fakestoreapi.com/products"
      ); // Fake API
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching the products:", error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const deleteData = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      const response = await fetch(`https://fakestoreapi.com/products${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Record deleted successfully");
        fetchProducts();
      } else {
        alert("Error deleting record");
      }
    }
  };

  // Calculate the current items
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Total pages
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <>
      <Header />
      <div className="w-full h-full flex flex-col">
        <div className="w-full h-11/12 flex  ">
          <div className="relative w-[216px] bg-white h-screen">
            {" "}
            <div className="flex flex-col">
              <Bars3Icon
                onClick={sideBarDisplay}
                className="w-[30px] h-[30px] ml-9 mt-10 cursor-pointer z-10"
              />

              {opened && (
                <div className="absolute top-0  left-0 w-full h-full bg-slate-100 z-9">
                  <ul className="h-full mt-40  ">
                    <li className="p-6 pl-16">
                      <Link
                        to="/addProduct"
                        className={`hover:underline ${
                          activeLink === "/Add" ? "underline" : ""
                        }`}
                        onClick={() => handleLinkClick("/Add")}
                      >
                        Add Product
                      </Link>
                    </li>
                    <li className="p-6 pl-16">
                      <Link
                        to="/prductList"
                        className={`hover:underline ${
                          activeLink === "/List" ? "underline" : ""
                        }`}
                        onClick={() => handleLinkClick("/List")}
                      >
                        List Product
                      </Link>
                    </li>
                    
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className=" m-16 container mx-auto p-4 rounded-3xl">
            <h2 className="text-2xl font-bold mb-4">List of Products</h2>
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2 px-4 border-b text-left text-gray-600"></th>{" "}
                  
                  <th className="py-2 px-4 border-b text-left text-gray-600">
                    Name
                  </th>
                  <th className="py-2 px-4 border-b text-left text-gray-600">
                    Detail
                  </th>
                  <th className="py-2 px-4 border-b text-left text-gray-600">
                    Category
                  </th>
                  <th className="py-2 px-4 border-b text-left text-gray-600">
                    Price
                  </th>
                  <th className="py-2 px-4 border-b text-left text-gray-600">
                    Operation
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.map((product, index) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-100 rounded-3xl"
                  >
                    <td className="py-2 px-4 border-b ">
                      {index + indexOfFirstProduct + 1}
                    </td>{" "}
                    {/* Product Number */}
                    <td className="py-2 px-4 border-b">{product.title}</td>
                    <td className="py-2 px-4 border-b">{product.id}</td>
                    <td className="py-2 px-4 border-b">{product.category}</td>
                    <td className="py-2 px-4 border-b">${product.price}</td>
                    <td className="py-2 px-4 border-b">
                      <Link to={`/update/${product.id}`}>
                        <button className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600">
                          Edit
                        </button>
                      </Link>
                      <button
                        className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 ml-2 "
                        onClick={() => deleteData(product.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="mt-4">
              <ul className="flex justify-center">
                {Array.from({ length: totalPages }, (_, index) => (
                  <li key={index + 1} className="mx-1">
                    <button
                      onClick={() => paginate(index + 1)}
                      className={`px-4 py-2 border rounded ${
                        currentPage === index + 1
                          ? "bg-blue-500 text-white"
                          : "bg-white text-blue-500"
                      }`}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductList;
