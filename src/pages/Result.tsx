import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { motion } from "motion/react";
import { AppContext } from "../Components/Context";

// Define the Image type
interface Image {
    uri: string;
}

const Result = () => {
    const [image, setImage] = useState(assets.sample_img_1);
    const [input, setInput] = useState("");
    const [isImageLoading, setImageLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState<Image[]>([]);
    const [error, setError] = useState(false);
    const [errorContent, setErrorContent] = useState("");
    const context = useContext(AppContext);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    useEffect(() => {

        const loadImages = async () => {
            const pics = await context?.loadUserimages();
            if (pics) {
                setImages(pics);
            }
        };
        loadImages();
    }, []);
    const indexOfLastImage = currentPage * itemsPerPage;
    const indexOfFirstImage = indexOfLastImage - itemsPerPage;
    const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const handleClick: React.MouseEventHandler<HTMLParagraphElement> = (event) => {
        event.preventDefault();
        location.reload();
    };

    const onsubmitHndler = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (input.length <= 1) {
                setTimeout(() => {
                    setError(false);
                }, 3000);
                throw new Error("Enter a valid Prompt");
            } else {
                setLoading(true);
                const image = await context?.generateImage(input);
                if (image) {
                    setImageLoading(true);
                    setImage(image);
                }
                setLoading(false);
            }
        } catch (err: any) {
            setError(true);
            setErrorContent(err.message);
        }
    };

    const handlePaginationClick = (e: React.MouseEvent) => {
        e.preventDefault();
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={onsubmitHndler}
            className="flex flex-col min-h-[85vh]"
        >
            <div className="flex flex-col">
                <div className="relative block mx-auto">
                    <img src={image} alt="generated image" className="max-w-[300px] rounded" />
                    {loading && (
                        <span className="absolute w-full bottom-0 left-0 h-1 bg-red-500 transition-all duration-[10s] animate-loading"></span>
                    )}
                </div>
                {<p className={!loading ? "hidden" : "text-lg mx-auto mt-2"}>Generating ...</p>}
                {error && <p className="text-red-500 text-center pt-4 text-3xl">{errorContent}</p>}
            </div>

            {!isImageLoading && (
                <div className="flex mx-auto w-full max-w-xl bg-neutral-500 text-white text-sm mt-10 p-0.5 rounded-full">
                    <input
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                        type="text"
                        placeholder="Describe what you want to generate"
                        className="flex-1 bg-transparent outline-none ml-8 mr-2 max-sm:w-20"
                    />
                    <button
                        type="submit"
                        className="bg-zinc-900 px-10 sm:px-16 py-3 rounded-full text-white hover:scale-110 transition-all duration-300"
                    >
                        Generate
                    </button>
                </div>
            )}
            {isImageLoading && (
                <div className="flex flex-wrap mt-10 rounded-full text-sm p-0.5 gap-2 justify-center ">
                    <p
                        className="bg-transparent border-2 border-zinc-900 px-8 py-3 rounded-full cursor-pointer text-black hover:scale-110 hover:bg-black hover:text-white transition-all duration-300"
                        onClick={handleClick}
                    >
                        Generate Another
                    </p>
                    <a
                        href={image}
                        download
                        className="bg-zinc-900 px-10 py-3 rounded-full cursor-pointer text-white hover:scale-110 transition-all duration-300"
                    >
                        Download
                    </a>
                </div>
            )}
            <div className="mt-10 mb-10">
                {images.length >= 1 && <h2 className="text-center text-lg font-semibold mb-4 md:text-3xl">Most Recently Generated Images</h2>}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {currentImages.map((imageData, index) => (
                        <div key={index} className="relative">
                            <img
                                src={imageData.uri}
                                alt={`Generated Image ${index + 1}`}
                                className="w-full h-auto rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-300">
                                <a
                                    href={imageData.uri}
                                    download
                                    className="bg-zinc-900 px-10 py-3 rounded-full text-white hover:scale-110 transition-all duration-300"
                                >
                                    Download
                                </a>
                            </div>
                        </div>
                    ))}
                </div>


                {images.length >= 1 && <div className="flex justify-center mt-4">
                    <button
                        type="button"
                        className={`px-4 py-2 mx-2 text-white bg-black rounded-lg hover:bg-gray-800 ${currentPage === 1 ? "opacity-20" : "opacity-100"}`} onClick={(e) => {
                            handlePaginationClick(e);
                            currentPage > 1 && paginate(currentPage - 1);
                        }}
                    >
                        Previous
                    </button>
                    <button
                        type="button"
                        className={`px-4 py-2 mx-2 text-white bg-black rounded-lg hover:bg-gray-800 ${currentPage === Math.floor((images.length / itemsPerPage)) ? "opacity-20" : "opacity-100"}`}
                        onClick={(e) => {
                            handlePaginationClick(e);
                            currentPage * itemsPerPage < images.length && paginate(currentPage + 1);
                        }}
                    >
                        Next
                    </button>
                </div>
                }
            </div>
        </motion.form>
    );
};


export default Result;
