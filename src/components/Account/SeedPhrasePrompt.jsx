import { useState, useEffect } from "react";
import { useWalletContext } from "../../context/useWalletContext";

export default function SeedPhrasePrompt() {
    const { seedPhrase } = useWalletContext();
    const [dismissed, setDismissed] = useState(false);

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

    return (
        <div className="card" style={{ backgroundColor: '#1a1f27', border: '1px solid var(--mm-orange)' }}>
            <h3 style={{ marginTop: 0, color: 'var(--mm-orange)' }}>⚠️ Save Your Seed Phrase</h3>
            <p>
                This phrase will not be shown again. Store it securely — if lost, you
                cannot recover your wallet.
            </p>
            <div className="address" style={{ marginBottom: 10 }}>{seedPhrase}</div>
            <button
                className="btn btn-primary"
                onClick={handleDismiss}
            >
                I've Saved It
            </button>
        </div>
    );
}