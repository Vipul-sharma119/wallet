import { useState, useEffect } from "react";
import { useWalletContext } from "../../context/useWalletContext";

export default function SeedPhrasePrompt() {
  const { seedPhrase } = useWalletContext();
  const [showWelcome, setShowWelcome] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');

  useEffect(() => {
    console.log("SeedPhrasePrompt - seedPhrase:", seedPhrase);
    console.log("SeedPhrasePrompt - showWelcome:", showWelcome);
  }, [seedPhrase, showWelcome]);

  if (!seedPhrase) return null;

  const handleSaved = () => setShowWelcome(true);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(seedPhrase);
      setCopyStatus('Copied!');
      setTimeout(() => setCopyStatus(''), 2000);
    } catch {
      setCopyStatus('Failed to copy');
      setTimeout(() => setCopyStatus(''), 2000);
    }
  };

  const baseCardStyle = {
    padding: 16,
    borderRadius: 10,
    transition: "background 300ms ease",
    // No border, no highlight
    background: showWelcome
      ? "linear-gradient(135deg, rgba(231, 142, 0, 0.12), rgba(0, 0, 0, 0.14))"
      : "#14171c",
  };

  const textColor = {
    color: showWelcome ? "#ffffffff" : "#e6e6e6", // improved readability
  };

  const headingStyle = {
    margin: "0 0 8px 0",
    fontSize: 18,
    fontWeight: 600,
    color: showWelcome ? "#d35400" : "var(--mm-orange)",
    display: "flex",
    alignItems: "center",
    gap: 8,
  };

  const seedBoxStyle = {
    padding: "10px 12px",
    background: "#0c0f12",
    borderRadius: 6,
    marginBottom: 12,
    fontFamily: "monospace",
    color: "#ccc",
  };

  return (
    <div style={baseCardStyle}>
      {!showWelcome ? (
        <>
          <h3 style={headingStyle}>Save Your Seed Phrase</h3>
          <p style={{ ...textColor, marginTop: 0 }}>
            This phrase will not be shown again. Store it securely — losing it
            means losing access to your wallet.
          </p>

          <div style={seedBoxStyle}>{seedPhrase}</div>

          <div style={{ display: "flex", gap: 8 }}>
            <button
              className="btn btn-secondary"
              style={{ flex: 1 }}
              onClick={handleCopy}
            >
              {copyStatus || "Copy Seed Phrase"}
            </button>

            <button
              className="btn btn-primary"
              style={{ flex: 1 }}
              onClick={handleSaved}
            >
              I've Saved It
            </button>
          </div>
        </>
      ) : (
        <>
          <h3 style={headingStyle}>
             Welcome! - You're all set!
          </h3>

          <p style={{ ...textColor, marginTop: 0 }}>
             Your wallet is ready to use — explore, send, receive,
            and manage assets securely anytime.
            
          </p>
        </>
      )}
    </div>
  );
}
