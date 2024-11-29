import { useContext } from "react"
import { assets, plans } from "../assets/assets"
import { animateMini, backIn, motion } from "motion/react"
import { AppContext } from "../Components/Context"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "axios"

const BuyCredit = () => {
    const context = useContext(AppContext)
    const navigate = useNavigate();
    if (!context) {
        return "Loading ..."
    }
    const initPay = (order) => {
        const token = context.token
        console.log(order)
        const options = {
            key: import.meta.env.VITVITE_RAZORPAY_KEY,
            amount: order.amount,
            currency: order.currency,
            name: "Credits Payment",
            description: "Credits Payment",
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                try {
                    const { data } = await axios.post(context.backendUrl + "/api/user/verify-payment", response, { headers: { token } })
                    console.log(data)
                    if (data.success) {
                        context.loadCreditData()
                        navigate("/")
                        toast.success("Credits Added !")
                    }
                }
                catch (err) {
                    console.log(err.message)
                    toast.error(err.message)
                }
            }
        }
        console.log("Opening")
        var rzp1 = new window.Razorpay(options);
        rzp1.open()

    }
    const paymentRazorpay = async (planId) => {
        try {
            if (!context?.user) {
                context?.setShowLogin(true)

            }
            console.log(planId)
            const token = context.token;
            console.log(context.backendUrl)
            const { data } = await axios.post(context.backendUrl + "/api/user/pay-razorpay", { planId }, { headers: { token } })
            console.log(data)
            console.log("sekar")
            if (data.success) {
                console.log("Opening")
                initPay(data.message)
            }

        }
        catch (err) {
            console.log(err.message);
            toast.error(err.message)
        }
    }
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
                        <button onClick={() => paymentRazorpay(item.id)} className="bg-black md:text-sm  min-w-52 text-xl text-white hover:scale-110 transition-all duration-300  px-6 sm:px-12 py-3 mt-8 rounded-lg">Get Started </button>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}

export default BuyCredit
