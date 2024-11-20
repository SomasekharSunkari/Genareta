import { useContext } from "react"
import { assets } from "../assets/assets"
import { motion } from "motion/react"
import { AppContext } from "./Context"
import { useNavigate } from "react-router-dom"
const Header = () => {
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
        <motion.div className=" flex flex-col justify-center items-center min-h-[93vh]" initial={{ opacity: 0.2, y: 150 }} transition={{ duration: .5 }} whileInView={{ opacity: 1, y: 0 }} >
            <motion.div initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="inline-flex items-center text-stone-500 bg-white px-6 py-1 gap-2  rounded-full border border-neutral-500 ">
                <p>Best text to image generator</p>
                <img src={assets.star_icon} alt="star icon" />
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-4xl  max-w-[300px] sm:text-7xl sm:max-w-[900px] mx-auto mt-10 text-center">Turn text to
                <br />
                <span className="text-orange-600">image</span>,
                in seconds.</motion.h1>
            <motion.p className="text-center max-w-xl mx-auto mt-5" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>Unleash your creativity with AI. Turn your imagination into visual art in seconds – just type, and watch the magic happen.</motion.p>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="flex sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 items-center gap-2 rounded-full " onClick={submitHandler}>Generate Images <img className="h-6" src={assets.star_group} alt="star group" /></motion.button>
            <motion.div className="flex flex-wrap justify-center mt-16  gap-3" initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, delay: 0.6 }}>
                {Array(6).fill("").map((item, index) => (
                    <motion.img key={item} className="rounded cursor-pointer" whileHover={{ scale: 1.5 }} transition={{ duration: .1 }} src={index % 2 == 0 ? assets.sample_img_1 : assets.sample_img_2} alt="sample image" width={80} />

                ))}

            </motion.div>
            <p className=" mt-2 text-neutral-600">Generated images from Genareta</p>
        </motion.div>

    )
}

export default Header
