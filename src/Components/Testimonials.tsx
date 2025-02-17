import { assets, testimonialsData } from "../assets/assets"
import { motion } from "motion/react"

const Testimonials = () => {
    const parentVariants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    const childVariants = {
        hidden: { opacity: 0.2, y: 100 },
        visible: { opacity: 1, y: 0 },
    };
    return (
        <motion.div initial="hidden"
            whileInView="visible"
            variants={parentVariants}
            className="flex flex-wrap flex-col items-center justify-center  my-20 py-12">

            <h1 className="text-3xl sm:text-4xl font-semibold mb-2">Customer testimonials</h1>
            <p className="text-gray-500 mb-8">What Our Users Are Saying</p>
            <div className="flex flex-col md:flex-row flex-wrap gap-6">
                {
                    testimonialsData.map((testimonial, index) => (
                        <motion.div key={index} whileHover={{ scale: 1.15 }}
                            variants={childVariants}
                            transition={{ duration: 0.3, delay: index * 0.1 }} className="bg-white/20 p-12 rounded-lg shadow-md border order w-80 hover:scale-[1.05] cursor-pointer transition-all duration-300">
                            <div className="flex flex-col  items-center gap-2">
                                <img src={testimonial.image} alt="profile" className="w-14 rounded-full" />
                                <h1 className="text-xl font-semibold mt-3">{testimonial.name}</h1>
                                <p className="text-gray-500 mb-4">{testimonial.role}</p>
                                {/* <img src={testimonial.stars} alt="" /> */}
                                <div className="flex mb-4">
                                    {Array(testimonial.stars).fill("").map((star, index) => (
                                        <img key={index + star} src={assets.rating_star} alt="star" className="mr-1" />
                                    ))}

                                </div>

                                <p className="text-center text-sm text-gray-600">{testimonial.text}</p>
                            </div>
                        </motion.div>
                    ))
                }

            </div>
        </motion.div>
    )
}

export default Testimonials
