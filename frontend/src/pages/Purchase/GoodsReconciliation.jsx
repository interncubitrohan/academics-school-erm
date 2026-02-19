import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { usePurchase } from '../../context/PurchaseContext';
import { FiSave, FiUploadCloud, FiAlertCircle, FiArrowLeft } from 'react-icons/fi';

const GoodsReconciliation = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { requests, addGRN } = usePurchase() || {};

    const request = requests?.find(r => r.id === Number(id));

    const [grnItems, setGrnItems] = useState([]);
    const [challanFile, setChallanFile] = useState(null);
    const [inspectionImages, setInspectionImages] = useState([]);

    useEffect(() => {
        if (request && request.poDetails) {
            setGrnItems(request.poDetails.items.map(item => ({
                itemId: item.id,
                name: item.name,
                poQuantity: item.quantity,
                receivedQuantity: item.quantity, // Default to full receipt
                damagedQuantity: 0,
                acceptedQuantity: item.quantity,
                remarks: ''
            })));
        }
    }, [request]);

    if (!request) return <div className="p-6">Loading or Request Not Found...</div>;

    const handleItemChange = (itemId, field, value) => {
        setGrnItems(prev => prev.map(item => {
            if (item.itemId === itemId) {
                const updatedItem = { ...item, [field]: value };

                // Recalculate accepted
                if (field === 'receivedQuantity' || field === 'damagedQuantity') {
                    const received = Number(field === 'receivedQuantity' ? value : item.receivedQuantity);
                    const damaged = Number(field === 'damagedQuantity' ? value : item.damagedQuantity);
                    updatedItem.acceptedQuantity = Math.max(0, received - damaged);
                }
                return updatedItem;
            }
            return item;
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation: Received cannot be negative
        if (grnItems.some(i => i.receivedQuantity < 0 || i.damagedQuantity < 0)) {
            alert("Quantities cannot be negative.");
            return;
        }

        const grnData = {
            challanFile: challanFile ? "mock_challan.pdf" : null,
            inspectionImages: inspectionImages.length > 0 ? ["mock_img1.jpg"] : [],
            items: grnItems
        };

        addGRN(request.id, grnData);
        alert("Goods Received Note (GRN) submitted successfully!");
        navigate('/purchase/department-dashboard');
    };

    return (
        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-2xl font-bold text-black dark:text-white">
                    Goods Reconciliation
                </h2>
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-primary font-medium hover:underline"
                >
                    <FiArrowLeft /> Back
                </button>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="mb-6 border-b border-gray-200 pb-4 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-black dark:text-white">
                        PO Details: {request.poDetails?.poNumber}
                    </h3>
                    <p className="text-sm text-gray-500">Vendor: {request.poDetails?.vendorDetails?.name}</p>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* File Uploads */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div>
                            <label className="mb-2.5 block text-black dark:text-white font-medium">
                                Upload Delivery Challan
                            </label>
                            <div className="border border-dashed border-gray-400 p-6 rounded text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                                <FiUploadCloud className="mx-auto text-3xl text-gray-400 mb-2" />
                                <span className="text-sm text-gray-500">Click to upload Challan (Mock)</span>
                            </div>
                        </div>
                        <div>
                            <label className="mb-2.5 block text-black dark:text-white font-medium">
                                Upload Inspection Images
                            </label>
                            <div className="border border-dashed border-gray-400 p-6 rounded text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                                <FiUploadCloud className="mx-auto text-3xl text-gray-400 mb-2" />
                                <span className="text-sm text-gray-500">Click to upload Images (Mock)</span>
                            </div>
                        </div>
                    </div>

                    {/* Reconciliation Table */}
                    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 mb-8">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-800">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">PO Qty</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-blue-600 uppercase">Received Qty</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-red-600 uppercase">Damaged Qty</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-green-600 uppercase">Accepted Qty</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Remarks</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                                {grnItems.map((item) => (
                                    <tr key={item.itemId}>
                                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-200">{item.name}</td>
                                        <td className="px-4 py-3 text-sm text-gray-500">{item.poQuantity}</td>
                                        <td className="px-4 py-3">
                                            <input
                                                type="number"
                                                min="0"
                                                className="w-24 rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-800"
                                                value={item.receivedQuantity}
                                                onChange={(e) => handleItemChange(item.itemId, 'receivedQuantity', e.target.value)}
                                            />
                                        </td>
                                        <td className="px-4 py-3">
                                            <input
                                                type="number"
                                                min="0"
                                                className="w-24 rounded border border-red-300 px-3 py-1.5 text-sm focus:border-red-500 focus:outline-none dark:border-red-900 dark:bg-gray-800"
                                                value={item.damagedQuantity}
                                                onChange={(e) => handleItemChange(item.itemId, 'damagedQuantity', e.target.value)}
                                            />
                                        </td>
                                        <td className="px-4 py-3 text-sm font-bold text-green-600">
                                            {item.acceptedQuantity}
                                        </td>
                                        <td className="px-4 py-3">
                                            <input
                                                type="text"
                                                placeholder="Remarks..."
                                                className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-800"
                                                value={item.remarks}
                                                onChange={(e) => handleItemChange(item.itemId, 'remarks', e.target.value)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {grnItems.some(i => i.damagedQuantity > 0) && (
                        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-center gap-2">
                            <FiAlertCircle />
                            <span><strong>Notice:</strong> Items marked as damaged will be flagged for "Return to Vendor".</span>
                        </div>
                    )}

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="px-6 py-2.5 rounded border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-white dark:hover:bg-gray-800 font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2.5 rounded bg-primary text-white hover:bg-opacity-90 font-medium flex items-center gap-2"
                        >
                            <FiSave /> Submit GRN
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GoodsReconciliation;
