import React, { createContext, useContext, useState } from 'react';

const InventoryContext = createContext();

export const useInventory = () => useContext(InventoryContext);

export const InventoryProvider = ({ children }) => {
    // Inventory Items: { id, name, category, location, quantity, lastUpdated }
    const [inventoryItems, setInventoryItems] = useState([
        { id: 101, name: "A4 Paper Reams", category: "Stationery", location: "Store Room A", quantity: 50, lastUpdated: "2023-10-01" },
        { id: 102, name: "Whiteboard Markers", category: "Stationery", location: "Store Room B", quantity: 20, lastUpdated: "2023-10-05" },
    ]);

    // Inward Logs: { id, requestId, poNumber, items: [], date, user }
    const [inwardLogs, setInwardLogs] = useState([]);

    const addStock = (itemData) => {
        setInventoryItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(
                item => item.name === itemData.name && item.location === itemData.location
            );

            if (existingItemIndex >= 0) {
                // Update existing item
                const newItems = [...prevItems];
                newItems[existingItemIndex] = {
                    ...newItems[existingItemIndex],
                    quantity: newItems[existingItemIndex].quantity + Number(itemData.quantity),
                    lastUpdated: new Date().toISOString()
                };
                return newItems;
            } else {
                // Add new item
                return [...prevItems, {
                    id: Date.now(), // Simple ID generation
                    ...itemData,
                    quantity: Number(itemData.quantity),
                    lastUpdated: new Date().toISOString()
                }];
            }
        });
    };

    const processInward = (request, inwardData) => {
        // inwardData array of { name, quantity, category, location }

        // 1. Update Stock
        inwardData.forEach(item => {
            addStock(item);
        });

        // 2. Log Entry
        const newLog = {
            id: Date.now(),
            requestId: request.id,
            poNumber: request.poDetails?.poNumber,
            items: inwardData,
            date: new Date().toISOString(),
            user: "Store-Manager-001"
        };
        setInwardLogs(prev => [newLog, ...prev]);

        return true;
    };

    const value = {
        inventoryItems,
        inwardLogs,
        addStock,
        processInward
    };

    return (
        <InventoryContext.Provider value={value}>
            {children}
        </InventoryContext.Provider>
    );
};
