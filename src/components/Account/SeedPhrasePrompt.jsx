import { useState, useEffect } from "react";
import { useWalletContext } from "../../context/useWalletContext";
export default function SeedPhrasePrompt() {
    const { seedPhrase } = useWalletContext();
    const [dismissed, setDismissed] = useState(false);
    const [copyStatus, setCopyStatus] = useState('');

    useEffect(() => {
        console.log("SeedPhrasePrompt - seedPhrase:", seedPhrase);
        console.log("SeedPhrasePrompt - dismissed:", dismissed);
    }, [seedPhrase, dismissed]);

    if (!seedPhrase || dismissed) {
        console.log("SeedPhrasePrompt not rendering - seedPhrase:", seedPhrase, "dismissed:", dismissed);
        return null;
    }

    console.log("SeedPhrasePrompt rendering with phrase:", seedPhrase);

    const handleDismiss = () => {
        setDismissed(true);
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(seedPhrase);
            setCopyStatus('Copied!');
            setTimeout(() => setCopyStatus(''), 2000);
        } catch (err) {
            console.error('Failed to copy seed phrase:', err);
            setCopyStatus('Failed to copy');
            setTimeout(() => setCopyStatus(''), 2000);
        }
    };

    return (
        <div className="card" style={{ backgroundColor: '#1a1f27', border: '1px solid var(--mm-orange)' }}>
            <h3 style={{ marginTop: 0, color: 'var(--mm-orange)' }}>Save Your Seed Phrase</h3>
            <p>
                This phrase will not be shown again. Store it securely — if lost, you
                cannot recover your wallet.
            </p>
            <div className="address" style={{ marginBottom: 10 }}>{seedPhrase}</div>
            <div className="row" style={{ gap: '8px' }}>
                <button
                    className="btn btn-secondary"
                    onClick={handleCopy}
                    style={{ flex: 1 }}
                >
                    {copyStatus || 'Copy Seed Phrase'}
                </button>
                <button
                    className="btn btn-primary"
                    onClick={handleDismiss}
                    style={{ flex: 1 }}
                >
                    I've Saved It
                </button>
            </div>
        </div>
    );
}