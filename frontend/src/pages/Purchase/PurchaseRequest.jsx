import React, { useState } from 'react';
import { Link } from 'react-router';
import { Modal } from '../../components/ui/modal';
import PurchaseRequestForm from './components/PurchaseRequestForm';
import { usePurchase } from '../../context/PurchaseContext';
import { FiEye, FiClock, FiCheckCircle, FiXCircle } from 'react-icons/fi';

const PurchaseRequest = () => {
    const { addRequest, requests } = usePurchase();
    const [lastPayload, setLastPayload] = useState(null);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Flatten requests to show individual items in the table (matching previous view)
    const allItems = requests.flatMap(req =>
        req.items.map(item => ({
            ...item,
            status: req.status,
            submissionDate: req.requestDate, // Or formatted timestamp
            originalRequest: req // Keep reference to parent request for details view
        }))
    );

    const handleRequestSubmit = ({ items, department }) => {
        const newRequest = addRequest(items, department);
        setLastPayload(newRequest); // Show the full request object payload
    };

    const handleViewDetails = (request) => {
        setSelectedRequest(request);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedRequest(null);
    };

    return (
        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-2xl font-bold text-black dark:text-white">
                    Purchase Request
                </h2>

                <nav>
                    <ol className="flex items-center gap-2">
                        <li>
                            <Link className="font-medium" to="/">Dashboard /</Link>
                        </li>
                        <li className="font-medium text-primary">Purchase Request</li>
                    </ol>
                </nav>
            </div>

            <div className="flex flex-col gap-10">
                <PurchaseRequestForm onSubmit={handleRequestSubmit} />

                {lastPayload && (
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90">
                            Last Submitted Payload (JSON)
                        </h3>
                        <pre className="overflow-x-auto rounded bg-gray-50 p-4 text-xs text-gray-800 dark:bg-gray-900 dark:text-gray-300">
                            {JSON.stringify(lastPayload, null, 2)}
                        </pre>
                    </div>
                )}

                {allItems.length > 0 && (
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90">
                            Submitted Requests
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full whitespace-nowrap text-left text-theme-sm dark:text-white/90">
                                <thead className="border-b border-gray-200 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                                    <tr>
                                        <th className="px-4 py-3 font-medium">Item Name</th>
                                        <th className="px-4 py-3 font-medium">Quantity</th>
                                        <th className="px-4 py-3 font-medium">Description</th>
                                        <th className="px-4 py-3 font-medium">Status</th>
                                        <th className="px-4 py-3 font-medium">Date</th>
                                        <th className="px-4 py-3 font-medium">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                                    {allItems.map((req, index) => (
                                        <tr key={`${req.id}-${index}`}>
                                            <td className="px-4 py-3 text-gray-800 dark:text-white/90">{req.name}</td>
                                            <td className="px-4 py-3 text-gray-800 dark:text-white/90">{req.quantity}</td>
                                            <td className="px-4 py-3 text-gray-500 dark:text-gray-400 max-w-xs truncate">{req.description || '-'}</td>
                                            <td className="px-4 py-3">
                                                <span className="inline-flex items-center rounded-md bg-brand-50 px-2 py-1 text-xs font-medium text-brand-600 ring-1 ring-inset ring-brand-500/10 dark:bg-brand-500/10 dark:text-brand-400 dark:ring-brand-500/20">
                                                    {req.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{req.submissionDate}</td>
                                            <td className="px-4 py-3">
                                                <button
                                                    onClick={() => handleViewDetails(req.originalRequest)}
                                                    className="hover:text-primary text-gray-600 dark:text-gray-400"
                                                    title="View Audit Trail & Details"
                                                >
                                                    <FiEye className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* Request Details & Audit Trail Modal */}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} className="max-w-3xl p-6">
                {selectedRequest && (
                    <div className="flex flex-col gap-6">
                        <div className="border-b border-gray-200 pb-4 dark:border-gray-700">
                            <h3 className="text-xl font-semibold text-black dark:text-white">
                                Request Audit Trail: {selectedRequest.requestId}
                            </h3>
                        </div>

                        {/* Audit Trail Section */}
                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
                            <h4 className="mb-3 font-semibold text-gray-800 dark:text-white">Approval Workflow History</h4>
                            <div className="relative border-l-2 border-gray-200 ml-3 dark:border-gray-700 space-y-6">

                                {/* Step 1: Requested */}
                                <div className="ml-6 relative">
                                    <span className="absolute -left-[31px] flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 ring-4 ring-white dark:bg-blue-900 dark:ring-gray-900">
                                        <FiClock className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                                    </span>
                                    <h5 className="flex items-center mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                                        Request Submitted
                                    </h5>
                                    <time className="block mb-2 text-xs font-normal leading-none text-gray-400 dark:text-gray-500">
                                        {new Date(selectedRequest.requestDate).toLocaleDateString()}
                                    </time>
                                    <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                        Initiated by: {selectedRequest.requester}
                                    </p>
                                </div>

                                {/* Step 2: Approval/Rejection Decision */}
                                {(selectedRequest.status === 'approved' || selectedRequest.status === 'rejected') && (
                                    <div className="ml-6 relative">
                                        <span className={`absolute -left-[31px] flex h-8 w-8 items-center justify-center rounded-full ring-4 ring-white dark:ring-gray-900 ${selectedRequest.status === 'approved'
                                                ? 'bg-green-100 dark:bg-green-900'
                                                : 'bg-red-100 dark:bg-red-900'
                                            }`}>
                                            {selectedRequest.status === 'approved' ? (
                                                <FiCheckCircle className="h-4 w-4 text-green-600 dark:text-green-300" />
                                            ) : (
                                                <FiXCircle className="h-4 w-4 text-red-600 dark:text-red-300" />
                                            )}
                                        </span>
                                        <h5 className="flex items-center mb-1 text-sm font-semibold text-gray-900 dark:text-white capitalize">
                                            Request {selectedRequest.status}
                                        </h5>
                                        <time className="block mb-2 text-xs font-normal leading-none text-gray-400 dark:text-gray-500">
                                            {selectedRequest.approvalDate ? new Date(selectedRequest.approvalDate).toLocaleString() : '-'}
                                        </time>
                                        <div className="rounded-md border border-gray-200 bg-white p-3 text-sm text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                                            <p><span className="font-semibold">By:</span> {selectedRequest.approvedBy || selectedRequest.rejectedBy || 'Principal'}</p>
                                            <p className="mt-1"><span className="font-semibold">Remarks:</span> {selectedRequest.remarks}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Item Details Summary */}
                        <div>
                            <h4 className="mb-3 font-semibold text-gray-800 dark:text-white">Items in Request</h4>
                            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                        <tr>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                                        {selectedRequest.items.map((item, idx) => (
                                            <tr key={idx}>
                                                <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-200">{item.name}</td>
                                                <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-200">{item.quantity}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                )}
            </Modal>
        </div>
    );
};

export default PurchaseRequest;
