import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { mockRequests } from './PrintRequest';

const PrintRequestDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [request, setRequest] = useState(null);

    useEffect(() => {
        // Find request by string ID
        const found = mockRequests.find(req => String(req.id) === String(id));
        if (found) {
            setRequest({ ...found });
        } else {
            // Handle not found
            navigate('/printing/my-requests');
        }
    }, [id, navigate]);

    const handleStatusUpdate = (newStatus) => {
        // Find request in mock data
        const found = mockRequests.find(req => String(req.id) === String(id));
        if (!found) return;

        // Update mock data immutably (for local state)
        found.status = newStatus;

        // Update local state to trigger immediate re-render
        setRequest({ ...found });

        // Dispatch event for other components to sync
        window.dispatchEvent(new Event('printRequestsUpdated'));

        // Optional: show feedback (for mock)
        alert(`Status updated to: ${newStatus}`);
    };

    if (!request) return <div className="p-10 text-center text-gray-500">Loading request details...</div>;

    // Destructure delivery details if available
    const { deliveryDetails } = request;

    return (
        <div className="mx-auto max-w-270">
            {/* Header */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                        Print Request #{id}
                    </h2>
                    <p className="text-sm text-gray-500 font-medium">
                        Submitted on: {new Date(request.createdAt).toLocaleString()}
                    </p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => navigate('/printing/my-requests')}
                        className="flex items-center gap-2 rounded border border-primary py-2 px-4 font-medium text-primary hover:bg-opacity-90 transition"
                    >
                        Back to List
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-9 xl:grid-cols-3">
                {/* Left Column: Request Details (2/3 width) */}
                <div className="xl:col-span-2 flex flex-col gap-9">
                    {/* File & Print Specs */}
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                File & Print Specifications
                            </h3>
                        </div>
                        <div className="p-6.5">
                            <div className="mb-6 flex items-start gap-6">
                                {/* File Icon / Preview Placeholder */}
                                <div className="flex items-center justify-center h-24 w-24 flex-shrink-0 rounded bg-gray-50 dark:bg-meta-4 border border-dashed border-gray-300">
                                    {request.file?.previewUrl ? (
                                        <img src={request.file.previewUrl} alt="Preview" className="h-full w-full object-contain p-1" onError={(e) => e.target.style.display = 'none'} />
                                    ) : (
                                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-lg font-medium text-black dark:text-white mb-1">
                                        {request.file?.name || "Untitled File"}
                                    </h4>
                                    <p className="text-sm text-gray-500 mb-3">
                                        Type: {request.file?.type || "Unknown"}
                                    </p>
                                    <div className="flex flex-wrap gap-4">
                                        <div className="bg-gray-50 px-3 py-1 rounded dark:bg-meta-4">
                                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Copies</span>
                                            <p className="text-black dark:text-white font-medium">{request.copies}</p>
                                        </div>
                                        <div className="bg-gray-50 px-3 py-1 rounded dark:bg-meta-4">
                                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Sides</span>
                                            <p className="text-black dark:text-white font-medium capitalize">{request.printSide} Sided</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                className="inline-flex items-center justify-center gap-2.5 rounded bg-primary py-2 px-6 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                                onClick={() => alert("Downloading file...")}
                            >
                                <span>
                                    <svg className="fill-current w-5 h-5" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
                                </span>
                                Download File
                            </button>
                        </div>
                    </div>

                    {/* Delivery Information */}
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Logistics & Delivery
                            </h3>
                        </div>
                        <div className="p-6.5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-black dark:text-white mb-1">Requested By</label>
                                    <p className="text-black dark:text-white font-medium flex items-center gap-2">
                                        {request.requester?.name}
                                        <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">
                                            {request.requester?.role}
                                        </span>
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 mb-1">Delivery Mode</label>
                                    <p className="text-black dark:text-white font-medium capitalize">
                                        {request.deliveryMode.replace('_', ' ')}
                                    </p>
                                </div>
                            </div>

                            {request.deliveryMode === 'delivery' && deliveryDetails && (
                                <div className="mt-6 border-t border-stroke pt-6 dark:border-strokedark">
                                    <h4 className="font-semibold text-black dark:text-white mb-4">Drop-off Location</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div className="bg-gray-50 p-3 rounded dark:bg-meta-4">
                                            <span className="block text-xs font-medium text-gray-500 uppercase">Block</span>
                                            <span className="text-black dark:text-white font-semibold">{deliveryDetails.block}</span>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded dark:bg-meta-4">
                                            <span className="block text-xs font-medium text-gray-500 uppercase">Floor</span>
                                            <span className="text-black dark:text-white font-semibold">{deliveryDetails.floor}</span>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded dark:bg-meta-4">
                                            <span className="block text-xs font-medium text-gray-500 uppercase">Room</span>
                                            <span className="text-black dark:text-white font-semibold">{deliveryDetails.roomNumber}</span>
                                        </div>
                                    </div>
                                    {deliveryDetails.directions && (
                                        <div className="mt-4">
                                            <label className="block text-sm font-medium text-gray-500 mb-1">Instructions</label>
                                            <p className="text-sm text-black dark:text-white bg-gray-50 p-3 rounded dark:bg-meta-4 italic">
                                                "{deliveryDetails.directions}"
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column: Status & Actions (1/3 width) */}
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sticky top-24">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Status & Actions
                            </h3>
                        </div>
                        <div className="p-6.5 flex flex-col gap-6">
                            {/* Status Badge */}
                            <div className="text-center">
                                <span className={`inline-block rounded py-1 px-3 text-lg font-bold uppercase tracking-wide 
                                    ${request.status === 'approved' ? 'bg-success bg-opacity-10 text-success' :
                                        request.status === 'printing' ? 'bg-warning bg-opacity-10 text-warning' :
                                            request.status === 'printed' ? 'bg-primary bg-opacity-10 text-primary' :
                                                request.status === 'delivered' ? 'bg-success text-success' :
                                                    'bg-gray bg-opacity-10 text-gray-dark'}`}>
                                    {request.status.replace('_', ' ')}
                                </span>
                                <p className="text-xs text-gray-500 mt-2">Current Status</p>
                            </div>

                            <hr className="border-stroke dark:border-strokedark" />

                            {/* Action Buttons */}
                            <div className="flex flex-col gap-3">
                                <h4 className="text-sm font-medium text-black dark:text-white">Workflow Actions</h4>
                                {request.status === 'requested' && (
                                    <div className="text-sm text-center text-warning bg-warning bg-opacity-10 p-3 rounded">
                                        Awaiting Approval
                                    </div>
                                )}

                                {request.status === 'approved' && (
                                    <button
                                        onClick={() => handleStatusUpdate('printing')}
                                        className="flex w-full justify-center rounded bg-warning p-3 font-medium text-white hover:bg-opacity-90 transition shadow-card"
                                    >
                                        Start Printing Job
                                    </button>
                                )}

                                {request.status === 'printing' && (
                                    <button
                                        onClick={() => handleStatusUpdate('printed')}
                                        className="flex w-full justify-center rounded bg-success p-3 font-medium text-white hover:bg-opacity-90 transition shadow-card"
                                    >
                                        Mark as Printed
                                    </button>
                                )}

                                {request.status === 'printed' && (
                                    <button
                                        onClick={() => handleStatusUpdate(request.deliveryMode === 'delivery' ? 'delivered' : 'taken_away')}
                                        className="flex w-full justify-center rounded bg-primary p-3 font-medium text-white hover:bg-opacity-90 transition shadow-card"
                                    >
                                        Confirm {request.deliveryMode === 'delivery' ? 'Delivery' : 'Pickup'}
                                    </button>
                                )}

                                {['delivered', 'taken_away'].includes(request.status) && (
                                    <div className="text-sm text-center text-success bg-success bg-opacity-10 p-3 rounded font-medium">
                                        Request Completed
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrintRequestDetail;
