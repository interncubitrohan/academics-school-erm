import { useState, useMemo } from "react";

export default function FeeAllocation() {
    // 1. STATE (REQUIRED)
    const [feeComponents, setFeeComponents] = useState([]);
    const [concession, setConcession] = useState({ type: "fixed", value: 0, reason: "" });

    // 2. ADD FEE COMPONENT (UI + LOGIC)
    const addFeeComponent = () => {
        const newComponent = {
            id: Date.now().toString(),
            feeName: "",
            type: "tuition",
            amount: 0,
            isActive: true
        };
        setFeeComponents([...feeComponents, newComponent]);
    };

    // 4. REMOVE FEE COMPONENT (UI + LOGIC)
    const removeFeeComponent = (id) => {
        setFeeComponents(feeComponents.filter(component => component.id !== id));
    };

    // 5. INPUT HANDLING (REQUIRED)
    const updateFeeComponent = (id, field, value) => {
        setFeeComponents(feeComponents.map(component =>
            component.id === id ? { ...component, [field]: value } : component
        ));
    };

    const updateConcession = (field, value) => {
        setConcession(prev => ({ ...prev, [field]: value }));
    };

    // CALCULATIONS
    const grossTotal = useMemo(() => {
        return feeComponents
            .filter(c => c.isActive)
            .reduce((sum, c) => sum + (Number(c.amount) || 0), 0);
    }, [feeComponents]);

    const concessionAmount = useMemo(() => {
        const value = Number(concession.value) || 0;
        if (concession.type === "percentage") {
            return (grossTotal * value) / 100;
        } else if (concession.type === "fixed") {
            return value;
        }
        return 0; // type === "none"
    }, [grossTotal, concession.type, concession.value]);

    const netTotal = useMemo(() => {
        const total = grossTotal - concessionAmount;
        return total > 0 ? total : 0;
    }, [grossTotal, concessionAmount]);


    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Fee Allocation</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Allocate fee structure for the application</p>
            </div>

            <div className="rounded-sm border border-gray-200 bg-white shadow-default dark:border-gray-700 dark:bg-gray-800">
                <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                    <h3 className="font-medium text-black dark:text-white">
                        Student Summary
                    </h3>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Application ID</p>
                            <p className="font-medium text-black dark:text-white">APP-2024-001</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Student Name</p>
                            <p className="font-medium text-black dark:text-white">Rahul Sharma</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Class</p>
                            <p className="font-medium text-black dark:text-white">Class 10-A</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
                            <p className="font-medium text-black dark:text-white">Pending Fee Allocation</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="rounded-sm border border-gray-200 bg-white shadow-default dark:border-gray-700 dark:bg-gray-800">
                <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700 flex justify-between items-center">
                    <h3 className="font-medium text-black dark:text-white">
                        Fee Components
                    </h3>
                    <button
                        onClick={addFeeComponent}
                        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-center text-sm font-medium text-white hover:bg-opacity-90 transition-opacity"
                    >
                        + Add Fee Component
                    </button>
                </div>
                <div className="p-6">
                    <div className="max-w-full overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-gray-700 text-left">
                                    <th className="min-w-[200px] py-4 px-4 font-medium text-black dark:text-white">
                                        Fee Name
                                    </th>
                                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                        Fee Type
                                    </th>
                                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                        Amount
                                    </th>
                                    <th className="min-w-[80px] py-4 px-4 font-medium text-black dark:text-white">
                                        Active
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {feeComponents.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="py-8 text-center text-gray-500 dark:text-gray-400">
                                            No fee components added yet. Click "+ Add Fee Component" to start.
                                        </td>
                                    </tr>
                                ) : (
                                    feeComponents.map((component) => (
                                        <tr key={component.id} className="border-b border-[#eee] dark:border-gray-700">
                                            <td className="py-5 px-4">
                                                <input
                                                    type="text"
                                                    value={component.feeName}
                                                    onChange={(e) => updateFeeComponent(component.id, 'feeName', e.target.value)}
                                                    placeholder="Enter fee name"
                                                    className="w-full rounded border border-gray-300 bg-transparent py-2 px-3 text-black outline-none transition focus:border-primary dark:border-gray-600 dark:text-white"
                                                />
                                            </td>
                                            <td className="py-5 px-4">
                                                <select
                                                    value={component.type}
                                                    onChange={(e) => updateFeeComponent(component.id, 'type', e.target.value)}
                                                    className="w-full rounded border border-gray-300 bg-transparent py-2 px-3 text-black outline-none transition focus:border-primary dark:border-gray-600 dark:text-white"
                                                >
                                                    <option value="tuition">Tuition</option>
                                                    <option value="books">Books</option>
                                                    <option value="transport">Transport</option>
                                                    <option value="hostel">Hostel</option>
                                                    <option value="exam">Exam</option>
                                                    <option value="custom">Custom</option>
                                                </select>
                                            </td>
                                            <td className="py-5 px-4">
                                                <input
                                                    type="number"
                                                    value={component.amount}
                                                    onChange={(e) => updateFeeComponent(component.id, 'amount', Number(e.target.value))}
                                                    placeholder="0"
                                                    className="w-full rounded border border-gray-300 bg-transparent py-2 px-3 text-black outline-none transition focus:border-primary dark:border-gray-600 dark:text-white"
                                                />
                                            </td>
                                            <td className="py-5 px-4">
                                                <input
                                                    type="checkbox"
                                                    checked={component.isActive}
                                                    onChange={(e) => updateFeeComponent(component.id, 'isActive', e.target.checked)}
                                                    className="h-5 w-5 rounded border-gray-300 accent-primary"
                                                />
                                            </td>
                                            <td className="py-5 px-4">
                                                <button
                                                    onClick={() => removeFeeComponent(component.id)}
                                                    className="inline-flex items-center justify-center rounded-md bg-danger px-4 py-2 text-center font-medium text-white hover:bg-opacity-90 transition-opacity"
                                                >
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-sm border border-gray-200 bg-white shadow-default dark:border-gray-700 dark:bg-gray-800">
                    <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                        <h3 className="font-medium text-black dark:text-white">
                            Concession
                        </h3>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Type
                                    </label>
                                    <select
                                        value={concession.type}
                                        onChange={(e) => updateConcession('type', e.target.value)}
                                        className="w-full rounded border border-gray-300 bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-gray-600 dark:text-white"
                                    >
                                        <option value="fixed">Fixed Amount</option>
                                        <option value="percentage">Percentage</option>
                                        <option value="none">None</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Value
                                    </label>
                                    <input
                                        type="number"
                                        value={concession.value}
                                        onChange={(e) => updateConcession('value', Number(e.target.value))}
                                        placeholder="0"
                                        disabled={concession.type === 'none'}
                                        className="w-full rounded border border-gray-300 bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-gray-600 dark:text-white disabled:bg-gray-100 disabled:dark:bg-gray-700"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Concession Reason
                                </label>
                                <textarea
                                    rows="3"
                                    value={concession.reason}
                                    onChange={(e) => updateConcession('reason', e.target.value)}
                                    placeholder="Enter reason for concession"
                                    className="w-full rounded border border-gray-300 bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-gray-600 dark:text-white"
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-sm border border-gray-200 bg-white shadow-default dark:border-gray-700 dark:bg-gray-800">
                    <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                        <h3 className="font-medium text-black dark:text-white">
                            Fee Summary
                        </h3>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-500 dark:text-gray-400">Gross Total</span>
                                <span className="text-xl font-bold text-black dark:text-white">₹ {grossTotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-500 dark:text-gray-400">Concession ({concession.type === 'percentage' ? `${concession.value}%` : 'Fixed'})</span>
                                <span className="text-xl font-bold text-danger">- ₹ {concessionAmount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center py-4">
                                <span className="text-lg font-bold text-black dark:text-white">Net Payable</span>
                                <span className="text-2xl font-bold text-success">₹ {netTotal.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-4">
                <button className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-center font-medium text-white hover:bg-opacity-90 transition-opacity">
                    Save Fee Allocation
                </button>
                <button className="inline-flex items-center justify-center rounded-md bg-success px-6 py-3 text-center font-medium text-white hover:bg-opacity-90 transition-opacity">
                    Forward to Principal
                </button>
            </div>
        </div>
    );
}