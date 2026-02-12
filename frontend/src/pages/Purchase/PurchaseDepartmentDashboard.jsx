import React, { useState } from 'react';
import { Link } from 'react-router';
import { usePurchase } from '../../context/PurchaseContext';
import { Modal } from '../../components/ui/modal';
import { FiEdit, FiFileText, FiUploadCloud } from 'react-icons/fi';

const PurchaseDepartmentDashboard = () => {
    const { requests, completePurchase } = usePurchase();
    const approvedRequests = requests.filter(req => req.status === 'approved');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [billingType, setBillingType] = useState('individual'); // 'individual' or 'total'

    // Purchase Form State
    const [purchaseDetails, setPurchaseDetails] = useState({});

    const handleUpdatePurchase = (request) => {
        setSelectedRequest(request);
        // Initialize form state
        const initialDetails = request.items.reduce((acc, item) => ({
            ...acc,
            [item.id]: {
                purchasedQuantity: item.quantity,
                amount: '',
                file: null
            }
        }), {});
        setPurchaseDetails({
            items: initialDetails,
            totalAmount: '',
            totalFile: null
        });
        setBillingType('individual');
        setIsModalOpen(true);
    };

    const handleItemChange = (itemId, field, value) => {
        setPurchaseDetails(prev => ({
            ...prev,
            items: {
                ...prev.items,
                [itemId]: {
                    ...prev.items[itemId],
                    [field]: value
                }
            }
        }));
    };

    const handleTotalChange = (field, value) => {
        setPurchaseDetails(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const finalData = {
            billingType,
            ...purchaseDetails
        };

        completePurchase(selectedRequest.id, finalData);
        setIsModalOpen(false);
        setSelectedRequest(null);
        alert("Purchase updated successfully!");
    };


    return (
        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-2xl font-bold text-black dark:text-white">
                    Purchase Department
                </h2>
                <nav>
                    <ol className="flex items-center gap-2">
                        <li><Link className="font-medium" to="/">Dashboard /</Link></li>
                        <li className="font-medium text-primary">Purchase Dept.</li>
                    </ol>
                </nav>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="px-4 py-6 md:px-6 xl:px-7.5">
                    <h4 className="text-xl font-semibold text-black dark:text-white">
                        Approved Requests
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
                        <p className="font-medium">Date Approved</p>
                    </div>
                    <div className="col-span-1 flex items-center justify-end">
                        <p className="font-medium">Action</p>
                    </div>
                </div>

                {approvedRequests.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">
                        No approved requests pending purchase.
                    </div>
                ) : (
                    approvedRequests.map((req) => (
                        <div
                            className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
                            key={req.id}
                        >
                            <div className="col-span-2 flex items-center">
                                <p className="text-sm text-black dark:text-white">{req.requestId}</p>
                            </div>
                            <div className="col-span-2 hidden items-center sm:flex">
                                <p className="text-sm text-black dark:text-white">{req.requester}</p>
                            </div>
                            <div className="col-span-2 hidden items-center sm:flex">
                                <p className="text-sm text-black dark:text-white">{req.department}</p>
                            </div>
                            <div className="col-span-1 hidden items-center sm:flex">
                                <p className="text-sm text-black dark:text-white">{req.requestDate}</p>
                            </div>
                            <div className="col-span-1 flex items-center justify-end">
                                <button
                                    onClick={() => handleUpdatePurchase(req)}
                                    className="flex items-center gap-1 rounded bg-primary px-3 py-1 text-xs font-medium text-white hover:bg-opacity-90"
                                >
                                    <FiEdit /> Update
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Update Purchase Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className="max-w-4xl p-6">
                {selectedRequest && (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="flex justify-between items-center border-b border-gray-200 pb-4 dark:border-gray-700">
                            <h3 className="text-xl font-semibold text-black dark:text-white">
                                Update Purchase: {selectedRequest.requestId}
                            </h3>
                        </div>

                        {/* Toggle */}
                        <div className="flex justify-center">
                            <div className="inline-flex rounded-md shadow-sm" role="group">
                                <button
                                    type="button"
                                    onClick={() => setBillingType('individual')}
                                    className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${billingType === 'individual' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-900 border-gray-200 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600'}`}
                                >
                                    Individual Billing
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setBillingType('total')}
                                    className={`px-4 py-2 text-sm font-medium rounded-r-lg border ${billingType === 'total' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-900 border-gray-200 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600'}`}
                                >
                                    Total Billing
                                </button>
                            </div>
                        </div>

                        {/* Items List */}
                        <div className="flex flex-col gap-4">
                            {selectedRequest.items.map(item => (
                                <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                                    <div className="md:col-span-3">
                                        <p className="text-sm font-medium text-black dark:text-white">{item.name}</p>
                                        <p className="text-xs text-gray-500">Req. Qty: {item.quantity}</p>
                                    </div>

                                    <div className="md:col-span-3">
                                        <label className="mb-1 block text-xs font-medium">Purchased Qty</label>
                                        <input
                                            type="number"
                                            value={purchaseDetails.items?.[item.id]?.purchasedQuantity || ''}
                                            onChange={(e) => handleItemChange(item.id, 'purchasedQuantity', e.target.value)}
                                            className="w-full rounded border border-stroke bg-white py-1 px-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white"
                                        />
                                    </div>

                                    {billingType === 'individual' && (
                                        <>
                                            <div className="md:col-span-3">
                                                <label className="mb-1 block text-xs font-medium">Amount</label>
                                                <input
                                                    type="number"
                                                    value={purchaseDetails.items?.[item.id]?.amount || ''}
                                                    onChange={(e) => handleItemChange(item.id, 'amount', e.target.value)}
                                                    className="w-full rounded border border-stroke bg-white py-1 px-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white"
                                                    placeholder="0.00"
                                                />
                                            </div>
                                            <div className="md:col-span-3">
                                                <label className="mb-1 block text-xs font-medium">Bill Upload</label>
                                                <input
                                                    type="file"
                                                    className="w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Total Billing Logic */}
                        {billingType === 'total' && (
                            <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg dark:bg-blue-900/20 dark:border-blue-800">
                                <h4 className="mb-4 font-semibold text-blue-800 dark:text-blue-300">Total Billing Details</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-black dark:text-white">Total Amount</label>
                                        <input
                                            type="number"
                                            value={purchaseDetails.totalAmount}
                                            onChange={(e) => handleTotalChange('totalAmount', e.target.value)}
                                            className="w-full rounded border border-stroke bg-white py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white"
                                            placeholder="Enter total amount"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-black dark:text-white">Upload Total Bill</label>
                                        <div className="relative rounded border border-dashed border-primary bg-gray-50 py-3 px-4.5 text-center dark:bg-boxdark-2">
                                            <input
                                                type="file"
                                                className="absolute top-0 left-0 z-50 h-full w-full opacity-0 cursor-pointer"
                                                onChange={(e) => handleTotalChange('totalFile', e.target.files[0])}
                                                required
                                            />
                                            <div className="flex flex-col items-center justify-center">
                                                <FiUploadCloud className="mb-1 text-2xl text-primary" />
                                                <span className="text-sm font-medium">
                                                    {purchaseDetails.totalFile ? purchaseDetails.totalFile.name : "Click to upload bill"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                            >
                                Submit Update
                            </button>
                        </div>
                    </form>
                )}
            </Modal>
        </div>
    );
};

export default PurchaseDepartmentDashboard;
