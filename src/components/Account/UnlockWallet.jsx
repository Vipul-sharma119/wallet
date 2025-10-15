import { useState } from 'react';
import './UnlockWallet.css';

const UnlockWallet = ({ onUnlock, error: externalError, onRecoverWallet }) => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showRecovery, setShowRecovery] = useState(false);
    const [recoveryPhrase, setRecoveryPhrase] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!password.trim()) {
            setError('Please enter your password');
            return;
        }

        setError('');
        setIsLoading(true);

        try {
            await onUnlock(password);
        } catch (err) {
            setError(err.message || 'Invalid password. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRecovery = async (e) => {
        e.preventDefault();

        if (!recoveryPhrase.trim()) {
            setError('Please enter your seed phrase');
            return;
        }

        if (newPassword.length < 8) {
            setError('New password must be at least 8 characters');
            return;
        }

        if (newPassword !== confirmNewPassword) {
            setError('Passwords do not match');
            return;
        }

        setError('');
        setIsLoading(true);

        try {
            await onRecoverWallet(recoveryPhrase.trim(), newPassword);
            setShowRecovery(false);
            setRecoveryPhrase('');
            setNewPassword('');
            setConfirmNewPassword('');
        } catch (err) {
            setError(err.message || 'Failed to recover wallet. Please check your seed phrase.');
        } finally {
            setIsLoading(false);
        }
    };

    const toggleRecoveryMode = () => {
        setShowRecovery(!showRecovery);
        setError('');
        setPassword('');
        setRecoveryPhrase('');
        setNewPassword('');
        setConfirmNewPassword('');
    };

    const displayError = error || externalError;

    // --- Recovery mode ---
    if (showRecovery) {
        return (
            <div className="unlock-wallet-overlay">
                <div className="unlock-wallet-container">
                    <div className="unlock-header">
                        <div className="unlock-logo">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
                                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h1>Recover Wallet</h1>
                        <p>Enter your seed phrase to recover your wallet</p>
                    </div>

                    <form onSubmit={handleRecovery} className="unlock-form">
                        <div className="input-group">
                            <label htmlFor="recoveryPhrase">Seed Phrase</label>
                            <textarea
                                id="recoveryPhrase"
                                value={recoveryPhrase}
                                onChange={(e) => setRecoveryPhrase(e.target.value)}
                                placeholder="Enter your 12-word seed phrase"
                                rows="3"
                                disabled={isLoading}
                                className="password-input-wrapper"
                                style={{
                                    width: '100%',
                                    padding: '14px 16px',
                                    background: '#0f1218',
                                    border: '1px solid #2a2f36',
                                    borderRadius: '10px',
                                    fontSize: '14px',
                                    color: '#e6e6e6',
                                    resize: 'vertical',
                                    fontFamily: 'inherit'
                                }}
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="newPassword">New Password</label>
                            <div className="password-input-wrapper">
                                <input
                                    type={showNewPassword ? 'text' : 'password'}
                                    id="newPassword"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Enter new password (min. 8 characters)"
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    disabled={isLoading}
                                >
                                    {showNewPassword ? '🙈' : '👁️'}
                                </button>
                            </div>
                        </div>

                        <div className="input-group">
                            <label htmlFor="confirmNewPassword">Confirm New Password</label>
                            <div className="password-input-wrapper">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="confirmNewPassword"
                                    value={confirmNewPassword}
                                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    placeholder="Re-enter new password"
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    disabled={isLoading}
                                >
                                    {showConfirmPassword ? '🙈' : '👁️'}
                                </button>
                            </div>
                            {displayError && (
                                <div className="error-message">
                                    ⚠️ {displayError}
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="unlock-button"
                            disabled={isLoading || !recoveryPhrase.trim() || !newPassword || !confirmNewPassword}
                        >
                            {isLoading ? (
                                <>
                                    <span className="spinner"></span> Recovering...
                                </>
                            ) : (
                                <>🔑 Recover Wallet</>
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={toggleRecoveryMode}
                            disabled={isLoading}
                            style={{
                                width: '100%',
                                marginTop: '12px',
                                padding: '12px',
                                background: 'transparent',
                                border: '1px solid #2a2f36',
                                borderRadius: '10px',
                                color: '#a0a8b8',
                                fontSize: '14px',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            Back to Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // --- Login mode ---
    return (
        <div className="unlock-wallet-overlay">
            <div className="unlock-wallet-container">
                <div className="unlock-header">
                    <div className="unlock-logo">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
                            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <h1>Welcome Back!</h1>
                    <p>Unlock your wallet with your password</p>
                </div>

                <form onSubmit={handleSubmit} className="unlock-form">
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-input-wrapper">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                autoFocus
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                                disabled={isLoading}
                            >
                                {showPassword ? '🙈' : '👁️'}
                            </button>
                        </div>
                        {displayError && (
                            <div className="error-message">⚠️ {displayError}</div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="unlock-button"
                        disabled={isLoading || !password.trim()}
                    >
                        {isLoading ? (
                            <>
                                <span className="spinner"></span> Unlocking...
                            </>
                        ) : (
                            <>🔓 Unlock Wallet</>
                        )}
                    </button>

                    <button
                        type="button"
                        onClick={toggleRecoveryMode}
                        disabled={isLoading}
                        style={{
                            width: '100%',
                            marginTop: '12px',
                            padding: '12px',
                            background: 'transparent',
                            border: '1px solid #2a2f36',
                            borderRadius: '10px',
                            color: '#a0a8b8',
                            fontSize: '14px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        Forgot Password?
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UnlockWallet;
