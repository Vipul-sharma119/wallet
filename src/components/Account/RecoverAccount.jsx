

export default function RecoverAccount() {
    let showInput = true;
    let error = false;
    let loading = true;
    return (
        <div>
            <h3 style={{ marginTop: 0 }}>Account Recovery</h3>

            <div className="row end">
                <button
                    className={`btn ${showInput ? 'btn-secondary' : ''}`}
                  
                >
                    {showInput ? "Cancel" : "Recover Account"}
                </button>
            </div>

            {showInput && (
                <div className="form-group">
                    <div className="row stack">
                        <textarea
                            className="input"
                            rows="3"
                            placeholder="Enter your seed phrase"

                        />
                        <button
                            className="btn btn-primary"


                        >
                            {loading ? "Recovering..." : "Confirm Recovery"}
                        </button>
                        {error && <p className="status" style={{ color: '#ff6b6b' }}>{error}</p>}
                    </div>
                </div>
            )}
        </div>
    );
}
