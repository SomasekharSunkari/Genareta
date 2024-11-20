import { assets } from "../assets/assets"
const Footer = () => {
    return (
        <div className="flex justify-between items-center pb-7">
            <div className="flex items-center gap-4">
                <div className="inline-flex items-center gap-2 ">
                    <img src={assets.logo} alt="public " className="h-10" />
                    <h1 className="text-2xl font-semibold">Genareta</h1>
                </div>
                <p className="flex-1 border-1  border-gray-400 pl-4 text-sm max-sm:hidden">Copyrights @genareta    |    All right reserved. Copyright </p>
            </div>
            <div className="flex gap-3">
                <img className="cursor-pointer hover:scale-125 transition-all duration-300" src={assets.facebook_icon} alt="facebook" width={35} />
                <img className="cursor-pointer hover:scale-125 transition-all duration-300" src={assets.instagram_icon} alt="instagram" width={35} />
                <img className="cursor-pointer hover:scale-125 transition-all duration-300" src={assets.twitter_icon} alt="twitter " width={35} />
            </div>
        </div>
    )
}

export default Footer
