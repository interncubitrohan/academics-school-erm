import React from "react";

// Mock configuration for custom fields (In a real app, this would come from an API/Settings context)
const MOCK_CUSTOM_FIELDS_CONFIG = [
    {
        key: "division",
        label: "Division",
        type: "text",
        placeholder: "e.g., Science, Commerce, Arts"
    },
    {
        key: "stream",
        label: "Stream",
        type: "select",
        options: ["General", "Science", "Commerce", "Arts", "Vocational"],
        placeholder: "Select Stream"
    },
    {
        key: "shift",
        label: "Shift",
        type: "select",
        options: ["Morning", "Afternoon", "Evening"],
        placeholder: "Select Shift"
    },
    {
        key: "house",
        label: "House",
        type: "text",
        placeholder: "e.g., Red, Blue, Green, Yellow"
    }
];

const StepCustomFields = ({ formData, handleCustomFieldChange }) => {
    // Ensure customFields object exists to prevent access errors
    const customFields = formData.customFields || {};

    const renderField = (field) => {
        if (field.type === "select") {
            return (
                <select
                    value={customFields[field.key] || ""}
                    onChange={(e) => handleCustomFieldChange(field.key, e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                >
                    <option value="">{field.placeholder || `Select ${field.label}`}</option>
                    {field.options.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
            );
        }

        return (
            <input
                type="text"
                value={customFields[field.key] || ""}
                onChange={(e) => handleCustomFieldChange(field.key, e.target.value)}
                placeholder={field.placeholder}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
            />
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Custom Fields (Optional)
                </h4>
                <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded dark:bg-gray-700 dark:text-gray-300">
                    {MOCK_CUSTOM_FIELDS_CONFIG.length} configured fields
                </span>
            </div>

            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {MOCK_CUSTOM_FIELDS_CONFIG.map((field) => (
                        <div key={field.key}>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {field.label}
                            </label>
                            {renderField(field)}
                        </div>
                    ))}
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700 mt-6">
                    <div className="flex gap-3">
                        <div className="flex-shrink-0">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            <strong>Note:</strong> These fields are configured in the global School Settings.
                            Values entered here will be searchable and filterable in reports.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StepCustomFields;
