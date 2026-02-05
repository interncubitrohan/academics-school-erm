import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { FiArrowLeft, FiEdit } from 'react-icons/fi';
import { dummyFeeTemplates } from './data/dummyFeeTemplates';

const FeeTemplateDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [template, setTemplate] = useState(null);

    useEffect(() => {
        // Simulate fetching data
        const foundTemplate = dummyFeeTemplates.find((t) => t._id === id);
        if (foundTemplate) {
            setTemplate(foundTemplate);
        }
    }, [id]);

    if (!template) {
        return <div className="p-6">Loading...</div>;
    }

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
                        Fee Template Details
                    </h2>
                </div>
                <button
                    onClick={() => navigate(`/management/fee-structure/edit/${template._id}`)}
                    className="inline-flex items-center justify-center gap-2.5 rounded bg-primary py-2 px-6 font-medium text-white hover:bg-opacity-90"
                >
                    <FiEdit /> Edit Template
                </button>
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
                                <label className="mb-2.5 block text-black dark:text-white font-medium">
                                    Template Name
                                </label>
                                <div className="text-black dark:text-white">
                                    {template.name}
                                </div>
                            </div>

                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white font-medium">
                                        Academic Year
                                    </label>
                                    <div className="text-black dark:text-white">
                                        {template.academicYear}
                                    </div>
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white font-medium">
                                        Class
                                    </label>
                                    <div className="text-black dark:text-white">
                                        {template.class.name}
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white font-medium">
                                    Yearly Increment
                                </label>
                                <div className="text-black dark:text-white">
                                    {template.yearlyIncrementPercentage}%
                                </div>
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white font-medium">
                                    Status
                                </label>
                                <p
                                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${template.isActive
                                            ? 'bg-success text-success'
                                            : 'bg-danger text-danger'
                                        }`}
                                >
                                    {template.isActive ? 'Active' : 'Inactive'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Fee Components */}
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Fee Components
                            </h3>
                        </div>
                        <div className="p-6.5">
                            <div className="flex flex-col">
                                <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
                                    <div className="p-2.5 text-center xl:p-5">
                                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                                            Component
                                        </h5>
                                    </div>
                                    <div className="p-2.5 text-center xl:p-5">
                                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                                            Type
                                        </h5>
                                    </div>
                                    <div className="p-2.5 text-center xl:p-5">
                                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                                            Frequency
                                        </h5>
                                    </div>
                                    <div className="p-2.5 text-center xl:p-5">
                                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                                            Amount
                                        </h5>
                                    </div>
                                </div>

                                {template.feeComponents.map((component, key) => (
                                    <div
                                        className={`grid grid-cols-4 sm:grid-cols-4 ${key === template.feeComponents.length - 1
                                                ? ''
                                                : 'border-b border-stroke dark:border-strokedark'
                                            }`}
                                        key={key}
                                    >
                                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                                            <p className="text-black dark:text-white">
                                                {component.name}
                                                {component.isOptional && <span className="text-xs text-meta-5 ml-1">(Optional)</span>}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                                            <p className="text-black dark:text-white">
                                                {component.type}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                                            <p className="text-black dark:text-white">
                                                {component.frequency}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                                            <p className="text-black dark:text-white">
                                                ₹ {component.amount.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 flex justify-end">
                                <div className="text-right">
                                    <p className="text-sm font-medium text-gray-500">Total Amount</p>
                                    <h3 className="text-title-md font-bold text-black dark:text-white">
                                        ₹ {template.totalAmount.toLocaleString()}
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

export default FeeTemplateDetails;
