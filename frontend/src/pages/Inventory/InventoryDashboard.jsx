import React from 'react';
import { useInventory } from '../../context/InventoryContext';
import { FiBox, FiList, FiActivity } from 'react-icons/fi';

const InventoryDashboard = () => {
    const { inventoryItems, inwardLogs } = useInventory() || {};

    return (
        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-black dark:text-white flex items-center gap-2">
                    <FiActivity className="text-primary" /> Inventory Dashboard
                </h2>
                <p className="text-sm text-gray-500">Track stock levels and movements</p>
            </div>

            {/* Stock Levels */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6 xl:grid-cols-3 mb-8">
                {/* Summary Card */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="text-title-md font-bold text-black dark:text-white">
                                {inventoryItems?.length || 0}
                            </h4>
                            <span className="text-sm font-medium text-gray-500">Total Unique Items</span>
                        </div>
                        <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <FiBox size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Inventory Table */}
            <div className="rounded-2xl border border-gray-200 bg-white shadow-default dark:border-strokedark dark:bg-boxdark mb-8">
                <div className="px-4 py-6 md:px-6 xl:px-7.5 border-b border-stroke dark:border-strokedark">
                    <h4 className="text-xl font-semibold text-black dark:text-white flex items-center gap-2">
                        <FiList /> Current Stock
                    </h4>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                <th className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11">Item Name</th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white">Category</th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white">Location</th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white text-right">Quantity</th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white">Last Updated</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inventoryItems?.map((item) => (
                                <tr key={item.id} className="border-b border-stroke dark:border-strokedark">
                                    <td className="py-5 px-4 pl-9 xl:pl-11">
                                        <h5 className="font-medium text-black dark:text-white">{item.name}</h5>
                                    </td>
                                    <td className="py-5 px-4">
                                        <span className="inline-block rounded bg-gray-100 px-2.5 py-0.5 text-sm font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="py-5 px-4 text-sm text-gray-500">{item.location}</td>
                                    <td className="py-5 px-4 text-right">
                                        <h5 className="font-bold text-primary">{item.quantity}</h5>
                                    </td>
                                    <td className="py-5 px-4 text-sm text-gray-500">
                                        {new Date(item.lastUpdated).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Inward History */}
            <div className="rounded-2xl border border-gray-200 bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="px-4 py-6 md:px-6 xl:px-7.5 border-b border-stroke dark:border-strokedark">
                    <h4 className="text-xl font-semibold text-black dark:text-white flex items-center gap-2">
                        <FiActivity /> Recent Inward Movements
                    </h4>
                </div>
                <div className="p-4 md:p-6 xl:p-7.5">
                    {inwardLogs?.length === 0 ? (
                        <p className="text-gray-500 italic">No movement history.</p>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {inwardLogs?.map((log) => (
                                <div key={log.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-stroke rounded-lg dark:border-strokedark bg-gray-50 dark:bg-meta-4">
                                    <div className="mb-2 md:mb-0">
                                        <h5 className="font-semibold text-black dark:text-white">
                                            PO: {log.poNumber}
                                        </h5>
                                        <p className="text-sm text-gray-500">
                                            Processed by {log.user} on {new Date(log.date).toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        {log.items.map((item, idx) => (
                                            <div key={idx} className="flex justify-between items-center text-sm gap-4 min-w-[200px]">
                                                <span>{item.name}</span>
                                                <span className="font-bold text-success">+{item.quantity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InventoryDashboard;
