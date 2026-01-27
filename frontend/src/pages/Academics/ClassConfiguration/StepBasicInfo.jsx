import React from "react";

const StepBasicInfo = ({ formData, handleChange, errors = {} }) => {
    return (
        <div className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Basic Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Academic Year <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="academicYear"
                        value={formData.academicYear}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white ${errors.academicYear ? "border-red-500" : "border-gray-300"
                            }`}
                    >
                        <option value="2025-2026">2025-2026</option>
                        <option value="2026-2027">2026-2027</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Grade <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="grade"
                        required
                        value={formData.grade}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white ${errors.grade ? "border-red-500" : "border-gray-300"
                            }`}
                    >
                        <option value="">Select Grade</option>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((grade) => (
                            <option key={grade} value={grade}>
                                Grade {grade}
                            </option>
                        ))}
                    </select>
                    {errors.grade && (
                        <p className="mt-1 text-sm text-red-500">{errors.grade}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Section <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="section"
                        required
                        value={formData.section}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white ${errors.section ? "border-red-500" : "border-gray-300"
                            }`}
                    >
                        <option value="">Select Section</option>
                        {["A", "B", "C", "D", "E", "F"].map((section) => (
                            <option key={section} value={section}>
                                Section {section}
                            </option>
                        ))}
                    </select>
                    {errors.section && (
                        <p className="mt-1 text-sm text-red-500">{errors.section}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Board
                    </label>
                    <select
                        name="board"
                        value={formData.board}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                    >
                        <option value="CBSE">CBSE</option>
                        <option value="ICSE">ICSE</option>
                        <option value="IGCSE">IGCSE</option>
                        <option value="State">State Board</option>
                        <option value="IB">IB</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Medium
                    </label>
                    <select
                        name="medium"
                        value={formData.medium}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                    >
                        <option value="English">English</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Gujarati">Gujarati</option>
                        <option value="French">French</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default StepBasicInfo;
