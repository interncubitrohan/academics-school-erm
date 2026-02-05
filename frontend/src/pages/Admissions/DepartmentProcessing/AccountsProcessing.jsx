import React, { useState } from 'react';

const AccountsProcessing = ({ application, onStatusUpdate }) => {
    // Initialize state from props
    const [status, setStatus] = useState(
        application?.departmentStatus?.accounts?.status || 'pending'
    );

    if (!application) return null;

    const {
        firstName,
        lastName,
        classOfAdmission,
        feeStructure,
        status: appStatus,
    } = application;

    const netFee = feeStructure?.totals?.net || 0;
    const isApproved = appStatus === 'approved' || appStatus === 'enrolled';
    const isCompleted = status === 'completed';

    const handleStatusUpdate = (newStatus) => {
        setStatus(newStatus);
        if (onStatusUpdate) onStatusUpdate(newStatus);
        console.log(`Department: Accounts | New Status: ${newStatus} | App ID: ${application._id}`);
    };

    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                    Accounts Department Processing
                </h3>
            </div>
            <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Student Name
                        </label>
                        <div className="w-full rounded border-[1.5px] border-stroke bg-gray py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
                            {firstName} {lastName}
                        </div>
                    </div>

                    <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Class
                        </label>
                        <div className="w-full rounded border-[1.5px] border-stroke bg-gray py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
                            {classOfAdmission?.name || 'N/A'}
                        </div>
                    </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Net Fee Amount
                        </label>
                        <div className="w-full rounded border-[1.5px] border-stroke bg-gray py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
                            ₹ {netFee.toLocaleString()}
                        </div>
                    </div>

                    <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Fee Status
                        </label>
                        <div
                            className={`w-full rounded border-[1.5px] border-stroke py-3 px-5 outline-none transition disabled:cursor-default disabled:bg-whiter dark:border-strokedark dark:bg-form-input ${status === 'completed'
                                ? 'bg-success/10 text-success border-success'
                                : 'bg-warning/10 text-warning border-warning'
                                }`}
                        >
                            <span className="font-medium">
                                {status === 'completed' ? 'Paid / Verified' : 'Pending Payment'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-4 mt-6">
                    {!isCompleted && (
                        <button
                            onClick={() => handleStatusUpdate('in_progress')}
                            disabled={!isApproved || status === 'in_progress'}
                            className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90 disabled:bg-opacity-50 disabled:cursor-not-allowed"
                        >
                            Mark "In Progress"
                        </button>
                    )}
                    <button
                        onClick={() => handleStatusUpdate('completed')}
                        disabled={!isApproved || isCompleted}
                        className="flex justify-center rounded bg-success py-2 px-6 font-medium text-gray hover:bg-opacity-90 disabled:bg-opacity-50 disabled:cursor-not-allowed"
                    >
                        {isCompleted ? 'Payment Verified' : 'Mark "Payment Received"'}
                    </button>
                </div>

                {!isApproved && (
                    <p className="text-sm text-danger mt-3">
                        * Application must be officially approved before processing department fees.
                    </p>
                )}
                {isCompleted && (
                    <p className="text-sm text-success mt-3 font-medium flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        Accounts processing completed.
                    </p>
                )}
            </div>
        </div>
    );
};

export default AccountsProcessing;
