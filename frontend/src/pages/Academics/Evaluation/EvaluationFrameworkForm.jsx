import React, { useState, useEffect } from "react";
import { FiSave, FiX } from "react-icons/fi";
import Button from "../../../components/ui/button/Button";
import BoardSelector from "../../../components/common/BoardSelector";
import AssessmentComponentBuilder from "./AssessmentComponentBuilder";
import PassingCriteriaSection from "./PassingCriteriaSection";

const EvaluationFrameworkForm = ({ onSave, onCancel, initialData }) => {
    // Mock Data for Dropdowns
    const ACADEMIC_YEARS = ["2024-2025", "2025-2026", "2026-2027"];
    const AVAILABLE_GRADES = [
        "Nursery", "LKG", "UKG",
        "I", "II", "III", "IV", "V",
        "VI", "VII", "VIII", "IX", "X",
        "XI", "XII"
    ];
    // Mock Grading Scales - In a real app, these would come from the GradingScale module
    const GRADING_SCALES = [
        { id: "gs_001", name: "CBSE 9-Point Scale" },
        { id: "gs_002", name: "5-Point Grading" },
        { id: "gs_003", name: "Star Rating" },
        { id: "gs_004", name: "Direct Percentage" }
    ];

    const [formData, setFormData] = useState({
        frameworkName: "",
        board: "",
        applicableGrades: [],
        academicYear: "",
        gradingScale: "",
        isDefault: false,
        status: "Active",
        status: "Active",
        assessmentComponents: [],
        overallPassingCriteria: {
            minOverallPercentage: 33,
            maxGraceMarks: 0,
            mandatoryPassSubjectTypes: []
        }
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleComponentsChange = (updatedComponents) => {
        setFormData(prev => ({ ...prev, assessmentComponents: updatedComponents }));
    };

    const handlePassingCriteriaChange = (updatedCriteria) => {
        setFormData(prev => ({ ...prev, overallPassingCriteria: updatedCriteria }));
    };

    const handleGradeToggle = (grade) => {
        setFormData(prev => {
            const currentGrades = prev.applicableGrades || [];
            if (currentGrades.includes(grade)) {
                return { ...prev, applicableGrades: currentGrades.filter(g => g !== grade) };
            } else {
                return { ...prev, applicableGrades: [...currentGrades, grade] };
            }
        });
    };

    // Validation Logic
    const calculateValidation = () => {
        const totalWeightage = formData.assessmentComponents.reduce((sum, comp) => sum + (Number(comp.weightage) || 0), 0);

        const componentErrors = {};
        let hasSubComponentErrors = false;

        formData.assessmentComponents.forEach(comp => {
            const subComponents = comp.subComponents || [];
            if (subComponents.length > 0) {
                const subTotal = subComponents.reduce((sum, sub) => sum + (Number(sub.weightage) || 0), 0);
                if (Math.abs(subTotal - comp.weightage) > 0.1) { // Allowing slight float tolerance
                    componentErrors[comp.id] = `Sub-components sum (${subTotal}%) must equal component weightage (${comp.weightage}%)`;
                    hasSubComponentErrors = true;
                }
            }
        });

        const isTotalValid = Math.abs(totalWeightage - 100) < 0.1;

        return {
            totalWeightage,
            isTotalValid,
            componentErrors,
            isValid: isTotalValid && !hasSubComponentErrors
        };
    };

    const validationStatus = calculateValidation();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic Field Validation
        if (!formData.frameworkName.trim()) {
            alert("Framework Name is required");
            return;
        }
        if (!formData.board) {
            alert("Please select a Board");
            return;
        }
        if (!formData.academicYear) {
            alert("Please select an Academic Year");
            return;
        }
        if (!formData.gradingScale) {
            alert("Please select a Grading Scale");
            return;
        }
        if (!formData.applicableGrades || formData.applicableGrades.length === 0) {
            alert("Please select at least one applicable grade");
            return;
        }

        // Structural Validation
        if (!formData.board?.category) {
            alert("Please select a Board Category.");
            return;
        }

        if (formData.board?.category === "State Board" && (!formData.board?.state || !formData.board?.boardName)) {
            alert("Please select both State and Board Name.");
            return;
        }

        if (!formData.assessmentComponents || formData.assessmentComponents.length === 0) {
            alert("Please add at least one assessment component.");
            return;
        }

        if (!validationStatus.isValid) {
            alert("Please fix the weightage validation errors before saving.");
            return;
        }

        onSave(formData);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-white/[0.05] p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    {initialData ? "Edit Evaluation Framework" : "Create Evaluation Framework"}
                </h3>
                <button
                    onClick={onCancel}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                    <FiX size={24} />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Information Section */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Basic Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        {/* Framework Name */}
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Framework Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="frameworkName"
                                required
                                value={formData.frameworkName}
                                onChange={handleChange}
                                placeholder="e.g. CBSE Secondary School Evaluation"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                            />
                        </div>

                        {/* Board */}
                        <div className="col-span-2 md:col-span-1">
                            <BoardSelector
                                value={formData.board}
                                onChange={(newBoardData) => setFormData(prev => ({ ...prev, board: newBoardData }))}
                                errors={{
                                    category: !formData.board?.category && "Board Category is required",
                                    state: (!formData.board?.state && formData.board?.category === "State Board") ? "State is required" : null,
                                    boardName: (!formData.board?.boardName && formData.board?.category === "State Board") ? "Board Name is required" : null
                                }}
                            />
                        </div>

                        {/* Academic Year */}
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Academic Year <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="academicYear"
                                value={formData.academicYear}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                            >
                                <option value="">Select Year</option>
                                {ACADEMIC_YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                            </select>
                        </div>

                        {/* Grading Scale */}
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Grading Scale <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="gradingScale"
                                value={formData.gradingScale}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                            >
                                <option value="">Select Scale</option>
                                {GRADING_SCALES.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Applicable Grades */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Applicable Grades <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-3">
                        {AVAILABLE_GRADES.map((grade) => (
                            <label key={grade} className={`
                                flex items-center justify-center px-3 py-2 rounded-md border text-sm font-medium cursor-pointer transition-all
                                ${formData.applicableGrades.includes(grade)
                                    ? 'bg-brand-50 border-brand-500 text-brand-700 dark:bg-brand-900/20 dark:border-brand-500 dark:text-brand-300'
                                    : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400'}
                            `}>
                                <input
                                    type="checkbox"
                                    className="sr-only"
                                    checked={formData.applicableGrades.includes(grade)}
                                    onChange={() => handleGradeToggle(grade)}
                                />
                                {grade}
                            </label>
                        ))}
                    </div>
                </div>

                <AssessmentComponentBuilder
                    components={formData.assessmentComponents}
                    onChange={handleComponentsChange}
                    validationStatus={validationStatus}
                />

                {/* Overall Passing Criteria */}
                <PassingCriteriaSection
                    criteria={formData.overallPassingCriteria}
                    onChange={handlePassingCriteriaChange}
                />

                <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 dark:border-gray-700">
                    <Button
                        onClick={onCancel}
                        variant="white"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={!validationStatus.isValid}
                        variant="primary"
                        className={`flex items-center gap-2 ${!validationStatus.isValid ? "opacity-50 cursor-not-allowed" : ""}`}
                        title={!validationStatus.isValid ? "Fix validation errors to save" : "Save Framework"}
                    >
                        <FiSave size={16} /> Save
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default EvaluationFrameworkForm;
