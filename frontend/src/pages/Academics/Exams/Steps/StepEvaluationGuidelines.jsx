import React from "react";
import Button from "../../../../components/ui/button/Button";

const StepEvaluationGuidelines = ({ formData, setFormData }) => {

    const handleGuidelineChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            evaluationGuidelines: {
                ...prev.evaluationGuidelines,
                [name]: value
            }
        }));
    };

    // Helper for file upload UI (Mock)
    const renderFileUpload = (label, key) => (
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
            <div className="mx-auto h-12 w-12 text-gray-400">
                <svg className="w-full h-full" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" />
                </svg>
            </div>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium text-brand-600 hover:text-brand-500">Upload {label}</span>
            </p>
            <p className="mt-1 text-xs text-gray-500">PDF, DOCX up to 10MB</p>
            {formData.evaluationGuidelines[key] && (
                <p className="mt-2 text-sm text-green-600 font-medium">Selected: {formData.evaluationGuidelines[key]}</p>
            )}
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white border-b pb-2">
                Evaluation Guidelines & Policies
            </h2>

            {/* Marking Instructions */}
            <div className="space-y-4">
                <h3 className="font-medium text-gray-700 dark:text-gray-300">Marking Resources</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {renderFileUpload("Marking Scheme", "markingSchemeFile")}
                    {renderFileUpload("Answer Key", "answerKeyFile")}
                    {renderFileUpload("Scoring Rubric", "rubricFile")}
                </div>
            </div>

            {/* Moderation Guidelines */}
            <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700 space-y-4">
                <h3 className="font-medium text-gray-800 dark:text-white flex items-center gap-2">
                    <svg className="w-5 h-5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Moderation Workflow
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Head Examiner / Supervisor
                        </label>
                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/50 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            <option value="">Select Supervisor...</option>
                            <option value="emp01">Dr. Rajesh Kumar (Principal)</option>
                            <option value="emp02">Mrs. Sarah Williams (HOD Math)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Moderation Deadline
                        </label>
                        <input
                            type="date"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Moderators (Access List)
                        </label>
                        <select multiple className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/50 dark:bg-gray-700 dark:border-gray-600 dark:text-white h-24">
                            <option value="mod1">Mr. John Smith</option>
                            <option value="mod2">Ms. Priya Sharma</option>
                            <option value="mod3">Mr. David Wilson</option>
                        </select>
                        <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple staff members.</p>
                    </div>
                </div>
            </div>

            {/* Grace Marks Policy */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-700 dark:text-gray-300">Grace Marks Policy</h3>
                    <label className="flex items-center cursor-pointer">
                        <div className="relative">
                            <input type="checkbox" className="sr-only" />
                            <div className="w-10 h-6 bg-gray-400 rounded-full shadow-inner"></div>
                            <div className="dot absolute w-4 h-4 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
                        </div>
                        <div className="ml-3 text-sm text-gray-700 dark:text-gray-300">Enable Grace Marks</div>
                    </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Max Grace Marks
                        </label>
                        <input
                            type="number"
                            name="graceMax"
                            placeholder="e.g. 5"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Eligibility Range (Borderline %)
                        </label>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">Within</span>
                            <input
                                type="number"
                                placeholder="2"
                                className="w-20 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                            <span className="text-sm text-gray-500">% of pass marks</span>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Policy Description / Note
                        </label>
                        <input
                            type="text"
                            name="gracePolicy"
                            value={formData.evaluationGuidelines.gracePolicy}
                            onChange={handleGuidelineChange}
                            placeholder="e.g. Maximum 2 grace marks allowed for borderline cases."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                </div>
            </div>

            {/* Special Instructions */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Special Instructions for Invigilators / Examiners
                </label>
                <textarea
                    name="specialInstructions"
                    value={formData.evaluationGuidelines.specialInstructions}
                    onChange={handleGuidelineChange}
                    rows="4"
                    placeholder="Enter any additional instructions..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                ></textarea>
            </div>
        </div>
    );
};

export default StepEvaluationGuidelines;
