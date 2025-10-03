import { createContext, use, useEffect } from "react"
import {deriveAddress} from "../services/walletService";
import { getBalance } from "../utils/getbalance";
export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
    const [accounts, setAccounts] = useState([]);
    const [seedPhrase, setSeedPhrase] = useState("");
        const [activechainId, setActivechainId] = useState(1);
        const [activeAccountIndex, setActiveAccountIndex] = useState(0);
        const[selectedAddress,setSelectedAddress] = useState(null);


     useEffect(() => {
        const initwallet = async() => {
            const {seedPhrase:newseed,privatekey,address}   = deriveAddress(null,0);
            const balance = await getBalance(address,CHAINS[activechainId].rpc);

            const firstAccount = {privatekey,address,balance,index:0};
            setSelectedAccount([firstAccount]);
            setSeedPhrase(newseed);
            setAccounts([firstAccount]);
        }
        initwallet();
    
     },[])       
    
    return (
        <WalletContext.Provider
            value={{ accounts, setAccounts, seedPhrase, setSeedPhrase,activechainId,setActivechainId,activeAccountIndex,setActiveAccountIndex,selectedAddress,setSelectedAddress }}
        >
            {children}
        </WalletContext.Provider>
    );
};
