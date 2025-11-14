import React, { useEffect, useRef, useState } from "react";
import { useWalletContext } from "../../context/useWalletContext";

export default function CreateAccount() {
  const { addAccount, accounts, setSelectedAccount, selectedAccount } = useWalletContext();

  const [status, setStatus] = useState(""); 
  const prevCountRef = useRef(accounts?.length || 0);

  // detect new account creation 
  useEffect(() => {
    const prev = prevCountRef.current;
    const cur = accounts?.length || 0;

    if (cur > prev) {
      
      const newAcc = accounts[accounts.length - 1];
      if (newAcc) {
        setSelectedAccount(newAcc);
        setStatus("success");
        
        const t = setTimeout(() => setStatus(""), 2500);
        return () => clearTimeout(t);
      }
    }
    prevCountRef.current = cur;
  }, [accounts, setSelectedAccount]);

  
  const handleAdd = async () => {
    try {
      setStatus("creating");
     
      const res = addAccount && addAccount();
      
      if (res && typeof res.then === "function") {
        await res;
      }
      
      setTimeout(() => {
        if (status === "creating") setStatus("success");
        setTimeout(() => setStatus(""), 1500);
      }, 800);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setTimeout(() => setStatus(""), 2500);
    }
  };

  const shortenAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyToClipboard = async (address) => {
    try {
      await navigator.clipboard.writeText(address);
    
      setStatus("copied");
      setTimeout(() => setStatus(""), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
      setStatus("error");
      setTimeout(() => setStatus(""), 2000);
    }
  };

  const handleChange = (e) => {
    const acc = accounts.find((a) => a.address === e.target.value);
    setSelectedAccount(acc);
  };

  return (
    <div>
      <h3 style={{ marginTop: 0 }}>Accounts</h3>

      <div className="row stack">
        <select className="input" value={selectedAccount?.address || ""} onChange={handleChange}>
          <option value="">-- Select an account --</option>
          {accounts && accounts.length > 0 ? (
            accounts.map((acc) => (
              <option key={acc.index} value={acc.address}>
                {`#${acc.index} - ${shortenAddress(acc.address)} (Bal:${acc.balance})`}
              </option>
            ))
          ) : (
            <option disabled>No accounts available</option>
          )}
        </select>

        <div className="row" style={{ gap: "8px" }}>
          <button className="btn btn-primary" onClick={handleAdd} disabled={status === "creating"}>
            {status === "creating" ? "Generating…" : "Generate New wallet"}
          </button>

          {selectedAccount && (
            <button
              className="btn btn-secondary"
              onClick={() => copyToClipboard(selectedAccount.address)}
              title="Copy address to clipboard"
            >
              Copy Address
            </button>
          )}
        </div>
      </div>

      
      <div style={{ minHeight: 22, marginTop: 8 }}>
        {status === "success" && <div style={{ color: "green" }}>Wallet generated Successfully</div>}
        {status === "creating" && <div style={{ color: "orange" }}>Creating New wallet…</div>}
        {status === "copied" && <div style={{ color: "green" }}>Address copied</div>}
        {status === "error" && <div style={{ color: "red" }}>Something went wrong</div>}
      </div>

      {selectedAccount && (
        <>
          <div className="spacer-sm" />
          <div className="card" style={{ padding: "8px" }}>
            <div style={{ fontSize: "12px", color: "var(--muted)", marginBottom: "4px" }}>Full Address:</div>
            <div style={{ fontSize: "11px", fontFamily: "monospace", wordBreak: "break-all" }}>
              {selectedAccount.address}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
