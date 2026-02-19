import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { usePurchase } from '../../context/PurchaseContext';
import { FiSave, FiUploadCloud, FiAlertCircle, FiArrowLeft } from 'react-icons/fi';
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../../components/ui/table";

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
            setGrnItems(request.items.map(item => ({
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
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                <h2 className="text-xl font-semibold text-black dark:text-white">
                    Goods Reconciliation
                </h2>
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-primary font-medium hover:underline"
                >
                    <FiArrowLeft /> Back
                </button>
            </div>

            <div className="rounded-sm border border-gray-200 bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-gray-700 dark:bg-gray-800 sm:px-7.5 xl:pb-6">
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
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Upload Delivery Challan
                            </label>
                            <div className="relative border border-dashed border-gray-400 p-6 rounded-lg text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                <input
                                    type="file"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={(e) => setChallanFile(e.target.files[0])}
                                />
                                <FiUploadCloud className="mx-auto text-3xl text-gray-400 mb-2" />
                                <span className="text-sm text-gray-500">
                                    {challanFile ? challanFile.name : "Click to upload Challan (Mock)"}
                                </span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Upload Inspection Images
                            </label>
                            <div className="relative border border-dashed border-gray-400 p-6 rounded-lg text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                <input
                                    type="file"
                                    multiple
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={(e) => setInspectionImages([...e.target.files])}
                                />
                                <FiUploadCloud className="mx-auto text-3xl text-gray-400 mb-2" />
                                <span className="text-sm text-gray-500">
                                    {inspectionImages.length > 0 ? `${inspectionImages.length} images selected` : "Click to upload Images (Mock)"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Reconciliation Table */}
                    <div className="max-w-full overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 mb-8">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50 dark:bg-gray-800">
                                    <TableCell isHeader className="px-4 py-3 text-left font-medium text-gray-500 uppercase text-xs">Item</TableCell>
                                    <TableCell isHeader className="px-4 py-3 text-left font-medium text-gray-500 uppercase text-xs">PO Qty</TableCell>
                                    <TableCell isHeader className="px-4 py-3 text-left font-medium text-blue-600 uppercase text-xs">Received Qty</TableCell>
                                    <TableCell isHeader className="px-4 py-3 text-left font-medium text-red-600 uppercase text-xs">Damaged Qty</TableCell>
                                    <TableCell isHeader className="px-4 py-3 text-left font-medium text-green-600 uppercase text-xs">Accepted Qty</TableCell>
                                    <TableCell isHeader className="px-4 py-3 text-left font-medium text-gray-500 uppercase text-xs">Remarks</TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {grnItems.map((item) => (
                                    <TableRow key={item.itemId}>
                                        <TableCell className="px-4 py-3 text-sm text-gray-900 dark:text-gray-200 border-b border-gray-100 dark:border-gray-700">{item.name}</TableCell>
                                        <TableCell className="px-4 py-3 text-sm text-gray-500 border-b border-gray-100 dark:border-gray-700">{item.poQuantity}</TableCell>
                                        <TableCell className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                                            <input
                                                type="number"
                                                min="0"
                                                className="w-24 rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-brand-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800"
                                                value={item.receivedQuantity}
                                                onChange={(e) => handleItemChange(item.itemId, 'receivedQuantity', e.target.value)}
                                            />
                                        </TableCell>
                                        <TableCell className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                                            <input
                                                type="number"
                                                min="0"
                                                className="w-24 rounded-lg border border-red-300 px-3 py-1.5 text-sm focus:border-red-500 focus:outline-none dark:border-red-900 dark:bg-gray-800"
                                                value={item.damagedQuantity}
                                                onChange={(e) => handleItemChange(item.itemId, 'damagedQuantity', e.target.value)}
                                            />
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-sm font-bold text-green-600 border-b border-gray-100 dark:border-gray-700">
                                            {item.acceptedQuantity}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                                            <input
                                                type="text"
                                                placeholder="Remarks..."
                                                className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-brand-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800"
                                                value={item.remarks}
                                                onChange={(e) => handleItemChange(item.itemId, 'remarks', e.target.value)}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {grnItems.some(i => i.damagedQuantity > 0) && (
                        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
                            <FiAlertCircle />
                            <span><strong>Notice:</strong> Items marked as damaged will be flagged for "Return to Vendor".</span>
                        </div>
                    )}

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-600 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-opacity-90 flex items-center gap-2 transition-colors"
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
