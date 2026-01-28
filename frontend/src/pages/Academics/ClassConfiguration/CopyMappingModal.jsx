import React, { useState, useEffect } from "react";
import { Modal } from "../../../components/ui/modal"; // Corrected to named export
import { FiCopy, FiCalendar, FiUsers } from "react-icons/fi";

const MOCK_YEARS = ["2024-2025", "2023-2024", "2022-2023"];

const MOCK_CLASSES = [
    { id: "c1", name: "Class 10-A", section: "A", year: "2024-2025", subjectIds: [1, 2, 3, 5] },
    { id: "c2", name: "Class 10-B", section: "B", year: "2024-2025", subjectIds: [1, 2, 4, 6] },
    { id: "c3", name: "Class 9-A", section: "A", year: "2023-2024", subjectIds: [1, 3, 5, 7] },
    { id: "c4", name: "Class 9-B", section: "B", year: "2023-2024", subjectIds: [1, 3, 6, 8] },
    { id: "c5", name: "Class 10-C", section: "C", year: "2024-2025", subjectIds: [1, 2, 3, 4, 5, 6] },
];

const CopyMappingModal = ({ isOpen, onClose, onCopy, currentYear = "2025-2026", currentClassId }) => {
    const [activeTab, setActiveTab] = useState("year"); // 'year' or 'class'
    const [selectedYear, setSelectedYear] = useState(MOCK_YEARS[0]);
    const [selectedClass, setSelectedClass] = useState("");

    // Reset selection when tab changes or modal opens
    useEffect(() => {
        if (isOpen) {
            setSelectedClass("");
            // Default select the first available class for the selected year if possible
        }
    }, [isOpen, activeTab, selectedYear]);

    // Filter classes based on active tab logic
    const availableClasses = MOCK_CLASSES.filter(cls => {
        if (activeTab === "year") {
            // "From Previous Year": Show classes from the selected Previous Year
            return cls.year === selectedYear;
        } else {
            // "From Another Class": Show classes from the CURRENT year (excluding self if needed)
            // Assuming "Another Class" means same academic year sibling classes
            // If we passed currentYear prop, we'd use it here. For now, let's assume "From Another Class" means same academic session.
            // If we don't have currentYear prop reliably passed yet, we can default to "2025-2026" or just show all non-previous ones if we had them.
            // Let's use currentYear prop logic.
            return cls.year === currentYear && cls.id !== currentClassId;
        }
    });

    const handleCopy = () => {
        if (!selectedClass) return;
        const sourceClass = MOCK_CLASSES.find(c => c.id === selectedClass);
        if (sourceClass) {
            onCopy(sourceClass.subjectIds);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                        <FiCopy className="text-brand-600" />
                        Copy Subject Mapping
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-100 dark:border-gray-700">
                    <button
                        onClick={() => setActiveTab("year")}
                        className={`flex-1 py-3 text-sm font-medium transition-colors border-b-2 ${activeTab === "year"
                            ? "border-brand-500 text-brand-600 dark:text-brand-400"
                            : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            }`}
                    >
                        <div className="flex items-center justify-center gap-2">
                            <FiCalendar /> From Previous Year
                        </div>
                    </button>
                    <button
                        onClick={() => setActiveTab("class")}
                        className={`flex-1 py-3 text-sm font-medium transition-colors border-b-2 ${activeTab === "class"
                            ? "border-brand-500 text-brand-600 dark:text-brand-400"
                            : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            }`}
                    >
                        <div className="flex items-center justify-center gap-2">
                            <FiUsers /> From Another Class
                        </div>
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {activeTab === "year"
                            ? "Select an academic year and a class to copy its subject configuration."
                            : "Select a class from the current academic year to duplicate its subject mapping."}
                    </p>

                    {activeTab === "year" && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Academic Year
                            </label>
                            <select
                                value={selectedYear}
                                onChange={(e) => { setSelectedYear(e.target.value); setSelectedClass(""); }}
                                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            >
                                {MOCK_YEARS.map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Select Class
                        </label>
                        <select
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                            disabled={availableClasses.length === 0}
                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <option value="">-- Select Source Class --</option>
                            {availableClasses.map(cls => (
                                <option key={cls.id} value={cls.id}>
                                    {cls.name} ({cls.subjectIds.length} Subjects)
                                </option>
                            ))}
                        </select>
                        {availableClasses.length === 0 && (
                            <p className="text-xs text-red-500 mt-1">No classes found for this selection.</p>
                        )}
                    </div>

                    {/* Preview (Optional - could show list of subjects if selectedClass is set) */}
                    {selectedClass && (
                        <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-600">
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">Note:</span> This will overwrite your current selection with the subjects from the selected class. You can still edit them after copying.
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleCopy}
                        disabled={!selectedClass}
                        className="px-4 py-2 text-sm font-medium text-white bg-brand-600 rounded-lg hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        <FiCopy className="w-4 h-4" />
                        Copy Mapping
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CopyMappingModal;
