import { assets, testimonialsData } from "../assets/assets"
import { motion } from "motion/react"
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const Testimonials = () => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(".cards", {
        opacity: 100,
        y: 0, // Move elements by 100px on the x-axis
        duration: 0.2, // Duration of the animation
        stagger: (index) => index * 0.1,

        scrollTrigger: {
            trigger: ".cards", // The element that triggers the animation
            start: "top 80%", // Start when the top of the element is 80% from the top of the viewport
            end: "top 30%",
            // End when the top of the element is 30% from the top of the viewport
            scrub: true, // Smoothly scrubs the animation as the user scrolls
            onEnter: () => console.log("Entered"),
            onLeave: () => console.log("Left")
        }
    });

    return (
        <motion.div initial="hidden"
            whileInView="visible"

            className="flex flex-wrap flex-col items-center justify-center my-20 py-12">

            <h1 className="text-3xl sm:text-4xl font-semibold mb-2">Customer testimonials</h1>
            <p className="text-gray-500 mb-8">What Our Users Are Saying</p>
            <div className="flex flex-wrap justify-center gap-6">
                {
                    testimonialsData.map((testimonial, index) => (
                        <motion.div key={index} whileHover={{ scale: 1.15 }}
                            transition={{ duration: 0.1 }} className="bg-white/20 transform translate-y-[-100px] p-12 cards rounded-lg opacity-0 shadow-md border order w-80 hover:scale-[1.05] cursor-pointer transition-all duration-300">
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
