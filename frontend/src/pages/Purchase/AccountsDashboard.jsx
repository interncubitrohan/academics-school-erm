import React, { useState } from 'react';
import { usePurchase } from '../../context/PurchaseContext';
import { Modal } from '../../components/ui/modal';
import { FiCheckCircle, FiXCircle, FiDollarSign, FiClock, FiFileText } from 'react-icons/fi';

const AccountsDashboard = () => {
    const { requests, completePayment } = usePurchase() || {};
    const safeRequests = requests || [];

    // Filter for requests ready for payment
    // Status: invoice_received (standard), partially_received (if allowed), fully_received
    const paymentPendingRequests = safeRequests.filter(req =>
        ['invoice_received', 'partially_received', 'fully_received'].includes(req.status)
    );

    const completedPayments = safeRequests.filter(req =>
        ['payment_completed', 'payment_rejected'].includes(req.status)
    );

    const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);

    // Payment Form State
    const [paymentForm, setPaymentForm] = useState({
        amount: '',
        paymentMode: 'Bank Transfer',
        transactionRef: '',
        paymentDate: new Date().toISOString().split('T')[0],
        remarks: ''
    });

    const [rejectRemarks, setRejectRemarks] = useState('');

    const handleOpenApprove = (req) => {
        setSelectedRequest(req);
        setPaymentForm({
            amount: req.poDetails?.totals?.grandTotal || '',
            paymentMode: 'Bank Transfer',
            transactionRef: '',
            paymentDate: new Date().toISOString().split('T')[0],
            remarks: ''
        });
        setIsApproveModalOpen(true);
    };

    const handleOpenReject = (req) => {
        setSelectedRequest(req);
        setRejectRemarks('');
        setIsRejectModalOpen(true);
    };

    const handleApproveSubmit = (e) => {
        e.preventDefault();
        if (!selectedRequest) return;

        const paymentData = {
            ...paymentForm,
            status: 'paid'
        };

        completePayment(selectedRequest.id, paymentData);
        setIsApproveModalOpen(false);
        setSelectedRequest(null);
        alert("Payment Approved and Recorded successfully.");
    };

    const handleRejectSubmit = (e) => {
        e.preventDefault();
        if (!rejectRemarks) return alert("Remarks are mandatory for rejection.");

        const paymentData = {
            status: 'rejected',
            remarks: rejectRemarks
        };

        completePayment(selectedRequest.id, paymentData);
        setIsRejectModalOpen(false);
        setSelectedRequest(null);
        alert("Payment Rejected.");
    };

    return (
        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-black dark:text-white flex items-center gap-2">
                    <FiDollarSign className="text-success" /> Accounts Department
                </h2>
                <p className="text-sm text-gray-500">Manage vendor payments and audits</p>
            </div>

            {/* Pending Payments Section */}
            <div className="rounded-2xl border border-gray-200 bg-white shadow-default dark:border-strokedark dark:bg-boxdark mb-8">
                <div className="px-4 py-6 md:px-6 xl:px-7.5 border-b border-stroke dark:border-strokedark">
                    <h4 className="text-xl font-semibold text-black dark:text-white">
                        Pending Payments
                    </h4>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                <th className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11">PO Details</th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white">Invoice Details</th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white">Vendor</th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white text-right">Amount</th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paymentPendingRequests.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-6 text-gray-500 italic">No pending payments.</td>
                                </tr>
                            ) : (
                                paymentPendingRequests.map((req) => (
                                    <tr key={req.id}>
                                        <td className="py-5 px-4 pl-9 xl:pl-11">
                                            <h5 className="font-medium text-black dark:text-white">{req.poDetails?.poNumber}</h5>
                                            <p className="text-xs text-gray-500">Ref: {req.requestId}</p>
                                        </td>
                                        <td className="py-5 px-4">
                                            {req.invoiceDetails ? (
                                                <>
                                                    <p className="text-sm text-black dark:text-white font-medium">{req.invoiceDetails.invoiceNumber}</p>
                                                    <p className="text-xs text-gray-500">{new Date(req.invoiceDetails.invoiceDate).toLocaleDateString()}</p>
                                                    {req.invoiceDetails.hasMismatches && (
                                                        <span className="text-xs text-red-500 font-bold">⚠️ Mismatches</span>
                                                    )}
                                                </>
                                            ) : (
                                                <span className="text-xs text-warning">Pending Invoice</span>
                                            )}
                                        </td>
                                        <td className="py-5 px-4">
                                            <p className="text-sm text-black dark:text-white">{req.poDetails?.vendorDetails?.name}</p>
                                        </td>
                                        <td className="py-5 px-4 text-right">
                                            <h5 className="font-bold text-success">
                                                ${req.poDetails?.totals?.grandTotal?.toFixed(2)}
                                            </h5>
                                        </td>
                                        <td className="py-5 px-4">
                                            <div className="flex items-center justify-center space-x-3.5">
                                                <button
                                                    onClick={() => handleOpenApprove(req)}
                                                    className="hover:text-success text-gray-600 transition-colors flex flex-col items-center gap-1"
                                                    title="Approve Payment"
                                                >
                                                    <div className="bg-success/10 p-2 rounded-full text-success">
                                                        <FiCheckCircle size={20} />
                                                    </div>
                                                </button>
                                                <button
                                                    onClick={() => handleOpenReject(req)}
                                                    className="hover:text-danger text-gray-600 transition-colors flex flex-col items-center gap-1"
                                                    title="Reject Payment"
                                                >
                                                    <div className="bg-danger/10 p-2 rounded-full text-danger">
                                                        <FiXCircle size={20} />
                                                    </div>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Audit Log / Completed Payments */}
            <div className="rounded-2xl border border-gray-200 bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="px-4 py-6 md:px-6 xl:px-7.5 border-b border-stroke dark:border-strokedark">
                    <h4 className="text-xl font-semibold text-black dark:text-white flex items-center gap-2">
                        <FiClock className="text-primary" /> Accounts Audit Log
                    </h4>
                </div>
                <div className="p-4 md:p-6 xl:p-7.5">
                    {completedPayments.length === 0 ? (
                        <p className="text-gray-500 italic">No transaction history found.</p>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {completedPayments.map(req => (
                                <div key={req.id} className="flex items-center justify-between p-4 border border-stroke rounded-lg dark:border-strokedark bg-gray-50 dark:bg-meta-4">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2 rounded-full ${req.status === 'payment_completed' ? 'bg-success/20 text-success' : 'bg-danger/20 text-danger'}`}>
                                            {req.status === 'payment_completed' ? <FiDollarSign size={24} /> : <FiXCircle size={24} />}
                                        </div>
                                        <div>
                                            <h5 className="font-semibold text-black dark:text-white">
                                                {req.poDetails?.poNumber} - {req.poDetails?.vendorDetails?.name}
                                            </h5>
                                            <p className="text-sm text-gray-500">
                                                {req.status === 'payment_completed'
                                                    ? `Paid via ${req.paymentDetails?.paymentMode} | Ref: ${req.paymentDetails?.transactionRef}`
                                                    : `Rejected: ${req.paymentDetails?.remarks}`
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="block font-bold text-black dark:text-white">
                                            ${req.poDetails?.totals?.grandTotal?.toFixed(2)}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {new Date(req.paymentDetails?.processedDate).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Approve Payment Modal */}
            <Modal isOpen={isApproveModalOpen} onClose={() => setIsApproveModalOpen(false)} className="max-w-lg p-6">
                <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-4 dark:border-gray-700">
                    <h3 className="text-xl font-semibold text-black dark:text-white">Approve Payment</h3>
                </div>
                <form onSubmit={handleApproveSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="mb-2 block text-black dark:text-white">Total Amount</label>
                        <input
                            type="text"
                            value={paymentForm.amount}
                            disabled
                            className="w-full rounded border border-gray-300 bg-gray-100 py-2 px-4 dark:border-gray-600 dark:bg-gray-700"
                        />
                    </div>
                    <div>
                        <label className="mb-2 block text-black dark:text-white">Payment Mode <span className="text-danger">*</span></label>
                        <select
                            value={paymentForm.paymentMode}
                            onChange={(e) => setPaymentForm({ ...paymentForm, paymentMode: e.target.value })}
                            className="w-full rounded border border-gray-300 py-2 px-4 outline-none focus:border-primary dark:border-gray-600 dark:bg-gray-800"
                            required
                        >
                            <option value="Bank Transfer">Bank Transfer</option>
                            <option value="Cash">Cash</option>
                            <option value="Cheque">Cheque</option>
                            <option value="UPI">UPI</option>
                        </select>
                    </div>
                    <div>
                        <label className="mb-2 block text-black dark:text-white">Transaction Reference ID <span className="text-danger">*</span></label>
                        <input
                            type="text"
                            value={paymentForm.transactionRef}
                            onChange={(e) => setPaymentForm({ ...paymentForm, transactionRef: e.target.value })}
                            className="w-full rounded border border-gray-300 py-2 px-4 outline-none focus:border-primary dark:border-gray-600 dark:bg-gray-800"
                            placeholder="e.g., UTR123456789"
                            required
                        />
                    </div>
                    <div>
                        <label className="mb-2 block text-black dark:text-white">Payment Date <span className="text-danger">*</span></label>
                        <input
                            type="date"
                            value={paymentForm.paymentDate}
                            onChange={(e) => setPaymentForm({ ...paymentForm, paymentDate: e.target.value })}
                            className="w-full rounded border border-gray-300 py-2 px-4 outline-none focus:border-primary dark:border-gray-600 dark:bg-gray-800"
                            required
                        />
                    </div>
                    <div>
                        <label className="mb-2 block text-black dark:text-white">Remarks</label>
                        <textarea
                            value={paymentForm.remarks}
                            onChange={(e) => setPaymentForm({ ...paymentForm, remarks: e.target.value })}
                            className="w-full rounded border border-gray-300 py-2 px-4 outline-none focus:border-primary dark:border-gray-600 dark:bg-gray-800"
                            rows="2"
                        />
                    </div>
                    <div className="flex justify-end gap-3 mt-4">
                        <button type="button" onClick={() => setIsApproveModalOpen(false)} className="px-4 py-2 rounded border hover:bg-gray-100 dark:hover:bg-gray-800">Cancel</button>
                        <button type="submit" className="px-4 py-2 rounded bg-success text-white hover:bg-success/90">Confirm Payment</button>
                    </div>
                </form>
            </Modal>

            {/* Reject Payment Modal */}
            <Modal isOpen={isRejectModalOpen} onClose={() => setIsRejectModalOpen(false)} className="max-w-lg p-6">
                <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-4 dark:border-gray-700">
                    <h3 className="text-xl font-semibold text-danger">Reject Payment</h3>
                </div>
                <form onSubmit={handleRejectSubmit} className="flex flex-col gap-4">
                    <p className="text-sm text-gray-500">Please provide a reason for rejecting this payment request.</p>
                    <div>
                        <label className="mb-2 block text-black dark:text-white">Rejection Remarks <span className="text-danger">*</span></label>
                        <textarea
                            value={rejectRemarks}
                            onChange={(e) => setRejectRemarks(e.target.value)}
                            className="w-full rounded border border-red-300 py-2 px-4 outline-none focus:border-danger dark:border-red-900 dark:bg-gray-800"
                            rows="4"
                            placeholder="Enter detailed reason..."
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-3 mt-4">
                        <button type="button" onClick={() => setIsRejectModalOpen(false)} className="px-4 py-2 rounded border hover:bg-gray-100 dark:hover:bg-gray-800">Cancel</button>
                        <button type="submit" className="px-4 py-2 rounded bg-danger text-white hover:bg-danger/90">Reject Payment</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default AccountsDashboard;
