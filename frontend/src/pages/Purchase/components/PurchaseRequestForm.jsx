import React, { useState } from 'react';
import { FiPlus, FiTrash2, FiUpload, FiSave, FiX } from 'react-icons/fi';

const PurchaseRequestForm = ({ onSubmit }) => {
    const [items, setItems] = useState([
        { id: Date.now(), name: '', quantity: '', description: '', file: null }
    ]);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const addItem = () => {
        setItems([...items, { id: Date.now(), name: '', quantity: '', description: '', file: null }]);
    };

    const removeItem = (id) => {
        if (items.length === 1) return;
        setItems(items.filter(item => item.id !== id));
        // Clear errors for removed item
        const newErrors = { ...errors };
        delete newErrors[id];
        setErrors(newErrors);
    };

    const handleChange = (id, field, value) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));

        // Clear error when user types
        if (errors[id]?.[field]) {
            setErrors(prev => ({
                ...prev,
                [id]: { ...prev[id], [field]: null }
            }));
        }
    };

    const handleFileChange = (id, e) => {
        const file = e.target.files[0];
        handleChange(id, 'file', file);
    };

    const validate = () => {
        const newErrors = {};
        let isValid = true;

        items.forEach(item => {
            if (!item.name.trim()) {
                if (!newErrors[item.id]) newErrors[item.id] = {};
                newErrors[item.id].name = 'Object Name is required';
                isValid = false;
            }
            if (!item.quantity) {
                if (!newErrors[item.id]) newErrors[item.id] = {};
                newErrors[item.id].quantity = 'Quantity is required';
                isValid = false;
            } else if (isNaN(item.quantity) || Number(item.quantity) <= 0) {
                if (!newErrors[item.id]) newErrors[item.id] = {};
                newErrors[item.id].quantity = 'Valid quantity required';
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            const payload = items.map(({ id, ...rest }) => ({
                ...rest,
                status: 'requested'
            }));

            if (onSubmit) {
                onSubmit(payload);
            }

            console.log("Structured JSON Payload:", JSON.stringify(payload, null, 2));
            setSubmitted(true);

            // Simulate API call
            setTimeout(() => {
                alert("Purchase Request Submitted Successfully! Check console for payload.");
                setSubmitted(false);
                setItems([{ id: Date.now(), name: '', quantity: '', description: '', file: null }]);
            }, 500);
        }
    };

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
            <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90">
                New Purchase Request
            </h3>

            <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                    {items.map((item, index) => (
                        <div key={item.id} className="relative rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
                            <div className="mb-4 flex items-center justify-between">
                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-xs font-semibold text-white">
                                    {index + 1}
                                </span>
                                {items.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeItem(item.id)}
                                        className="text-gray-500 hover:text-error-500 dark:text-gray-400 dark:hover:text-error-400"
                                        title="Remove Item"
                                    >
                                        <FiTrash2 size={18} />
                                    </button>
                                )}
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
                                {/* Object Name */}
                                <div className="sm:col-span-1 lg:col-span-4">
                                    <label className="mb-1.5 block text-theme-sm font-medium text-gray-700 dark:text-gray-400">
                                        Object Name <span className="text-error-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={item.name}
                                        onChange={(e) => handleChange(item.id, 'name', e.target.value)}
                                        className={`w-full rounded-lg border bg-transparent px-4 py-2.5 text-theme-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring-1 dark:bg-gray-900 dark:text-white/90 ${errors[item.id]?.name
                                            ? 'border-error-500 focus:border-error-500 focus:ring-error-500/10'
                                            : 'border-gray-200 focus:border-brand-500 focus:ring-brand-500/10 dark:border-gray-700 dark:focus:border-brand-500'
                                            }`}
                                        placeholder="e.g. Laptop"
                                    />
                                    {errors[item.id]?.name && (
                                        <p className="mt-1 text-xs text-error-500">{errors[item.id].name}</p>
                                    )}
                                </div>

                                {/* Requested Quantity */}
                                <div className="sm:col-span-1 lg:col-span-2">
                                    <label className="mb-1.5 block text-theme-sm font-medium text-gray-700 dark:text-gray-400">
                                        Quantity <span className="text-error-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => handleChange(item.id, 'quantity', e.target.value)}
                                        className={`w-full rounded-lg border bg-transparent px-4 py-2.5 text-theme-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring-1 dark:bg-gray-900 dark:text-white/90 ${errors[item.id]?.quantity
                                            ? 'border-error-500 focus:border-error-500 focus:ring-error-500/10'
                                            : 'border-gray-200 focus:border-brand-500 focus:ring-brand-500/10 dark:border-gray-700 dark:focus:border-brand-500'
                                            }`}
                                        placeholder="0"
                                        min="1"
                                    />
                                    {errors[item.id]?.quantity && (
                                        <p className="mt-1 text-xs text-error-500">{errors[item.id].quantity}</p>
                                    )}
                                </div>

                                {/* Description */}
                                <div className="sm:col-span-2 lg:col-span-6">
                                    <label className="mb-1.5 block text-theme-sm font-medium text-gray-700 dark:text-gray-400">
                                        Description
                                    </label>
                                    <textarea
                                        value={item.description}
                                        onChange={(e) => handleChange(item.id, 'description', e.target.value)}
                                        rows="1"
                                        className="w-full rounded-lg border border-gray-200 bg-transparent px-4 py-2.5 text-theme-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-500"
                                        placeholder="Add details (optional)"
                                    ></textarea>
                                </div>

                                {/* File Upload */}
                                <div className="sm:col-span-2 lg:col-span-12">
                                    <label className="mb-1.5 block text-theme-sm font-medium text-gray-700 dark:text-gray-400">
                                        Attachment (Optional)
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="file"
                                            onChange={(e) => handleFileChange(item.id, e)}
                                            className="hidden"
                                            id={`file-upload-${item.id}`}
                                        />
                                        <label
                                            htmlFor={`file-upload-${item.id}`}
                                            className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-gray-300 bg-white px-4 py-2 text-theme-sm text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                                        >
                                            <FiUpload className="text-gray-500" />
                                            <span>
                                                {item.file ? item.file.name : "Choose File"}
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6">
                    <button
                        type="button"
                        onClick={addItem}
                        className="flex items-center gap-2 rounded-lg border border-brand-500 px-4 py-2.5 text-theme-sm font-medium text-brand-500 hover:bg-brand-50 dark:border-brand-400 dark:text-brand-400 dark:hover:bg-brand-500/10"
                    >
                        <FiPlus size={20} />
                        Add Another Item
                    </button>
                </div>

                <div className="mt-8 flex items-center justify-end gap-3 border-t border-gray-200 pt-6 dark:border-gray-800">
                    <button
                        type="button"
                        className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-theme-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
                        onClick={() => {
                            if (window.confirm('Are you sure you want to cancel? All changes will be lost.')) {
                                setItems([{ id: Date.now(), name: '', quantity: '', description: '', file: null }]);
                                setErrors({});
                            }
                        }}
                    >
                        <FiX size={20} />
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-theme-sm font-medium text-white shadow-theme-xs hover:bg-brand-600 dark:bg-brand-500 dark:hover:bg-brand-600"
                    >
                        <FiSave size={20} />
                        Submit Request
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PurchaseRequestForm;
