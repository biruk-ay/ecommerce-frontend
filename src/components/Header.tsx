import { useContext } from "react";
import AuthContext from "../auth/state/AuthCtxProvider";
import { Link } from "react-router-dom";
import authCtx from "../auth/state/AuthCtxProvider";

const Header = () => {
    const { authState } = useContext(AuthContext);
    const { globalLogOutDispatch } = useContext(authCtx);
    return (
        <>
            <header className="bg-primary top-0 h-16 w-auto justify-between">
                <nav className="flex auto max-w-6xl justify-between lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <a href="/" className="flex auto space-x-4">
                            <img className="h-11 w-11" src="../../logo.png" alt="Company Logo"></img>
                            <span className="font-cursive text-2xl text-white font-semibold p-1">gebeya</span>
                        </a>
                    </div>


                    <form className="flex auto items-center max-w-xl mx-auto">
                        <div className="relative w-full flex auto">
                            <div className="inset-y-0 start-0 flex items-end">
                                <button type="submit" className="rounded-3xl p-2.5 ms-2 text-sm font-medium text-white bg-gray-300 focus:ring-4 focus:outline-none">
                                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </button>
                            </div>
                            <input type="text" id="simple-search" className="bg-gray-300 border-gray-300 text-sm rounded-3xl block w-full ps-20 p-2.5 dark:placeholder-gray-400 dark:text-white" placeholder="Search products..." required />
                        </div>
                    </form>
                        </nav>

                    <div className="flex auto mb-40 justify-end gap-4 font-roboto font-bold">

                        {authState.isLoggedIn ? (
                            <>
                                <span>Welcome, {authState.name}!</span>
                                <button onClick={() => globalLogOutDispatch()}></button>
                            </>
                        ) : (
                            <>
                                <Link to={"/user/login"} className="hover:underline">Login</Link>
                                <Link to={"/user/register"} className="hover:underline">Register</Link>
                            </>
                        )

                        }
                    </div>


            </header>
        </>
    )
}

export default Header;