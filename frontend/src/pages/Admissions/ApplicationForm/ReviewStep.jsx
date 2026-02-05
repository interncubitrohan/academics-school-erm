import React from 'react';
import ApplicationStatusBadge from '../components/ApplicationStatusBadge';

const ReviewStep = ({ formData }) => {

    const InfoRow = ({ label, value }) => (
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between py-3 border-b border-stroke dark:border-strokedark last:border-0">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-1/3">{label}</span>
            <span className="text-sm font-semibold text-black dark:text-white w-2/3 text-right">{value || '-'}</span>
        </div>
    );

    const SectionHeader = ({ title }) => (
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark bg-gray-50 dark:bg-meta-4">
            <h3 className="font-medium text-black dark:text-white">
                {title}
            </h3>
        </div>
    );

    return (
        <div className="flex flex-col gap-9">

            {/* Application Status */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="p-6.5 flex items-center justify-between">
                    <h3 className="font-medium text-black dark:text-white">Application Status</h3>
                    <ApplicationStatusBadge status={formData.status} />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-9 xl:grid-cols-2">
                {/* Personal Information */}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <SectionHeader title="Personal Information" />
                    <div className="p-6.5">
                        <InfoRow label="Academic Year" value={formData.academicYear} />
                        <InfoRow label="Class of Admission" value={formData.classOfAdmission} />
                        <InfoRow label="Full Name" value={`${formData.firstName} ${formData.middleName || ''} ${formData.lastName}`} />
                        <InfoRow label="Aadhar Number" value={formData.aadharNumber} />
                        <InfoRow label="Date of Birth" value={formData.dateOfBirth} />
                        <InfoRow label="Gender" value={formData.gender} />
                        <InfoRow label="Category" value={`${formData.category} ${formData.subCategory ? `(${formData.subCategory})` : ''}`} />
                        <InfoRow label="Religion" value={formData.religion} />
                        <InfoRow label="Blood Group" value={formData.bloodGroup} />
                        <InfoRow label="Nationality" value={formData.nationality} />
                    </div>
                </div>

                {/* Facilities */}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <SectionHeader title="Facilities Required" />
                    <div className="p-6.5">
                        <InfoRow label="Transport (Bus)" value={formData.busNeeded ? 'Yes' : 'No'} />
                        <InfoRow label="Hostel Accommodation" value={formData.hostelNeeded ? 'Yes' : 'No'} />
                    </div>
                </div>
            </div>

            {/* Address Details */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <SectionHeader title="Address Details" />
                <div className="p-6.5 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <h4 className="mb-2 text-sm font-semibold text-black dark:text-white underline">Current Address</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {formData.currentAddress.addressLine1} <br />
                            {formData.currentAddress.addressLine2 && <>{formData.currentAddress.addressLine2} <br /></>}
                            {formData.currentAddress.city}, {formData.currentAddress.state} - {formData.currentAddress.pincode}
                        </p>
                    </div>
                    <div>
                        <h4 className="mb-2 text-sm font-semibold text-black dark:text-white underline">Permanent Address</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {formData.permanentAddress.addressLine1} <br />
                            {formData.permanentAddress.addressLine2 && <>{formData.permanentAddress.addressLine2} <br /></>}
                            {formData.permanentAddress.city}, {formData.permanentAddress.state} - {formData.permanentAddress.pincode}
                        </p>
                    </div>
                </div>
            </div>

            {/* Family Information */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <SectionHeader title="Family Information" />
                <div className="p-6.5">
                    {/* Dynamically show selected parent */}
                    {(!formData.familyInfo.selectedRelation || formData.familyInfo.selectedRelation === 'Father') && (
                        <div>
                            <h4 className="mb-4 font-semibold text-black dark:text-white border-b pb-2">Father's Details</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InfoRow label="Name" value={formData.familyInfo.fatherName} />
                                <InfoRow label="Phone" value={formData.familyInfo.fatherPhoneNumber} />
                                <InfoRow label="Occupation" value={formData.familyInfo.fatherOccupation} />
                                <InfoRow label="Aadhar" value={formData.familyInfo.fatherAadharNumber} />
                                <InfoRow label="Email" value={formData.familyInfo.fatherEmail} />
                            </div>
                        </div>
                    )}

                    {formData.familyInfo.selectedRelation === 'Mother' && (
                        <div>
                            <h4 className="mb-4 font-semibold text-black dark:text-white border-b pb-2">Mother's Details</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InfoRow label="Name" value={formData.familyInfo.motherName} />
                                <InfoRow label="Phone" value={formData.familyInfo.motherPhoneNumber} />
                                <InfoRow label="Occupation" value={formData.familyInfo.motherOccupation} />
                                <InfoRow label="Aadhar" value={formData.familyInfo.motherAadharNumber} />
                                <InfoRow label="Email" value={formData.familyInfo.motherEmail} />
                            </div>
                        </div>
                    )}

                    {formData.familyInfo.selectedRelation === 'Guardian' && (
                        <div>
                            <h4 className="mb-4 font-semibold text-black dark:text-white border-b pb-2">Guardian's Details</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InfoRow label="Name" value={formData.familyInfo.guardianName} />
                                <InfoRow label="Relation" value={formData.familyInfo.relationWithGuardian} />
                                <InfoRow label="Phone" value={formData.familyInfo.guardianPhoneNumber} />
                                <InfoRow label="Aadhar" value={formData.familyInfo.guardianAadharNumber} />
                                <InfoRow label="Email" value={formData.familyInfo.guardianEmail} />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Documents */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <SectionHeader title="Uploaded Documents" />
                <div className="p-6.5">
                    {Object.keys(formData.documents).length > 0 ? (
                        <div className="flex flex-wrap gap-4">
                            {Object.entries(formData.documents).map(([key, file]) => (
                                <div key={key} className="flex items-center gap-2 px-4 py-2 border rounded bg-gray-50 dark:bg-meta-4 dark:border-strokedark">
                                    <span className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                                    <span className="text-sm text-primary">{file.name}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500">No documents uploaded.</p>
                    )}
                </div>
            </div>

        </div>
    );
};

export default ReviewStep;
