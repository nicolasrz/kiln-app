import * as React from 'react';
import { Connector, useConnect } from 'wagmi';
import { useWallet } from '../context/WalletContext';
import {ChevronDownIcon} from "@heroicons/react/16/solid";

export function WalletOptions() {
    const { connectors } = useConnect();
    const { setAddress } = useWallet();
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-full hover:bg-gray-200 focus:outline-none"
            >
                <span>Connect Wallet</span>
                <ChevronDownIcon className="h-5 w-5 text-gray-600" />
            </button>

            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                    <div className="py-1">
                        {connectors.map((connector) => (
                            <WalletOption
                                key={connector.uid}
                                connector={connector}
                                onClick={() => handleConnect(connector, setAddress)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function WalletOption({
                          connector,
                          onClick,
                      }: {
    connector: Connector;
    onClick: () => void;
}) {
    const [ready, setReady] = React.useState(false);

    React.useEffect(() => {
        (async () => {
            const provider = await connector.getProvider();
            setReady(!!provider);
        })();
    }, [connector]);

    return (
        <button
            disabled={!ready}
            onClick={onClick}
            className="block w-full text-left py-2 px-4 text-gray-700 hover:bg-gray-100 disabled:text-gray-400 disabled:bg-gray-200"
        >
            {connector.name}
        </button>
    );
}

async function handleConnect(
    connector: Connector,
    setAddress: (address: string | null) => void
) {
    try {
        const { accounts } = await connector.connect();
        if (accounts.length > 0) {
            setAddress(accounts[0]);
        } else {
            console.error('No account found');
        }
    } catch (error) {
        console.error('Connection failed:', error);
    }
}
