import React from 'react';
import Navbar from "../components/Navbar";
import AllowanceForm from "../components/AllowanceForm";


const AllowancesCreate: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
            <Navbar/>

            <div className="w-full">
                <AllowanceForm title="Create Allowance"/>
            </div>
        </div>
    );
};

export default AllowancesCreate;
