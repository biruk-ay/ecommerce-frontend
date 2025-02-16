// @ts-nocheck
import { useState, useEffect } from "react";
import { selectUserEmail } from "../../../auth/application/slice/AuthSlice";
import { selectUserToken } from "../../../auth/application/slice/AuthSlice";
import { useAppSelector } from "../../../store/store";
import AdminProvider from "../../di/AdminProvider";
const Users = () => {
    const [users, setUsers] = useState([]);
    const email = useAppSelector(selectUserEmail);
    const token = useAppSelector(selectUserToken);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await AdminProvider.provideAdmin().users(email, token);
                setUsers(response.users);
            } catch (err) {
                console.log(err);
            };
        };

        fetchUsers();
    }, []);

    return (
        <>
            <div className="flex flex-col w-full justify-items-center">

            <h1 className="flex text-2xl font-semibold underline justify-center mb-4">Users</h1>
            <table className="w-full justify-center table-auto font-roboto">
                <thead className="bg-gray-200">
                    <tr className="rounded-xl">
                        <th className="py-2 px-4 border-b text-left text-black">Name</th>
                        <th className="py-2 px-4 border-b text-left text-black">Email</th>
                        <th className="py-2 px-4 border-b text-left text-black">Role</th>
                    </tr>
                </thead>
                <tbody className="">
                    {users.map((user) => (
                        <tr className="" key={user.id}>
                            <td className="py-2 px-4 border-b">{user.name}</td>
                            <td className="py-2 px-4 border-b">{user.email}</td>
                            <td className="py-2 px-4 border-b">{user.role}</td>
                        </tr>
                    ))
                    
                }
                </tbody>
            </table>
            </div>
        </>
    );
};

export default Users;
