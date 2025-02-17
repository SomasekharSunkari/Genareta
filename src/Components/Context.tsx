import axios from "axios";
import { createContext, Dispatch, SetStateAction, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface AppContextType {
    user?: string,
    showLogin?: boolean,
    setShowLogin: Dispatch<SetStateAction<boolean>>
    setUser: Dispatch<SetStateAction<string>>,
    backendUrl: string,
    token?: string | null,
    setToken: Dispatch<SetStateAction<string | null>>,
    credit: boolean,
    generateImage: (prompt: string) => Promise<any>,
    setCredit: Dispatch<SetStateAction<boolean>>,
    logout: () => void,
    loadCreditData: () => void;
    loadUserimages: () => Promise<any>
}
export const AppContext = createContext<AppContextType | null>(null);
const backendUrl: string = import.meta.env.VITE_BACKEND_URL
const AppContextProvider = ({ children }: React.PropsWithChildren) => {
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [credit, setCredit] = useState(false)
    const [user, setUser] = useState("");
    const [showLogin, setShowLogin] = useState<boolean>(false)
    useEffect(() => {
        if (token)
            loadCreditData()
        loadUserimages()

    }, [token])
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        setUser("null")
        navigate("/");
        location.reload()
    }
    const loadUserimages = async () => {

        try {
            const { data } = await axios.get(backendUrl + "/api/image/getimages", { headers: { token } })
            if (data.success) {

                return data.images;
            }
        }
        catch (err: any) {
            console.log(err.message)
        }

    }
    const generateImage = async (prompt: string) => {
        try {
            const { data } = await axios.post(backendUrl + "/api/image/generate-image", { prompt }, { headers: { token } })
            if (data.success) {
                await loadCreditData()
                return data.resultImage
            }
            else {
                toast.error(data.message);
                await loadCreditData()
                if (data.creditBalance <= 0) {
                    navigate("/buy")
                }
            }
        }
        catch (err: any) {
            console.log(err.message);
            toast.error(err.message)
        }

    }
    const loadCreditData = async () => {
        try {
            const { data } = await axios.get(backendUrl + "/api/user/usercredits", { headers: { token } })

            if (data.success) {
                setCredit(data.credits)
                setUser(data.user)


            }
        }
        catch (err: any) {
            if (axios.isAxiosError(err)) {
                // Specific handling for axios errors
                console.log(err.message);
                toast.error(err.message)
            } else {
                // Generic error handling
                console.log(err.message);
                toast.error(err.message)

            }
        }
    }
    const values: AppContextType = {
        user,
        showLogin,
        setUser,
        setShowLogin,
        generateImage,
        backendUrl,
        token,
        setToken,
        credit, setCredit, logout, loadCreditData, loadUserimages
    }
    return <AppContext.Provider value={values} >{children}</AppContext.Provider>
}

export default AppContextProvider;
