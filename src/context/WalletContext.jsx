import { createContext, useState, useEffect } from "react"
import { deriveAccount } from "../services/walletService";
import { getBalance } from "../utils/getBalance";
import { CHAINS } from "../services/chainConfig"

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
    const [accounts, setAccounts] = useState([]);
    const [seedPhrase, setSeedPhrase] = useState(null);
    const [activeChainId, setActiveChainId] = useState(1);
    const [activeAccountIndex, setActiveAccountIndex] = useState(0);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [initError, setInitError] = useState(null);

    useEffect(() => {
        const initWallet = async () => {
            try {
                console.log("🚀 Starting wallet initialization...");
                
                // Step 1: Check RPC URL
                const rpcUrl = CHAINS[activeChainId]?.rpc;
                console.log("RPC URL:", rpcUrl);
                
                if (!rpcUrl) {
                    throw new Error("RPC URL is not configured. Check your .env file.");
                }
                
                // Step 2: Generate account
                console.log("Generating new account...");
                const accountData = deriveAccount(null, 0);
                console.log("Account generated:", {
                    hasPrivateKey: !!accountData.privateKey,
                    address: accountData.address,
                    hasSeedPhrase: !!accountData.seedPhrase
                });
                
                const { seedPhrase: newSeed, privateKey, address } = accountData;
                
                if (!newSeed || !privateKey || !address) {
                    throw new Error("Failed to generate account data");
                }
                
                // Step 3: Set seed phrase first
                console.log("Setting seed phrase...");
                setSeedPhrase(newSeed);
                
                // Step 4: Fetch balance
                console.log("Fetching balance for:", address);
                let balance = "0";
                try {
                    balance = await getBalance(address, rpcUrl);
                    console.log("Balance fetched:", balance);
                } catch (balanceError) {
                    console.warn("Could not fetch balance, using default:", balanceError.message);
                    // Continue even if balance fetch fails
                }
                
                // Step 5: Create and set account
                const firstAccount = { privateKey, address, balance, index: 0 };
                console.log("Setting first account:", firstAccount.address);
                setSelectedAccount(firstAccount);
                setAccounts([firstAccount]);
                
                console.log("✅ Wallet initialization complete!");
                
            } catch (error) {
                console.error("❌ Error initializing wallet:", error);
                setInitError(error.message);
            }
        }

        initWallet();
    }, []) // Empty dependency array - only run once

    const addAccount = async () => {
        try {
            const newIndex = accounts.length;
            const { privateKey, address } = deriveAccount(seedPhrase, newIndex);
            const balance = await getBalance(address, CHAINS[activeChainId].rpc);
            const newAccount = { privateKey, address, balance, index: newIndex };
            const updatedAccounts = [...accounts, newAccount];
            setAccounts(updatedAccounts)
        } catch (error) {
            console.error("Error adding account:", error);
        }
    }

    const changeNetwork = async (newChainId) => {
        try {
            if (!CHAINS[newChainId]) {
                console.error("Unsupported chain ID:", newChainId);
                return;
            }

            setActiveChainId(newChainId);

            const updateAccounts = await Promise.all(
                accounts.map(async (acc) => {
                    const balance = await getBalance(acc.address, CHAINS[newChainId].rpc);
                    return { ...acc, balance };
                })
            )
            setAccounts(updateAccounts)
        } catch (error) {
            console.error("Error changing network:", error);
        }
    }

    return (
        <WalletContext.Provider
            value={{
                setSeedPhrase,
                seedPhrase,
                accounts,
                activeChainId,
                activeAccountIndex,
                selectedAccount,
                setSelectedAccount,
                changeNetwork,
                setAccounts,
                addAccount,
                initError
            }}
        >
            {children}
        </WalletContext.Provider>
    );
};