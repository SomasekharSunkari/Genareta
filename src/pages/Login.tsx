import { useContext, useEffect, useState } from "react";
import axios from "axios"
import { assets } from "../assets/assets";
import { AppContext } from "../Components/Context";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const Login = () => {
    const [status, setStatus] = useState("Login");

    const context = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false);

    const [name, setusername] = useState("")
    const [password, setPassword] = useState("");

    const [email, setEmail] = useState("")

    const submitHandeler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate a loading process (e.g., an API call)
        setTimeout(() => {
            // After loading, reset the loading state
            setIsLoading(false);
            // You can also change the status if needed here
        }, 2000); // 2 seconds for the loading simulation
        try {
            if (status === "Login") {
                const { data } = await axios.post(context?.backendUrl + "/api/user/login", { email, password })
                if (data.success) {
                    context?.setToken(data.token)
                    context?.setUser(data.user);
                    localStorage.setItem("token", data.token)
                    context?.setShowLogin(false)
                }
                else {
                    toast.error(data.message)
                }

            }
            else {
                console.log('I am intehwkjfdfms ,sd sd sd signup')
                console.log(context?.backendUrl)
                const { data } = await axios.post(context?.backendUrl + "/api/user/signup", { name, email, password })
                console.log(data)

                if (data.success) {
                    context?.setToken(data.token)
                    context?.setUser(data.user);
                    localStorage.setItem("token", data.token)
                    context?.setShowLogin(false)
                }
                else {
                    toast.error(data.message)
                }

            }

        }
        catch (err: any) {
            console.log(err.message)
            toast.error(err.message)


        }


    }
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

            <motion.form onSubmit={submitHandeler}
                key={status + "m"} // This key ensures AnimatePresence works correctly with conditionally rendered content
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
                        <input className="text-sm outline-none px-2 py-2" onChange={(e) => setusername(e.target.value)} value={name} type="text" required placeholder="Full name" />
                    </div>
                )}
                <div className="px-6 py-2 border flex items-center gap-2 rounded-full mt-4">
                    <img src={assets.email_icon} alt="email" />
                    <input className="text-sm outline-none px-2 py-2" type="email" onChange={(e) => setEmail(e.target.value)} value={email} required placeholder="Email" />
                </div>
                <div className="px-6 py-2 border flex items-center gap-2 rounded-full mt-4">
                    <img src={assets.lock_icon} alt="lock" />
                    <input className="text-sm outline-none px-2 py-2" type="password" onChange={(e) => setPassword(e.target.value)} value={password} required placeholder="Password" />
                </div>

                {status === "Login" && <a href="#" className="mt-10 text-sm text-orange-600">Forgot password?</a>}

                <button type="submit"
                    disabled={isLoading} className="bg-orange-600 w-full mt-3 text-white py-3 rounded-full hover:scale-105 transition-all duration-300">
                    {isLoading ? (
                        <div className="w-6 h-6 pl-4 inline-flex justify-center border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                    ) : (
                        status === "Login" ? "Login" : "Create account"
                    )}
                </button>

                {status === "Login" ? (
                    <div>
                        <p className="text-center mt-4 text-sm">
                            Don’t have an account? <a href="#" className="text-orange-600 cursor-pointer" onClick={() => {
                                setEmail("")
                                setPassword("")
                                setStatus("SignUp")
                            }}>Sign up</a>
                        </p>
                    </div>
                ) : (
                    <div>
                        <p className="text-center mt-4 text-sm">
                            Already have an account? <a href="#" className="text-orange-600 cursor-pointer" onClick={() => {
                                setStatus("Login")
                                setusername("")
                                setEmail("")
                                setPassword("")

                            }}>Login here</a>
                        </p>
                    </div>
                )}
                <img src={assets.cross_icon} onClick={() => context.setShowLogin(false)} className="absolute right-7 top-6 cursor-pointer w-4" alt="close" />
            </motion.form>

        </div>
    );
};

export default Login;
