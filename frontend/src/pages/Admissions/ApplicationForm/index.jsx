import React, { useState } from 'react';
import PersonalInfoStep from './PersonalInfoStep';
import AddressStep from './AddressStep';
import FamilyInfoStep from './FamilyInfoStep';
import FacilitiesStep from './FacilitiesStep';
import DocumentsStep from './DocumentsStep';
import ReviewStep from './ReviewStep';
import { FiCheckCircle, FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import PageBreadcrumb from '../../../components/common/PageBreadCrumb';
import PageMeta from '../../../components/common/PageMeta';
import Button from '../../../components/ui/button/Button';

const ApplicationForm = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        // Student Details
        academicYear: '2025-2026',
        firstName: '',
        lastName: '',
        middleName: '',
        aadharNumber: '',
        dateOfBirth: '',
        gender: '',
        category: '',
        subCategory: '',
        religion: '',
        bloodGroup: '',
        nationality: 'Indian',
        hasDisability: false,
        disabilityType: '',
        disabilityPercentage: '',
        achievements: [],

        // Admission Details
        classOfAdmission: '',
        dateOfJoining: '',

        // Transport & Hostel
        busNeeded: false,
        hostelNeeded: false,
        hostelRoom: '',

        // Contact Details
        currentAddress: {},
        permanentAddress: {},
        sameAsCurrentAddress: false,

        // Family Details
        familyInfo: {},

        // Documents
        documents: {},

        // System Fields
        status: 'draft'
    });

    const steps = [
        { title: 'Personal Info', component: PersonalInfoStep },
        { title: 'Address Details', component: AddressStep },
        { title: 'Family Info', component: FamilyInfoStep },
        { title: 'Facilities', component: FacilitiesStep },
        { title: 'Documents', component: DocumentsStep },
        { title: 'Review', component: ReviewStep },
    ];

    const CurrentComponent = steps[activeStep].component;

    const isFormEditable = (status) => {
        return status === 'draft';
    };

    const isDraft = isFormEditable(formData.status);

    const handleNext = () => {
        if (activeStep < steps.length - 1) {
            setActiveStep(prev => prev + 1);
        }
    };

    const handleBack = () => {
        if (activeStep > 0) {
            setActiveStep(prev => prev - 1);
        }
    };

    const handleSaveDraft = () => {
        setFormData(prev => ({ ...prev, status: 'draft' }));
        console.log('Draft Saved:', formData);
        alert('Draft saved successfully!');
    };

    const handleSubmit = () => {
        setFormData(prev => ({ ...prev, status: 'submitted' }));
        console.log('Application Submitted:', { ...formData, status: 'submitted' });
    };

    return (
        <>
            <PageMeta
                title="New Application | School ERP"
                description="Create a new student admission application"
            />
            <PageBreadcrumb pageTitle="New Application" />

            <div className="space-y-6">

                {/* Stepper Header matches ExamCreateWizard */}
                <div className="mb-8">
                    <div className="flex items-center justify-between relative">
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 dark:bg-gray-700 -z-10"></div>
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center gap-2 bg-white dark:bg-gray-900 px-2 z-10 transition-all cursor-pointer"
                                onClick={() => {
                                    // Optional: Allow jumping back to completed steps or if in draft
                                    if (isDraft && index < activeStep) setActiveStep(index);
                                }}
                            >
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors border-2 ${index <= activeStep
                                        ? "bg-brand-600 text-white border-brand-600"
                                        : "bg-white text-gray-400 border-gray-300 dark:bg-gray-800 dark:border-gray-600"
                                        }`}
                                >
                                    {index < activeStep ? <FiCheckCircle /> : index + 1}
                                </div>
                                <span className={`text-xs font-medium ${index <= activeStep ? "text-brand-600" : "text-gray-500"}`}>
                                    {step.title}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Submission Banner */}
                {!isDraft && (
                    <div className="mb-6 flex w-full border-l-6 border-success bg-success bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
                        <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-success bg-opacity-30">
                            <FiCheckCircle className="text-success text-xl" />
                        </div>
                        <div className="w-full">
                            <h5 className="mb-3 text-lg font-semibold text-black dark:text-white">
                                Application submitted
                            </h5>
                            <p className="leading-relaxed text-body">
                                Your application has been successfully submitted and is pending review.
                            </p>
                        </div>
                    </div>
                )}

                {/* Step Content */}
                <div className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-white/[0.05] p-6 mb-6 min-h-[400px] shadow-sm ${!isDraft ? 'pointer-events-none opacity-80' : ''}`}>
                    <div className="mb-6 border-b border-gray-200 pb-4 dark:border-gray-700">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                            {steps[activeStep].title}
                        </h2>
                    </div>
                    <CurrentComponent formData={formData} setFormData={setFormData} />
                </div>

                {/* Navigation Buttons matches ExamCreateWizard */}
                <div className="flex justify-between">
                    <Button
                        variant="outline"
                        onClick={handleBack}
                        disabled={activeStep === 0 || !isDraft}
                    >
                        Back
                    </Button>

                    {activeStep === steps.length - 1 ? (
                        <div className="flex gap-2">
                            <Button
                                variant="secondary"
                                onClick={handleSaveDraft}
                                disabled={!isDraft}
                            >
                                Save Draft
                            </Button>
                            <Button
                                onClick={handleSubmit}
                                disabled={!isDraft}
                                variant="primary"
                            >
                                {isDraft ? 'Submit Application' : 'Submitted'}
                            </Button>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <Button
                                variant="secondary"
                                onClick={handleSaveDraft}
                                disabled={!isDraft}
                            >
                                Save Draft
                            </Button>
                            <Button
                                onClick={handleNext}
                                disabled={!isDraft}
                            >
                                Next Step
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ApplicationForm;
