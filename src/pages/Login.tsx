import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../Components/Context";
import { motion } from "framer-motion";

const Login = () => {
    const [status, setStatus] = useState("Login");
    const context = useContext(AppContext);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    if (!context) {
        return <div>Loading ...</div>;
    }

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">

            <motion.form
                key={status} // This key ensures AnimatePresence works correctly with conditionally rendered content
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}

                transition={{ duration: 0.3 }}
                className="relative bg-white rounded-xl p-10 text-slate-500"
            >
                {status === "Login" ? (
                    <h1 className="text-center text-2xl text-neutral-700 font-medium">Login</h1>
                ) : (
                    <h1 className="text-center text-2xl text-neutral-700 font-medium">Sign Up</h1>
                )}

                {status === "Login" && <p className="text-sm text-center mt-2">Welcome back! Please sign in to continue.</p>}
                {status === "SignUp" && (
                    <div className="px-6 py-2 border flex items-center gap-2 rounded-full mt-5">
                        <img src={assets.cross_icon} alt="cross" />
                        <input className="text-sm outline-none px-2 py-2" type="text" required placeholder="Full name" />
                    </div>
                )}
                <div className="px-6 py-2 border flex items-center gap-2 rounded-full mt-4">
                    <img src={assets.email_icon} alt="email" />
                    <input className="text-sm outline-none px-2 py-2" type="email" required placeholder="Email" />
                </div>
                <div className="px-6 py-2 border flex items-center gap-2 rounded-full mt-4">
                    <img src={assets.lock_icon} alt="lock" />
                    <input className="text-sm outline-none px-2 py-2" type="password" required placeholder="Password" />
                </div>

                {status === "Login" && <a href="#" className="mt-10 text-sm text-orange-600">Forgot password?</a>}

                <button className="bg-orange-600 w-full mt-3 text-white py-3 rounded-full hover:scale-105 transition-all duration-300">
                    {status === "Login" ? "Login" : "Create account"}
                </button>

                {status === "Login" ? (
                    <div>
                        <p className="text-center mt-4 text-sm">
                            Don’t have an account? <a href="#" className="text-orange-600 cursor-pointer" onClick={() => setStatus("SignUp")}>Sign up</a>
                        </p>
                    </div>
                ) : (
                    <div>
                        <p className="text-center mt-4 text-sm">
                            Already have an account? <a href="#" className="text-orange-600 cursor-pointer" onClick={() => setStatus("Login")}>Login here</a>
                        </p>
                    </div>
                )}
                <img src={assets.cross_icon} onClick={() => context.setShowLogin(false)} className="absolute right-7 top-6 cursor-pointer w-4" alt="close" />
            </motion.form>

        </div>
    );
};

export default Login;
