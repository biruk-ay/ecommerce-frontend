import React from "react";
import { useState, useEffect } from "react";
import { selectUserEmail } from "../../../auth/application/slice/AuthSlice";
import { selectUserToken } from "../../../auth/application/slice/AuthSlice";
import { useAppSelector } from "../../../store/store";
import AdminProvider from "../../di/AdminProvider";
const Products = () => {
    const [products, setProducts] = useState([]);
    const email = useAppSelector(selectUserEmail);
    const token = useAppSelector(selectUserToken);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await AdminProvider.provideAdmin().products(email, token);
                setProducts(response.products);
            } catch (err) {
                console.log(err);
            };
        };

        fetchProducts();
    }, []);

    return (
        <>
            <div className="flex flex-col w-full justify-items-center">

            <h1 className="flex text-2xl font-semibold underline justify-center mb-4">Products</h1>
            <table className="w-full justify-center table-auto font-roboto">
                <thead className="bg-gray-200">
                    <tr className="rounded-xl">
                        <th className="py-2 px-4 border-b text-left text-black">Name</th>
                        <th className="py-2 px-4 border-b text-left text-black">Price</th>
                        <th className="py-2 px-4 border-b text-left text-black">Description</th>
                        <th className="py-2 px-4 border-b text-left text-black">Category</th>
                    </tr>
                </thead>
                <tbody className="">
                    {products.map((product) => (
                        <tr className="" key={product.id}>
                            <td className="py-2 px-4 border-b">{product.name}</td>
                            <td className="py-2 px-4 border-b">{product.price}</td>
                            <td className="py-2 px-4 border-b">{product.description}</td>
                            <td className="py-2 px-4 border-b">{product.category}</td>
                        </tr>
                    ))  
                }
                </tbody>
            </table>
            </div>
        </>
    );
};

export default Products;
