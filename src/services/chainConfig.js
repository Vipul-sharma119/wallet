export const CHAINS = {
  1: { 
    name: 'Ethereum Mainnet', 
    rpc: import.meta.env.VITE_ETH_MAINNET_RPC_URL, 
    explorerTx: 'https://etherscan.io/tx/'
  },
  11155111: { 
    name: 'Ethereum Testnet', 
    rpc: import.meta.env.VITE_SEPOLIA_RPC,
    explorerTx: 'https://sepolia.etherscan.io/tx/',
    faucetUrl: 'https://cloud.google.com/application/web3/faucet/ethereum/sepolia'
  },
  80002: { 
    name: 'Polygon Amoy', 
    rpc: import.meta.env.VITE_POLYGON_AMOY_RPC,
    explorerTx: 'https://amoy.polygonscan.com/tx/'
  }
};