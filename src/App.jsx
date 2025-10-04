import { WalletProvider } from "./context/WalletContext";
import { useWalletContext } from "./context/useWalletContext";
import './App.css';

// Simple test component
function TestComponent() {
  const { seedPhrase, accounts, initError } = useWalletContext();
  
  console.log("=== TestComponent Render ===");
  console.log("seedPhrase:", seedPhrase);
  console.log("accounts:", accounts);
  console.log("initError:", initError);
  
  return (
    <div className="wallet-shell">
      <div className="panel">
        <h2>Wallet Debug Test</h2>
        
        <div className="card">
          <h3>Seed Phrase Status</h3>
          <p><strong>Exists:</strong> {seedPhrase ? "YES ✓" : "NO ✗"}</p>
          {seedPhrase && (
            <div className="address" style={{ marginTop: 10 }}>
              {seedPhrase}
            </div>
          )}
        </div>

        <div className="card" style={{ marginTop: 16 }}>
          <h3>Accounts</h3>
          <p><strong>Count:</strong> {accounts.length}</p>
          {accounts.map((acc, i) => (
            <div key={i} style={{ marginTop: 8 }}>
              <p><strong>Account {i}:</strong></p>
              <div className="address" style={{ fontSize: 11 }}>
                {acc.address}
              </div>
            </div>
          ))}
        </div>

        <div className="card" style={{ marginTop: 16, backgroundColor: '#1a1f27' }}>
          <h3>Environment Check</h3>
          <p><strong>ETH Mainnet RPC:</strong> {import.meta.env.VITE_ETH_MAINNET_RPC_URL ? '✓ Set' : '✗ Missing'}</p>
          <p><strong>Sepolia RPC:</strong> {import.meta.env.VITE_SEPOLIA_RPC ? '✓ Set' : '✗ Missing'}</p>
          <p><strong>Polygon Amoy RPC:</strong> {import.meta.env.VITE_POLYGON_AMOY_RPC ? '✓ Set' : '✗ Missing'}</p>
          
          {import.meta.env.VITE_ETH_MAINNET_RPC_URL && (
            <div style={{ marginTop: 10, fontSize: 11, wordBreak: 'break-all' }}>
              <strong>Sample RPC URL:</strong> {import.meta.env.VITE_ETH_MAINNET_RPC_URL.substring(0, 50)}...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <WalletProvider>
      <TestComponent />
    </WalletProvider>
  );
}

export default App;