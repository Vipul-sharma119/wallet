

export default function ChainSelector() {

    return (
        <div>
            <h3 style={{ marginTop: 0 }}>Network</h3>
            <div className="row">
                <select
                    className="input"
                >
                    <option>Value 1</option>
                    <option>Value 2</option>
                    <option>Value 3</option>
                </select>
            </div>
            <p className="status">
                Current Network: Ethereum
            </p>
        </div>
    );
}
