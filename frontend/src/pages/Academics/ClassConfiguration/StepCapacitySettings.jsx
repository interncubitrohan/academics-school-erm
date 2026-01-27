import React from "react";

const StepCapacitySettings = ({ formData, handleChange }) => {
    return (
        <div className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Capacity & Settings
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Max Students
                    </label>
                    <input
                        type="number"
                        name="maxStudents"
                        value={formData.maxStudents}
                        onChange={handleChange}
                        min="1"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                    />
                    {formData.room && formData.maxStudents > formData.room.capacity && (
                        <p className="mt-1 text-sm text-red-500">
                            Exceeds room capacity ({formData.room.capacity})
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Current Strength
                    </label>
                    <input
                        type="number"
                        name="currentStrength"
                        value={formData.currentStrength}
                        readOnly
                        className="w-full px-4 py-2.5 border border-gray-200 bg-gray-50 text-gray-500 rounded-lg focus:outline-none cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                        Auto-calculated based on enrollment
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Class Type
                    </label>
                    <select
                        name="classType"
                        value={formData.classType}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                    >
                        <option value="Regular">Regular</option>
                        <option value="Honors">Honors</option>
                        <option value="Remedial">Remedial</option>
                    </select>
                </div>

                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Special Notes
                    </label>
                    <textarea
                        name="specialNotes"
                        value={formData.specialNotes}
                        onChange={handleChange}
                        rows="3"
                        placeholder="e.g., Smart classroom enabled, Special equipment required"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                    />
                </div>
            </div>
        </div>
    );
};

export default StepCapacitySettings;
