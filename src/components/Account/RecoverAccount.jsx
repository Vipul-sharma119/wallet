import { useState } from "react";
import { useWalletContext } from '../../context/useWalletContext';
import { deriveAccount } from "../../services/walletService";
import { getBalance } from "../../utils/getBalance";
import { CHAINS } from "../../services/chainConfig";
import { saveWalletData } from "../../services/storageService";

export default function RecoverAccount() {
    const { setAccounts, setSeedPhrase, setSelectedAccount } = useWalletContext();
    const [recoveryPhrase, setRecoveryPhrase] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showInput, setShowInput] = useState(false);

    const handleRecover = async () => {
        try {
            setLoading(true);
            setError("");
            
            const trimmedPhrase = recoveryPhrase.trim();
            
            // Validate seed phrase (basic check)
            const wordCount = trimmedPhrase.split(/\s+/).length;
            if (wordCount !== 12 && wordCount !== 24) {
                throw new Error("Invalid seed phrase. Must be 12 or 24 words.");
            }
            
            const accountList = [];
            const firstAccount = deriveAccount(trimmedPhrase, 0);
            const balance = await getBalance(firstAccount.address, CHAINS[1].rpc);

            accountList.push({
                privateKey: firstAccount.privateKey,
                address: firstAccount.address,
                balance,
                index: 0
            });
            
            // Save to storage
            saveWalletData(trimmedPhrase, 1);
            
            setAccounts(accountList);
            setSeedPhrase(trimmedPhrase);
            setSelectedAccount(accountList[0]);
            setShowInput(false);
            setRecoveryPhrase("");
        } catch (error) {
            console.error(error);
            setError(error.message || "Failed to recover account. Check your seed phrase.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h3 style={{ marginTop: 0 }}>Account Recovery</h3>

            <div className="row end">
                <button
                    className={`btn ${showInput ? 'btn-secondary' : ''}`}
                    onClick={() => setShowInput(!showInput)}
                >
                    {showInput ? "Cancel" : "Recover Account"}
                </button>
            </div>

            {showInput && (
                <div className="form-group">
                    <div className="row stack">
                        <textarea
                            className="input"
                            rows="3"
                            placeholder="Enter your 12 or 24 word seed phrase"
                            value={recoveryPhrase}
                            onChange={(e) => setRecoveryPhrase(e.target.value)}
                        />
                        <button
                            className="btn btn-primary"
                            onClick={handleRecover}
                            disabled={loading || !recoveryPhrase.trim()}
                        >
                            {loading ? "Recovering..." : "Confirm Recovery"}
                        </button>
                        {error && <p className="status" style={{ color: '#ff6b6b' }}>{error}</p>}
                    </div>
                </div>
            )}
        </div>
    );
}