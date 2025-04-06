import React, { useState } from "react";
import { useEffect } from "react";
import { selectUserEmail } from "../../../auth/application/slice/AuthSlice";
import { selectUserToken } from "../../../auth/application/slice/AuthSlice";
import { useAppSelector } from "../../../store/store";
import AdminProvider from "../../di/AdminProvider";
import Loading from "../../../../components/Loading";
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

    if(info===null) return <Loading />
    console.log(info.user_num);
    return (
        <>
            <div className="flex flex-col w-full justify-items-center">

            <h1 className="flex justify-center mb-4 text-2xl font-semibold underline">Dashboard</h1>
            <div className="flex flex-row mt-10 h-1/3 justify-evenly">
                <div className="flex items-end w-3/12 shadow-md bg-primary bg-opacity-10 rounded-xl font-roboto"><div className="ml-3 mr-1 text-4xl font-semibold">{info.user_num}</div> Users</div>
                <div className="flex items-end w-3/12 shadow-md bg-primary bg-opacity-10 rounded-xl font-roboto"><div className="ml-3 mr-1 text-4xl font-semibold">{info.product_num}</div> Products</div>
                <div className="flex items-end w-3/12 shadow-md bg-primary bg-opacity-10 rounded-xl font-roboto"><div className="ml-3 mr-1 text-4xl font-semibold">{info.sales_num}</div> Sales</div>

            </div>
            
            </div>
        </>
    );
};


export default Dash;