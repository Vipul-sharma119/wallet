# 🚀 Crypto Wallet

A simple, modern crypto wallet built with React and Ethers.js. Manage your Ethereum accounts, send transactions, and switch between networks—all from a clean interface.

## What It Does

- **Create & manage multiple accounts** from a single seed phrase
- **Send ETH/POL** to any address with transaction confirmation
- **Switch networks** (Ethereum Mainnet, Sepolia, Polygon Amoy)
- **View balances** and recent transaction history
- **Recover your wallet** anytime using your seed phrase

## Quick Start

```bash
# Clone the repo
git clone https://github.com/yourusername/crypto-wallet.git
cd crypto-wallet

# Install dependencies
npm install

# Add your Alchemy API keys to .env
VITE_ETH_MAINNET_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY
VITE_SEPOLIA_RPC=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
VITE_POLYGON_AMOY_RPC=https://polygon-amoy.g.alchemy.com/v2/YOUR_API_KEY

# Run it
npm run dev
```

Get your free Alchemy API key at [alchemy.com](https://www.alchemy.com/)

## How to Use

1. **First time?** The app generates a new wallet automatically. Save your 12-word seed phrase immediately—you won't see it again!

2. **Switch networks** using the dropdown. Your balance updates automatically.

3. **Create more accounts** by clicking "Create Account". All accounts derive from your seed phrase.

4. **Send crypto** by entering a recipient address and amount. Click send and wait for confirmation.

5. **Lost your wallet?** Use "Recover Account" with your seed phrase to restore everything.

## Project Structure

```
src/
├── components/        # UI components
│   ├── Account/      # Wallet management (create, recover, display)
│   └── Wallet/       # Transactions and network switching
├── context/          # Global wallet state
├── services/         # Blockchain logic (transactions, balance, chains)
└── utils/            # Helper functions
```

## Tech Stack

- **React 19** with hooks and context
- **Ethers.js 6** for blockchain interactions
- **Vite** for fast development
- **Alchemy** for reliable RPC endpoints

## Important Notes

⚠️ **This is a demo wallet for learning purposes.** Don't store significant funds here. It's not a production-ready wallet—think of it as a portfolio project that actually works.

- Your seed phrase is shown only once. Write it down!
- Private keys live in memory (React state) while the app runs
- Always test on Sepolia testnet before using real ETH
- Never share your seed phrase or private keys with anyone

## Adding Networks

Want to add more chains? Edit `src/services/chainConfig.js`:

```javascript
export const CHAINS = {
  // Add your network here
  137: { 
    name: 'Polygon Mainnet', 
    rpc: 'YOUR_RPC_URL',
    explorerTx: 'https://polygonscan.com/tx/'
  }
};
```

## Troubleshooting

**"Failed to load balance"** → Check your `.env` file has valid API keys

**Transaction fails** → Make sure you have enough balance and you're on the right network

**Can't see seed phrase** → It only shows once after creation. Use recovery if you saved it.

