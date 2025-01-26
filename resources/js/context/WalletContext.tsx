import React, {createContext, useContext, useState, ReactNode} from 'react';

interface WalletContextType {
    address: string | null;
    setAddress: (address: string | null) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [address, setAddress] = useState<string | null>(null);

    return (
        <WalletContext.Provider value={{address, setAddress}}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = (): WalletContextType => {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error('useWallet must be used within a WalletProvider');
    }
    return context;
};
