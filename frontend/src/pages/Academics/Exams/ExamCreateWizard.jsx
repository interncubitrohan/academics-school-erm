import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import Button from "../../../components/ui/button/Button";
import { getEmptyExamObject } from "../../../data/examData";
import StepExamBasicDetails from "./Steps/StepExamBasicDetails";
import StepExamSchedule from "./Steps/StepExamSchedule";
import StepApplicableClasses from "./Steps/StepApplicableClasses";
import StepMarksConfiguration from "./Steps/StepMarksConfiguration";
import StepEvaluationGuidelines from "./Steps/StepEvaluationGuidelines";
import StepResultSettings from "./Steps/StepResultSettings";

const STEPS = [
    { id: 1, label: "Basic Details" },
    { id: 2, label: "Schedule" },
    { id: 3, label: "Classes & Subjects" },
    { id: 4, label: "Marks Configuration" },
    { id: 5, label: "Evaluation Guidelines" },
    { id: 6, label: "Result Settings" },
];

const ExamCreateWizard = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState(getEmptyExamObject());

    const handleNext = () => {
        // Validation per step could go here
        if (currentStep === 1) {
            if (!formData.examName) {
                alert("Please enter Exam Name.");
                return;
            }
        }
        if (currentStep === 2) {
            if (!formData.schedule.startDate || !formData.schedule.endDate) {
                alert("Please select Start and End Dates.");
                return;
            }
        }
        if (currentStep === 3) {
            if (formData.applicableClasses.length === 0) {
                alert("Please select at least one class.");
                return;
            }
        }

        if (currentStep < STEPS.length) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const saveToLocalStorage = (status) => {
        const drafts = JSON.parse(localStorage.getItem("scheduledExams") || "[]");
        // If editing enable here, but for now we create new
        // Check if ID exists (if user saved draft before)
        let updatedList;
        let examToSave = { ...formData, status: status };

        // Basic ID check
        if (!examToSave.id) examToSave.id = Date.now();

        const existingIndex = drafts.findIndex(e => e.id === examToSave.id);
        if (existingIndex >= 0) {
            updatedList = [...drafts];
            updatedList[existingIndex] = examToSave;
        } else {
            updatedList = [...drafts, examToSave];
        }

        localStorage.setItem("scheduledExams", JSON.stringify(updatedList));
        return examToSave;
    };

    const handleSaveDraft = () => {
        saveToLocalStorage("Draft");
        alert("Exam saved as Draft!");
        navigate("/academics/exams");
    };

    const handlePublish = () => {
        // Final Validation
        if (!window.confirm("Are you sure you want to publish this exam schedule? It will be visible to teachers.")) {
            return;
        }

        saveToLocalStorage("Scheduled");
        alert("Exam Schedule Published Successfully!");
        navigate("/academics/exams");
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return <StepExamBasicDetails formData={formData} setFormData={setFormData} />;
            case 2:
                return <StepExamSchedule formData={formData} setFormData={setFormData} />;
            case 3:
                return <StepApplicableClasses formData={formData} setFormData={setFormData} />;
            case 4:
                return <StepMarksConfiguration formData={formData} setFormData={setFormData} />;
            case 5:
                return <StepEvaluationGuidelines formData={formData} setFormData={setFormData} />;
            case 6:
                return <StepResultSettings formData={formData} setFormData={setFormData} />;
            default:
                return null;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Create New Exam</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Configure exam details, schedule, and evaluation rules</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => navigate("/academics/exams")}>
                        Cancel
                    </Button>
                    <Button variant="secondary" onClick={handleSaveDraft}>
                        Save as Draft
                    </Button>
                </div>
            </div>

            {/* Stepper */}
            <div className="mb-8">
                <div className="flex items-center justify-between relative">
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 dark:bg-gray-700 -z-10"></div>
                    {STEPS.map((step) => (
                        <div key={step.id} className="flex flex-col items-center gap-2 bg-white dark:bg-gray-900 px-2 z-10 transition-all cursor-pointer" onClick={() => {
                            // Optional: Allow jumping back to completed steps
                            if (step.id < currentStep) setCurrentStep(step.id);
                        }}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors border-2 ${currentStep >= step.id
                                ? "bg-brand-600 text-white border-brand-600"
                                : "bg-white text-gray-400 border-gray-300 dark:bg-gray-800 dark:border-gray-600"
                                }`}>
                                {step.id}
                            </div>
                            <span className={`text-xs font-medium ${currentStep >= step.id ? "text-brand-600" : "text-gray-500"
                                }`}>
                                {step.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Step Content */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-white/[0.05] p-6 mb-6 min-h-[400px] shadow-sm">
                {renderStepContent()}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
                <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={currentStep === 1}
                >
                    Back
                </Button>

                {currentStep < STEPS.length ? (
                    <Button onClick={handleNext}>
                        Next Step
                    </Button>
                ) : (
                    <Button onClick={handlePublish} variant="primary">
                        Publish Exam
                    </Button>
                )}
            </div>
        </div>
    );
};

export default ExamCreateWizard;
