import React from 'react';
import { Link } from 'react-router';
import { usePurchase } from '../../context/PurchaseContext';
import {
    FiClock,
    FiCheckCircle,
    FiXCircle,
    FiShoppingBag,
    FiAlertCircle,
    FiFileText
} from 'react-icons/fi';

const MyPurchaseRequests = () => {
    const { requests } = usePurchase();

    // Helper to determine status color
    const getStatusColor = (status) => {
        switch (status) {
            case 'requested': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
            case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
            case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
            case 'purchased': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
        }
    };

    // Helper for Timeline
    const renderTimeline = (status) => {
        const steps = [
            { id: 'requested', label: 'Requested', icon: FiClock },
            { id: 'approved', label: 'Approved', icon: FiCheckCircle },
            { id: 'purchased', label: 'Purchased', icon: FiShoppingBag },
        ];

        let currentStepIndex = 0;
        if (status === 'approved') currentStepIndex = 1;
        if (status === 'purchased') currentStepIndex = 2;
        if (status === 'rejected') currentStepIndex = -1; // Special handling

        return (
            <div className="relative flex items-center justify-between w-full mt-4 mb-2">
                {/* Connecting Line */}
                <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-gray-200 dark:bg-gray-700"></div>

                {steps.map((step, index) => {
                    const isCompleted = index <= currentStepIndex && status !== 'rejected';
                    const isCurrent = index === currentStepIndex && status !== 'rejected';

                    // Special case for Rejected at step 2 (Approval stage)
                    const isRejected = status === 'rejected' && step.id === 'approved';

                    let iconClass = "z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 bg-white dark:bg-boxdark";
                    let textClass = "absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium";
                    let Icon = step.icon;

                    if (isCompleted || isCurrent) {
                        iconClass += " border-primary text-primary";
                        textClass += " text-primary";
                    } else if (isRejected) {
                        iconClass += " border-red-500 text-red-500";
                        textClass += " text-red-500";
                        Icon = FiXCircle;
                    } else {
                        iconClass += " border-gray-300 text-gray-300 dark:border-gray-600 dark:text-gray-500";
                        textClass += " text-gray-400";
                    }

                    return (
                        <div key={step.id} className="relative flex flex-col items-center">
                            <div className={iconClass}>
                                <Icon className="h-4 w-4" />
                            </div>
                            <span className={textClass}>
                                {isRejected ? 'Rejected' : step.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-2xl font-bold text-black dark:text-white">
                    My Purchase Requests
                </h2>
                <nav>
                    <ol className="flex items-center gap-2">
                        <li><Link className="font-medium" to="/">Dashboard /</Link></li>
                        <li className="font-medium text-primary">My Requests</li>
                    </ol>
                </nav>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {requests.length === 0 ? (
                    <div className="col-span-full rounded-2xl border border-gray-200 bg-white p-6 text-center text-gray-500 dark:border-strokedark dark:bg-boxdark">
                        You have not made any purchase requests yet.
                    </div>
                ) : (
                    requests.map((req) => (
                        <div key={req.id} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="mb-4 flex items-center justify-between">
                                <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                                    {req.requestId}
                                </span>
                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(req.status)}`}>
                                    {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                                </span>
                            </div>

                            <h4 className="mb-2 text-lg font-bold text-black dark:text-white">
                                {req.items.length} Item{req.items.length !== 1 && 's'} Requested
                            </h4>

                            <div className="mb-4 flex flex-col gap-2">
                                {req.items.slice(0, 3).map((item, idx) => (
                                    <div key={idx} className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                                        <span>{item.name}</span>
                                        <span className="font-medium">x{item.quantity}</span>
                                    </div>
                                ))}
                                {req.items.length > 3 && (
                                    <p className="text-xs text-gray-500">
                                        + {req.items.length - 3} more items...
                                    </p>
                                )}
                            </div>

                            <div className="mb-8 pt-2">
                                {renderTimeline(req.status)}
                            </div>

                            {req.status === 'rejected' && req.remark && (
                                <div className="mt-4 rounded bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-300">
                                    <div className="flex items-start gap-2">
                                        <FiAlertCircle className="mt-0.5 shrink-0" />
                                        <div>
                                            <span className="font-semibold block">Principal's Remark:</span>
                                            {req.remark}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="mt-4 border-t border-gray-100 pt-4 dark:border-gray-700 flex justify-between text-xs text-gray-500">
                                <span>Requested on: {req.requestDate}</span>
                                <span className="font-semibold">{req.department}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MyPurchaseRequests;
