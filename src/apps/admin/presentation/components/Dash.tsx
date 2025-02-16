import React, { useState } from "react";
import { useEffect } from "react";
import { selectUserEmail } from "../../../auth/application/slice/AuthSlice";
import { selectUserToken } from "../../../auth/application/slice/AuthSlice";
import { useAppSelector } from "../../../store/store";
import AdminProvider from "../../di/AdminProvider";
const Dash = () => {
    const [info, setInfo] = useState(null);
    const email = useAppSelector(selectUserEmail);
    const token = useAppSelector(selectUserToken);

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const response = await AdminProvider.provideAdmin().dashboard(email, token);
                setInfo(response);
            } catch (err) {
                console.log(err);
            };
        };

        fetchInfo();
    }, []);

    if(info===null) return <div>Loading...</div>
    console.log(info.user_num);
    return (
        <>
            <div className="flex flex-col w-full justify-items-center">

            <h1 className="flex text-2xl font-semibold underline justify-center mb-4">Dashboard</h1>
            <div className="flex flex-row h-1/3 mt-10  justify-evenly">
                <div className="bg-primary w-3/12 flex items-end bg-opacity-10 rounded-xl shadow-md font-roboto"><div className="text-4xl font-semibold ml-3 mr-1">{info.user_num}</div> Users</div>
                <div className="bg-primary w-3/12 flex items-end bg-opacity-10 rounded-xl shadow-md font-roboto"><div className="text-4xl font-semibold ml-3 mr-1">{info.product_num}</div> Products</div>
                <div className="bg-primary w-3/12 flex items-end bg-opacity-10 rounded-xl shadow-md font-roboto"><div className="text-4xl font-semibold ml-3 mr-1">{info.sales_num}</div> Sales</div>

            </div>
            
            </div>
        </>
    );
};


export default Dash;