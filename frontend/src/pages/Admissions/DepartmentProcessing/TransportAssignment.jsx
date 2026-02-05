import React, { useState } from 'react';

const TransportAssignment = ({ application, onStatusUpdate }) => {
    const [status, setStatus] = useState(
        application?.departmentStatus?.transport?.status || 'pending'
    );
    const [route, setRoute] = useState('');
    const [stop, setStop] = useState('');

    if (!application) return null;

    const {
        busNeeded,
        status: appStatus,
    } = application;

    if (!busNeeded) {
        return null;
    }

    const isApproved = appStatus === 'approved' || appStatus === 'enrolled';
    const isCompleted = status === 'completed';

    const handleAssignment = () => {
        if (route.trim() && stop.trim()) {
            setStatus('completed');
            if (onStatusUpdate) onStatusUpdate('completed');
            console.log(`Department: Transport | New Status: completed | Route: ${route}, Stop: ${stop} | App ID: ${application._id}`);
        } else {
            alert('Please assign both Route and Stop.');
        }
    };

    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                    Transportation Details
                </h3>
            </div>
            <div className="p-6.5">
                <div className="mb-4 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Bus Route
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Route A (North City)"
                            value={route}
                            onChange={(e) => setRoute(e.target.value)}
                            disabled={isCompleted}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>

                    <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Pickup Stop
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Central Plaza Stop"
                            value={stop}
                            onChange={(e) => setStop(e.target.value)}
                            disabled={isCompleted}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                </div>

                <div className="mb-6">
                    <label className="mb-2.5 block text-black dark:text-white">
                        Transport Status
                    </label>
                    <div
                        className={`w-full rounded border-[1.5px] border-stroke py-3 px-5 outline-none transition disabled:cursor-default disabled:bg-whiter dark:border-strokedark dark:bg-form-input ${status === 'completed'
                            ? 'bg-success/10 text-success border-success'
                            : 'bg-warning/10 text-warning border-warning'
                            }`}
                    >
                        <span className="font-medium">
                            {status === 'completed' ? 'Route Assigned' : 'Pending Assignment'}
                        </span>
                    </div>
                </div>

                <button
                    className="flex w-full justify-center rounded bg-primary py-3 px-6 font-medium text-gray hover:bg-opacity-90 disabled:bg-opacity-50 disabled:cursor-not-allowed sm:w-auto"
                    onClick={handleAssignment}
                    disabled={!isApproved || isCompleted}
                >
                    {isCompleted ? 'Transport Assigned' : 'Confirm Transport'}
                </button>

                {!isApproved && (
                    <p className="text-sm text-danger mt-3">
                        * Application must be approved before route allocation.
                    </p>
                )}
                {isCompleted && (
                    <p className="text-sm text-success mt-3 font-medium flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        Transport assigned: {route} - {stop}
                    </p>
                )}
            </div>
        </div>
    );
};

export default TransportAssignment;
