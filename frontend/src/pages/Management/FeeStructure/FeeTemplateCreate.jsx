import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { FiPlus, FiTrash2, FiSave } from 'react-icons/fi';

const FeeTemplateCreate = () => {
    const navigate = useNavigate();

    // Initial State
    const [formData, setFormData] = useState({
        academicYear: '',
        classId: '',
        name: '',
        yearlyIncrementPercentage: 0,
        isActive: true,
        feeComponents: [
            {
                name: 'Tuition Fee',
                type: 'Tuition',
                amount: 0,
                frequency: 'Annual',
                isOptional: false,
                isActive: true,
            },
        ],
    });

    const [totalAmount, setTotalAmount] = useState(0);

    // Mock Data for Dropdowns
    const academicYears = ['2024-2025', '2025-2026', '2026-2027'];
    const classes = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 10 - Science'];
    const feeTypes = ['Tuition', 'Development', 'Laboratory', 'Library', 'Examination', 'Sports', 'Miscellaneous'];
    const frequencies = ['Annual', 'Term', 'Monthly', 'One-Time'];

    // Calculate Total Amount whenever feeComponents change
    useEffect(() => {
        const total = formData.feeComponents.reduce((sum, component) => {
            return component.isActive && !component.isOptional ? sum + Number(component.amount) : sum;
        }, 0);
        setTotalAmount(total);
    }, [formData.feeComponents]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleComponentChange = (index, field, value) => {
        const updatedComponents = [...formData.feeComponents];
        updatedComponents[index][field] = value;
        setFormData((prev) => ({ ...prev, feeComponents: updatedComponents }));
    };

    const addFeeComponent = () => {
        setFormData((prev) => ({
            ...prev,
            feeComponents: [
                ...prev.feeComponents,
                {
                    name: '',
                    type: 'Tuition',
                    amount: 0,
                    frequency: 'Annual',
                    isOptional: false,
                    isActive: true,
                },
            ],
        }));
    };

    const removeFeeComponent = (index) => {
        const updatedComponents = formData.feeComponents.filter((_, i) => i !== index);
        setFormData((prev) => ({ ...prev, feeComponents: updatedComponents }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Fee Template Created:', formData);
        // In real app: dispatch(createFeeTemplate(formData));
        navigate('/management/fee-structure/list');
    };

    return (
        <div className="p-6">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                    Create Fee Template
                </h2>
                <div className="flex gap-3">
                    <button
                        onClick={() => navigate('/management/fee-structure/list')}
                        className="rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="inline-flex items-center justify-center gap-2.5 rounded bg-primary py-2 px-6 font-medium text-white hover:bg-opacity-90"
                    >
                        <FiSave /> Save Template
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                {/* General Information */}
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                General Information
                            </h3>
                        </div>
                        <div className="p-6.5">
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Template Name <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="e.g. Class 1 Standard Fee 2025-26"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>

                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Academic Year <span className="text-meta-1">*</span>
                                    </label>
                                    <select
                                        name="academicYear"
                                        value={formData.academicYear}
                                        onChange={handleInputChange}
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    >
                                        <option value="">Select Year</option>
                                        {academicYears.map((year) => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Class <span className="text-meta-1">*</span>
                                    </label>
                                    <select
                                        name="classId"
                                        value={formData.classId}
                                        onChange={handleInputChange}
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    >
                                        <option value="">Select Class</option>
                                        {classes.map((cls) => (
                                            <option key={cls} value={cls}>{cls}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Yearly Increment (%)
                                </label>
                                <input
                                    type="number"
                                    name="yearlyIncrementPercentage"
                                    placeholder="0"
                                    value={formData.yearlyIncrementPercentage}
                                    onChange={handleInputChange}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Status
                                </label>
                                <div className="flex items-center gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="isActive"
                                            checked={formData.isActive}
                                            onChange={handleInputChange}
                                            className="form-checkbox h-5 w-5 text-primary"
                                        />
                                        <span className="text-black dark:text-white">Active</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Fee Components */}
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex justify-between items-center">
                            <h3 className="font-medium text-black dark:text-white">
                                Fee Components
                            </h3>
                            <button
                                type="button"
                                onClick={addFeeComponent}
                                className="inline-flex items-center justify-center gap-1 rounded bg-primary py-1 px-3 text-sm font-medium text-white hover:bg-opacity-90"
                            >
                                <FiPlus /> Add Component
                            </button>
                        </div>
                        <div className="p-6.5">
                            {formData.feeComponents.map((component, index) => (
                                <div key={index} className="mb-6 rounded-sm border border-stroke bg-gray-2 p-4 dark:border-strokedark dark:bg-meta-4 last:mb-0">
                                    <div className="mb-4 flex justify-between items-start">
                                        <h4 className="text-sm font-bold text-black dark:text-white">
                                            Component #{index + 1}
                                        </h4>
                                        {formData.feeComponents.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeFeeComponent(index)}
                                                className="text-danger hover:text-opacity-80"
                                            >
                                                <FiTrash2 />
                                            </button>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                value={component.name}
                                                onChange={(e) => handleComponentChange(index, 'name', e.target.value)}
                                                className="w-full rounded border-[1.5px] border-stroke bg-white py-2 px-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                                                Amount
                                            </label>
                                            <input
                                                type="number"
                                                value={component.amount}
                                                onChange={(e) => handleComponentChange(index, 'amount', e.target.value)}
                                                className="w-full rounded border-[1.5px] border-stroke bg-white py-2 px-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                                                Type
                                            </label>
                                            <select
                                                value={component.type}
                                                onChange={(e) => handleComponentChange(index, 'type', e.target.value)}
                                                className="w-full rounded border-[1.5px] border-stroke bg-white py-2 px-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                                            >
                                                {feeTypes.map(t => <option key={t} value={t}>{t}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                                                Frequency
                                            </label>
                                            <select
                                                value={component.frequency}
                                                onChange={(e) => handleComponentChange(index, 'frequency', e.target.value)}
                                                className="w-full rounded border-[1.5px] border-stroke bg-white py-2 px-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                                            >
                                                {frequencies.map(f => <option key={f} value={f}>{f}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex gap-6">
                                        <label className="flex items-center gap-2 text-sm">
                                            <input
                                                type="checkbox"
                                                checked={component.isOptional}
                                                onChange={(e) => handleComponentChange(index, 'isOptional', e.target.checked)}
                                                className="form-checkbox text-primary"
                                            />
                                            Optional
                                        </label>
                                        <label className="flex items-center gap-2 text-sm">
                                            <input
                                                type="checkbox"
                                                checked={component.isActive}
                                                onChange={(e) => handleComponentChange(index, 'isActive', e.target.checked)}
                                                className="form-checkbox text-primary"
                                            />
                                            Active
                                        </label>
                                    </div>
                                </div>
                            ))}

                            <div className="mt-4 flex justify-end">
                                <div className="text-right">
                                    <p className="text-sm font-medium text-gray-500">Total Mandatory Amount</p>
                                    <h3 className="text-title-md font-bold text-black dark:text-white">
                                        ₹ {totalAmount.toLocaleString()}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeeTemplateCreate;
