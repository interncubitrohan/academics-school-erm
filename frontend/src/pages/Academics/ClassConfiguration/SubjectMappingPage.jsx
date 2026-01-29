import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import PageMeta from "../../../components/common/PageMeta";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import Badge from "../../../components/ui/badge/Badge";
import Button from "../../../components/ui/button/Button";

// Steps Components
import StepTermStructure from "./StepTermStructure";
import StepSelectSubjects from "./StepSelectSubjects";
import SubjectConfigurationTable from "./SubjectConfigurationTable";

// Data
import { MOCK_SUBJECTS } from "../../../data/subjectData";
import { MOCK_CLASSES } from "../../../data/classData";

const STEPS = [
    { number: 1, title: "Configuration" },
    { number: 2, title: "Select Subjects" },
    { number: 3, title: "Define Rules" },
    { number: 4, title: "Review & Save" }
];

const SubjectMappingPage = () => {
    const navigate = useNavigate();
    const { classId } = useParams();
    const [currentStep, setCurrentStep] = useState(1);

    // Derived State for Header
    // Fallback to first class or valid empty structure to prevent crashes
    const [classSummary, setClassSummary] = useState(MOCK_CLASSES?.[0] || {
        name: "Loading...",
        academicYear: "...",
        board: "...",
        studentCount: 0,
        classTeacher: "..."
    });

    useEffect(() => {
        if (classId) {
            // Updated to handle string IDs from centralized mock data
            const foundClass = MOCK_CLASSES.find(c => c.id === classId || c.id === parseInt(classId));
            if (foundClass) {
                setClassSummary(foundClass);
            }
        }
    }, [classId]);

    // State Management
    const [termStructure, setTermStructure] = useState("Annual"); // Default
    const [selectedSubjectIds, setSelectedSubjectIds] = useState([]);

    const [configuredSubjects, setConfiguredSubjects] = useState([]);

    // Logic to prepare Step 3 Data from Step 2 Selection
    const prepareConfigurationData = () => {
        const newConfig = selectedSubjectIds.map((id, index) => {
            const existing = configuredSubjects.find(s => s.id === id);
            if (existing) return existing;

            const master = MOCK_SUBJECTS.find(s => s.id === id);
            if (!master) {
                // Return a safe fallback to prevent crashes
                return {
                    id: id,
                    subjectName: "Unknown Subject",
                    subjectCode: "ERR",
                    subjectType: "Theory",
                    displayOrder: index + 1,
                    isOptional: false,
                    maxTheoryMarks: 0,
                    maxPracticalMarks: 0,
                    maxIAMarks: 0,
                    passMarks: 0,
                    totalMaxMarks: 0,
                    teachingHoursPerWeek: 0
                };
            }

            return {
                ...master,
                displayOrder: index + 1,
                isOptional: false,
                maxTheoryMarks: 80,
                maxPracticalMarks: 20,
                maxIAMarks: 0,
                passMarks: 33,
                totalMaxMarks: 100,
                teachingHoursPerWeek: 5
            };
        });
        setConfiguredSubjects(newConfig);
    };

    // Navigation Handlers
    const handleNext = () => {
        if (currentStep === 2) {
            prepareConfigurationData();
        }
        setCurrentStep(prev => Math.min(STEPS.length, prev + 1));
    };

    const handleBack = () => {
        setCurrentStep(prev => Math.max(1, prev - 1));
    };

    const handleClearAll = () => {
        if (window.confirm("Are you sure you want to clear all subject selections?")) {
            setSelectedSubjectIds([]);
            setConfiguredSubjects([]);
            setCurrentStep(2);
        }
    };

    const [validationErrors, setValidationErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(true);

    const validateMapping = () => {
        const errors = {};
        let isValid = true;

        if (configuredSubjects.length === 0) {
            alert("Please select at least one subject.");
            return false;
        }

        // Validate Validation Rules
        configuredSubjects.forEach(subject => {
            const subjectErrors = {};

            // 1. Total Marks > 0
            if (subject.totalMaxMarks <= 0) {
                subjectErrors.totalMaxMarks = "Total marks must be > 0";
                subjectErrors.general = "Invalid Marks Config";
            }

            // 2. Teaching Hours > 0
            if (subject.teachingHoursPerWeek <= 0) {
                subjectErrors.teachingHoursPerWeek = "Hours must be > 0";
            }

            // 3. Core Subject cannot be optional
            // Assuming 'Theory' implies Core/Mandatory
            if (subject.isOptional && subject.subjectType === 'Theory') {
                subjectErrors.isOptional = "Core subject cannot be optional";
            }

            if (Object.keys(subjectErrors).length > 0) {
                errors[subject.id] = subjectErrors;
                isValid = false;
            }
        });

        // 4. Unique Display Order
        const orders = configuredSubjects.map(s => s.displayOrder);
        const uniqueOrders = new Set(orders);
        if (orders.length !== uniqueOrders.size) {
            // Find duplicates to highlight
            const seen = new Set();
            const duplicates = new Set();
            orders.forEach(o => seen.has(o) ? duplicates.add(o) : seen.add(o));

            configuredSubjects.forEach(s => {
                if (duplicates.has(s.displayOrder)) {
                    errors[s.id] = { ...errors[s.id], displayOrder: "Duplicate Order" };
                }
            });
            alert("Validation Failed: Display Order must be unique for each subject.");
            isValid = false;
        }

        const hasCoreSubject = configuredSubjects.some(s => !s.isOptional);
        if (!hasCoreSubject) {
            alert("Validation Failed: At least one Core (Mandatory) subject is required.");
            isValid = false;
        }

        setValidationErrors(errors);
        return isValid;
    };

    const handleSave = (proceed = false) => {
        if (!validateMapping()) return;

        console.log("Saving Mapping...", {
            classId,
            academicYear: classSummary.academicYear,
            termStructure,
            subjects: configuredSubjects
        });

        alert("Subject Mapping Saved Successfully!");

        if (proceed) {
            navigate(`/academics/classes/${classId || '1'}`);
        }
    };

    // Step Rendering Logic
    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <StepTermStructure
                        academicYear={classSummary.academicYear}
                        termStructure={termStructure}
                        setTermStructure={setTermStructure}
                    />
                );
            case 2:
                return (
                    <StepSelectSubjects
                        selectedSubjectIds={selectedSubjectIds}
                        setSelectedSubjectIds={setSelectedSubjectIds}
                    />
                );
            case 3:
                return (
                    <SubjectConfigurationTable
                        subjects={configuredSubjects}
                        setSubjects={setConfiguredSubjects}
                        errors={validationErrors}
                    />
                );
            case 4:
                return (
                    <div className="flex flex-col items-center justify-center p-8 text-center">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Ready to Save Configuration</h3>
                        <p className="text-gray-500 max-w-md">
                            You have configured <strong>{configuredSubjects.length} subjects</strong> for {classSummary.name}.
                            Review your settings one last time before finalizing.
                        </p>

                        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl text-left">
                            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Configuration</span>
                                <p className="mt-2 font-medium text-gray-900 dark:text-white">{termStructure} System</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Subjects</span>
                                <p className="mt-2 font-medium text-gray-900 dark:text-white">{configuredSubjects.length}</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Core / Optional</span>
                                <p className="mt-2 font-medium text-gray-900 dark:text-white">
                                    {configuredSubjects.filter(s => !s.isOptional).length} / {configuredSubjects.filter(s => s.isOptional).length}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            default:
                return <div>Unknown Step</div>;
        }
    };

    return (
        <>
            <PageMeta
                title="Class Subject Mapping | School ERP"
                description="Configure subjects and curriculum for the class"
            />
            <PageBreadcrumb pageTitle="Class Subject Mapping" />

            <div className="space-y-6">
                {/* 1. Page Header */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                                    {classSummary.name}
                                </h2>
                                <Badge color="success" size="sm">Active</Badge>
                            </div>
                            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                    <span className="font-medium">Year:</span> {classSummary.academicYear}
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                                    <span className="font-medium">Board:</span> {classSummary.board}
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                    <span className="font-medium">Students:</span> {classSummary.studentCount}
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                    <span className="font-medium">Class Teacher:</span> {classSummary.classTeacher?.name || classSummary.classTeacher || "Unassigned"}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 sm:flex-row">
                            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600">
                                View Class Details
                            </button>
                        </div>
                    </div>
                </div>

                {/* 2. Step-based Layout */}
                <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    {/* Stepper Header */}
                    <div className="border-b border-gray-200 p-6 dark:border-gray-700">
                        <div className="flex items-center justify-between max-w-3xl mx-auto">
                            {STEPS.map((step, index) => (
                                <div key={step.number} className="flex items-center flex-1 last:flex-none">
                                    <div
                                        className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors ${currentStep >= step.number
                                            ? "border-brand-500 bg-brand-500 text-white"
                                            : "border-gray-300 text-gray-500 dark:border-gray-600 dark:text-gray-400"
                                            }`}
                                    >
                                        {currentStep > step.number ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                        ) : (
                                            <span className="text-sm font-bold">{step.number}</span>
                                        )}
                                    </div>
                                    <div className={`ml-3 text-sm font-medium ${currentStep >= step.number ? "text-brand-600 dark:text-brand-400" : "text-gray-500 dark:text-gray-400"
                                        }`}>
                                        {step.title}
                                    </div>
                                    {index < STEPS.length - 1 && (
                                        <div className={`flex-1 h-0.5 mx-4 transition-colors ${currentStep > step.number ? "bg-brand-500" : "bg-gray-200 dark:bg-gray-700"
                                            }`} />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Step Content Content Area */}
                    <div className="p-6 min-h-[400px]">
                        {renderStepContent()}
                    </div>

                    {/* 3. Action Buttons Area */}
                    <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50 rounded-b-xl">
                        {/* LEFT ACTIONS */}
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                onClick={handleBack}
                                disabled={currentStep === 1}
                            >
                                Back
                            </Button>

                            {currentStep >= 2 && (
                                <Button
                                    variant="danger"
                                    onClick={handleClearAll}
                                >
                                    Clear All
                                </Button>
                            )}
                        </div>

                        {/* RIGHT ACTIONS */}
                        <div className="flex gap-3">
                            {currentStep === STEPS.length ? (
                                <>
                                    <Button
                                        variant="outline"
                                        onClick={() => handleSave(false)}
                                        disabled={!isFormValid}
                                    >
                                        Save Draft
                                    </Button>
                                    <Button
                                        variant="success"
                                        onClick={() => handleSave(true)}
                                        disabled={!isFormValid}
                                    >
                                        Save & Proceed
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    onClick={handleNext}
                                >
                                    Next Step
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SubjectMappingPage;
