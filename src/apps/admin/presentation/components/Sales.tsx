// @ts-nocheck
import React from "react";
import { useState, useEffect } from "react";
import { selectUserEmail } from "../../../auth/application/slice/AuthSlice";
import { selectUserToken } from "../../../auth/application/slice/AuthSlice";
import { useAppSelector } from "../../../store/store";
import AdminProvider from "../../di/AdminProvider";
const Sales = () => {
    const [sales, setSales] = useState([]);
    const email = useAppSelector(selectUserEmail);
    const token = useAppSelector(selectUserToken);

    useEffect(() => {
        const fetchSales = async () => {
            try {
                const response = await AdminProvider.provideAdmin().sales(email, token);
                setSales(response.sales);
            } catch (err) {
                console.log(err);
            };
        };

        fetchSales();
    }, []);

    return (
        <>
            <div className="flex flex-col w-full justify-items-center">

            <h1 className="flex text-2xl font-semibold underline justify-center mb-4">Sales</h1>
            <table className="w-full justify-center table-auto font-roboto">
                <thead className="bg-gray-200">
                    <tr className="">
                        <th className="py-2 px-4 border-b text-left text-black">Transaction</th>
                        <th className="py-2 px-4 border-b text-left text-black">Email</th>
                        <th className="py-2 px-4 border-b text-left text-black">Name</th>
                        <th className="py-2 px-4 border-b text-left text-black">Amount</th>
                        <th className="py-2 px-4 border-b text-left text-black">Cart</th>
                        <th className="py-2 px-4 border-b text-left text-black">Satuts</th>
                    </tr>
                </thead>
                <tbody className="">
                    {sales.map((sale) => (
                        <tr className="" key={sale.id}>
                            <td className="py-2 px-4 border-b">{sale.transaction_id}</td>
                            <td className="py-2 px-4 border-b">{sale.email}</td>
                            <td className="py-2 px-4 border-b">{sale.name}</td>
                            <td className="py-2 px-4 border-b">{sale.amount}</td>
                            <td className="py-2 px-4 border-b">{sale.cart}</td>
                            <td className="py-2 px-4 border-b">{sale.status}</td>
                        </tr>
                    ))  
                }
                </tbody>
            </table>
            </div>
        </>
    );
};

export default Sales;
