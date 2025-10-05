
const STORAGE_KEY = 'wallet_data';


const encode = (str) => {
    try {
        return btoa(unescape(encodeURIComponent(str)));
    } catch (e) {
        console.error('Encoding error:', e);
        return null;
    }
};

const decode = (str) => {
    try {
        return decodeURIComponent(escape(atob(str)));
    } catch (e) {
        console.error('Decoding error:', e);
        return null;
    }
};


export const saveWalletData = (seedPhrase, accountCount = 1) => {
    try {
        const data = {
            seedPhrase,
            accountCount,
            timestamp: Date.now()
        };
        
        
        const encoded = encode(JSON.stringify(data));
        
        if (!encoded) {
            throw new Error('Failed to encode wallet data');
        }
        
        localStorage.setItem(STORAGE_KEY, encoded);
        console.log('Wallet data saved to storage');
        return true;
    } catch (error) {
        console.error('Failed to save wallet data:', error);
        return false;
    }
};


export const loadWalletData = () => {
    try {
        const encoded = localStorage.getItem(STORAGE_KEY);
        if (!encoded) {
            console.log('No wallet data found in storage');
            return null;
        }
        
       
        const decodedStr = decode(encoded);
        if (!decodedStr) {
            throw new Error('Failed to decode wallet data');
        }
        
        const data = JSON.parse(decodedStr);
        console.log('✅ Wallet data loaded from storage');
        return data;
    } catch (error) {
        console.error('Failed to load wallet data:', error);
      
        localStorage.removeItem(STORAGE_KEY);
        return null;
    }
};


export const clearWalletData = () => {
    try {
        localStorage.removeItem(STORAGE_KEY);
        console.log('✅ Wallet data cleared from storage');
        return true;
    } catch (error) {
        console.error('Failed to clear wallet data:', error);
        return false;
    }
};


export const hasStoredWallet = () => {
    return localStorage.getItem(STORAGE_KEY) !== null;
};