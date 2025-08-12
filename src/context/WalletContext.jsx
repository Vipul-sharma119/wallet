import { createContext } from "react"
export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {

    let temp = 5;
    return (
        <WalletContext.Provider
            value={temp}
        >
            {children}
        </WalletContext.Provider>
    );
};
