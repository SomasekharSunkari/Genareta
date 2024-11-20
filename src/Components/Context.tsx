import { createContext, Dispatch, SetStateAction } from "react";
import { useState } from "react";

interface AppContextType {
    user?: string | null,
    showLogin?: boolean,
    setShowLogin: Dispatch<SetStateAction<boolean>>
    setUser?: Dispatch<SetStateAction<null>>
}
export const AppContext = createContext<AppContextType | null>(null);
const AppContextProvider = ({ children }: React.PropsWithChildren) => {
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false)
    const values: AppContextType = {
        user,
        showLogin,
        setUser,
        setShowLogin
    }
    return <AppContext.Provider value={values} >{children}</AppContext.Provider>
}

export default AppContextProvider;
