import React from 'react';

const SuccessMessage = ({ message }) => {
    return (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded shadow-md">
            <div className="flex">
                <div className="py-1">
                    <svg className="h-6 w-6 text-green-500 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <div>
                    <p className="font-bold">Success!</p>
                    <p className="text-sm">{message}</p>
                </div>
            </div>
        </div>
    );
};

export default SuccessMessage;