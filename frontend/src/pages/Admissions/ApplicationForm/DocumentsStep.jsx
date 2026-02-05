import React from 'react';

const DocumentsStep = ({ formData, setFormData }) => {

    const handleFileChange = (field, e) => {
        const file = e.target.files[0];
        setFormData(prev => ({
            ...prev,
            documents: {
                ...prev.documents,
                [field]: file
            }
        }));
    };

    const documentsList = [
        { key: 'photo', label: 'Passport Size Photo', required: true },
        { key: 'signature', label: 'Student Signature', required: true },
        { key: 'previousMarksheet', label: 'Previous Marksheet (if applicable)', required: false },
        { key: 'transferCertificate', label: 'Transfer Certificate (if applicable)', required: false },
    ];

    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                    Upload Documents
                </h3>
            </div>
            <div className="p-6.5">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {documentsList.map((doc) => (
                        <div key={doc.key} className="flex flex-col gap-2">
                            <label className="block text-black dark:text-white">
                                {doc.label} {doc.required && <span className="text-meta-1">*</span>}
                            </label>
                            <input
                                type="file"
                                onChange={(e) => handleFileChange(doc.key, e)}
                                className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                            />
                            {formData.documents?.[doc.key] && (
                                <p className="text-sm text-success">
                                    Selected: {formData.documents[doc.key].name}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DocumentsStep;
