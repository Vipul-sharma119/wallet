
export default function CreateAccount() {
    let selectedAccount = true;

    return (
        <div>
            <h3 style={{ marginTop: 0 }}>Accounts</h3>

            <div className="row stack">
                <select
                    className="input"


                >
                    <option value="">-- Select an account --</option>
                    <option>Value 1</option>
                    <option>Value 2</option>
                </select>

                <div className="row" style={{ gap: '8px' }}>
                    <button className="btn btn-primary" >
                        Create Account
                    </button>

                    {selectedAccount && (
                        <button
                            className="btn btn-secondary"

                            title="Copy address to clipboard"
                        >
                            Copy Address
                        </button>
                    )}
                </div>
            </div>

            {selectedAccount && (
                <>
                    <div className="spacer-sm" />
                    <div className="card" style={{ padding: '8px' }}>
                        <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '4px' }}>
                            Full Address:
                        </div>
                        <div style={{ fontSize: '11px', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                            {selectedAccount.address}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
