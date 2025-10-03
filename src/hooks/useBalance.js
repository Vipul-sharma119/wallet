import { useEffect } from "react";
import {ethers} from "ethers";

export const useBalance = (address,rpcUrl) => {
    const[balance,setBalance] = useState(null);
    const[loading,setLoading] = useState(true);

    useEffect(()=>{
        if (!address) return;
        const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

        const fetchBalance = async () => {
            try{
                setLoading(true);
                const balanceWei = await provider.getBalance(address);
                const balanceEth = ethers.formatEther(balanceWei);
                setBalance(balanceEth);
            } catch (error) {
                console.error("Error fetching balance:", error);
                setBalance(null);
            } finally {
                setLoading(false);
            }
        };
        fetchBalance();
    },[address,rpcUrl]);
    return {balance,loading};
};