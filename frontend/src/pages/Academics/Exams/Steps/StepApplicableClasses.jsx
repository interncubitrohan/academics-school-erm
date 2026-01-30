import React, { useState } from "react";
import Button from "../../../../components/ui/button/Button";
import { MOCK_CLASSES as mockClasses } from "../../../../data/classData";
import { MOCK_CLASS_SUBJECT_MAPPINGS as mockMappings } from "../../../../data/classSubjectMappingData";
import Badge from "../../../../components/ui/badge/Badge";

const StepApplicableClasses = ({ formData, setFormData }) => {
    // Determine which classes are already selected
    const selectedClassIds = formData.applicableClasses.map(c => c.classId);

    const handleToggleClass = (cls) => {
        const isSelected = selectedClassIds.includes(cls.id);
        let updatedApplicableClasses;
        let updatedApplicableSubjects = [...formData.applicableSubjects];

        if (isSelected) {
            // Remove class
            updatedApplicableClasses = formData.applicableClasses.filter(c => c.classId !== cls.id);
            // Remove subjects associated with this class
            updatedApplicableSubjects = updatedApplicableSubjects.filter(s => s.classId !== cls.id);
        } else {
            // Add class
            updatedApplicableClasses = [...formData.applicableClasses, { classId: cls.id, className: cls.className }];
            // Auto-fetch subjects for this class from mapping
            const mapping = mockMappings.find(m => m.classId === cls.id);
            if (mapping && mapping.subjects) {
                const newSubjects = mapping.subjects.map(sub => ({
                    classId: cls.id,
                    className: cls.className,
                    subjectId: sub.subjectCode, // Mapping usually links to code, mock data uses id/code interchangeably sometimes, unifying on code for now from mapping logic
                    subjectName: sub.subjectName,
                    maxMarks: sub.totalMaxMarks
                }));
                updatedApplicableSubjects = [...updatedApplicableSubjects, ...newSubjects];
            }
        }

        setFormData(prev => ({
            ...prev,
            applicableClasses: updatedApplicableClasses,
            applicableSubjects: updatedApplicableSubjects
        }));
    };

    const handleRemoveSubject = (classId, subjectCode) => {
        // Toggle subject selection for a specific class
        const updatedSubjects = formData.applicableSubjects.filter(
            s => !(s.classId === classId && s.subjectId === subjectCode)
        );
        setFormData(prev => ({
            ...prev,
            applicableSubjects: updatedSubjects
        }));
    };

    // Helper to check if a subject is selected
    const isSubjectSelected = (classId, subjectCode) => {
        return formData.applicableSubjects.some(
            s => s.classId === classId && s.subjectId === subjectCode
        );
    };

    // Helper to re-add a subject
    const handleAddSubject = (cls, sub) => {
        const newSubject = {
            classId: cls.id,
            className: cls.className,
            subjectId: sub.subjectCode,
            subjectName: sub.subjectName,
            maxMarks: sub.totalMaxMarks
        };
        setFormData(prev => ({
            ...prev,
            applicableSubjects: [...prev.applicableSubjects, newSubject]
        }));
    };


    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white border-b pb-2">
                Applicable Classes & Subjects
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Panel: Class Selection */}
                <div className="lg:col-span-1 space-y-4 border-r border-gray-200 dark:border-gray-700 pr-4">
                    <h3 className="font-medium text-gray-700 dark:text-gray-300">Select Classes</h3>
                    <div className="space-y-2 h-[400px] overflow-y-auto pr-2">
                        {mockClasses.map(cls => {
                            const isSelected = selectedClassIds.includes(cls.id);
                            return (
                                <div
                                    key={cls.id}
                                    onClick={() => handleToggleClass(cls)}
                                    className={`p-3 rounded-lg border cursor-pointer transition-all ${isSelected
                                            ? "border-brand-500 bg-brand-50 dark:bg-brand-900/20 ring-1 ring-brand-500"
                                            : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600 bg-white dark:bg-gray-800"
                                        }`}
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-semibold text-gray-800 dark:text-white">Class {cls.className}</p>
                                            <p className="text-xs text-gray-500">{cls.board} • {cls.medium}</p>
                                        </div>
                                        {isSelected && (
                                            <div className="text-brand-600">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Right Panel: Subject Confirmation */}
                <div className="lg:col-span-2 space-y-4">
                    <h3 className="font-medium text-gray-700 dark:text-gray-300">
                        Selected Subjects Configuration
                    </h3>

                    {formData.applicableClasses.length === 0 ? (
                        <div className="h-40 flex items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg text-gray-400">
                            Select a class to view subjects
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {formData.applicableClasses.map(cls => {
                                // Find mapping details for this class
                                const fullMapping = mockMappings.find(m => m.classId === cls.classId);
                                const availableSubjects = fullMapping?.subjects || [];

                                return (
                                    <div key={cls.classId} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                                        <div className="flex justify-between items-center mb-3">
                                            <h4 className="font-semibold text-gray-800 dark:text-white">
                                                Class {cls.className}
                                            </h4>
                                            <Badge color="light">{availableSubjects.length} Mapped</Badge>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            {availableSubjects.map(sub => {
                                                const isSelected = isSubjectSelected(cls.classId, sub.subjectCode);
                                                return (
                                                    <div
                                                        key={sub.subjectCode}
                                                        className={`flex items-center justify-between p-2 rounded border text-sm ${isSelected
                                                                ? "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600"
                                                                : "bg-gray-100 dark:bg-gray-900 border-transparent opacity-60"
                                                            }`}
                                                    >
                                                        <div className="flex flex-col">
                                                            <span className="font-medium text-gray-700 dark:text-gray-200">{sub.subjectName}</span>
                                                            <span className="text-[10px] text-gray-500">Max: {sub.totalMaxMarks}</span>
                                                        </div>
                                                        <Button
                                                            size="xs"
                                                            variant={isSelected ? "danger" : "secondary"}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                if (isSelected) {
                                                                    handleRemoveSubject(cls.classId, sub.subjectCode);
                                                                } else {
                                                                    handleAddSubject({ id: cls.classId, className: cls.className }, sub);
                                                                }
                                                            }}
                                                        >
                                                            {isSelected ? "Remove" : "Add"}
                                                        </Button>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StepApplicableClasses;
