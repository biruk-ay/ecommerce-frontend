import { useContext } from "react";
import AuthContext from "../auth/state/AuthCtxProvider";
import { Link } from "react-router-dom";
import authCtx from "../auth/state/AuthCtxProvider";

const Header = () => {
    const { authState } = useContext(AuthContext);
    const { globalLogOutDispatch } = useContext(authCtx);
    return (
        <header className="bg-primary flex fixed top-0 w-full justify-evenly items-center text-white">
            <div className="flex justify-between mt-2 mb-2">
                <a href="/">
                    <img className="h-5 w-5 sm:h-11 sm:w-11 sm:mr-4" src="../../logo.png" alt="Company Logo"></img>
                </a>
                <div className="font-cursive font-semibold sm:text-2xl">gebeya</div>
            </div>

            <div className="flex justify-center -space-x-12">
                <button className="sm:z-0 rounded-3xl p-2.5 bg-gray-300">
                    <svg className="w-6 h-6" fill="#5e5c64" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 124 124" stroke="#5e5c64">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                    <g id="SVGRepo_iconCarrier"> <g> <path d="M112,6H12C5.4,6,0,11.4,0,18s5.4,12,12,12h100c6.6,0,12-5.4,12-12S118.6,6,112,6z"/> <path d="M112,50H12C5.4,50,0,55.4,0,62c0,6.6,5.4,12,12,12h100c6.6,0,12-5.4,12-12C124,55.4,118.6,50,112,50z"/> <path d="M112,94H12c-6.6,0-12,5.4-12,12s5.4,12,12,12h100c6.6,0,12-5.4,12-12S118.6,94,112,94z"/> </g> </g>
                    </svg>
                </button>
                <input className="bg-gray-300 rounded-3xl font-normal mr-4 sm:h-12 sm:pe-40 sm:ps-12" placeholder="Search products..." required></input>
                <button type="submit" className="rounded-3xl p-2.5 bg-gray-300">
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="#5e5c64" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </button>
            </div>

             <div className="flex auto gap-1 text-sm sm:text-lg sm:gap-4 font-roboto font-bold">

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
    );
}


export default Header;