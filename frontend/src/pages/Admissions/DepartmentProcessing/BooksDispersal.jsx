import React, { useState } from 'react';

const BooksDispersal = ({ application, onStatusUpdate }) => {
    // Initialize state from props
    const [status, setStatus] = useState(
        application?.departmentStatus?.inventory?.status || 'pending'
    );

    if (!application) return null;

    const {
        classOfAdmission,
        status: appStatus,
    } = application;

    const isApproved = appStatus === 'approved' || appStatus === 'enrolled';
    const isCompleted = status === 'completed';

    const requiredBooks = [
        { name: "Mathematics Textbook", type: "Core" },
        { name: "Science Lab Manual", type: "Lab" },
        { name: "English Literature Reader", type: "Core" },
        { name: "History & Civics", type: "Core" },
        { name: "School Diary 2025-26", type: "Stationery" }
    ];

    const handleDispersal = () => {
        setStatus('completed');
        if (onStatusUpdate) onStatusUpdate('completed');
        console.log(`Department: Books | New Status: completed | App ID: ${application._id}`);
    };

    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                    Books & Inventory Dispersal
                </h3>
            </div>
            <div className="p-6.5">
                <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-4">
                        Standard book set for <span className="font-semibold text-black dark:text-white">{classOfAdmission?.name}</span>
                    </p>

                    <div className="flex flex-col gap-2 bg-gray-50 dark:bg-gray-700/30 p-4 rounded-md border border-gray-100 dark:border-gray-700">
                        <label className="mb-1 text-sm font-semibold text-black dark:text-white">
                            Required Items:
                        </label>
                        <ul className="list-inside list-disc text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            {requiredBooks.map((book, idx) => (
                                <li key={idx} className="flex items-center justify-between">
                                    <span>{book.name}</span>
                                    <span className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-0.5 rounded text-gray-700 dark:text-gray-300">{book.type}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mb-6">
                    <label className="mb-2.5 block text-black dark:text-white">
                        Inventory Status
                    </label>
                    <div
                        className={`w-full rounded border-[1.5px] border-stroke py-3 px-5 outline-none transition disabled:cursor-default disabled:bg-whiter dark:border-strokedark dark:bg-form-input ${status === 'completed'
                            ? 'bg-success/10 text-success border-success'
                            : 'bg-warning/10 text-warning border-warning'
                            }`}
                    >
                        <span className="font-medium">
                            {status === 'completed' ? 'All Items Dispersed' : 'Pending Dispersal'}
                        </span>
                    </div>
                </div>

                <button
                    className="flex w-full justify-center rounded bg-primary py-3 px-6 font-medium text-gray hover:bg-opacity-90 disabled:bg-opacity-50 disabled:cursor-not-allowed sm:w-auto"
                    onClick={handleDispersal}
                    disabled={!isApproved || isCompleted}
                >
                    {isCompleted ? 'Dispersal Verified' : 'Confirm Books Dispersal'}
                </button>

                {!isApproved && (
                    <p className="text-sm text-danger mt-3">
                        * Application must be officially approved before inventory dispersal.
                    </p>
                )}
                {isCompleted && (
                    <p className="text-sm text-success mt-3 font-medium flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        Books and inventory have been handed over.
                    </p>
                )}
            </div>
        </div>
    );
};

export default BooksDispersal;
