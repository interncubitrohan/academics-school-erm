import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { usePurchase } from '../../context/PurchaseContext';
import { Modal } from '../../components/ui/modal';
import { FiEdit, FiFileText, FiUploadCloud, FiCheckCircle, FiBox } from 'react-icons/fi';

const PurchaseDepartmentDashboard = () => {
    const navigate = useNavigate();
    console.log("PurchaseDepartmentDashboard mounted");
    const { requests, generatePO, addInvoiceDetails } = usePurchase() || {};
    const safeRequests = requests || [];
    const approvedRequests = safeRequests.filter(req => req.status === 'approved');
    const poGeneratedRequests = safeRequests.filter(req =>
        ['po_generated', 'invoice_received', 'partially_received', 'fully_received'].includes(req.status)
    );

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);

    // PO Generation State
    const [vendorDetails, setVendorDetails] = useState({
        name: '',
        address: '',
        contact: '',
        email: ''
    });
    const [expectedDeliveryDate, setExpectedDeliveryDate] = useState('');
    const [poItems, setPoItems] = useState([]);
    const [taxRate, setTaxRate] = useState(10); // Default 10% tax for example

    const handleGeneratePO = (request) => {
        setSelectedRequest(request);
        // Initialize PO items with request items
        const initialItems = request.items.map(item => ({
            ...item,
            unitPrice: 0,
            totalPrice: 0
        }));
        setPoItems(initialItems);
        setVendorDetails({ name: '', address: '', contact: '', email: '' });
        setExpectedDeliveryDate('');
        setIsModalOpen(true);
    };

    const handleUnitPriceChange = (itemId, price) => {
        setPoItems(prev => prev.map(item => {
            if (item.id === itemId) {
                const unitPrice = parseFloat(price) || 0;
                return {
                    ...item,
                    unitPrice,
                    totalPrice: unitPrice * item.quantity
                };
            }
            return item;
        }));
    };

    // Invoice Mapping State
    const [invoiceData, setInvoiceData] = useState({
        invoiceNumber: '',
        invoiceDate: '',
        file: null
    });
    const [invoiceItems, setInvoiceItems] = useState([]);

    const handleOpenInvoiceModal = (request) => {
        setSelectedRequest(request);
        // Initialize invoice items from PO items for matching
        const items = request.poDetails?.items || [];
        const initialInvoiceItems = items.map(item => ({
            ...item,
            invoiceQuantity: item.quantity,
            invoiceUnitPrice: item.unitPrice,
            status: 'match' // match, mismatch
        }));
        setInvoiceItems(initialInvoiceItems);
        setInvoiceData({ invoiceNumber: '', invoiceDate: '', file: null });
        setIsInvoiceModalOpen(true);
    };

    const handleInvoiceItemChange = (itemId, field, value) => {
        setInvoiceItems(prev => prev.map(item => {
            if (item.id === itemId) {
                const updatedItem = { ...item, [field]: parseFloat(value) || 0 };

                // Simple mismatch logic
                const isQtyMismatch = updatedItem.invoiceQuantity !== item.quantity;
                const isPriceMismatch = updatedItem.invoiceUnitPrice !== item.unitPrice;

                updatedItem.status = (isQtyMismatch || isPriceMismatch) ? 'mismatch' : 'match';
                return updatedItem;
            }
            return item;
        }));
    };

    const handleSubmitInvoice = (e) => {
        e.preventDefault();
        if (!invoiceData.invoiceNumber || !invoiceData.invoiceDate) {
            alert("Please fill in invoice details");
            return;
        }

        const hasMismatches = invoiceItems.some(item => item.status === 'mismatch');
        if (hasMismatches) {
            const confirm = window.confirm(
                "Warning: There are discrepancies between the PO and Invoice items.\n\nDo you want to proceed with these mismatches?"
            );
            if (!confirm) return;
        }

        const finalInvoiceData = {
            ...invoiceData,
            items: invoiceItems,
            hasMismatches // Store this flag for historical reference
        };

        addInvoiceDetails(selectedRequest.id, finalInvoiceData);
        setIsInvoiceModalOpen(false);
        setSelectedRequest(null);
        alert("Invoice mapped and saved successfully!");
    };

    const calculateTotals = () => {
        const subtotal = poItems.reduce((sum, item) => sum + item.totalPrice, 0);
        const taxAmount = (subtotal * taxRate) / 100;
        const grandTotal = subtotal + taxAmount;
        return { subtotal, taxAmount, grandTotal };
    };

    const handlePrintPO = (poRequest) => {
        // Create a printable window
        const printWindow = window.open('', '_blank');
        if (!printWindow) return alert('Please allow popups to print PO');

        const { poDetails = {}, items } = poRequest;
        const vendor = poDetails.vendorDetails || {};

        if (!poDetails.poNumber) return alert("PO Details missing");

        const htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Purchase Order - ${poDetails.poNumber}</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 40px; }
                    .header { display: flex; justify-content: space-between; margin-bottom: 40px; }
                    .logo { font-size: 24px; font-weight: bold; color: #333; }
                    .po-info { text-align: right; }
                    .vendor-info, .ship-to { margin-bottom: 30px; }
                    table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
                    th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
                    th { background-color: #f8f9fa; }
                    .totals { float: right; width: 300px; }
                    .totals-row { display: flex; justify-content: space-between; padding: 5px 0; }
                    .bold { font-weight: bold; }
                </style>
            </head>
            <body>
                <div class="header">
                    <div class="logo">Academics School ERP</div>
                    <div class="po-info">
                        <h1>PURCHASE ORDER</h1>
                        <p><strong>PO Number:</strong> ${poDetails.poNumber}</p>
                        <p><strong>Date:</strong> ${new Date(poDetails.generatedDate).toLocaleDateString()}</p>
                        <p><strong>Status:</strong> ${poRequest.status}</p>
                    </div>
                </div>

                <div style="display: flex; justify-content: space-between;">
                    <div class="vendor-info">
                        <h3>Vendor</h3>
                        <p><strong>${vendor.name || 'Unknown Vendor'}</strong></p>
                        <p>${vendor.contact || ''}</p>
                        <p>${vendor.address || ''}</p>
                        <p>${vendor.email || ''}</p>
                        <p>${vendor.phone || ''}</p>
                    </div>
                    <div class="ship-to">
                        <h3>Ship To</h3>
                        <p><strong>Academics School</strong></p>
                        <p>Admin Department</p>
                        <p>123 School Lane</p>
                        <p>Cityville, State 12345</p>
                    </div>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Description</th>
                            <th>Qty</th>
                            <th>Unit Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${poDetails.items.map(item => `
                            <tr>
                                <td>${item.name}</td>
                                <td>${item.description || '-'}</td>
                                <td>${item.quantity}</td>
                                <td>$${item.unitPrice.toFixed(2)}</td>
                                <td>$${item.totalPrice.toFixed(2)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>

                <div class="totals">
                    <div class="totals-row">
                        <span>Subtotal:</span>
                        <span>$${poDetails.totals.subtotal.toFixed(2)}</span>
                    </div>
                    <div class="totals-row">
                        <span>Tax (${poDetails.totals.taxRate}%):</span>
                        <span>$${poDetails.totals.taxAmount.toFixed(2)}</span>
                    </div>
                    <div class="totals-row bold">
                        <span>Grand Total:</span>
                        <span>$${poDetails.totals.grandTotal.toFixed(2)}</span>
                    </div>
                </div>
                
                <div style="clear: both; margin-top: 60px;">
                     <p><strong>Expected Delivery:</strong> ${new Date(poDetails.expectedDeliveryDate).toLocaleDateString()}</p>
                     <p><strong>Authorized By:</strong> ${poDetails.generatedBy}</p>
                </div>

                <script>
                    window.onload = function() { window.print(); }
                </script>
            </body>
            </html>
        `;

        printWindow.document.write(htmlContent);
        printWindow.document.close();
    };

    const handleSubmitPO = (e) => {
        e.preventDefault();

        if (!vendorDetails.name || !expectedDeliveryDate) {
            alert('Please enter vendor name and delivery date.');
            return;
        }

        const totals = calculateTotals();
        const poData = {
            vendorDetails,
            expectedDeliveryDate,
            items: poItems,
            totals: { ...totals, taxRate }
        };

        generatePO(selectedRequest.id, poData);
        setIsModalOpen(false);
        setSelectedRequest(null);
        alert("Purchase Order generated successfully!");
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
                    <div className="p-6 text-center text-gray-500 italic">
                        No approved requests pending purchase.
                    </div>
                ) : (
                    approvedRequests.map((req) => (
                        <div
                            className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            key={req.id}
                        >
                            <div className="col-span-2 flex items-center">
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm font-semibold text-black dark:text-white">{req.requestId}</p>
                                    <span className="text-xs text-meta-3 bg-meta-3/10 px-2 py-0.5 rounded-full w-fit">Approved</span>
                                </div>
                            </div>
                            <div className="col-span-2 hidden items-center sm:flex">
                                <div className="flex items-center gap-2">
                                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                                        {req.requester.charAt(0)}
                                    </div>
                                    <p className="text-sm text-black dark:text-white">{req.requester}</p>
                                </div>
                            </div>
                            <div className="col-span-2 hidden items-center sm:flex">
                                <p className="text-sm text-black dark:text-white">{req.department}</p>
                            </div>
                            <div className="col-span-1 hidden items-center sm:flex">
                                <p className="text-sm text-gray-500">{new Date(req.requestDate).toLocaleDateString()}</p>
                            </div>
                            <div className="col-span-1 flex items-center justify-end">
                                <button
                                    onClick={() => handleGeneratePO(req)}
                                    className="flex items-center gap-2 rounded bg-primary px-4 py-2 text-xs font-medium text-white hover:bg-opacity-90 transition-all shadow-sm"
                                >
                                    <FiFileText /> Generate PO
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Generated POs Section */}
            {poGeneratedRequests.length > 0 && (
                <div className="mt-8 rounded-2xl border border-gray-200 bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="px-4 py-6 md:px-6 xl:px-7.5 border-b border-stroke dark:border-strokedark">
                        <h4 className="text-xl font-bold text-black dark:text-white flex items-center gap-2">
                            <FiFileText className="text-primary" /> Generated Purchase Orders
                        </h4>
                    </div>

                    <div className="grid grid-cols-6 py-4.5 px-4 sm:grid-cols-8 md:px-6 2xl:px-7.5 bg-gray-50 dark:bg-gray-800 text-gray-500 text-xs uppercase font-semibold">
                        <div className="col-span-2 flex items-center">PO Number</div>
                        <div className="col-span-2 hidden items-center sm:flex">Vendor</div>
                        <div className="col-span-2 hidden items-center sm:flex">Date</div>
                        <div className="col-span-1 hidden items-center sm:flex">Status</div>
                        <div className="col-span-1 flex items-center justify-end">Actions</div>
                    </div>

                    {poGeneratedRequests.map((req) => {
                        const vendor = req.poDetails?.vendorDetails;
                        const isInvoiceReceived = req.status === 'invoice_received';

                        return (
                            <div
                                className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                key={req.id}
                            >
                                <div className="col-span-2 flex items-center">
                                    <div>
                                        <p className="text-sm font-bold text-primary">{req.poDetails?.poNumber || 'N/A'}</p>
                                        <p className="text-xs text-gray-500">Ref: {req.requestId}</p>
                                    </div>
                                </div>
                                <div className="col-span-2 hidden items-center sm:flex">
                                    <div className="flex flex-col">
                                        <p className="text-sm text-black dark:text-white font-medium">{vendor?.name || 'Unknown'}</p>
                                        <p className="text-xs text-gray-500">{vendor?.contact}</p>
                                    </div>
                                </div>
                                <div className="col-span-2 hidden items-center sm:flex">
                                    <p className="text-sm text-black dark:text-white">
                                        {req.poDetails?.generatedDate ? new Date(req.poDetails.generatedDate).toLocaleDateString() : '-'}
                                    </p>
                                </div>
                                <div className="col-span-1 hidden items-center sm:flex">
                                    <span className={`text-xs px-2 py-1 rounded-full ${isInvoiceReceived
                                        ? 'bg-success/10 text-success'
                                        : 'bg-warning/10 text-warning'
                                        }`}>
                                        {req.status === 'invoice_received' ? 'Invoice Received' : 'PO Generated'}
                                    </span>
                                </div>
                                <div className="col-span-1 flex items-center justify-end gap-2">
                                    <button
                                        onClick={() => handlePrintPO(req)}
                                        className="p-2 hover:bg-gray-100 rounded-full text-gray-600 hover:text-primary transition-colors"
                                        title="Print PDF"
                                    >
                                        <FiEdit size={18} />
                                    </button>
                                    {!isInvoiceReceived && req.status === 'po_generated' && (
                                        <button
                                            onClick={() => handleOpenInvoiceModal(req)}
                                            className="p-2 hover:bg-gray-100 rounded-full text-gray-600 hover:text-meta-3 transition-colors"
                                            title="Attach Invoice"
                                        >
                                            <FiUploadCloud size={18} />
                                        </button>
                                    )}
                                    {isInvoiceReceived && (
                                        <span className="text-success" title="Invoice Attached"><FiCheckCircle size={18} /></span>
                                    )}

                                    {/* Receive Goods Action - Available for PO Generated or Invoice Received */}
                                    {['po_generated', 'invoice_received', 'partially_received'].includes(req.status) && (
                                        <button
                                            onClick={() => navigate(`/purchase/goods-received/${req.id}`)}
                                            className="p-2 hover:bg-gray-100 rounded-full text-gray-600 hover:text-primary transition-colors"
                                            title="Receive Goods"
                                        >
                                            <FiBox size={18} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
            {/* Generate PO Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className="max-w-4xl p-6">
                {selectedRequest && (
                    <form onSubmit={handleSubmitPO} className="flex flex-col gap-6">
                        <div className="flex justify-between items-center border-b border-gray-200 pb-4 dark:border-gray-700">
                            <h3 className="text-xl font-semibold text-black dark:text-white">
                                Generate Purchase Order: {selectedRequest.requestId}
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Manual Vendor Entry */}
                            <div className="flex flex-col gap-4">
                                <div>
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Vendor Name <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={vendorDetails.name}
                                        onChange={(e) => setVendorDetails({ ...vendorDetails, name: e.target.value })}
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        placeholder="Enter vendor name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Vendor Address
                                    </label>
                                    <textarea
                                        value={vendorDetails.address}
                                        onChange={(e) => setVendorDetails({ ...vendorDetails, address: e.target.value })}
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        placeholder="Enter vendor address"
                                        rows="2"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                {/* Expected Delivery Date */}
                                <div>
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Expected Delivery Date <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        value={expectedDeliveryDate}
                                        onChange={(e) => setExpectedDeliveryDate(e.target.value)}
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        required
                                    />
                                </div>
                                {/* Extra Contact Info */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Contact Person
                                        </label>
                                        <input
                                            type="text"
                                            value={vendorDetails.contact}
                                            onChange={(e) => setVendorDetails({ ...vendorDetails, contact: e.target.value })}
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            placeholder="Name"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Email/Phone
                                        </label>
                                        <input
                                            type="text"
                                            value={vendorDetails.email}
                                            onChange={(e) => setVendorDetails({ ...vendorDetails, email: e.target.value })}
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            placeholder="Contact info"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Items Table */}
                        <div className="flex flex-col gap-4">
                            <h4 className="font-semibold text-gray-800 dark:text-white">Items & Pricing</h4>
                            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                        <tr>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Unit Price</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                                        {poItems.map(item => (
                                            <tr key={item.id}>
                                                <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-200">{item.name}</td>
                                                <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-200">{item.quantity}</td>
                                                <td className="px-4 py-2 text-sm">
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        step="0.01"
                                                        value={item.unitPrice}
                                                        onChange={(e) => handleUnitPriceChange(item.id, e.target.value)}
                                                        className="w-24 rounded border border-gray-300 px-2 py-1 text-sm focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-800"
                                                    />
                                                </td>
                                                <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-200">
                                                    ${item.totalPrice.toFixed(2)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Totals */}
                        <div className="flex justify-end">
                            <div className="w-full max-w-xs space-y-2 p-4 bg-gray-50 rounded dark:bg-gray-800">
                                <div className="flex justify-between text-sm">
                                    <span>Subtotal:</span>
                                    <span>${calculateTotals().subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Tax ({taxRate}%):</span>
                                    <span>${calculateTotals().taxAmount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-base font-bold border-t border-gray-200 pt-2 dark:border-gray-700">
                                    <span>Grand Total:</span>
                                    <span>${calculateTotals().grandTotal.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

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
                                Generate PO
                            </button>
                        </div>
                    </form>
                )}
            </Modal>

            {/* Invoice Mapping Modal */}
            <Modal isOpen={isInvoiceModalOpen} onClose={() => setIsInvoiceModalOpen(false)} className="max-w-5xl p-6">
                {selectedRequest && (
                    <form onSubmit={handleSubmitInvoice} className="flex flex-col gap-6">
                        <div className="flex justify-between items-center border-b border-gray-200 pb-4 dark:border-gray-700">
                            <h3 className="text-xl font-semibold text-black dark:text-white">
                                Attach Vendor Invoice: {selectedRequest.poDetails?.poNumber || 'N/A'}
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="mb-2.5 block text-black dark:text-white">Invoice Number <span className="text-meta-1">*</span></label>
                                <input
                                    type="text"
                                    value={invoiceData.invoiceNumber}
                                    onChange={e => setInvoiceData({ ...invoiceData, invoiceNumber: e.target.value })}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                                    required
                                />
                            </div>
                            <div>
                                <label className="mb-2.5 block text-black dark:text-white">Invoice Date <span className="text-meta-1">*</span></label>
                                <input
                                    type="date"
                                    value={invoiceData.invoiceDate}
                                    onChange={e => setInvoiceData({ ...invoiceData, invoiceDate: e.target.value })}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                                    required
                                />
                            </div>
                            <div>
                                <label className="mb-2.5 block text-black dark:text-white">Upload Invoice File</label>
                                <div className="border border-dashed border-gray-400 p-3 rounded text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                                    <span className="text-sm text-gray-500">Click to upload (Mock)</span>
                                </div>
                            </div>
                        </div>

                        {/* Invoice Items Matching Table */}
                        <div className="flex flex-col gap-4">
                            <h4 className="font-semibold text-gray-800 dark:text-white">Match Invoice Items</h4>

                            {invoiceItems.some(i => i.status === 'mismatch') && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
                                    <strong className="font-bold">Warning: </strong>
                                    <span className="block sm:inline">Mismatch detected! Please review highlighted items.</span>
                                </div>
                            )}

                            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                        <tr>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Item Name</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">PO Qty</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">PO Price</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-blue-600 uppercase">Inv Qty</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-blue-600 uppercase">Inv Price</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                                        {invoiceItems.map(item => (
                                            <tr key={item.id} className={item.status === 'mismatch' ? 'bg-red-50 dark:bg-red-900/20' : ''}>
                                                <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-200">{item.name}</td>
                                                <td className="px-4 py-2 text-sm text-gray-500">{item.quantity}</td>
                                                <td className="px-4 py-2 text-sm text-gray-500">${item.unitPrice}</td>
                                                <td className="px-4 py-2 text-sm">
                                                    <input
                                                        type="number"
                                                        value={item.invoiceQuantity}
                                                        onChange={(e) => handleInvoiceItemChange(item.id, 'invoiceQuantity', e.target.value)}
                                                        className={`w-20 rounded border px-2 py-1 text-sm focus:outline-none ${item.quantity !== item.invoiceQuantity ? 'border-red-500 text-red-600' : 'border-gray-300 dark:border-gray-600 dark:bg-gray-800'}`}
                                                    />
                                                </td>
                                                <td className="px-4 py-2 text-sm">
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        value={item.invoiceUnitPrice}
                                                        onChange={(e) => handleInvoiceItemChange(item.id, 'invoiceUnitPrice', e.target.value)}
                                                        className={`w-24 rounded border px-2 py-1 text-sm focus:outline-none ${item.unitPrice !== item.invoiceUnitPrice ? 'border-red-500 text-red-600' : 'border-gray-300 dark:border-gray-600 dark:bg-gray-800'}`}
                                                    />
                                                </td>
                                                <td className="px-4 py-2 text-xs font-medium">
                                                    {item.status === 'mismatch' ? (
                                                        <span className="text-red-500 flex items-center gap-1">Mismatch</span>
                                                    ) : (
                                                        <span className="text-green-500">Match</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <button
                                type="button"
                                onClick={() => setIsInvoiceModalOpen(false)}
                                className="px-6 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-white dark:hover:bg-gray-800"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                            >
                                Verify & Submit
                            </button>
                        </div>
                    </form>
                )}
            </Modal>
        </div >
    );
};

export default PurchaseDepartmentDashboard;
