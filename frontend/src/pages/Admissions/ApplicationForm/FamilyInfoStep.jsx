import React, { useEffect } from 'react';

const FamilyInfoStep = ({ formData, setFormData }) => {

    // Default to Father if not selected
    const selectedRelation = formData.familyInfo?.selectedRelation || 'Father';

    const handleRelationChange = (e) => {
        const relation = e.target.value;
        setFormData(prev => ({
            ...prev,
            familyInfo: {
                ...prev.familyInfo,
                selectedRelation: relation
            }
        }));
    };

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

            {/* Relation Selector */}
            <div className="mb-6">
                <label className="mb-3 block text-black dark:text-white font-medium">
                    Whose details would you like to provide?
                </label>
                <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                        value={selectedRelation}
                        onChange={handleRelationChange}
                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                        <option value="Father">Father</option>
                        <option value="Mother">Mother</option>
                        <option value="Guardian">Guardian</option>
                    </select>
                    <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                        <svg
                            className="fill-current"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g opacity="0.8">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                    fill=""
                                ></path>
                            </g>
                        </svg>
                    </span>
                </div>
            </div>

            {selectedRelation === 'Father' && renderFatherForm()}
            {selectedRelation === 'Mother' && renderMotherForm()}
            {selectedRelation === 'Guardian' && renderGuardianForm()}

        </div>
    );
};

export default FamilyInfoStep;
