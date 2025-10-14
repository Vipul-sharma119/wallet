import { useState } from "react";
import { useWalletContext } from "./context/useWalletContext";
import { WalletProvider } from "./context/WalletProvider";
import SetupPassword from "./components/Account/SetupPassword";
import UnlockWallet from "./components/Account/UnlockWallet";
import AccountCard from "./components/Account/AccountCard";
import SeedPhrasePrompt from "./components/Account/SeedPhrasePrompt";
import './App.css';
import CreateAccount from "./components/Account/CreateAccount";
import RecoverAccount from "./components/Account/RecoverAccount";
import SendCrypto from "./components/Wallet/SendCrypto";
import ChainSelector from "./components/Wallet/ChainSelector";
import RecentActivity from "./components/Wallet/RecentActivity";
import TokenList from "./components/Wallet/TokenList";
import ImportToken from "./components/Wallet/ImportToken";
import WalletSettings from "./components/Wallet/WalletSettings";
// FIX: Change this import path to match actual file location (lowercase 'chat')
import ChatAssistant from "./components/chat/ChatAssistant";

function AppContent() {
  const { isLocked, hasWallet, createWalletWithPassword, unlockWallet, lockWallet } = useWalletContext();
  const [showSeedPhrase, setShowSeedPhrase] = useState(false);
  const [newSeedPhrase, setNewSeedPhrase] = useState('');

  // Show password setup for first-time users
  const handleSetupPassword = async (password) => {
    try {
      const seedPhrase = await createWalletWithPassword(password);
      setNewSeedPhrase(seedPhrase);
      setShowSeedPhrase(true);
    } catch (error) {
      console.error('Setup failed:', error);
      throw error;
    }
  };

  // Show unlock screen for returning users
  const handleUnlock = async (password) => {
    try {
      await unlockWallet(password);
    } catch (error) {
      console.error('Unlock failed:', error);
      throw error;
    }
  };

  // Close seed phrase backup and proceed to wallet
  const handleSeedPhraseSaved = () => {
    setShowSeedPhrase(false);
    setNewSeedPhrase('');
  };

  // Case 1: New user - Show password setup
  if (!hasWallet) {
    return <SetupPassword onSetupComplete={handleSetupPassword} />;
  }

  // Case 2: Show seed phrase backup after wallet creation
  if (showSeedPhrase && newSeedPhrase) {
    return (
      <div className="seed-phrase-backup-overlay">
        <div className="seed-phrase-backup-container">
          <div className="backup-header">
            <div className="backup-icon">🔐</div>
            <h1>Backup Your Seed Phrase</h1>
            <p>Write this down and keep it safe! You'll need it to recover your wallet.</p>
          </div>

          <div className="seed-phrase-display">
            <div className="seed-words">
              {newSeedPhrase.split(' ').map((word, index) => (
                <div key={index} className="seed-word">
                  <span className="word-number">{index + 1}</span>
                  <span className="word-text">{word}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="backup-warning">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <p>
              Never share your seed phrase! Anyone with these words can access your wallet and funds.
              Store it safely offline.
            </p>
          </div>

          <button
            className="backup-continue-button"
            onClick={handleSeedPhraseSaved}
          >
            I've Written It Down Safely
          </button>
        </div>
      </div>
    );
  }

  // Case 3: Wallet locked - Show unlock screen
  if (isLocked) {
    return <UnlockWallet onUnlock={handleUnlock} />;
  }

  // Case 4: Wallet unlocked - Show main wallet interface
  return (
    <div className="wallet-shell">
      <div className="app-header">
        <div className="app-title">
          <div className="app-title-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span>Crypto Wallet</span>
        </div>

        {/* Lock button */}
        <button
          className="lock-button"
          onClick={lockWallet}
          title="Lock Wallet"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M16 9V7a4 4 0 10-8 0v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Lock
        </button>
      </div>

      <div className="panel">
        <div className="section">
          <SeedPhrasePrompt />
        </div>

        <div className="section">
          <ChainSelector />
        </div>

        <div className="section">
          <AccountCard />
        </div>

        <div className="section">
          <CreateAccount />
        </div>

        <div className="section">
          <SendCrypto />
        </div>

        <div className="section">
          <RecentActivity />
        </div>

        <div className="section">
          <ImportToken />
        </div>

        <div className="section">
          <TokenList />
        </div>

        <div className="section">
          <RecoverAccount />
        </div>

        <div className="section">
          <WalletSettings />
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <div className="footer-links">
          <a 
            href="https://github.com/Vipul-sharma119/wallet" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            View on GitHub
          </a>
        </div>
        <div className="footer-signature">
          Made with ❤️ by{' '}
          <a 
            href="https://x.com/_vipul_1902" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
          >
            Vipul Sharma
          </a>
        </div>
      </div>

      {/* Chat Assistant - Floating */}
      <ChatAssistant />
    </div>
  );
}

function App() {
  return (
    <WalletProvider>
      <AppContent />
    </WalletProvider>
  );
}

export default App;