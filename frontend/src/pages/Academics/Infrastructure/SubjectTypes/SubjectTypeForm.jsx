import React, { useState, useEffect } from "react";

const SubjectTypeForm = ({
    onSave,
    onCancel,
    initialData,
}) => {
    const [formData, setFormData] = useState({
        typeName: "",
        typeCode: "",
        description: "",
        isCompulsory: false,
        affectsPromotion: false,
        displayOrder: 0,
        status: "Active",
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleToggle = (field) => {
        setFormData((prev) => ({
            ...prev,
            [field]: !prev[field]
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validation
        if (!formData.typeName || !formData.typeCode) {
            alert("Type Name and Code are required.");
            return;
        }

        onSave({
            ...formData,
            typeCode: formData.typeCode.toUpperCase(), // Ensure uppercase
            displayOrder: Number(formData.displayOrder)
        });
    };

    const ToggleSwitch = ({ label, name, checked, onChange }) => (
        <label className="flex items-center space-x-3 cursor-pointer">
            <div className="relative">
                <input
                    type="checkbox"
                    className="sr-only"
                    name={name}
                    checked={checked}
                    onChange={() => handleToggle(name)}
                />
                <div
                    className={`block w-10 h-6 rounded-full transition-colors ${checked ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
                        }`}
                ></div>
                <div
                    className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${checked ? "translate-x-4" : "translate-x-0"
                        }`}
                ></div>
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
            </span>
        </label>
    );

    return (
        <div className="p-1">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                    {initialData ? "Edit Subject Type" : "Add Subject Type"}
                </h3>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Type Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="typeName"
                            value={formData.typeName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            placeholder="e.g. Scholastic - Core"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Type Code <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="typeCode"
                            value={formData.typeCode}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white uppercase"
                            placeholder="e.g. SCH-CORE"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Display Order
                        </label>
                        <input
                            type="number"
                            name="displayOrder"
                            value={formData.displayOrder}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Description
                        </label>
                        <textarea
                            rows={1}
                            name="description"
                            value={formData.description || ""}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            placeholder="Enter description"
                        />
                    </div>
                </div>

                {/* Status */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Status
                    </label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>

                <div className="flex flex-wrap gap-6 pt-2">
                    <ToggleSwitch
                        label="Is Compulsory"
                        name="isCompulsory"
                        checked={formData.isCompulsory}
                    />
                    <ToggleSwitch
                        label="Affects Promotion"
                        name="affectsPromotion"
                        checked={formData.affectsPromotion}
                    />

                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                    >
                        {initialData ? "Update" : "Save"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SubjectTypeForm;

