import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import {
    FiFileText,
    FiCheckCircle,
    FiXCircle,
    FiClock,
    FiFilter,
    FiPlus,
    FiUploadCloud,
    FiEdit,
    FiBox,
    FiPrinter
} from "react-icons/fi";
import { usePurchase } from '../../context/PurchaseContext';
import { Modal } from '../../components/ui/modal';
import Badge from '../../components/ui/badge/Badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../../components/ui/table";
import { mockVendors } from '../../data/mockVendors';

const PurchaseDepartmentDashboard = () => {
    const navigate = useNavigate();
    const { requests, generatePO, addInvoiceDetails } = usePurchase() || {};

    // Filter Logic
    const approvedRequests = (requests || []).filter(req => req.status === 'approved');
    const poGeneratedRequests = (requests || []).filter(req =>
        ['po_generated', 'invoice_received', 'partially_received', 'goods_received', 'payment_completed', 'payment_rejected'].includes(req.status)
    );

    // Modal States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);

    // PO Generation State
    const [vendorDetails, setVendorDetails] = useState({
        name: '',
        contact: '',
        address: ''
    });
    const [poItems, setPoItems] = useState([]);
    const [poTotals, setPoTotals] = useState({ subtotal: 0, tax: 0, grandTotal: 0 });

    // Invoice Mapping State
    const [invoiceNumber, setInvoiceNumber] = useState('');
    const [invoiceFile, setInvoiceFile] = useState(null);

    // Initialization for PO Modal
    useEffect(() => {
        if (selectedRequest && isModalOpen) {
            // Initialize items with default price 0 if not present
            const items = selectedRequest.items.map(item => ({
                id: item.id,
                name: item.name,
                quantity: Number(item.quantity),
                unitPrice: 0,
                total: 0
            }));
            setPoItems(items);
            calculateTotals(items);
        }
    }, [selectedRequest, isModalOpen]);

    const calculateTotals = (items) => {
        const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
        const tax = subtotal * 0.10; // Mock 10% tax
        const grandTotal = subtotal + tax;
        setPoTotals({ subtotal, tax, grandTotal });
    };

    const handleVendorSelect = (e) => {
        const vendorId = Number(e.target.value);
        const vendor = mockVendors.find(v => v.id === vendorId);
        if (vendor) {
            setVendorDetails({
                name: vendor.name,
                contact: vendor.contact,
                address: vendor.address
            });
        } else {
            setVendorDetails({ name: '', contact: '', address: '' });
        }
    };

    const handleItemPriceChange = (id, price) => {
        const newItems = poItems.map(item => {
            if (item.id === id) {
                const urlPrice = Number(price);
                return { ...item, unitPrice: urlPrice, total: item.quantity * urlPrice };
            }
            return item;
        });
        setPoItems(newItems);
        calculateTotals(newItems);
    };

    const handleGeneratePO = (request) => {
        setSelectedRequest(request);
        // Reset form
        setVendorDetails({ name: '', contact: '', address: '' });
        setIsModalOpen(true);
    };

    const handleSubmitPO = (e) => {
        e.preventDefault();
        // Validation
        if (!vendorDetails.name) return alert("Please select a vendor.");
        if (poItems.some(i => i.unitPrice <= 0)) return alert("Please set unit price for all items.");

        const poData = {
            vendorDetails,
            items: poItems,
            totals: poTotals
        };

        generatePO(selectedRequest.id, poData);
        setIsModalOpen(false);
        setSelectedRequest(null);
        alert("Purchase Order Generated Successfully!");
    };

    // Invoice Mapping Handlers
    const handleOpenInvoiceModal = (request) => {
        setSelectedRequest(request);
        setInvoiceNumber('');
        setInvoiceFile(null);
        setIsInvoiceModalOpen(true);
    };

    const handleFileChange = (e, setFile) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmitInvoice = (e) => {
        e.preventDefault();
        if (!selectedRequest) return;

        const invoiceData = {
            invoiceNumber,
            invoiceFile: invoiceFile ? "mock_invoice.pdf" : null,
            receivedDate: new Date().toISOString()
        };

        addInvoiceDetails(selectedRequest.id, invoiceData);
        setIsInvoiceModalOpen(false);
        alert("Invoice Mapped Successfully!");
    };

    const handlePrintPO = (req) => {
        alert(`Printing PO: ${req.poDetails?.poNumber}\n(This would open a PDF in a real app)`);
        // window.print(); // In a real scenario, this would print the specific component or open a PDF url
    };

    return (
        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-xl font-semibold text-black dark:text-white">
                    Purchase Department
                </h2>
                <nav>
                    <ol className="flex items-center gap-2">
                        <li><Link className="font-medium hover:text-primary" to="/">Dashboard /</Link></li>
                        <li className="font-medium text-primary">Purchase Dept.</li>
                    </ol>
                </nav>
            </div>

            <div className="rounded-sm border border-gray-200 bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-gray-700 dark:bg-gray-800 sm:px-7.5 xl:pb-1">
                <div className="mb-6">
                    <h3 className="text-xl font-semibold text-black dark:text-white">
                        Approved Requests
                    </h3>
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
                                    Date Approved
                                </TableCell>
                                <TableCell isHeader className="py-4 px-4 font-medium text-black dark:text-white text-right">
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {approvedRequests.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="border-b border-[#eee] py-5 px-4 text-center dark:border-gray-700 text-gray-500 italic">
                                        No approved requests pending purchase.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                approvedRequests.map((req) => (
                                    <TableRow key={req.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                        <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700 xl:pl-11">
                                            <div className="flex flex-col gap-1">
                                                <p className="text-black dark:text-white font-medium">{req.requestId}</p>
                                                <Badge size="sm" color="success">Approved</Badge>
                                            </div>
                                        </TableCell>
                                        <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                            <div className="flex items-center gap-2">
                                                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                                                    {req.requester.charAt(0)}
                                                </div>
                                                <p className="text-black dark:text-white">{req.requester}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                            <p className="text-black dark:text-white">{req.department}</p>
                                        </TableCell>
                                        <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                            <p className="text-sm text-gray-500">{new Date(req.requestDate).toLocaleDateString()}</p>
                                        </TableCell>
                                        <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700 text-right">
                                            <button
                                                onClick={() => handleGeneratePO(req)}
                                                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90 transition-all shadow-sm"
                                            >
                                                <FiFileText /> Generate PO
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Generated POs Section */}
            {(poGeneratedRequests.length > 0) && (
                <div className="mt-8 rounded-sm border border-gray-200 bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-gray-700 dark:bg-gray-800 sm:px-7.5 xl:pb-1">
                    <div className="mb-6 border-b border-stroke dark:border-strokedark pb-4">
                        <h3 className="text-xl font-semibold text-black dark:text-white flex items-center gap-2">
                            <FiFileText className="text-primary" /> Generated Purchase Orders
                        </h3>
                    </div>

                    <div className="max-w-full overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50 dark:bg-gray-700 text-left">
                                    <TableCell isHeader className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                        PO Number
                                    </TableCell>
                                    <TableCell isHeader className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                        Vendor
                                    </TableCell>
                                    <TableCell isHeader className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                        Date
                                    </TableCell>
                                    <TableCell isHeader className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                        Status
                                    </TableCell>
                                    <TableCell isHeader className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white text-right">
                                        Amount
                                    </TableCell>
                                    <TableCell isHeader className="py-4 px-4 font-medium text-black dark:text-white text-right">
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {poGeneratedRequests.map((req) => {
                                    const vendor = req.poDetails?.vendorDetails;
                                    const isInvoiceReceived = ['invoice_received', 'partially_received', 'goods_received', 'payment_completed', 'payment_rejected'].includes(req.status);

                                    return (
                                        <TableRow key={req.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                            <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700 xl:pl-11">
                                                <div>
                                                    <p className="text-black dark:text-white font-bold">{req.poDetails?.poNumber || 'N/A'}</p>
                                                    <p className="text-xs text-gray-500">Ref: {req.requestId}</p>
                                                </div>
                                            </TableCell>
                                            <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                                <div className="flex flex-col">
                                                    <p className="text-black dark:text-white font-medium">{vendor?.name || 'Unknown'}</p>
                                                    <p className="text-xs text-gray-500 truncate w-32">{vendor?.contact}</p>
                                                </div>
                                            </TableCell>
                                            <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                                <p className="text-black dark:text-white">
                                                    {req.poDetails?.generatedDate ? new Date(req.poDetails.generatedDate).toLocaleDateString() : '-'}
                                                </p>
                                            </TableCell>
                                            <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                                <Badge
                                                    size="sm"
                                                    color={isInvoiceReceived ? "success" : "warning"}
                                                >
                                                    {req.status === 'po_generated' ? 'PO Generated' : req.status.replace('_', ' ').toUpperCase()}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700 text-right">
                                                <span className="font-bold text-black dark:text-white">
                                                    ${req.poDetails?.totals?.grandTotal?.toFixed(2) || '0.00'}
                                                </span>
                                            </TableCell>
                                            <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handlePrintPO(req)}
                                                        className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-primary transition-colors"
                                                        title="Print PDF"
                                                    >
                                                        <FiPrinter size={18} />
                                                    </button>
                                                    {(!req.invoiceDetails && req.status === 'po_generated') && (
                                                        <button
                                                            onClick={() => handleOpenInvoiceModal(req)}
                                                            className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-success transition-colors"
                                                            title="Attach Invoice"
                                                        >
                                                            <FiUploadCloud size={18} />
                                                        </button>
                                                    )}
                                                    {req.invoiceDetails && (
                                                        <span className="text-success p-2" title="Invoice Attached"><FiCheckCircle size={18} /></span>
                                                    )}

                                                    {/* Receive Goods Action */}
                                                    {['po_generated', 'invoice_received', 'partially_received'].includes(req.status) && (
                                                        <button
                                                            onClick={() => navigate(`/purchase/goods-received/${req.id}`)}
                                                            className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-primary transition-colors"
                                                            title="Receive Goods"
                                                        >
                                                            <FiBox size={18} />
                                                        </button>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            )}

            {/* Generate PO Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className="max-w-4xl p-6">
                {selectedRequest && (
                    <div className="space-y-6">
                        <div className="border-b border-gray-200 pb-4 dark:border-gray-700">
                            <h3 className="text-xl font-semibold text-black dark:text-white">
                                Generate Purchase Order
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">Request ID: {selectedRequest.requestId}</p>
                        </div>

                        <form onSubmit={handleSubmitPO} className="space-y-6">
                            {/* Vendor Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Select Vendor <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white border-gray-300"
                                        onChange={handleVendorSelect}
                                        required
                                    >
                                        <option value="">-- Select Vendor --</option>
                                        {mockVendors.map(v => (
                                            <option key={v.id} value={v.id}>{v.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Vendor Contact
                                    </label>
                                    <input
                                        type="text"
                                        readOnly
                                        className="w-full px-4 py-2.5 border rounded-lg bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 border-gray-300 cursor-not-allowed"
                                        value={vendorDetails.contact}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Vendor Address
                                    </label>
                                    <textarea
                                        readOnly
                                        className="w-full px-4 py-2.5 border rounded-lg bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 border-gray-300 cursor-not-allowed"
                                        rows="2"
                                        value={vendorDetails.address}
                                    ></textarea>
                                </div>
                            </div>

                            {/* Items Section */}
                            <div>
                                <h4 className="font-semibold text-lg text-black dark:text-white mb-3">Order Items & Pricing</h4>
                                <div className="border rounded-lg overflow-hidden border-gray-200 dark:border-gray-700">
                                    <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">Item Name</th>
                                                <th scope="col" className="px-6 py-3">Quantity</th>
                                                <th scope="col" className="px-6 py-3">Unit Price ($)</th>
                                                <th scope="col" className="px-6 py-3 text-right">Total ($)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {poItems.map((item) => (
                                                <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.name}</td>
                                                    <td className="px-6 py-4">{item.quantity}</td>
                                                    <td className="px-6 py-4">
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            step="0.01"
                                                            value={item.unitPrice}
                                                            onChange={(e) => handleItemPriceChange(item.id, e.target.value)}
                                                            className="w-24 px-2 py-1 border rounded focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                                            placeholder="0.00"
                                                            required
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4 text-right font-medium">
                                                        {item.total.toFixed(2)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot className="bg-gray-50 dark:bg-gray-700 font-semibold text-gray-900 dark:text-white">
                                            <tr>
                                                <td colSpan="3" className="px-6 py-3 text-right">Subtotal:</td>
                                                <td className="px-6 py-3 text-right">${poTotals.subtotal.toFixed(2)}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="3" className="px-6 py-3 text-right text-sm font-normal text-gray-500">Tax (10%):</td>
                                                <td className="px-6 py-3 text-right text-sm font-normal text-gray-500">${poTotals.tax.toFixed(2)}</td>
                                            </tr>
                                            <tr className="text-base border-t-2 border-gray-200 dark:border-gray-600">
                                                <td colSpan="3" className="px-6 py-4 text-right">Grand Total:</td>
                                                <td className="px-6 py-4 text-right text-primary">${poTotals.grandTotal.toFixed(2)}</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-600 cancel-button"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-opacity-90 flex items-center gap-2"
                                >
                                    <FiCheckCircle /> Generate PO
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </Modal>

            {/* Invoice Mapping Modal */}
            <Modal isOpen={isInvoiceModalOpen} onClose={() => setIsInvoiceModalOpen(false)} className="max-w-md p-6">
                <div className="space-y-6">
                    <div className="border-b border-gray-200 pb-4 dark:border-gray-700">
                        <h3 className="text-xl font-semibold text-black dark:text-white">
                            Map Invoice
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">PO: {selectedRequest?.poDetails?.poNumber}</p>
                    </div>

                    <form onSubmit={handleSubmitInvoice} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Invoice Number <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white border-gray-300"
                                value={invoiceNumber}
                                onChange={(e) => setInvoiceNumber(e.target.value)}
                                placeholder="INV-202X-001"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Upload Invoice <span className="text-red-500">*</span>
                            </label>
                            <div className="relative border border-dashed border-gray-400 p-6 rounded-lg text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                <input
                                    type="file"
                                    required
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    id="invoice-upload"
                                    onChange={(e) => handleFileChange(e, setInvoiceFile)}
                                />
                                <label htmlFor="invoice-upload" className="cursor-pointer flex flex-col items-center">
                                    <FiUploadCloud className="text-3xl text-gray-400 mb-2" />
                                    <span className="text-sm text-gray-500">{invoiceFile ? invoiceFile.name : "Click to upload Invoice PDF"}</span>
                                </label>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <button
                                type="button"
                                onClick={() => setIsInvoiceModalOpen(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-opacity-90"
                            >
                                Map Invoice
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default PurchaseDepartmentDashboard;
