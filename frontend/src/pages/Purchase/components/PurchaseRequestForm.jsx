import React, { useState } from 'react';
import { FiPlus, FiTrash, FiFileText, FiUploadCloud, FiX, FiCheckCircle } from 'react-icons/fi';
import Button from '../../../components/ui/button/Button';

const PurchaseRequestForm = ({ onSubmit }) => {
    const [department, setDepartment] = useState('');
    const [items, setItems] = useState([
        { id: 1, name: '', quantity: '', description: '', file: null }
    ]);

    const handleAddItem = () => {
        setItems([
            ...items,
            { id: Date.now(), name: '', quantity: '', description: '', file: null }
        ]);
    };

    const handleRemoveItem = (id) => {
        setItems(items.filter(item => item.id !== id));
    };

    const handleItemChange = (id, field, value) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    // File handling
    const handleFileChange = (id, e) => {
        const file = e.target.files[0];
        if (file) {
            setItems(items.map(item =>
                item.id === id ? { ...item, file: file } : item
            ));
        }
    };

    const handleRemoveFile = (id) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, file: null } : item
        ));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ items, department });
        // Reset form
        setDepartment('');
        setItems([{ id: Date.now(), name: '', quantity: '', description: '', file: null }]);
    };

    return (
        <div className="rounded-sm border border-gray-200 bg-white shadow-default dark:border-gray-700 dark:bg-gray-800">
            <div className="border-b border-gray-200 py-4 px-6 dark:border-gray-700">
                <h3 className="font-semibold text-gray-800 dark:text-white">
                    Create New Purchase Request
                </h3>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
                <div className="mb-6">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                        Department <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        required
                        placeholder="Enter Department Name"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                </div>

                <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <label className="block font-medium text-black dark:text-white">
                            Items List <span className="text-red-500">*</span>
                        </label>
                        <button
                            type="button"
                            onClick={handleAddItem}
                            className="flex items-center gap-2 rounded-lg border border-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-white transition-colors"
                        >
                            <FiPlus /> Add Item
                        </button>
                    </div>

                    <div className="space-y-4">
                        {items.map((item, index) => (
                            <div key={item.id} className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                                    <div className="md:col-span-4">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Item Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={item.name}
                                            onChange={(e) => handleItemChange(item.id, 'name', e.target.value)}
                                            placeholder="e.g., A4 Paper Ream"
                                            className="w-full rounded border-[1.5px] border-stroke bg-white py-2 px-3 text-sm font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Quantity <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            required
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)}
                                            placeholder="Qty"
                                            className="w-full rounded border-[1.5px] border-stroke bg-white py-2 px-3 text-sm font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                    </div>
                                    <div className="md:col-span-3">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Description
                                        </label>
                                        <input
                                            type="text"
                                            value={item.description}
                                            onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                                            placeholder="Optional details"
                                            className="w-full rounded border-[1.5px] border-stroke bg-white py-2 px-3 text-sm font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Attachment
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="file"
                                                id={`file-${item.id}`}
                                                className="hidden"
                                                onChange={(e) => handleFileChange(item.id, e)}
                                            />
                                            <label
                                                htmlFor={`file-${item.id}`}
                                                className={`flex cursor-pointer items-center justify-center gap-2 rounded border-[1.5px] border-dashed ${item.file ? 'border-primary bg-primary/5 text-primary' : 'border-gray-300 hover:border-primary text-gray-500 hover:text-primary'} py-2 px-3 text-sm font-medium transition-colors dark:border-gray-600 dark:hover:border-primary h-[38px]`}
                                            >
                                                {item.file ? (
                                                    <>
                                                        <FiCheckCircle size={16} />
                                                        <span className="truncate max-w-[80px]" title={item.file.name}>{item.file.name}</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <FiUploadCloud size={16} />
                                                        <span>Upload</span>
                                                    </>
                                                )}
                                            </label>
                                            {item.file && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveFile(item.id)}
                                                    className="absolute -top-2 -right-2 bg-white rounded-full text-red-500 shadow-sm border border-gray-200 hover:bg-red-50 p-0.5 z-10"
                                                    title="Remove File"
                                                >
                                                    <FiX size={12} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    <div className="md:col-span-1 flex items-center justify-center md:items-start md:pt-7">
                                        {items.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveItem(item.id)}
                                                className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                                                title="Remove Item"
                                            >
                                                <FiTrash size={16} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end gap-4 border-t border-gray-200 pt-6 dark:border-gray-700">
                    <button
                        type="button"
                        onClick={() => {
                            setDepartment('');
                            setItems([{ id: Date.now(), name: '', quantity: '', description: '', file: null }]);
                        }}
                        className="rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white transition-all hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                        Reset
                    </button>
                    <Button
                        type="submit"
                        className="rounded bg-primary py-2 px-6 font-medium text-white hover:bg-opacity-90"
                    >
                        Submit Request
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default PurchaseRequestForm;
