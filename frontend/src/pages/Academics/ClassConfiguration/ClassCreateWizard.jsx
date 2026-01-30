import React, { useState } from "react";
import { FiCheck } from "react-icons/fi";
import StepBasicInfo from "./StepBasicInfo";
import StepRoomAssignment from "./StepRoomAssignment";
import StepTeacherAssignment from "./StepTeacherAssignment";
import StepCapacitySettings from "./StepCapacitySettings";
import StepCustomFields from "./StepCustomFields";

const ClassCreateWizard = ({ onSave, onCancel, teachers, rooms, existingClasses }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // Step 1: Basic Information
        academicYear: "2025-2026",
        grade: "",
        section: "",
        board: { category: "CBSE", state: "", boardName: "" },
        medium: "English",
        classType: "Regular",

        // Step 2: Room Assignment
        room: null,
        roomNote: "",

        // Step 3: Teacher Assignment
        classTeacher: null,
        coClassTeacher: null,
        allowTeacherLater: false,

        // Step 4: Capacity & Settings
        maxStudents: 40,
        currentStrength: 0,
        status: "Draft",
        specialNotes: "",

        // Step 5: Custom Fields
        customFields: {}
    });

    // Validation state
    const [errors, setErrors] = useState({});

    const steps = [
        { id: 1, name: "Basic Information", description: "Grade, Section, Board" },
        { id: 2, name: "Room Assignment", description: "Select classroom" },
        { id: 3, name: "Class Teacher", description: "Assign teachers" },
        { id: 4, name: "Capacity & Settings", description: "Student limits" },
        { id: 5, name: "Custom Fields", description: "Additional info" }
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleRoomChange = (e) => {
        const roomId = e.target.value;
        if (!roomId) {
            setFormData(prev => ({ ...prev, room: null }));
            return;
        }

        const selectedRoom = rooms.find(r => r.id === roomId);
        if (selectedRoom) {
            setFormData(prev => ({
                ...prev,
                room: {
                    id: selectedRoom.id,
                    block: selectedRoom.blockName,
                    floor: selectedRoom.floorNumber,
                    roomNumber: selectedRoom.roomNumber,
                    capacity: selectedRoom.capacity
                },
                maxStudents: selectedRoom.capacity
            }));
        }
    };

    const handleTeacherChange = (e, field) => {
        const teacherId = e.target.value;
        if (!teacherId) {
            setFormData(prev => ({ ...prev, [field]: null }));
            return;
        }

        const selectedTeacher = teachers.find(t => t.id === teacherId);
        if (selectedTeacher) {
            setFormData(prev => ({
                ...prev,
                [field]: {
                    id: selectedTeacher.id,
                    name: selectedTeacher.name
                }
            }));
        }
    };

    const handleCustomFieldChange = (key, value) => {
        setFormData(prev => ({
            ...prev,
            customFields: {
                ...prev.customFields,
                [key]: value
            }
        }));
    };

    const validateStep = (step) => {
        const newErrors = {};
        let isValid = true;

        if (step === 1) {
            if (!formData.grade) newErrors.grade = "Grade is required";
            if (!formData.section) newErrors.section = "Section is required";
            // Board Validation
            if (!formData.board?.category) {
                // optional: enforce category selection if desired
            } else if (formData.board.category === "State Board") {
                if (!formData.board.state || !formData.board.boardName) {
                    newErrors.board = "State and Board Name are required";
                }
            }
        }

        if (step === 3) {
            if (!formData.allowTeacherLater && !formData.classTeacher) {
                newErrors.classTeacher = "Class Teacher is required";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        console.log('Current Step:', currentStep, 'Total Steps:', steps.length);
        // If current step is less than the total number of steps, checking validation and proceeding
        if (currentStep < steps.length) {
            const isValid = validateStep(currentStep);
            console.log('Step', currentStep, 'validation:', isValid);
            if (isValid) {
                console.log('Moving to step:', currentStep + 1);
                setCurrentStep(currentStep + 1);
            } else {
                console.log('Validation failed for step:', currentStep);
            }
        } else {
            console.log('Already at last step');
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSaveDraft = () => {
        const className = formData.grade && formData.section
            ? `${formData.grade}-${formData.section}`
            : "Draft Class";
        onSave({ ...formData, className, status: "Draft" }, "draft");
    };

    const handleSubmit = (action = "create") => {
        const className = `${formData.grade}-${formData.section}`;
        const finalData = { ...formData, className, status: "Active" };
        onSave(finalData, action);
    };

    const availableRooms = rooms.filter(room =>
        room.status === "Available" || room.id === formData.room?.id
    );

    const availableTeachers = teachers.filter(teacher =>
        !teacher.isClassTeacher || teacher.id === formData.classTeacher?.id
    );

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-white/[0.05] shadow-sm">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    Create New Class
                </h3>
                <button onClick={onCancel} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Stepper */}
            <div className="px-6 py-8 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                    {steps.map((step, index) => (
                        <React.Fragment key={step.id}>
                            <div className="flex flex-col items-center flex-1">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${currentStep > step.id
                                    ? 'bg-green-500 text-white'
                                    : currentStep === step.id
                                        ? 'bg-brand-600 text-white ring-4 ring-brand-100 dark:ring-brand-900/30'
                                        : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                                    }`}>
                                    {currentStep > step.id ? <FiCheck size={20} /> : step.id}
                                </div>
                                <div className="mt-2 text-center">
                                    <p className={`text-sm font-medium ${currentStep >= step.id
                                        ? 'text-gray-900 dark:text-white'
                                        : 'text-gray-500 dark:text-gray-400'
                                        }`}>
                                        {step.name}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                            {index < steps.length - 1 && (
                                <div className={`flex-1 h-0.5 mx-2 mb-8 transition-all ${currentStep > step.id
                                    ? 'bg-green-500'
                                    : 'bg-gray-200 dark:bg-gray-700'
                                    }`} />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Form Content */}
            <div className="p-6">
                {/* Step 1: Basic Information */}
                {currentStep === 1 && (
                    <StepBasicInfo
                        formData={formData}
                        setFormData={setFormData}
                        handleChange={handleChange}
                        errors={errors}
                    />
                )}

                {/* Step 2: Room Assignment */}
                {currentStep === 2 && (
                    <StepRoomAssignment
                        formData={formData}
                        handleChange={handleChange}
                        handleRoomChange={handleRoomChange}
                        rooms={rooms}
                        existingClasses={existingClasses}
                    />
                )}

                {/* Step 3: Teacher Assignment */}
                {currentStep === 3 && (
                    <StepTeacherAssignment
                        formData={formData}
                        handleTeacherChange={handleTeacherChange}
                        handleChange={handleChange}
                        teachers={teachers}
                        existingClasses={existingClasses}
                        errors={errors}
                    />
                )}

                {/* Step 4: Capacity & Settings */}
                {currentStep === 4 && (
                    <StepCapacitySettings
                        formData={formData}
                        handleChange={handleChange}
                    />
                )}

                {/* Step 5: Custom Fields */}
                {currentStep === 5 && (
                    <StepCustomFields
                        formData={formData}
                        handleCustomFieldChange={handleCustomFieldChange}
                    />
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center pt-6 mt-6 border-t border-gray-100 dark:border-gray-700">
                    <div>
                        {currentStep > 1 && (
                            <button
                                type="button"
                                onClick={handleBack}
                                className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                            >
                                Back
                            </button>
                        )}
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={handleSaveDraft}
                            className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                        >
                            Save as Draft
                        </button>

                        {currentStep < steps.length ? (
                            <button
                                type="button"
                                onClick={handleNext}
                                className="px-5 py-2.5 text-sm font-medium text-white bg-brand-600 rounded-lg hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-sm"
                            >
                                Next Step
                            </button>
                        ) : (
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => handleSubmit('create_another')}
                                    className="px-5 py-2.5 text-sm font-medium text-brand-600 bg-brand-50 border border-brand-200 rounded-lg hover:bg-brand-100 focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-sm dark:bg-gray-800 dark:text-brand-400 dark:border-gray-600 dark:hover:bg-gray-700"
                                >
                                    Save & Add Another
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleSubmit('configure')}
                                    className="px-5 py-2.5 text-sm font-medium text-white bg-brand-600 rounded-lg hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-sm"
                                >
                                    Save & Configure Subjects
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleSubmit('create')}
                                    className="px-5 py-2.5 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
                                >
                                    Create Class
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassCreateWizard;
