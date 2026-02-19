import React, { useState } from 'react';
import { usePurchase } from '../../context/PurchaseContext';
import { useInventory } from '../../context/InventoryContext';
import { Modal } from '../../components/ui/modal';
import { FiBox, FiCheck, FiMapPin, FiTag } from 'react-icons/fi';

const InventoryInward = () => {
    const { requests, updateRequestStatus } = usePurchase() || {};
    const { processInward } = useInventory() || {};

    const [selectedRequest, setSelectedRequest] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Inward Form State: map of itemId -> { location, category }
    const [inwardDetails, setInwardDetails] = useState({});

    // Filter requests that are "fully_received" or "payment_completed" (assuming goods are there) 
    // but NOT "stock_updated"
    const pendingInwardRequests = (requests || []).filter(req =>
        ['goods_received', 'payment_completed'].includes(req.status)
    );

    const handleOpenInward = (req) => {
        setSelectedRequest(req);

        // Initialize form state for accepted items
        const initialDetails = {};
        const items = req.grnDetails?.items || [];

        items.forEach(item => {
            if (item.acceptedQuantity > 0) {
                initialDetails[item.itemId] = {
                    name: item.name,
                    quantity: item.acceptedQuantity,
                    location: '',
                    category: 'General'
                };
            }
        });

        setInwardDetails(initialDetails);
        setIsModalOpen(true);
    };

    const handleDetailChange = (itemId, field, value) => {
        setInwardDetails(prev => ({
            ...prev,
            [itemId]: {
                ...prev[itemId],
                [field]: value
            }
        }));
    };

    const handleSubmitInward = (e) => {
        e.preventDefault();

        // validation: check if location is filled
        const items = Object.values(inwardDetails);
        if (items.some(item => !item.location)) {
            alert("Please specify storage location for all items.");
            return;
        }

        // Process Inventory Update
        processInward(selectedRequest, items);

        // Update Request Status
        // We need a way to update status in PurchaseContext. 
        // If updateRequestStatus exists use it, otherwise call a specific function.
        // Assuming we need to add 'updateRequestStatus' or 'markStockUpdated' to PurchaseContext.
        // For now, I'll assume 'markStockUpdated' needs to be added or use 'completePayment' style update.
        // Let's assume we added `updateStatus` to PurchaseContext or we can add `markStockUpdated`.
        // I will implement `markStockUpdated` in PurchaseContext in the next step.

        // Temporary placeholder call - resolved in next step
        if (updateRequestStatus) {
            // First mark as stock_updated (audit purpose)
            // Then close
            // Since our updateRequestStatus replaces status, we'll just set it to 'closed' 
            // but ensuring the history reflects the flow could be done by adding a history item manually if needed.
            // For now, let's just move it to 'closed' as per workflow end state.
            updateRequestStatus(selectedRequest.id, 'closed', 'Stock Inward Completed. Request Closed.');
        } else {
            console.warn("updateRequestStatus function missing in PurchaseContext");
        }

        setIsModalOpen(false);
        setSelectedRequest(null);
        alert("Stock updated successfully!");
    };

    return (
        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-black dark:text-white flex items-center gap-2">
                    <FiBox className="text-primary" /> Inventory Inward
                </h2>
                <p className="text-sm text-gray-500">Process received goods into inventory</p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="px-4 py-6 md:px-6 xl:px-7.5 border-b border-stroke dark:border-strokedark">
                    <h4 className="text-xl font-semibold text-black dark:text-white">
                        Pending Inward Entry
                    </h4>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                <th className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11">PO #</th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white">Received Date</th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white">Vendor</th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingInwardRequests.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-6 text-gray-500 italic">No pending goods to inward.</td>
                                </tr>
                            ) : (
                                pendingInwardRequests.map((req) => (
                                    <tr key={req.id}>
                                        <td className="py-5 px-4 pl-9 xl:pl-11">
                                            <h5 className="font-medium text-black dark:text-white">{req.poDetails?.poNumber}</h5>
                                        </td>
                                        <td className="py-5 px-4">
                                            <p className="text-sm text-black dark:text-white">
                                                {new Date(req.grnDetails?.receivedDate).toLocaleDateString()}
                                            </p>
                                        </td>
                                        <td className="py-5 px-4">
                                            <p className="text-sm text-black dark:text-white">{req.poDetails?.vendorDetails?.name}</p>
                                        </td>
                                        <td className="py-5 px-4 text-center">
                                            <button
                                                onClick={() => handleOpenInward(req)}
                                                className="inline-flex items-center gap-2 rounded bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90 transition-all"
                                            >
                                                <FiBox /> Inward Stock
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Inward Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className="max-w-4xl p-6">
                <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-4 dark:border-gray-700">
                    <h3 className="text-xl font-semibold text-black dark:text-white">Process Inward Stock</h3>
                </div>
                {selectedRequest && (
                    <form onSubmit={handleSubmitInward} className="flex flex-col gap-6">
                        <div className="grid grid-cols-1 gap-4">
                            {Object.keys(inwardDetails).map(itemId => {
                                const item = inwardDetails[itemId];
                                return (
                                    <div key={itemId} className="p-4 border border-stroke rounded-lg dark:border-strokedark bg-gray-50 dark:bg-meta-4">
                                        <div className="flex justify-between mb-3">
                                            <h5 className="font-bold text-black dark:text-white">{item.name}</h5>
                                            <span className="text-sm font-medium text-success bg-success/10 px-2 py-0.5 rounded">
                                                Qty: {item.quantity}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                                                    <FiMapPin className="inline mr-1" /> Storage Location
                                                </label>
                                                <input
                                                    type="text"
                                                    value={item.location}
                                                    onChange={(e) => handleDetailChange(itemId, 'location', e.target.value)}
                                                    className="w-full rounded border border-gray-300 py-2 px-4 text-sm focus:border-primary dark:border-gray-600 dark:bg-gray-800"
                                                    placeholder="e.g. Warehouse A, Shelf 2"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                                                    <FiTag className="inline mr-1" /> Category
                                                </label>
                                                <select
                                                    value={item.category}
                                                    onChange={(e) => handleDetailChange(itemId, 'category', e.target.value)}
                                                    className="w-full rounded border border-gray-300 py-2 px-4 text-sm focus:border-primary dark:border-gray-600 dark:bg-gray-800"
                                                >
                                                    <option value="General">General</option>
                                                    <option value="Stationery">Stationery</option>
                                                    <option value="Electronics">Electronics</option>
                                                    <option value="Furniture">Furniture</option>
                                                    <option value="Cleaning">Cleaning</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="flex justify-end gap-3 mt-4">
                            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded border hover:bg-gray-100 dark:hover:bg-gray-800">Cancel</button>
                            <button type="submit" className="px-6 py-2 rounded bg-primary text-white hover:bg-opacity-90">
                                Confirm & Update Stock
                            </button>
                        </div>
                    </form>
                )}
            </Modal>
        </div>
    );
};

export default InventoryInward;
