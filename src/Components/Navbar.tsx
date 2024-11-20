import { Link, useNavigate } from "react-router-dom"

import { assets } from "../assets/assets.js"
import { useContext } from "react";
import { AppContext } from "./Context.js";
const Navbar = () => {
    const context = useContext(AppContext)
    if (!context) {
        return <div>Loading ...</div>
    }
    const navigate = useNavigate();
    return (
        <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex  font-bold   items-center  gap-2 "><img src="/main1.png" alt="Logo" className="size-8" /><p className=" tracking-wide text-[20px] sm:text-[30px]">Genarata</p></Link>
            {
                context.user ?
                    <div className="flex items-center gap-2 sm:gap-3">
                        <button className="flex gap-2 items-center bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full drop-shadow hover:scale-105 transition-all duration-700"><img src={assets.credit_star} alt="credit_star" />
                            <p className="text-xs sm:text-sm text-gray-600 font-medium">Credits left: 50</p>
                        </button>
                        <p className="text-gray-600 max-sm:hidden pl-4">Hi , Sekhar</p>
                        <div className="relative group">
                            <img src={assets.profile_icon} alt="profileicon " className="w-10 drop-shadow-lg" />
                            <div className="absolute hidden group-hover:block top-0 right-0 z-10 rounded text-black pt-12">
                                <ul className="list-none m-0 py-2 bg-white rounded-md text-sm border">
                                    <li className=" pr-10 px-2 py-1 cursor-pointer drop-shadow"> Logout</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="flex items-center gap-2 sm:gap-5">
                        <p className="cursor-pointer" onClick={() => navigate("/buy")}>Pricing</p>
                        <button className="bg-zinc-800 text-white px-7 py-2 rounded-full sm:px-10 text-[15px] sm:text-sm " onClick={() => context.setShowLogin(true)}>Login</button> </div>
            }

        </div>
    )
}

export default Navbar

