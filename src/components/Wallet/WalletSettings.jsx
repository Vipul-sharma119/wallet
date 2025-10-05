import { useState } from "react";
import { useWalletContext } from "../../context/useWalletContext";

export default function WalletSettings() {
    const { resetWallet } = useWalletContext();
    const [showConfirm, setShowConfirm] = useState(false);

    const handleReset = () => {
        if (showConfirm) {
            resetWallet();
        } else {
            setShowConfirm(true);
            // Auto-hide confirmation after 5 seconds
            setTimeout(() => setShowConfirm(false), 5000);
        }
    };

    return (
        <div>
            <h3 style={{ marginTop: 0 }}>Settings</h3>
            <div className="card" style={{ backgroundColor: '#1a1515', border: '1px solid #3a2020' }}>
                <p style={{ fontSize: '14px', color: '#ffaaaa', marginTop: 0 }}>
                     Warning
                </p>
                <p style={{ fontSize: '13px', marginBottom: 12 }}>
                    This will permanently delete your wallet from this browser. Make sure you have saved your seed phrase!
                </p>
                <button 
                    className="btn" 
                    onClick={handleReset}
                    style={{ 
                        backgroundColor: showConfirm ? '#c41e3a' : '#3a2020',
                        color: showConfirm ? '#fff' : '#ff6b6b',
                        border: showConfirm ? '1px solid #ff4444' : '1px solid #5a3030'
                    }}
                >
                    {showConfirm ? 'Click Again to Confirm Reset' : 'Reset Wallet'}
                </button>
            </div>
        </div>
    );
}