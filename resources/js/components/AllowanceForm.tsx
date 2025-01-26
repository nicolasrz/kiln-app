import React, {useState, useEffect} from "react";
import {Inertia} from "@inertiajs/inertia";
import {route} from "ziggy-js";
import {useAccount} from "wagmi";

interface IAllowanceFormProps {
    title: string,
    allowance?: {
        id: number;
        contract_address: string;
        owner_address: string;
        spender_address: string;
        amount: number;
    };
}

interface ErrorResponse {
    [key: string]: string | string[];
}

const AllowanceForm: React.FC<IAllowanceFormProps> = ({allowance, title}) => {
    const {isConnected, address} = useAccount();
    const [errors, setErrors] = useState<string[]>([]);
    const [formData, setFormData] = useState({
        contract_address: "",
        owner_address: isConnected ? address : "",
        spender_address: "",
        amount: 0,
    });

    useEffect(() => {
        if (allowance) {
            setFormData({
                contract_address: allowance.contract_address,
                owner_address: allowance.owner_address,
                spender_address: allowance.spender_address,
                amount: allowance.amount,
            });
        } else {
            setFormData((prevData) => ({
                ...prevData,
                owner_address: isConnected ? address : "",
            }));
        }
    }, [allowance, isConnected]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const onErrors = (errors: ErrorResponse) => {
        setErrors(Object.values(errors).flat());
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            contract_address: formData.contract_address,
            owner_address: formData.owner_address || "",
            spender_address: formData.spender_address,
            ...(allowance ? {amount: formData.amount} : {}),
        };

        if (allowance) {
            Inertia.put(route("allowances.update", allowance.id), payload, {
                onError: (errors) => onErrors(errors),
            });
        } else {
            Inertia.post(route("allowances.store"), payload, {
                onError: (errors) => onErrors(errors),
            });
        }
    };

    return (
        <div className="mt-10 flex items-center justify-center bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg p-6 w-full max-w-md"
            >
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    {title}
                </h2>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        Contract Address
                    </label>
                    <input
                        type="text"
                        name="contract_address"
                        value={formData.contract_address}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        Owner Address
                    </label>
                    <input
                        type="text"
                        name="owner_address"
                        value={formData.owner_address}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        Spender Address
                    </label>
                    <input
                        type="text"
                        name="spender_address"
                        value={formData.spender_address}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                </div>
                {allowance && (
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">
                            Amount
                        </label>
                        <input
                            type="number"
                            name="amount"
                            step="0.01"
                            value={formData.amount}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                    </div>
                )}
                {errors.length > 0 && (
                    <div className="mb-4">
                        <ul className="bg-red-100 text-red-700 px-4 py-2 rounded-lg">
                            {errors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <button
                    type="submit"
                    className="w-full bg-purple-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                >
                    {allowance ? "Update" : "Create"}
                </button>
            </form>
        </div>
    );
};

export default AllowanceForm;
