
export default function SendCrypto() {



    return (
        <div>
            <h3 style={{ marginTop: 0 }}>Send Crypto</h3>
            <div className="row stack">
                <input
                    className="input"
                    type="text"
                    placeholder="Recipient Address"


                />
                <input
                    className="input"
                    type="number"
                    placeholder={`Amount 'ETH'})`}


                />
                <div className="spacer-sm" />
                <button className="btn btn-primary" >Send</button>
            </div>
            <p className="status">Status</p>
        </div>
    );
}
