import { useWalletContext } from "../../context/useWalletContext";
import { CHAINS } from "../../services/chainConfig";

export default function DebugInfo() {
    const { seedPhrase, accounts, activeChainId } = useWalletContext();

    return (
        <div className="card" style={{ backgroundColor: '#1a1a2e', padding: '10px', fontSize: '12px' }}>
            <h4 style={{ marginTop: 0 }}>🔍 Debug Info</h4>
            <div>
                <strong>Seed Phrase exists:</strong> {seedPhrase ? 'YES ✓' : 'NO ✗'}
            </div>
            <div>
                <strong>Seed Phrase value:</strong> {seedPhrase ? seedPhrase.substring(0, 30) + '...' : 'null'}
            </div>
            <div>
                <strong>Accounts count:</strong> {accounts.length}
            </div>
            <div>
                <strong>Active Chain ID:</strong> {activeChainId}
            </div>
            <div>
                <strong>RPC URL:</strong> {CHAINS[activeChainId]?.rpc ? 'Configured ✓' : 'Missing ✗'}
            </div>
            {!CHAINS[activeChainId]?.rpc && (
                <div style={{ color: '#ff6b6b', marginTop: '8px' }}>
                    ⚠️ RPC URL is missing! Check your .env file
                </div>
            )}
        </div>
    );
}