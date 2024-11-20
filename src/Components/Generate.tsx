import { assets } from "../assets/assets"
import { motion } from "motion/react"
import { useContext } from "react";
import { AppContext } from "./Context";
import { useNavigate } from "react-router-dom";
const Generate = () => {
    const context = useContext(AppContext);
    if (!context) {
        return <p>Loading ...</p>
    }
    const navigate = useNavigate();
    const submitHandler = () => {
        if (!context.user) {
            context.setShowLogin(true)
        }
        else {
            navigate("/result")
        }
    }
    return (
        <motion.div initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: .3, delay: 0.3 }} className="flex flex-col  items-center justify-center mb-40">
            <h1 className="text-3xl sm:text-4xl font-semibold ">See the magic. Try now</h1>
            <button onClick={submitHandler} className="flex sm:text-lg text-white bg-black w-auto mt-8 px-14 mb-4 py-3.5 items-center gap-2 rounded-full hover:scale-105 transition-transform duration-500">Generate Images <img className="h-6" src={assets.star_group} alt="star group" /></button>


        </motion.div>
    )
}

export default Generate
