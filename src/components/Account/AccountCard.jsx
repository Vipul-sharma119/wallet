
export default function AccountCard() {
    let isLoading = false
    return (
        <div className="card">
            <p style={{ marginTop: 0, marginBottom: 8 }}>Active Account</p>
            <div className="row" style={{ alignItems: 'flex-start', gap: '8px' }}>
                <div className="address" style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', marginBottom: '4px' }}>
                        0x24334
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--muted)', wordBreak: 'break-all' }}>
                        0x24334
                    </div>
                </div>
                <button
                    className="btn btn-secondary"

                    title="Copy address to clipboard"
                    style={{ padding: '6px 8px', fontSize: '12px' }}
                >
                    Copy
                </button>
            </div>
            <div className="spacer-sm" />
            <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ margin: 0 }}>
                    <strong>Balance:</strong>{' '}
                    {isLoading ? 'Loading...' : 0}
                </p>
                <button
                    className="btn btn-secondary"

                    disabled={isLoading}
                    style={{ padding: '6px 8px', fontSize: '12px' }}
                    title="Refresh balance"
                >
                    {isLoading ? '...' : '↻'}
                </button>
            </div>
        </div>
    );
}
