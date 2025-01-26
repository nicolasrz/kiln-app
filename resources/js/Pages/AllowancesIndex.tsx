import React from 'react';
import Navbar from "../components/Navbar";
import {PageProps} from '@inertiajs/inertia';
import AllowanceItem from "../components/AllowanceItem";


interface Props extends PageProps {
    allowances: IAllowance[];
}

const ShowAllowance: React.FC<Props> = ({allowances}) => {
    const params = new URLSearchParams(window.location.search);
    const highlightId = parseInt(params.get("h") || "0", 10);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
            <Navbar/>

            <div className="w-full max-w-5xl bg-white shadow-md rounded-lg p-6 mt-6">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">
                    Allowances
                </h1>
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="td-border text-left">ERC20 Address</th>
                        <th className="td-border text-left">Owner Address</th>
                        <th className="td-border text-left">Spender Address</th>
                        <th className="td-border text-right">Amount</th>
                        <th className="td-border text-center">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {allowances.map((allowance) => (
                        <AllowanceItem allowance={allowance} isBlinking={allowance.id === highlightId}
                                       key={`${allowance.id}-${allowance.contract_address}-${allowance.owner_address}`}/>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ShowAllowance;
