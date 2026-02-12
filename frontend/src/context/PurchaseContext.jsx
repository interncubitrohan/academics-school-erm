import React, { createContext, useContext, useState } from 'react';
import { mockPurchaseRequests } from '../data/mockPurchaseRequests';

const PurchaseContext = createContext();

export const usePurchase = () => {
    return useContext(PurchaseContext);
};

export const PurchaseProvider = ({ children }) => {
    // Initialize with mock data for demonstration
    const [requests, setRequests] = useState(mockPurchaseRequests);

    const addRequest = (newRequestData) => {
        const newRequest = {
            id: Date.now(), // Simple unique ID
            requestId: `REQ-2024-${String(requests.length + 1).padStart(3, '0')}`,
            requester: "Current User", // Placeholder until auth is fully integrated
            department: "IT Department", // Placeholder
            requestDate: new Date().toLocaleDateString('en-CA'), // YYYY-MM-DD
            status: "requested",
            items: newRequestData, // Expecting array of items
            totalItems: newRequestData.reduce((sum, item) => sum + Number(item.quantity), 0)
        };
        setRequests([newRequest, ...requests]);
        return newRequest;
    };

    const updateRequestStatus = (id, status, remark) => {
        setRequests(prevRequests =>
            prevRequests.map(req =>
                req.id === id
                    ? { ...req, status: status, remark: remark }
                    : req
            )
        );
    };

    const completePurchase = (id, purchaseData) => {
        setRequests(prevRequests =>
            prevRequests.map(req =>
                req.id === id
                    ? { ...req, status: 'purchased', purchaseDetails: purchaseData }
                    : req
            )
        );
    };

    const value = {
        requests,
        addRequest,
        updateRequestStatus,
        completePurchase
    };

    return (
        <PurchaseContext.Provider value={value}>
            {children}
        </PurchaseContext.Provider>
    );
};
