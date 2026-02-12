import React, { useState } from 'react';
import { Link } from 'react-router';
import PurchaseRequestForm from './components/PurchaseRequestForm';
import { usePurchase } from '../../context/PurchaseContext';

const PurchaseRequest = () => {
    const { addRequest, requests } = usePurchase();
    const [lastPayload, setLastPayload] = useState(null);

    // Flatten requests to show individual items in the table (matching previous view)
    const allItems = requests.flatMap(req =>
        req.items.map(item => ({
            ...item,
            status: req.status,
            submissionDate: req.requestDate // Or formatted timestamp
        }))
    );

    const handleRequestSubmit = (newItems) => {
        const newRequest = addRequest(newItems);
        setLastPayload(newRequest); // Show the full request object payload
    };

    return (
        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-2xl font-bold text-black dark:text-white">
                    Purchase Request
                </h2>

                <nav>
                    <ol className="flex items-center gap-2">
                        <li>
                            <Link className="font-medium" to="/">Dashboard /</Link>
                        </li>
                        <li className="font-medium text-primary">Purchase Request</li>
                    </ol>
                </nav>
            </div>

            <div className="flex flex-col gap-10">
                <PurchaseRequestForm onSubmit={handleRequestSubmit} />

                {lastPayload && (
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90">
                            Last Submitted Payload (JSON)
                        </h3>
                        <pre className="overflow-x-auto rounded bg-gray-50 p-4 text-xs text-gray-800 dark:bg-gray-900 dark:text-gray-300">
                            {JSON.stringify(lastPayload, null, 2)}
                        </pre>
                    </div>
                )}

                {allItems.length > 0 && (
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90">
                            Submitted Requests
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full whitespace-nowrap text-left text-theme-sm dark:text-white/90">
                                <thead className="border-b border-gray-200 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                                    <tr>
                                        <th className="px-4 py-3 font-medium">Item Name</th>
                                        <th className="px-4 py-3 font-medium">Quantity</th>
                                        <th className="px-4 py-3 font-medium">Description</th>
                                        <th className="px-4 py-3 font-medium">Status</th>
                                        <th className="px-4 py-3 font-medium">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                                    {allItems.map((req, index) => (
                                        <tr key={`${req.id}-${index}`}>
                                            <td className="px-4 py-3 text-gray-800 dark:text-white/90">{req.name}</td>
                                            <td className="px-4 py-3 text-gray-800 dark:text-white/90">{req.quantity}</td>
                                            <td className="px-4 py-3 text-gray-500 dark:text-gray-400 max-w-xs truncate">{req.description || '-'}</td>
                                            <td className="px-4 py-3">
                                                <span className="inline-flex items-center rounded-md bg-brand-50 px-2 py-1 text-xs font-medium text-brand-600 ring-1 ring-inset ring-brand-500/10 dark:bg-brand-500/10 dark:text-brand-400 dark:ring-brand-500/20">
                                                    {req.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{req.submissionDate}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PurchaseRequest;
