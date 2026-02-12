import React, { useState } from 'react';
import { Link } from 'react-router';
import { Modal } from '../../components/ui/modal';
import { usePurchase } from '../../context/PurchaseContext';
import { FiEye, FiCheck, FiX, FiFileText } from 'react-icons/fi';

const PrincipalPurchaseApproval = () => {
    // State
    const { requests, updateRequestStatus } = usePurchase();
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [remark, setRemark] = useState('');

    // Filter only "requested" status
    const pendingRequests = requests.filter(req => req.status === 'requested');

    // Handlers
    const handleView = (request) => {
        setSelectedRequest(request);
        setRemark(''); // Reset remark
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedRequest(null);
    };

    const handleDecision = (status) => {
        if (!selectedRequest) return;

        updateRequestStatus(selectedRequest.id, status, remark);
        handleCloseModal();
        alert(`Request ${status === 'approved' ? 'Approved' : 'Rejected'} successfully!`);
    };

    return (
        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-2xl font-bold text-black dark:text-white">
                    Principal Approval
                </h2>
                <nav>
                    <ol className="flex items-center gap-2">
                        <li><Link className="font-medium" to="/">Dashboard /</Link></li>
                        <li className="font-medium text-primary">Principal Approval</li>
                    </ol>
                </nav>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="px-4 py-6 md:px-6 xl:px-7.5">
                    <h4 className="text-xl font-semibold text-black dark:text-white">
                        Pending Purchase Requests
                    </h4>
                </div>

                <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
                    <div className="col-span-2 flex items-center">
                        <p className="font-medium">Request ID</p>
                    </div>
                    <div className="col-span-2 hidden items-center sm:flex">
                        <p className="font-medium">Requester</p>
                    </div>
                    <div className="col-span-2 hidden items-center sm:flex">
                        <p className="font-medium">Department</p>
                    </div>
                    <div className="col-span-1 hidden items-center sm:flex">
                        <p className="font-medium">Date</p>
                    </div>
                    <div className="col-span-1 flex items-center justify-end">
                        <p className="font-medium">Action</p>
                    </div>
                </div>

                {pendingRequests.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">
                        No pending requests found.
                    </div>
                ) : (
                    pendingRequests.map((req) => (
                        <div
                            className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
                            key={req.id}
                        >
                            <div className="col-span-2 flex items-center">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                    <p className="text-sm text-black dark:text-white">
                                        {req.requestId}
                                    </p>
                                </div>
                            </div>
                            <div className="col-span-2 hidden items-center sm:flex">
                                <p className="text-sm text-black dark:text-white">
                                    {req.requester}
                                </p>
                            </div>
                            <div className="col-span-2 hidden items-center sm:flex">
                                <p className="text-sm text-black dark:text-white">
                                    {req.department}
                                </p>
                            </div>
                            <div className="col-span-1 hidden items-center sm:flex">
                                <p className="text-sm text-black dark:text-white">
                                    {req.requestDate}
                                </p>
                            </div>
                            <div className="col-span-1 flex items-center justify-end">
                                <button
                                    onClick={() => handleView(req)}
                                    className="hover:text-primary"
                                    title="View Details"
                                >
                                    <FiEye className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Approval Modal */}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} className="max-w-3xl p-6">
                {selectedRequest && (
                    <div className="flex flex-col gap-6">
                        <div className="flex justify-between items-center border-b border-gray-200 pb-4 dark:border-gray-700">
                            <h3 className="text-xl font-semibold text-black dark:text-white">
                                Request Details: {selectedRequest.requestId}
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <p><span className="font-semibold">Requester:</span> {selectedRequest.requester}</p>
                            <p><span className="font-semibold">Department:</span> {selectedRequest.department}</p>
                            <p><span className="font-semibold">Date:</span> {selectedRequest.requestDate}</p>
                            <p><span className="font-semibold">Total Items:</span> {selectedRequest.totalItems}</p>
                        </div>

                        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-800">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attachment</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                                    {selectedRequest.items.map(item => (
                                        <tr key={item.id}>
                                            <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-200">{item.name}</td>
                                            <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-200">{item.quantity}</td>
                                            <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{item.description}</td>
                                            <td className="px-4 py-3 text-sm text-blue-500">
                                                {item.file ? (
                                                    <a href="#" className="underline hover:text-blue-700 flex items-center gap-1">
                                                        <FiFileText /> {typeof item.file === 'string' ? item.file : item.file.name}
                                                    </a>
                                                ) : '-'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Remark / Reason</label>
                            <textarea
                                value={remark}
                                onChange={(e) => setRemark(e.target.value)}
                                rows="3"
                                className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 outline-none focus:border-primary dark:border-gray-600 dark:bg-gray-800"
                                placeholder="Add a remark for approval or rejection..."
                            ></textarea>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <button
                                onClick={() => handleDecision('rejected')}
                                className="flex items-center gap-2 rounded-lg border border-error-500 px-4 py-2 text-error-500 hover:bg-error-50 dark:hover:bg-error-500/10"
                            >
                                <FiX /> Reject
                            </button>
                            <button
                                onClick={() => handleDecision('approved')}
                                className="flex items-center gap-2 rounded-lg bg-success-500 px-4 py-2 text-white hover:bg-success-600"
                            >
                                <FiCheck /> Approve
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default PrincipalPurchaseApproval;
