import React, { useState } from 'react';
import { Link } from 'react-router';
import { Modal } from '../../components/ui/modal';
import PurchaseRequestForm from './components/PurchaseRequestForm';
import { usePurchase } from '../../context/PurchaseContext';
import { FiEye, FiClock, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../../components/ui/table";
import Badge from "../../components/ui/badge/Badge";

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
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                <h2 className="text-xl font-semibold text-black dark:text-white">
                    Purchase Request
                </h2>

                <nav>
                    <ol className="flex items-center gap-2">
                        <li>
                            <Link className="font-medium hover:text-primary" to="/">Dashboard /</Link>
                        </li>
                        <li className="font-medium text-primary">Purchase Request</li>
                    </ol>
                </nav>
            </div>

            <div className="flex flex-col gap-10">
                <PurchaseRequestForm onSubmit={handleRequestSubmit} />

                {lastPayload && (
                    <div className="rounded-sm border border-gray-200 bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-gray-700 dark:bg-gray-800 sm:px-7.5 xl:pb-6">
                        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90">
                            Last Submitted Payload (JSON)
                        </h3>
                        <pre className="overflow-x-auto rounded-lg bg-gray-50 p-4 text-xs text-black dark:bg-gray-900 dark:text-white">
                            {JSON.stringify(lastPayload, null, 2)}
                        </pre>
                    </div>
                )}

                {allItems.length > 0 && (
                    <div className="rounded-sm border border-gray-200 bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-gray-700 dark:bg-gray-800 sm:px-7.5 xl:pb-1">
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90">
                                Submitted Requests
                            </h3>
                        </div>
                        <div className="max-w-full overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-gray-50 dark:bg-gray-700 text-left">
                                        <TableCell isHeader className="px-4 py-4 font-medium text-black dark:text-white">Item Name</TableCell>
                                        <TableCell isHeader className="px-4 py-4 font-medium text-black dark:text-white">Quantity</TableCell>
                                        <TableCell isHeader className="px-4 py-4 font-medium text-black dark:text-white">Description</TableCell>
                                        <TableCell isHeader className="px-4 py-4 font-medium text-black dark:text-white">Status</TableCell>
                                        <TableCell isHeader className="px-4 py-4 font-medium text-black dark:text-white">Date</TableCell>
                                        <TableCell isHeader className="px-4 py-4 font-medium text-black dark:text-white text-right">Action</TableCell>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {allItems.map((req, index) => (
                                        <TableRow key={`${req.id}-${index}`} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                            <TableCell className="px-4 py-4 border-b border-[#eee] dark:border-gray-700 text-black dark:text-white text-sm">{req.name}</TableCell>
                                            <TableCell className="px-4 py-4 border-b border-[#eee] dark:border-gray-700 text-black dark:text-white text-sm">{req.quantity}</TableCell>
                                            <TableCell className="px-4 py-4 border-b border-[#eee] dark:border-gray-700 text-gray-500 max-w-xs truncate text-sm">{req.description || '-'}</TableCell>
                                            <TableCell className="px-4 py-4 border-b border-[#eee] dark:border-gray-700">
                                                <Badge
                                                    size="sm"
                                                    color={
                                                        req.status === 'approved' ? 'success' :
                                                            req.status === 'rejected' ? 'danger' :
                                                                'warning'
                                                    }
                                                >
                                                    {req.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="px-4 py-4 border-b border-[#eee] dark:border-gray-700 text-gray-500 text-sm">{new Date(req.submissionDate).toLocaleDateString()}</TableCell>
                                            <TableCell className="px-4 py-4 border-b border-[#eee] dark:border-gray-700 text-right">
                                                <button
                                                    onClick={() => handleViewDetails(req.originalRequest)}
                                                    className="hover:text-primary text-gray-600 dark:text-gray-400 transition-colors"
                                                    title="View Audit Trail & Details"
                                                >
                                                    <FiEye className="w-5 h-5" />
                                                </button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                )}
            </div>

            {/* Request Details & Audit Trail Modal */}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} className="max-w-3xl p-6">
                {selectedRequest && (
                    <div className="space-y-6">
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
                                        <div className="rounded-lg border border-gray-200 bg-white p-3 text-sm text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
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
                            <div className="max-w-full overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-gray-50 dark:bg-gray-800">
                                            <TableCell isHeader className="px-4 py-2 text-left font-medium text-gray-500 uppercase text-xs">Item</TableCell>
                                            <TableCell isHeader className="px-4 py-2 text-left font-medium text-gray-500 uppercase text-xs">Qty</TableCell>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {selectedRequest.items.map((item, idx) => (
                                            <TableRow key={idx}>
                                                <TableCell className="px-4 py-2 text-sm text-gray-900 dark:text-gray-200 border-b border-gray-100 dark:border-gray-700">{item.name}</TableCell>
                                                <TableCell className="px-4 py-2 text-sm text-gray-900 dark:text-gray-200 border-b border-gray-100 dark:border-gray-700">{item.quantity}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>

                    </div>
                )}
            </Modal>
        </div>
    );
};

export default PurchaseRequest;
