import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { motion } from "motion/react";
import { AppContext } from "../Components/Context";

const Result = () => {
    const [image, setImage] = useState(assets.sample_img_1);
    const [input, setInput] = useState("");
    const [isImageLoading, setImageLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const context = useContext(AppContext);

    const handleClick: React.MouseEventHandler<HTMLParagraphElement> = (event) => {
        event.preventDefault();
        console.log("Generate Another button clicked"); // Debugging statement
        location.reload();
    };

    const onsubmitHndler = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setLoading(true);
        if (input) {
            const image = await context?.generateImage(input);
            if (image) {
                setImageLoading(true);
                setImage(image);
            }
        }
        setLoading(false);
    };

    return (
        <motion.form initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: .3 }} onSubmit={onsubmitHndler} className="flex flex-col  min-h-[85vh]">
            <div className=" flex flex-col">
                <div className="relative block mx-auto">
                    <img src={image} alt="sample image" className="max-w-sm rounded" />
                    {loading &&
                        <span className="absolute w-full bottom-0 left-0 h-1 bg-red-500 transition-all duration-[10s] animate-loading"></span>
                    }
                </div>
                {
                    <p className={!loading ? "hidden" : "text-lg mx-auto mt-2"} >Loading ...</p>
                }
            </div>
            {!isImageLoading &&
                <div className="flex mx-auto  w-full max-w-xl bg-neutral-500 text-white text-sm mt-10 p-0.5 rounded-full ">
                    <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder="Describe what you want to generate " className="flex-1 bg-transparent outline-none ml-8  mr-2 max-sm:w-20" />
                    <button type="submit" className="bg-zinc-900 px-10 sm:px-16 py-3 rounded-full text-white hover:scale-110 transition-all duration-300">Generate</button>
                </div>
            }
            {isImageLoading &&
                <div className="flex flex-wrap  mt-10 rounded-full  text-sm p-0.5 gap-2 justify-center ">
                    <p className="bg-transparent border-2 border-zinc-900 px-8 py-3 rounded-full  cursor-pointer text-black hover:scale-110 hover:bg-black hover:text-white transition-all duration-300" onClick={handleClick}>Generate Another</p>
                    <a href={image} download className="bg-zinc-900 px-10 py-3  rounded-full cursor-pointer text-white hover:scale-110 transition-all duration-300">Download</a>
                </div>
            }
        </motion.form>
    );
}

export default Result;
