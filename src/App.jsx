import { WalletProvider } from "./context/WalletContext";
import AccountCard from "./components/Account/AccountCard";
import SeedPhrasePrompt from "./components/Account/SeedPhrasePrompt";
import './App.css';
import CreateAccount from "./components/Account/CreateAccount";
import RecoverAccount from "./components/Account/RecoverAccount";
import SendCrypto from "./components/Wallet/SendCrypto";
import ChainSelector from "./components/Wallet/ChainSelector";
import RecentActivity from "./components/Wallet/RecentActivity";
import WalletSettings from "./components/Wallet/WalletSettings";

function App() {
  return (
    <WalletProvider>
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
            <RecoverAccount />
          </div>

          <div className="section">
            <WalletSettings />
          </div>
        </div>

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
      </div>
    </WalletProvider>
  );
}

export default App;