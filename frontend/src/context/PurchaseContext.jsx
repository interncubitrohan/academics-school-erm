import React, { createContext, useContext, useState } from 'react';

const PurchaseContext = createContext();

export const usePurchase = () => {
    return useContext(PurchaseContext);
};

export const PurchaseProvider = ({ children }) => {
    // Initialize with empty array
    const [requests, setRequests] = useState([]);

    const addRequest = (newRequestData, department) => {
        const newRequest = {
            id: Date.now(), // Simple unique ID
            requestId: `REQ-2024-${String(requests.length + 1).padStart(3, '0')}`,
            requester: "Current User", // Placeholder until auth is fully integrated
            department: department,
            requestDate: new Date().toLocaleDateString('en-CA'), // YYYY-MM-DD
            status: "requested",
            items: newRequestData, // Expecting array of items
            totalItems: newRequestData.reduce((sum, item) => sum + Number(item.quantity), 0),
            statusHistory: [
                {
                    status: 'requested',
                    date: new Date().toISOString(),
                    by: "Current User", // Placeholder
                    remarks: "Request Created"
                }
            ]
        };
        setRequests([newRequest, ...requests]);
        return newRequest;
    };

    const updateRequestStatus = (id, status, remark) => {
        setRequests(prevRequests =>
            prevRequests.map(req =>
                req.id === id
                    ? {
                        ...req,
                        status: status,
                        remarks: remark, // Standardized as 'remarks' based on requirements
                        approvedBy: status === 'approved' ? "Principal-User-001" : null, // Mock Principal ID
                        rejectedBy: status === 'rejected' ? "Principal-User-001" : null, // Mock Principal ID
                        approvalDate: new Date().toISOString(),
                        statusHistory: [
                            ...(req.statusHistory || []),
                            {
                                status: status,
                                date: new Date().toISOString(),
                                by: "Principal-User-001",
                                remarks: remark
                            }
                        ]
                    }
                    : req
            )
        );
    };

    const generatePO = (requestId, poData) => {
        setRequests(prevRequests =>
            prevRequests.map(req => {
                if (req.id === requestId) {
                    const poNumber = `PO-${new Date().getFullYear()}-${String(requestId).slice(-4)}`;
                    return {
                        ...req,
                        status: 'po_generated',
                        poDetails: {
                            poNumber,
                            generatedDate: new Date().toISOString(),
                            generatedBy: "Purchase-Dept-User-001", // Mock user
                            vendorDetails: poData.vendorDetails,
                            items: poData.items, // Now contains unitPrice and total
                            totals: poData.totals // subtotal, tax, grandTotal
                        },
                        statusHistory: [
                            ...(req.statusHistory || []),
                            {
                                status: 'po_generated',
                                date: new Date().toISOString(),
                                by: "Purchase-Dept-User-001",
                                remarks: `PO Generated: ${poNumber} - Vendor: ${poData.vendorDetails.name}`
                            }
                        ]
                    };
                }
                return req;
            })
        );
    };

    const addInvoiceDetails = (requestId, invoiceData) => {
        setRequests(prevRequests =>
            prevRequests.map(req => {
                if (req.id === requestId) {
                    return {
                        ...req,
                        status: 'invoice_received', // Update status
                        invoiceDetails: {
                            ...invoiceData,
                            uploadedDate: new Date().toISOString(),
                            uploadedBy: "Purchase-Dept-User-001" // Mock user
                        },
                        statusHistory: [
                            ...(req.statusHistory || []),
                            {
                                status: 'invoice_received',
                                date: new Date().toISOString(),
                                by: "Purchase-Dept-User-001",
                                remarks: `Invoice Uploaded: ${invoiceData.invoiceNumber}`
                            }
                        ]
                    };
                }
                return req;
            })
        );
    };

    const addGRN = (requestId, grnData) => {
        setRequests(prevRequests =>
            prevRequests.map(req => {
                if (req.id === requestId) {
                    // Determine Status (Partial vs Full)
                    const totalOrdered = req.items.reduce((sum, item) => sum + Number(item.quantity), 0);
                    const totalReceived = grnData.items.reduce((sum, item) => sum + Number(item.receivedQuantity), 0);

                    const newStatus = totalReceived < totalOrdered ? 'partially_received' : 'goods_received';

                    return {
                        ...req,
                        status: newStatus,
                        grnDetails: {
                            ...grnData,
                            receivedDate: new Date().toISOString(),
                            receivedBy: "Store-Manager-001" // Mock user
                        },
                        statusHistory: [
                            ...(req.statusHistory || []),
                            {
                                status: newStatus,
                                date: new Date().toISOString(),
                                by: "Store-Manager-001",
                                remarks: `Goods Received: ${newStatus === 'partially_received' ? 'Partial' : 'Full'} Delivery`
                            }
                        ]
                    };
                }
                return req;
            })
        );
    };

    const completePayment = (requestId, paymentData) => {
        setRequests(prevRequests =>
            prevRequests.map(req => {
                if (req.id === requestId) {
                    const newStatus = paymentData.status === 'paid' ? 'payment_completed' : 'payment_rejected';
                    return {
                        ...req,
                        status: newStatus,
                        paymentDetails: {
                            ...paymentData,
                            processedDate: new Date().toISOString(),
                            processedBy: "Accountant-001" // Mock user
                        },
                        statusHistory: [
                            ...(req.statusHistory || []),
                            {
                                status: newStatus,
                                date: new Date().toISOString(),
                                by: "Accountant-001",
                                remarks: paymentData.remarks || (paymentData.status === 'paid' ? 'Payment Processed' : 'Payment Rejected')
                            }
                        ]
                    };
                }
                return req;
            })
        );
    };

    const value = {
        requests,
        addRequest,
        updateRequestStatus,
        generatePO,
        addInvoiceDetails,
        addGRN,
        completePayment
    };

    return (
        <PurchaseContext.Provider value={value}>
            {children}
        </PurchaseContext.Provider>
    );
};
