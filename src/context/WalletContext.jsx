import { createContext, useState, useEffect } from "react"
import { deriveAccount } from "../services/walletService";
import { getBalance } from "../utils/getBalance";
import { CHAINS } from "../services/chainConfig";
import { saveWalletData, loadWalletData, clearWalletData } from "../services/storageService";

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
                
                // Step 1: Check if wallet data exists in storage
                const storedData = loadWalletData();
                
                let currentSeed;
                let accountsToLoad = 1;
                
                if (storedData && storedData.seedPhrase) {
                    // Load existing wallet
                    console.log("✅ Found existing wallet in storage");
                    currentSeed = storedData.seedPhrase;
                    accountsToLoad = storedData.accountCount || 1;
                } else {
                    // Generate new wallet
                    console.log("🆕 Generating new wallet...");
                    const accountData = deriveAccount(null, 0);
                    currentSeed = accountData.seedPhrase;
                    
                    // Save to storage
                    saveWalletData(currentSeed, 1);
                }
                
                // Step 2: Set seed phrase
                setSeedPhrase(currentSeed);
                
                // Step 3: Derive all accounts
                const rpcUrl = CHAINS[activeChainId]?.rpc;
                if (!rpcUrl) {
                    throw new Error("RPC URL is not configured. Check your .env file.");
                }
                
                const derivedAccounts = [];
                for (let i = 0; i < accountsToLoad; i++) {
                    const { privateKey, address } = deriveAccount(currentSeed, i);
                    
                    let balance = "0";
                    try {
                        balance = await getBalance(address, rpcUrl);
                    } catch (balanceError) {
                        console.warn(`Could not fetch balance for account ${i}:`, balanceError.message);
                    }
                    
                    derivedAccounts.push({ privateKey, address, balance, index: i });
                }
                
                // Step 4: Set accounts and select the first one
                setAccounts(derivedAccounts);
                setSelectedAccount(derivedAccounts[0]);
                
                console.log("✅ Wallet initialization complete!");
                console.log(`Loaded ${derivedAccounts.length} account(s)`);
                
            } catch (error) {
                console.error("❌ Error initializing wallet:", error);
                setInitError(error.message);
            }
        }

        initWallet();
    }, []); // Empty dependency array - only run once

    const addAccount = async () => {
        try {
            const newIndex = accounts.length;
            const { privateKey, address } = deriveAccount(seedPhrase, newIndex);
            const balance = await getBalance(address, CHAINS[activeChainId].rpc);
            const newAccount = { privateKey, address, balance, index: newIndex };
            const updatedAccounts = [...accounts, newAccount];
            setAccounts(updatedAccounts);
            
            // Update storage with new account count
            saveWalletData(seedPhrase, updatedAccounts.length);
        } catch (error) {
            console.error("Error adding account:", error);
        }
    };

    const changeNetwork = async (newChainId) => {
        try {
            if (!CHAINS[newChainId]) {
                console.error("Unsupported chain ID:", newChainId);
                return;
            }

            setActiveChainId(newChainId);

            const updatedAccounts = await Promise.all(
                accounts.map(async (acc) => {
                    const balance = await getBalance(acc.address, CHAINS[newChainId].rpc);
                    return { ...acc, balance };
                })
            );
            setAccounts(updatedAccounts);
        } catch (error) {
            console.error("Error changing network:", error);
        }
    };

    const resetWallet = () => {
        // Clear storage and reset state
        clearWalletData();
        setAccounts([]);
        setSeedPhrase(null);
        setSelectedAccount(null);
        window.location.reload(); // Reload to reinitialize
    };

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
                resetWallet,
                initError
            }}
        >
            {children}
        </WalletContext.Provider>
    );
};