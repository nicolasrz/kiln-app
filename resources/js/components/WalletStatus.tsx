import React from 'react';
import {useAccount, useDisconnect} from "wagmi";
import {formatAddress} from "../utils";
import {WalletOptions} from "../wagmi/WalletOptions";


const WalletStatus: React.FC = () => {
    const { isConnected, address } = useAccount();
    const { disconnect } = useDisconnect();

    if (!isConnected) {
        return <WalletOptions />;
    }

    return (
        <div className="flex items-center space-x-4">
            <span className="text-lg font-semibold text-gray-700">{formatAddress(address ?? '')}</span>
            <button
                onClick={() => disconnect()}
                className="bg-red-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-red-600 transition"
            >
                Disconnect
            </button>
        </div>
    );
};

export default WalletStatus;
