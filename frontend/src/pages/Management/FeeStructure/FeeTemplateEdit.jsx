import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { FiPlus, FiTrash2, FiSave, FiArrowLeft } from 'react-icons/fi';
import { dummyFeeTemplates } from './data/dummyFeeTemplates';

const FeeTemplateEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);

    const feeTypes = ['Tuition', 'Development', 'Laboratory', 'Library', 'Examination', 'Sports', 'Miscellaneous'];
    const frequencies = ['Annual', 'Term', 'Monthly', 'One-Time'];

    // Simulate fetching data
    useEffect(() => {
        const foundTemplate = dummyFeeTemplates.find((t) => t._id === id);
        if (foundTemplate) {
            setFormData({
                ...foundTemplate,
                classId: foundTemplate.class._id, // Flatten for edit form
            });
        }
    }, [id]);

    // Calculate Total Amount whenever feeComponents change
    useEffect(() => {
        if (formData) {
            const total = formData.feeComponents.reduce((sum, component) => {
                const amount = Number(component.amount) || 0;
                return component.isActive && !component.isOptional ? sum + amount : sum;
            }, 0);
            setTotalAmount(total);
        }
    }, [formData?.feeComponents]); // Optional chaining in deps might be finicky in some React versions, but safe here typically. Better to verify formData exists inside.

    if (!formData) {
        return <div className="p-6">Loading...</div>;
    }

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
                    isActive: true, // New components active by default
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
        console.log('Fee Template Updated:', { ...formData, totalAmount });
        // In real app: dispatch(updateFeeTemplate(id, formData));
        navigate('/management/fee-structure/list');
    };

    return (
        <div className="p-6">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center justify-center rounded-full bg-white p-2 text-black shadow-1 hover:bg-opacity-90 dark:bg-boxdark dark:text-white"
                    >
                        <FiArrowLeft size={20} />
                    </button>
                    <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                        Edit Fee Template
                    </h2>
                </div>
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
                        <FiSave /> Update Template
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                {/* General Information (Read-Only fields mostly, except increment and status) */}
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                General Information
                            </h3>
                        </div>
                        <div className="p-6.5">
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white font-medium">
                                    Template Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>

                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white font-medium">
                                        Academic Year
                                    </label>
                                    <div className="w-full rounded border-[1.5px] border-stroke bg-gray-2 py-3 px-5 text-black outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white cursor-not-allowed">
                                        {formData.academicYear}
                                    </div>
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white font-medium">
                                        Class
                                    </label>
                                    <div className="w-full rounded border-[1.5px] border-stroke bg-gray-2 py-3 px-5 text-black outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white cursor-not-allowed">
                                        {formData.class.name}
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white font-medium">
                                    Yearly Increment (%)
                                </label>
                                <input
                                    type="number"
                                    name="yearlyIncrementPercentage"
                                    value={formData.yearlyIncrementPercentage}
                                    onChange={handleInputChange}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white font-medium">
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
                                        <button
                                            type="button"
                                            onClick={() => removeFeeComponent(index)}
                                            className="text-danger hover:text-opacity-80"
                                        >
                                            <FiTrash2 />
                                        </button>
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

export default FeeTemplateEdit;
