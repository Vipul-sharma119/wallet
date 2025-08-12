

export default function SeedPhrasePrompt() {

    return (
        <div className="card">
            <h3 style={{ marginTop: 0 }}>Save Your Seed Phrase</h3>
            <p>
                This phrase will not be shown again. Store it securely — if lost, you
                cannot recover your wallet.
            </p>
            <div className="address" style={{ marginBottom: 10 }}>Seed Phrase</div>
            <button
                className="btn btn-primary"

            >
                I've Saved It
            </button>
        </div>
    );
}
