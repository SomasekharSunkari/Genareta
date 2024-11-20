import { assets, plans } from "../assets/assets"
import { motion } from "motion/react"

const BuyCredit = () => {
    return (
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: .3 }} className="min-h-[85vh]">
            <div className="flex flex-col justify-center items-center">
                <p className="border border-gray-300  px-10 py-3 rounded-full">OUR PLANS</p>
                <h1 className="text-3xl sm:text-4xl font-semibold mt-3">Choose a plan</h1>
            </div>
            <div className="flex flex-col justify-center mt-10 sm:flex-row gap-5">
                {plans.map((item, index) => (
                    <div key={index} className="shadow-md border px-10 py-16 flex flex-col items-start gap-v2 hover:scale-110 transition-all duration-300 cursor-pointer">
                        <img className="w-8 mb-2" src={assets.logo} alt="" />
                        <p className="text-xl font-medium">{item.id}</p>
                        <p className="text-gray-500">{item.desc}</p>
                        <p className="mt-2 text-gray-500 mb-2"><span className="md:text-3xl text-xl mr-2 text-black">${item.price}</span>/{item.credits} credits</p>
                        <button className="bg-black md:text-sm  min-w-52 text-xl text-white hover:scale-110 transition-all duration-300  px-6 sm:px-12 py-3 mt-8 rounded-lg">Get Started </button>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}

export default BuyCredit