import React, { useState } from 'react';
import { Modal } from '../../components/ui/modal';
import { usePurchase } from '../../context/PurchaseContext';
import { FiEye, FiCheck, FiX, FiFileText } from 'react-icons/fi';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../../components/ui/table";

const PrincipalPurchaseApproval = () => {
    // State
    const { requests, updateRequestStatus } = usePurchase();
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [remark, setRemark] = useState('');
    const [error, setError] = useState('');

    // Filter only "requested" status
    const pendingRequests = requests.filter(req => req.status === 'requested');

    // Handlers
    const handleView = (request) => {
        setSelectedRequest(request);
        setRemark(''); // Reset remark
        setError('');
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedRequest(null);
    };

    const handleDecision = (status) => {
        if (!selectedRequest) return;

        if (!remark.trim()) {
            setError('Remarks are mandatory for approval or rejection.');
            return;
        }

        updateRequestStatus(selectedRequest.id, status, remark);
        handleCloseModal();
    };

    return (
        <div className="space-y-6">
            <PageBreadcrumb pageTitle="Principal Approval" />

            <div className="rounded-sm border border-gray-200 bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-gray-700 dark:bg-gray-800 sm:px-7.5 xl:pb-1">
                <div className="mb-4">
                    <h4 className="text-xl font-semibold text-black dark:text-white">
                        Pending Purchase Requests
                    </h4>
                </div>

                <div className="max-w-full overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50 dark:bg-gray-700 text-left">
                                <TableCell isHeader className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                    Request ID
                                </TableCell>
                                <TableCell isHeader className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                    Requester
                                </TableCell>
                                <TableCell isHeader className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                    Department
                                </TableCell>
                                <TableCell isHeader className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                    Date
                                </TableCell>
                                <TableCell isHeader className="py-4 px-4 font-medium text-black dark:text-white text-right">
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pendingRequests.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="border-b border-[#eee] py-5 px-4 text-center dark:border-gray-700 text-gray-500 italic">
                                        No pending requests found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                pendingRequests.map((req) => (
                                    <TableRow key={req.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                        <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700 xl:pl-11">
                                            <p className="font-medium text-black dark:text-white">{req.requestId}</p>
                                        </TableCell>
                                        <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                            <p className="text-black dark:text-white">{req.requester}</p>
                                        </TableCell>
                                        <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                            <p className="text-black dark:text-white">{req.department}</p>
                                        </TableCell>
                                        <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                            <p className="text-sm text-gray-500">{new Date(req.requestDate).toLocaleDateString()}</p>
                                        </TableCell>
                                        <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700 text-right">
                                            <button
                                                onClick={() => handleView(req)}
                                                className="hover:text-primary transition-colors text-gray-600"
                                                title="View Details"
                                            >
                                                <FiEye className="w-5 h-5" />
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Approval Modal */}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} className="max-w-3xl p-6">
                {selectedRequest && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center border-b border-gray-200 pb-4 dark:border-gray-700">
                            <h3 className="text-xl font-semibold text-black dark:text-white">
                                Request Details: {selectedRequest.requestId}
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <p><span className="font-semibold text-black dark:text-white">Requester:</span> {selectedRequest.requester}</p>
                            <p><span className="font-semibold text-black dark:text-white">Department:</span> {selectedRequest.department}</p>
                            <p><span className="font-semibold text-black dark:text-white">Date:</span> {selectedRequest.requestDate}</p>
                            <p><span className="font-semibold text-black dark:text-white">Total Items:</span> {selectedRequest.totalItems}</p>
                        </div>

                        <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-gray-50 dark:bg-gray-800">
                                        <TableCell isHeader className="px-4 py-3 text-left font-medium text-gray-500 uppercase text-xs">Item</TableCell>
                                        <TableCell isHeader className="px-4 py-3 text-left font-medium text-gray-500 uppercase text-xs">Quantity</TableCell>
                                        <TableCell isHeader className="px-4 py-3 text-left font-medium text-gray-500 uppercase text-xs">Description</TableCell>
                                        <TableCell isHeader className="px-4 py-3 text-left font-medium text-gray-500 uppercase text-xs">Attachment</TableCell>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {selectedRequest.items.map(item => (
                                        <TableRow key={item.id}>
                                            <TableCell className="px-4 py-3 text-sm text-gray-900 dark:text-gray-200 border-b border-gray-100 dark:border-gray-700">{item.name}</TableCell>
                                            <TableCell className="px-4 py-3 text-sm text-gray-900 dark:text-gray-200 border-b border-gray-100 dark:border-gray-700">{item.quantity}</TableCell>
                                            <TableCell className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700">{item.description}</TableCell>
                                            <TableCell className="px-4 py-3 text-sm text-blue-500 border-b border-gray-100 dark:border-gray-700">
                                                {item.file ? (
                                                    <a href="#" className="underline hover:text-blue-700 flex items-center gap-1">
                                                        <FiFileText /> {typeof item.file === 'string' ? item.file : item.file.name}
                                                    </a>
                                                ) : '-'}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Remarks <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                value={remark}
                                onChange={(e) => {
                                    setRemark(e.target.value);
                                    if (e.target.value.trim()) setError('');
                                }}
                                rows="3"
                                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white ${error ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="Mandatory remarks for approval or rejection..."
                            ></textarea>
                            {error && <p className="text-sm text-red-500">{error}</p>}
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <button
                                onClick={() => handleDecision('rejected')}
                                className="flex items-center gap-2 rounded-lg border border-red-500 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                            >
                                <FiX /> Reject
                            </button>
                            <button
                                onClick={() => handleDecision('approved')}
                                className="flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 transition-colors"
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
