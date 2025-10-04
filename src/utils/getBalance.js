import { ethers } from 'ethers';

export const getBalance = async (address, rpcUrl) => {
    if (!ethers.isAddress(address)) {
        throw new Error("Invalid Ethereum address");
    }
    
    if (!rpcUrl) {
        throw new Error("RPC URL is required");
    }
    
    console.log("Fetching balance for:", address, "from RPC:", rpcUrl);
    
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    
    try {
        const balanceWei = await provider.getBalance(address);
        const balanceEth = ethers.formatEther(balanceWei);
        return balanceEth;
    } catch (error) {
        console.error("Error fetching balance:", error);
        throw error;
    }
}