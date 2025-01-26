import React from 'react';
import WalletStatus from "./WalletStatus";
import { route } from "ziggy-js";

const Navbar: React.FC = () => {
    const getLinkClass = (path: string) => {
        const currentPath = window.location.pathname;
        return currentPath === path
            ? 'nav-link-selected'
            : 'nav-link';
    };

    return (
        <nav className="w-full bg-white shadow-md p-4 rounded-lg flex justify-between items-center">
            <div className="flex space-x-4">
                <a
                    href={route('allowances.index')}
                    className={getLinkClass('/') || getLinkClass('/allowances')}
                >
                    Overview
                </a>
                <a
                    href={route('allowances.create')}
                    className={getLinkClass('/allowances/create')}
                >
                    Add
                </a>
            </div>
            <div className="text-gray-800 font-semibold bg-gray-100 py-2 px-4 rounded-full">
                <WalletStatus/>
            </div>
        </nav>
    );
};

export default Navbar;
