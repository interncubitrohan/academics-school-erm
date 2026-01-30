import React from "react";
import { FiAlertCircle } from "react-icons/fi";

const PassingCriteriaSection = ({ criteria, onChange }) => {
    const SUBJECT_TYPES = ["Theory", "Practical", "Language", "Co-Scholastic"];

    const handleChange = (field, value) => {
        onChange({ ...criteria, [field]: value });
    };

    const handleSubjectTypeToggle = (type) => {
        const currentTypes = criteria.mandatoryPassSubjectTypes || [];
        if (currentTypes.includes(type)) {
            handleChange("mandatoryPassSubjectTypes", currentTypes.filter(t => t !== type));
        } else {
            handleChange("mandatoryPassSubjectTypes", [...currentTypes, type]);
        }
    };

    return (
        <div className="space-y-6 border-t border-gray-100 dark:border-gray-700 pt-6">
            <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
                    <FiAlertCircle size={24} />
                </div>
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                        Overall Passing Criteria
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Define the minimum requirements for a student to be promoted to the next grade.
                        {/* Note: Disabling specific subject-level criteria visual for now to keep it simple */}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-0 md:pl-14">
                {/* Min Overall Percentage */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Minimum Overall Percentage To Pass
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            min="0"
                            max="100"
                            value={criteria.minOverallPercentage || ""}
                            onChange={(e) => handleChange("minOverallPercentage", parseFloat(e.target.value) || 0)}
                            placeholder="e.g. 40"
                            className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                        />
                        <span className="absolute right-4 top-2 text-gray-500 dark:text-gray-400">%</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                        Student must secure at least this percentage in total aggregation.
                    </p>
                </div>

                {/* Grace Marks Limit */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Max Grace Marks Allowed
                    </label>
                    <input
                        type="number"
                        min="0"
                        value={criteria.maxGraceMarks || ""}
                        onChange={(e) => handleChange("maxGraceMarks", parseFloat(e.target.value) || 0)}
                        placeholder="e.g. 5"
                        className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        Maximum grace marks that can be awarded to pass a failing student.
                    </p>
                </div>

                {/* Mandatory Subject Types */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Mandatory Passing Required For Subject Types
                    </label>
                    <div className="flex flex-wrap gap-3">
                        {SUBJECT_TYPES.map((type) => (
                            <label
                                key={type}
                                className={`
                                    flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-all select-none
                                    ${(criteria.mandatoryPassSubjectTypes || []).includes(type)
                                        ? "bg-brand-50 border-brand-500 text-brand-700 dark:bg-brand-900/20 dark:border-brand-500 dark:text-brand-300"
                                        : "bg-white border-gray-200 text-gray-600 hover:border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"}
                                `}
                            >
                                <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={(criteria.mandatoryPassSubjectTypes || []).includes(type)}
                                    onChange={() => handleSubjectTypeToggle(type)}
                                />
                                {(criteria.mandatoryPassSubjectTypes || []).includes(type) && (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                                {type}
                            </label>
                        ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        If selected, student MUST pass individually in these subject types to be promoted.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PassingCriteriaSection;
