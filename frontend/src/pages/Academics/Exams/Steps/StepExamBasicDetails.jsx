import React, { useEffect } from "react";

const StepExamBasicDetails = ({ formData, setFormData }) => {

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Auto-generate exam code logic
    useEffect(() => {
        if (!formData.examCode && formData.examType && formData.term && formData.academicYear) {
            const typeCode = formData.examType.substring(0, 2).toUpperCase();
            const termCode = formData.term.replace(" ", "").toUpperCase();
            const yearCode = formData.academicYear.split("-")[0];
            const autoCode = `${typeCode}-${yearCode}-${termCode}`;
            setFormData(prev => ({ ...prev, examCode: autoCode }));
        }
    }, [formData.examType, formData.term, formData.academicYear, formData.examCode, setFormData]);

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white border-b pb-2 mb-4">
                Basic Exam Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Exam Name */}
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Exam Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="examName"
                        value={formData.examName}
                        onChange={handleChange}
                        placeholder="e.g. Mid-Term Examination 2024-25"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                    />
                </div>

                {/* Exam Type */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Exam Type <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="examType"
                        value={formData.examType}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                        <option value="Term">Term End</option>
                        <option value="Unit">Unit Test</option>
                        <option value="Final">Final Exam</option>
                        <option value="Model">Model Exam</option>
                    </select>
                </div>

                {/* Academic Year */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Academic Year <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="academicYear"
                        value={formData.academicYear}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                        <option value="2024-2025">2024-2025</option>
                        <option value="2025-2026">2025-2026</option>
                    </select>
                </div>

                {/* Term */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Term / Semester <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="term"
                        value={formData.term}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                        <option value="Term 1">Term 1</option>
                        <option value="Term 2">Term 2</option>
                        <option value="Semester 1">Semester 1</option>
                        <option value="Semester 2">Semester 2</option>
                    </select>
                </div>

                {/* Exam Code */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Exam Code
                    </label>
                    <input
                        type="text"
                        name="examCode"
                        value={formData.examCode}
                        onChange={handleChange}
                        placeholder="Auto-generated"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-500/50 dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono text-sm"
                    />
                    <p className="text-xs text-gray-500 mt-1">Leave blank to auto-generate</p>
                </div>

                {/* Description */}
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="3"
                        placeholder="Enter exam description, scope, or special notes..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/50 dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none"
                    ></textarea>
                </div>
            </div>
        </div>
    );
};

export default StepExamBasicDetails;
