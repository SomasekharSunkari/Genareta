import { assets } from "../assets/assets"
import { motion } from "motion/react"

const Description = () => {
    return (
        <div className="flex flex-col items-center justify-center my-24 p-6 md:px-28">
            <motion.div initial={{ opacity: 0.2, y: -200 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: .3 }}>
                <h1 className="text-3xl sm:text-4xl font-medium mb-2">Create AI Images</h1>
                <p className="mb-8 text-gray-500 text-center">Turn your imagination into visuals</p>
            </motion.div>
            <div className="flex flex-col md:flex-row  gap-5 md:gap-14 items-center">
                <motion.img initial={{ opacity: 0.2, x: -200 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: .3 }} src={assets.sample_img_1} alt="Sample Image" className="w-80 xl:w-96 rounded-lg" />
                <motion.div initial={{ opacity: 0.2, x: 200 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: .3 }}>
                    <h1 className="text-3xl font-medium max-w-lg mb-4">Introducing the AI-Powered Text to Image Generator</h1>
                    <p className="text-gray-600 mb-4 max-w-2xl">Easily bring your ideas to life with our free AI image generator. Whether you need stunning visuals or unique imagery, our tool transforms your text into eye-catching images with just a few clicks. Imagine it, describe it, and watch it come to life instantly.</p>
                    <p className="text-gray-600 mb-4 max-w-2xl">Simply type in a text prompt, and our cutting-edge AI will generate high-quality images in seconds. From product visuals to character designs and portraits, even concepts that don’t yet exist can be visualized effortlessly. Powered by advanced AI technology, the creative possibilities are limitless!</p>
                </motion.div>
            </div>
        </div>
    )
}

export default Description
