import React, { useEffect } from 'react';
import { FiCheck } from 'react-icons/fi';

const AddressStep = ({ formData, setFormData }) => {

    // Removed useEffect to prevent race conditions and re-renders
    // Logic moved to handlers

    const handleCheckboxChange = (e) => {
        const checked = e.target.checked;
        setFormData(prev => ({
            ...prev,
            sameAsCurrentAddress: checked,
            // Immediate sync when unchecked -> checked
            permanentAddress: checked ? { ...prev.currentAddress } : { ...prev.permanentAddress }
        }));
    };

    const handleAddressChange = (type, field, value) => {
        setFormData(prev => {
            const updatedSection = {
                ...prev[type],
                [field]: value
            };

            const newState = {
                ...prev,
                [type]: updatedSection
            };

            // If "same as" is checked and we are updating current address, also update permanent
            if (prev.sameAsCurrentAddress && type === 'currentAddress') {
                newState.permanentAddress = { ...updatedSection };
            }

            return newState;
        });
    };

    return (
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
            <div className="flex flex-col gap-9">
                {/* Current Address */}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Current Address
                        </h3>
                    </div>
                    <div className="p-6.5">
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Address Line 1 <span className="text-meta-1">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter address line 1"
                                value={formData.currentAddress?.addressLine1 || ''}
                                onChange={(e) => handleAddressChange('currentAddress', 'addressLine1', e.target.value)}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                        </div>

                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Address Line 2
                            </label>
                            <input
                                type="text"
                                placeholder="Enter address line 2"
                                value={formData.currentAddress?.addressLine2 || ''}
                                onChange={(e) => handleAddressChange('currentAddress', 'addressLine2', e.target.value)}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                        </div>

                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    City <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="City"
                                    value={formData.currentAddress?.city || ''}
                                    onChange={(e) => handleAddressChange('currentAddress', 'city', e.target.value)}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>
                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    State <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="State"
                                    value={formData.currentAddress?.state || ''}
                                    onChange={(e) => handleAddressChange('currentAddress', 'state', e.target.value)}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>
                        </div>

                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Pincode <span className="text-meta-1">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Pincode"
                                value={formData.currentAddress?.pincode || ''}
                                onChange={(e) => handleAddressChange('currentAddress', 'pincode', e.target.value)}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                        </div>

                        <div className="mt-5 mb-5.5 flex items-center justify-between">
                            <label htmlFor="sameAsCurrentAddress" className="flex cursor-pointer select-none items-center">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        id="sameAsCurrentAddress"
                                        className="sr-only"
                                        name="sameAsCurrentAddress"
                                        checked={formData.sameAsCurrentAddress}
                                        onChange={handleCheckboxChange}
                                    />
                                    <div
                                        className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${formData.sameAsCurrentAddress ? 'border-primary bg-primary' : 'border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-700'
                                            }`}
                                    >
                                        {formData.sameAsCurrentAddress && (
                                            <FiCheck className="text-white text-sm" />
                                        )}
                                    </div>
                                </div>
                                Same as Current Address
                            </label>
                        </div>

                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-9">
                {/* Permanent Address */}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Permanent Address
                        </h3>
                    </div>
                    <div className="p-6.5">
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Address Line 1 <span className="text-meta-1">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter address line 1"
                                value={formData.permanentAddress?.addressLine1 || ''}
                                onChange={(e) => handleAddressChange('permanentAddress', 'addressLine1', e.target.value)}
                                disabled={formData.sameAsCurrentAddress}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                        </div>

                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Address Line 2
                            </label>
                            <input
                                type="text"
                                placeholder="Enter address line 2"
                                value={formData.permanentAddress?.addressLine2 || ''}
                                onChange={(e) => handleAddressChange('permanentAddress', 'addressLine2', e.target.value)}
                                disabled={formData.sameAsCurrentAddress}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                        </div>

                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    City <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="City"
                                    value={formData.permanentAddress?.city || ''}
                                    onChange={(e) => handleAddressChange('permanentAddress', 'city', e.target.value)}
                                    disabled={formData.sameAsCurrentAddress}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>
                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    State <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="State"
                                    value={formData.permanentAddress?.state || ''}
                                    onChange={(e) => handleAddressChange('permanentAddress', 'state', e.target.value)}
                                    disabled={formData.sameAsCurrentAddress}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>
                        </div>

                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Pincode <span className="text-meta-1">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Pincode"
                                value={formData.permanentAddress?.pincode || ''}
                                onChange={(e) => handleAddressChange('permanentAddress', 'pincode', e.target.value)}
                                disabled={formData.sameAsCurrentAddress}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddressStep;
