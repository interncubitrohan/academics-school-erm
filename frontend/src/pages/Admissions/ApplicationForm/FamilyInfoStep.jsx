import React, { useEffect } from 'react';

const FamilyInfoStep = ({ formData, setFormData }) => {

    const handleFamilyChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            familyInfo: {
                ...prev.familyInfo,
                [field]: value
            }
        }));
    };

    const renderFatherForm = () => (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                    Father's Details
                </h3>
            </div>
            <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Father's Name
                        </label>
                        <input
                            type="text"
                            placeholder="Father's Name"
                            value={formData.familyInfo?.fatherName || ''}
                            onChange={(e) => handleFamilyChange('fatherName', e.target.value)}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                    </div>
                    <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            placeholder="Phone Number"
                            value={formData.familyInfo?.fatherPhoneNumber || ''}
                            onChange={(e) => handleFamilyChange('fatherPhoneNumber', e.target.value)}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                    </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Occupation
                        </label>
                        <input
                            type="text"
                            placeholder="Occupation"
                            value={formData.familyInfo?.fatherOccupation || ''}
                            onChange={(e) => handleFamilyChange('fatherOccupation', e.target.value)}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                    </div>
                    <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Aadhar Number
                        </label>
                        <input
                            type="text"
                            placeholder="Aadhar Number"
                            value={formData.familyInfo?.fatherAadharNumber || ''}
                            onChange={(e) => handleFamilyChange('fatherAadharNumber', e.target.value)}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                    </div>
                </div>
                <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.familyInfo?.fatherEmail || ''}
                        onChange={(e) => handleFamilyChange('fatherEmail', e.target.value)}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Educational Qualification
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. B.Tech, MBA, etc."
                            value={formData.familyInfo?.fatherEducation || ''}
                            onChange={(e) => handleFamilyChange('fatherEducation', e.target.value)}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                    </div>
                    <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Approx Annual Income
                        </label>
                        <select
                            value={formData.familyInfo?.fatherAnnualIncome || ''}
                            onChange={(e) => handleFamilyChange('fatherAnnualIncome', e.target.value)}
                            className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        >
                            <option value="">Select Income Range</option>
                            <option value="Below 2 Lakhs">Below 2 Lakhs</option>
                            <option value="2 – 5 Lakhs">2 – 5 Lakhs</option>
                            <option value="5 – 10 Lakhs">5 – 10 Lakhs</option>
                            <option value="Above 10 Lakhs">Above 10 Lakhs</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderMotherForm = () => (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                    Mother's Details
                </h3>
            </div>
            <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Mother's Name
                        </label>
                        <input
                            type="text"
                            placeholder="Mother's Name"
                            value={formData.familyInfo?.motherName || ''}
                            onChange={(e) => handleFamilyChange('motherName', e.target.value)}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                    </div>
                    <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            placeholder="Phone Number"
                            value={formData.familyInfo?.motherPhoneNumber || ''}
                            onChange={(e) => handleFamilyChange('motherPhoneNumber', e.target.value)}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                    </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Occupation
                        </label>
                        <input
                            type="text"
                            placeholder="Occupation"
                            value={formData.familyInfo?.motherOccupation || ''}
                            onChange={(e) => handleFamilyChange('motherOccupation', e.target.value)}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                    </div>
                    <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Aadhar Number
                        </label>
                        <input
                            type="text"
                            placeholder="Aadhar Number"
                            value={formData.familyInfo?.motherAadharNumber || ''}
                            onChange={(e) => handleFamilyChange('motherAadharNumber', e.target.value)}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                    </div>
                </div>
                <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.familyInfo?.motherEmail || ''}
                        onChange={(e) => handleFamilyChange('motherEmail', e.target.value)}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                </div>
            </div>
        </div>
    );

    const renderGuardianForm = () => (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                    Guardian's Details
                </h3>
            </div>
            <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Guardian's Name
                        </label>
                        <input
                            type="text"
                            placeholder="Guardian's Name"
                            value={formData.familyInfo?.guardianName || ''}
                            onChange={(e) => handleFamilyChange('guardianName', e.target.value)}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                    </div>
                    <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            placeholder="Phone Number"
                            value={formData.familyInfo?.guardianPhoneNumber || ''}
                            onChange={(e) => handleFamilyChange('guardianPhoneNumber', e.target.value)}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                    </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Aadhar Number
                        </label>
                        <input
                            type="text"
                            placeholder="Aadhar Number"
                            value={formData.familyInfo?.guardianAadharNumber || ''}
                            onChange={(e) => handleFamilyChange('guardianAadharNumber', e.target.value)}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                    </div>
                    <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Relation with Guardian
                        </label>
                        <input
                            type="text"
                            placeholder="Relation"
                            value={formData.familyInfo?.relationWithGuardian || ''}
                            onChange={(e) => handleFamilyChange('relationWithGuardian', e.target.value)}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                    </div>
                </div>
                <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.familyInfo?.guardianEmail || ''}
                        onChange={(e) => handleFamilyChange('guardianEmail', e.target.value)}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col gap-9">
            {/* Father's Details - Required */}
            {renderFatherForm()}

            {/* Mother's Details - Required */}
            {renderMotherForm()}

            {/* Guardian's Details - Optional */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Guardian's Details <span className="text-sm text-gray-500 dark:text-gray-400">(Optional)</span>
                    </h3>
                </div>
                <div className="p-6.5">
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full xl:w-1/2">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Guardian's Name
                            </label>
                            <input
                                type="text"
                                placeholder="Guardian's Name"
                                value={formData.familyInfo?.guardianName || ''}
                                onChange={(e) => handleFamilyChange('guardianName', e.target.value)}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                        </div>
                        <div className="w-full xl:w-1/2">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                placeholder="Phone Number"
                                value={formData.familyInfo?.guardianPhoneNumber || ''}
                                onChange={(e) => handleFamilyChange('guardianPhoneNumber', e.target.value)}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                        </div>
                    </div>
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full xl:w-1/2">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Aadhar Number
                            </label>
                            <input
                                type="text"
                                placeholder="Aadhar Number"
                                value={formData.familyInfo?.guardianAadharNumber || ''}
                                onChange={(e) => handleFamilyChange('guardianAadharNumber', e.target.value)}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                        </div>
                        <div className="w-full xl:w-1/2">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Relation with Guardian
                            </label>
                            <input
                                type="text"
                                placeholder="Relation"
                                value={formData.familyInfo?.relationWithGuardian || ''}
                                onChange={(e) => handleFamilyChange('relationWithGuardian', e.target.value)}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                        </div>
                    </div>
                    <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Email"
                            value={formData.familyInfo?.guardianEmail || ''}
                            onChange={(e) => handleFamilyChange('guardianEmail', e.target.value)}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FamilyInfoStep;
