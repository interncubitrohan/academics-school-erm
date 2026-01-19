import React, { useState } from "react";
import { Link } from "react-router";
import Badge from "../../../components/ui/badge/Badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../../../components/ui/table";

// Mock Data
const MOCK_CLASSES = [
    { id: 1, name: "Class 1-A" },
    { id: 2, name: "Class 2-A" },
    { id: 3, name: "Class 3-A" },
    { id: 4, name: "Class 4-A" },
    { id: 5, name: "Class 5-A" },
];

const MOCK_GRADING_SCALES = [
    { id: 1, name: "Standard Percentage", type: "Percentage" },
    { id: 2, name: "GPA 10 Scale", type: "GPA" },
    { id: 3, name: "Primary Grades (A-E)", type: "Grade" },
];

const MOCK_SUBJECTS = [
    { id: 101, name: "Mathematics" },
    { id: 102, name: "Science" },
    { id: 103, name: "English" },
    { id: 104, name: "Social Studies" },
    { id: 105, name: "Hindi" },
];

const ExamScheduler = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        title: "",
        type: "Term", // Term / Unit
        startDate: "",
        endDate: "",
        selectedClasses: [], // array of IDs
        gradingScaleId: "",
        papers: [], // { subjectId, date, time, duration, maxMarks }
    });

    const handleNext = () => {
        if (currentStep < 4) setCurrentStep(currentStep + 1);
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const handleFinish = () => {
        // Save to Local Storage
        const existingExams = JSON.parse(localStorage.getItem("scheduledExams") || "[]");
        const newExam = { ...formData, id: Date.now(), status: "Scheduled" };
        localStorage.setItem("scheduledExams", JSON.stringify([...existingExams, newExam]));

        // Navigate back to list
        // We need useNavigate hook
        window.location.href = "/academics/exams";
    };

    // Step 1: Info Handlers
    const handleInfoChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Step 2: Class Selection Handlers
    const toggleClass = (classId) => {
        const selected = formData.selectedClasses.includes(classId)
            ? formData.selectedClasses.filter(id => id !== classId)
            : [...formData.selectedClasses, classId];
        setFormData({ ...formData, selectedClasses: selected });
    };

    // Step 4: Paper Handlers
    const updatePaper = (subjectId, field, value) => {
        const papers = [...formData.papers];
        const index = papers.findIndex(p => p.subjectId === subjectId);

        if (index > -1) {
            papers[index] = { ...papers[index], [field]: value };
        } else {
            papers.push({
                subjectId,
                date: "",
                time: "",
                duration: "2",
                maxMarks: "100",
                [field]: value
            });
        }
        setFormData({ ...formData, papers });
    };

    const getPaperValue = (subjectId, field) => {
        const paper = formData.papers.find(p => p.subjectId === subjectId);
        return paper ? paper[field] : "";
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Schedule New Exam</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Create and configure a new examination schedule</p>
                </div>
                <Link to="/academics" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400">
                    Cancel
                </Link>
            </div>

            {/* Stepper Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between relative">
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 dark:bg-gray-700 -z-10"></div>
                    {[1, 2, 3, 4].map((step) => (
                        <div key={step} className={`flex flex-col items-center gap-2 bg-white dark:bg-gray-900 px-2`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${currentStep >= step
                                ? "bg-brand-600 text-white"
                                : "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                                }`}>
                                {step}
                            </div>
                            <span className={`text-xs font-medium ${currentStep >= step ? "text-brand-600" : "text-gray-500"
                                }`}>
                                {step === 1 && "Exam Info"}
                                {step === 2 && "Select Classes"}
                                {step === 3 && "Grading"}
                                {step === 4 && "Papers"}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Step Content */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-white/[0.05] p-6 mb-6 min-h-[400px]">

                {/* STEP 1: EXAM INFO */}
                {currentStep === 1 && (
                    <div className="max-w-xl mx-auto space-y-4">
                        <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Exam Information</h2>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Exam Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInfoChange}
                                placeholder="e.g. Mid-Term Examination 2024"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Exam Type</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleInfoChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            >
                                <option value="Term">Term End</option>
                                <option value="Unit">Unit Test</option>
                                <option value="Final">Final Exam</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
                                <input
                                    type="date"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleInfoChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date</label>
                                <input
                                    type="date"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleInfoChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* STEP 2: SELECT CLASSES */}
                {currentStep === 2 && (
                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Select Participating Classes</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {MOCK_CLASSES.map(cls => (
                                <div
                                    key={cls.id}
                                    onClick={() => toggleClass(cls.id)}
                                    className={`p-4 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${formData.selectedClasses.includes(cls.id)
                                        ? "border-brand-500 bg-brand-50 dark:bg-brand-900/20"
                                        : "border-gray-200 hover:border-brand-300 dark:border-gray-700"
                                        }`}
                                >
                                    <span className="font-medium text-gray-800 dark:text-white">{cls.name}</span>
                                    {formData.selectedClasses.includes(cls.id) && (
                                        <Badge color="success" size="sm">Selected</Badge>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* STEP 3: GRADING SCALE */}
                {currentStep === 3 && (
                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Select Grading System</h2>
                        <div className="space-y-3">
                            {MOCK_GRADING_SCALES.map(scale => (
                                <div
                                    key={scale.id}
                                    onClick={() => setFormData({ ...formData, gradingScaleId: scale.id })}
                                    className={`p-4 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${formData.gradingScaleId === scale.id
                                        ? "border-brand-500 bg-brand-50 dark:bg-brand-900/20"
                                        : "border-gray-200 hover:border-brand-300 dark:border-gray-700"
                                        }`}
                                >
                                    <div>
                                        <h4 className="font-medium text-gray-800 dark:text-white">{scale.name}</h4>
                                        <p className="text-xs text-gray-500">{scale.type} Based</p>
                                    </div>
                                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${formData.gradingScaleId === scale.id ? "border-brand-600" : "border-gray-300"
                                        }`}>
                                        {formData.gradingScaleId === scale.id && (
                                            <div className="w-3 h-3 rounded-full bg-brand-600"></div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* STEP 4: PAPERS */}
                {currentStep === 4 && (
                    <div className="space-y-4">
                        <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Define Papers & Schedule</h2>
                        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                            <Table>
                                <TableHeader className="bg-gray-50 dark:bg-gray-800">
                                    <TableRow>
                                        <TableCell isHeader className="p-3 w-1/4">Subject</TableCell>
                                        <TableCell isHeader className="p-3">Paper Date</TableCell>
                                        <TableCell isHeader className="p-3">Start Time</TableCell>
                                        <TableCell isHeader className="p-3 max-w-[100px]">Duration (Hrs)</TableCell>
                                        <TableCell isHeader className="p-3 max-w-[100px]">Max Marks</TableCell>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {MOCK_SUBJECTS.map(subject => (
                                        <TableRow key={subject.id}>
                                            <TableCell className="p-3 font-medium text-gray-800 dark:text-white">
                                                {subject.name}
                                            </TableCell>
                                            <TableCell className="p-2">
                                                <input
                                                    type="date"
                                                    value={getPaperValue(subject.id, "date") || ""}
                                                    onChange={(e) => updatePaper(subject.id, "date", e.target.value)}
                                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:border-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                />
                                            </TableCell>
                                            <TableCell className="p-2">
                                                <input
                                                    type="time"
                                                    value={getPaperValue(subject.id, "time") || ""}
                                                    onChange={(e) => updatePaper(subject.id, "time", e.target.value)}
                                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:border-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                />
                                            </TableCell>
                                            <TableCell className="p-2">
                                                <input
                                                    type="number"
                                                    value={getPaperValue(subject.id, "duration") || "2"}
                                                    onChange={(e) => updatePaper(subject.id, "duration", e.target.value)}
                                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:border-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                />
                                            </TableCell>
                                            <TableCell className="p-2">
                                                <input
                                                    type="number"
                                                    value={getPaperValue(subject.id, "maxMarks") || "100"}
                                                    onChange={(e) => updatePaper(subject.id, "maxMarks", e.target.value)}
                                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:border-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                )}

            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
                <button
                    onClick={handleBack}
                    disabled={currentStep === 1}
                    className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700"
                >
                    Back
                </button>

                {currentStep < 4 ? (
                    <button
                        onClick={handleNext}
                        className="px-6 py-2 text-sm font-medium text-white bg-brand-600 rounded-lg hover:bg-brand-700"
                    >
                        Next Step
                    </button>
                ) : (
                    <button
                        onClick={handleFinish}
                        className="px-6 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
                    >
                        Finish & Schedule
                    </button>
                )}
            </div>
        </div>
    );
};

export default ExamScheduler;
