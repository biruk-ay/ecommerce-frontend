import { useState, useEffect } from "react";
import { selectUserEmail } from "../../../auth/application/slice/AuthSlice";
import { selectUserToken } from "../../../auth/application/slice/AuthSlice";
import { useAppSelector } from "../../../store/store";
import AdminProvider from "../../di/AdminProvider";
const Users = () => {
    const [users, setUsers] = useState([]);
    // const email = useAppSelector(selectUserEmail);
    // const token = useAppSelector(selectUserToken);
    const email = "x@x.com";
    const token = "dea8b527-aa7e-4932-8041-197e8c6bbe5c";

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
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                    <hr className="flex w-full bg-slate-700"></hr>
                </thead>
                <tbody className="">
                    {users.map((user) => (
                        <tr className="" key={user.id}>
                            <td className="flex justify-center">{user.name}</td>
                            <td className="pl-40 justify-center">{user.email}</td>
                            <td className="flex justify-center">{user.role}</td>
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
