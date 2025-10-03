import {ethers} from 'ethers';
export const getBalance = async (address, rpcUrl) => {
    if(!ethers.isaddress(address)){
        throw new Error("Invalid Ethereum address");
    }
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    try{
        const balanceWei = await provider.getBalance(address);
        const balanceEth = ethers.formatEther(balanceWei);
        return balanceEth;
    } catch (error) {
        console.error("Error fetching balance:", error);
        throw error;
    }
}