import React from "react";
import {route} from "ziggy-js";
import {Inertia} from "@inertiajs/inertia";
import {formatAddress} from "../utils";


interface Props {
    allowance: IAllowance;
    isBlinking: boolean
}

const AllowanceItem: React.FC<Props> = ({allowance, isBlinking}) => {
    const handleDelete = (id: number) => {
        if (window.confirm("Are you sure you want to revoke this allowance?")) {
            Inertia.delete(route('allowances.destroy', id), {
                onError: (errors) => {
                    alert('Failed to delete allowance');
                    console.error('Failed to delete allowance:', errors);
                },
            });
        }
    };
    console.log(isBlinking)
    return (
        <tr key={allowance.id} className={isBlinking ? 'blinkUpdated' : ''}>
            <td className="td-border">{formatAddress(allowance.contract_address)}</td>
            <td className="td-border">{formatAddress(allowance.owner_address)}</td>
            <td className="td-border">{formatAddress(allowance.spender_address)}</td>
            <td className="td-border text-right">{allowance.amount}</td>
            <td className="td-border text-center">
                <a href={route('allowances.edit', allowance.id)}
                   className="bg-purple-200 text-purple-700 font-medium px-4 py-1 rounded-lg mr-2 hover:bg-purple-300
                transition">
                    Edit
                </a>
                <button
                    onClick={() => handleDelete(allowance.id)}
                    className="bg-red-200 text-red-700 font-medium px-4 py-1 rounded-lg hover:bg-red-300 transition">
                    Revoke
                </button>
            </td>
        </tr>
    );
}

export default AllowanceItem;
