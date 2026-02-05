import React from 'react';
import { FiCheck } from 'react-icons/fi';

const FacilitiesStep = ({ formData, setFormData }) => {

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: checked
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="flex flex-col gap-9">
            {/* Transport Facility */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Transport Facility
                    </h3>
                </div>
                <div className="p-6.5">
                    <div className="mb-4.5">
                        <label htmlFor="busNeeded" className="flex cursor-pointer select-none items-center">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    id="busNeeded"
                                    className="sr-only"
                                    name="busNeeded"
                                    checked={formData.busNeeded}
                                    onChange={handleCheckboxChange}
                                />
                                <div
                                    className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${formData.busNeeded ? 'border-primary bg-primary' : 'border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-700'
                                        }`}
                                >
                                    {formData.busNeeded && (
                                        <FiCheck className="text-white text-sm" />
                                    )}
                                </div>
                            </div>
                            Opt-in for School Bus
                        </label>
                    </div>
                </div>
            </div>

            {/* Hostel Facility */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Hostel Facility
                    </h3>
                </div>
                <div className="p-6.5">
                    <div className="mb-4.5">
                        <label htmlFor="hostelNeeded" className="flex cursor-pointer select-none items-center">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    id="hostelNeeded"
                                    className="sr-only"
                                    name="hostelNeeded"
                                    checked={formData.hostelNeeded}
                                    onChange={handleCheckboxChange}
                                />
                                <div
                                    className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${formData.hostelNeeded ? 'border-primary bg-primary' : 'border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-700'
                                        }`}
                                >
                                    {formData.hostelNeeded && (
                                        <FiCheck className="text-white text-sm" />
                                    )}
                                </div>
                            </div>
                            Opt-in for Hostel Accommodation
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FacilitiesStep;
