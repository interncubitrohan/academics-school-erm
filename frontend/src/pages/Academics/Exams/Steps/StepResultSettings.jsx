import React from "react";
import { mockGradingScales } from "../../Infrastructure/Grading/GradingSystems"; // Importing from existing file

const StepResultSettings = ({ formData, setFormData }) => {

    const handleResultSettingChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name.startsWith("components.")) {
            const field = name.split(".")[1];
            setFormData(prev => ({
                ...prev,
                resultSettings: {
                    ...prev.resultSettings,
                    components: {
                        ...prev.resultSettings.components,
                        [field]: checked
                    }
                }
            }));
        } else if (name.startsWith("publication.")) {
            const field = name.split(".")[1];
            const val = type === 'checkbox' ? checked : value; // Handle text/date inputs in publication too if any
            setFormData(prev => ({
                ...prev,
                resultSettings: {
                    ...prev.resultSettings,
                    publication: {
                        ...prev.resultSettings.publication,
                        [field]: val
                    }
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                resultSettings: {
                    ...prev.resultSettings,
                    [name]: value
                }
            }));
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white border-b pb-2">
                Result & Publication Settings
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column: Format & Grading */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Result Format
                        </label>
                        <select
                            name="format"
                            value={formData.resultSettings.format}
                            onChange={handleResultSettingChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        >
                            <option value="Marks only">Marks Only</option>
                            <option value="Grades only">Grades Only</option>
                            <option value="Both">Both (Marks & Grades)</option>
                            <option value="Percentile rank">Percentile Rank</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Grading Scale
                        </label>
                        <select
                            name="gradingScaleId"
                            value={formData.resultSettings.gradingScaleId || ""}
                            onChange={handleResultSettingChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        >
                            <option value="">Select Grading Scale used for Calculation</option>
                            {mockGradingScales && mockGradingScales.map(scale => (
                                <option key={scale.id} value={scale.id}>{scale.scaleName} ({scale.scaleType})</option>
                            ))}
                        </select>
                        <p className="text-xs text-gray-500 mt-1">Used to convert marks to grades if "Grades" format is selected.</p>
                    </div>
                </div>

                {/* Right Column: Report Card Components */}
                <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="font-medium text-gray-800 dark:text-white mb-4">Report Card Components</h3>
                    <div className="space-y-3">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="components.showSubjectHighest"
                                checked={formData.resultSettings.components.showSubjectHighest}
                                onChange={handleResultSettingChange}
                                className="form-checkbox h-5 w-5 text-brand-600 rounded border-gray-300 focus:ring-brand-500"
                            />
                            <span className="ml-2 text-gray-700 dark:text-gray-300 text-sm">Show Subject Highest Marks</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="components.showClassRank"
                                checked={formData.resultSettings.components.showClassRank}
                                onChange={handleResultSettingChange}
                                className="form-checkbox h-5 w-5 text-brand-600 rounded border-gray-300 focus:ring-brand-500"
                            />
                            <span className="ml-2 text-gray-700 dark:text-gray-300 text-sm">Show Class Rank</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="components.showAttendance"
                                checked={formData.resultSettings.components.showAttendance}
                                onChange={handleResultSettingChange}
                                className="form-checkbox h-5 w-5 text-brand-600 rounded border-gray-300 focus:ring-brand-500"
                            />
                            <span className="ml-2 text-gray-700 dark:text-gray-300 text-sm">Show Attendance Summary</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="components.showRemarks"
                                checked={formData.resultSettings.components.showRemarks}
                                onChange={handleResultSettingChange}
                                className="form-checkbox h-5 w-5 text-brand-600 rounded border-gray-300 focus:ring-brand-500"
                            />
                            <span className="ml-2 text-gray-700 dark:text-gray-300 text-sm">Include Teacher Remarks</span>
                        </label>
                    </div>
                </div>
            </div>

            {/* Publication Settings */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="font-medium text-gray-800 dark:text-white mb-4">Publication & Notification</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col space-y-4">
                        <label className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition">
                            <input
                                type="checkbox"
                                name="publication.publishToStudentPortal"
                                checked={formData.resultSettings.publication.publishToStudentPortal}
                                onChange={handleResultSettingChange}
                                className="form-checkbox h-5 w-5 text-brand-600 rounded border-gray-300 focus:ring-brand-500"
                            />
                            <div className="ml-3">
                                <span className="block text-sm font-medium text-gray-800 dark:text-white">Publish to Student/Parent Portal</span>
                                <span className="block text-xs text-gray-500">Results will be visible in the mobile app and web portal.</span>
                            </div>
                        </label>
                        <label className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition">
                            <input
                                type="checkbox"
                                name="publication.requiresApproval"
                                checked={formData.resultSettings.publication.requiresApproval}
                                onChange={handleResultSettingChange}
                                className="form-checkbox h-5 w-5 text-brand-600 rounded border-gray-300 focus:ring-brand-500"
                            />
                            <div className="ml-3">
                                <span className="block text-sm font-medium text-gray-800 dark:text-white">Require Principal Approval</span>
                                <span className="block text-xs text-gray-500">Results won't be published until approved by admin.</span>
                            </div>
                        </label>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Scheduled Publication Date
                            </label>
                            <input
                                type="datetime-local"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                            <p className="text-xs text-gray-500 mt-1">Leave blank to publish manually.</p>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Send SMS/Email Notification</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-300 dark:peer-focus:ring-brand-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-brand-600"></div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StepResultSettings;
