import React from 'react';
import Navbar from "../components/Navbar";
import {PageProps} from '@inertiajs/inertia';
import AllowanceForm from "../components/AllowanceForm";

interface Props extends PageProps {
    allowance: IAllowance;
}

const AllowancesEdit: React.FC<Props> = ({allowance}) => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
            <Navbar/>
            <div className="w-full">
            <AllowanceForm title="Edit Allowance" allowance={allowance}/>
            </div>
        </div>
    );
};

export default AllowancesEdit;
