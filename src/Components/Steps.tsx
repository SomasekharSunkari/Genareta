import { stepsData } from "../assets/assets"
import { motion } from "motion/react"

const Steps = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl sm:text-4xl mb-2 font-semibold">How it works</h1>
            <p className="text-lg text-gray-600 mb-8">Transform Words Into Stunning Images</p>
            <motion.div className="space-y-4 w-full max-w-3xl text-sm">
                {stepsData.map((item, index) => (
                    <motion.div initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.1, delay: index * .02 }} whileHover={{ scale: 1.05 }} key={index} className=" flex  items-center gap-4 p-5 px-8 bg-white/20 shadow-md border hover:scale-[1.02] transition-all duration-300 cursor-pointer rounded-lg">
                        <img src={item.icon} alt="icon" />
                        <div>
                            <h2 className="text-xl font-medium">{item.title}</h2>
                            <p className="text-gray-500">{item.description}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
}

export default Steps
