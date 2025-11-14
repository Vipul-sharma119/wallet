import { useState } from "react";
import { useWalletContext } from "../../context/useWalletContext";

export default function WalletSettings() {
    const { resetWallet, seedPhrase } = useWalletContext();
    const [showModal, setShowModal] = useState(false);
    const [confirmText, setConfirmText] = useState("");
    const [isResetting, setIsResetting] = useState(false);

    const handleResetClick = () => {
        setShowModal(true);
    };

    const handleConfirmReset = async () => {
        if (confirmText.toLowerCase() !== "reset wallet") {
            return;
        }

        try {
            setIsResetting(true);
            await resetWallet();
            // Wallet will automatically redirect to setup screen
        } catch (error) {
            console.error('Error resetting wallet:', error);
            alert('Failed to reset wallet. Please try again.');
        } finally {
            setIsResetting(false);
            setShowModal(false);
            setConfirmText("");
        }
    };

    const handleCancel = () => {
        setShowModal(false);
        setConfirmText("");
    };

    return (
        <div>
            <h3 style={{ marginTop: 0 }}>Settings</h3>
            
            <div className="card" style={{ backgroundColor: '#1a1515', border: '1px solid #3a2020', marginBottom: '16px' }}>
                <p style={{ fontSize: '14px', color: '#ffaaaa', marginTop: 0, fontWeight: 600 }}>
                     
                </p>
                <p style={{ fontSize: '13px', marginBottom: 12, lineHeight: 1.5 }}>
                    This will permanently delete your wallet from this browser. 
                    <strong style={{ color: '#ff6b6b' }}> Make sure you have saved your seed phrase!</strong>
                </p>
                <button 
                    className="btn" 
                    onClick={handleResetClick}
                    style={{ 
                        backgroundColor: '#3a2020',
                        color: '#ff6b6b',
                        border: '1px solid #5a3030'
                    }}
                >
                    Reset Wallet
                </button>
            </div>

            {/* Reset Confirmation Modal */}
            {showModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.85)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10000,
                    padding: '20px'
                }}>
                    <div style={{
                        background: 'linear-gradient(180deg, #1c2027, #171a21)',
                        border: '2px solid #c41e3a',
                        borderRadius: '16px',
                        padding: '32px',
                        maxWidth: '480px',
                        width: '100%',
                        boxShadow: '0 16px 40px rgba(196, 30, 58, 0.3)'
                    }}>
                        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                            <div style={{ fontSize: '48px', marginBottom: '12px' }}></div>
                            <h2 style={{ margin: '0 0 8px 0', color: '#ff4444', fontSize: '24px' }}>
                                Reset Wallet?
                            </h2>
                            <p style={{ margin: 0, color: '#a0a8b8', fontSize: '14px' }}>
                                This action cannot be undone!
                            </p>
                        </div>

                        {seedPhrase && (
                            <div style={{
                                background: 'rgba(246, 133, 27, 0.08)',
                                border: '1px solid rgba(246, 133, 27, 0.3)',
                                borderRadius: '12px',
                                padding: '16px',
                                marginBottom: '20px'
                            }}>
                                <p style={{ 
                                    margin: '0 0 8px 0', 
                                    fontSize: '12px', 
                                    fontWeight: 600,
                                    color: '#f6851b'
                                }}>
                                     Your Seed Phrase (Last Chance!)
                                </p>
                                <div style={{
                                    background: '#0b0f16',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    fontFamily: 'monospace',
                                    fontSize: '11px',
                                    color: '#e6e6e6',
                                    wordBreak: 'break-word',
                                    lineHeight: 1.6
                                }}>
                                    {seedPhrase}
                                </div>
                            </div>
                        )}

                        <div style={{
                            background: 'rgba(255, 71, 87, 0.1)',
                            border: '1px solid rgba(255, 71, 87, 0.3)',
                            borderRadius: '12px',
                            padding: '16px',
                            marginBottom: '20px'
                        }}>
                            <p style={{ 
                                margin: 0, 
                                fontSize: '13px', 
                                lineHeight: 1.5,
                                color: '#e6e6e6'
                            }}>
                                <strong>This will delete:</strong>
                            </p>
                            <ul style={{ 
                                margin: '8px 0 0 0', 
                                paddingLeft: '20px',
                                fontSize: '13px',
                                color: '#a0a8b8'
                            }}>
                                <li>All your wallet accounts</li>
                                <li>Your encrypted seed phrase</li>
                                <li>Imported tokens</li>
                                <li>All wallet data from this browser</li>
                            </ul>
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ 
                                display: 'block', 
                                marginBottom: '8px',
                                fontSize: '13px',
                                fontWeight: 600,
                                color: '#e6e6e6'
                            }}>
                                Type "RESET WALLET" to confirm:
                            </label>
                            <input
                                type="text"
                                value={confirmText}
                                onChange={(e) => setConfirmText(e.target.value)}
                                placeholder="RESET WALLET"
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    background: '#0f1218',
                                    border: '1px solid #2a2f36',
                                    borderRadius: '10px',
                                    color: '#e6e6e6',
                                    fontSize: '14px',
                                    boxSizing: 'border-box'
                                }}
                                disabled={isResetting}
                                autoFocus
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button
                                onClick={handleCancel}
                                disabled={isResetting}
                                style={{
                                    flex: 1,
                                    padding: '14px',
                                    background: '#0f1218',
                                    border: '1px solid #2a2f36',
                                    borderRadius: '10px',
                                    color: '#e6e6e6',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    cursor: isResetting ? 'not-allowed' : 'pointer',
                                    opacity: isResetting ? 0.5 : 1
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmReset}
                                disabled={confirmText.toLowerCase() !== "reset wallet" || isResetting}
                                style={{
                                    flex: 1,
                                    padding: '14px',
                                    background: confirmText.toLowerCase() === "reset wallet" && !isResetting
                                        ? 'linear-gradient(180deg, #ff4444, #c41e3a)'
                                        : '#3a2020',
                                    border: 'none',
                                    borderRadius: '10px',
                                    color: '#fff',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    cursor: confirmText.toLowerCase() === "reset wallet" && !isResetting
                                        ? 'pointer'
                                        : 'not-allowed',
                                    opacity: confirmText.toLowerCase() === "reset wallet" && !isResetting ? 1 : 0.5
                                }}
                            >
                                {isResetting ? 'Resetting...' : 'Reset Wallet'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}