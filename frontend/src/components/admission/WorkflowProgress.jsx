import React from 'react';
import { FiCheck } from 'react-icons/fi';

const WorkflowProgress = ({ status }) => {
    const steps = [
        { key: 'draft', label: 'Draft' },
        { key: 'submitted', label: 'Submitted' },
        { key: 'pending_admission_review', label: 'Review' }, // Shortened label
        { key: 'pending_fee_structure', label: 'Fees' }, // Shortened label
        { key: 'pending_principal_approval', label: 'Approval' }, // Shortened label
        { key: 'approved', label: 'Approved' },
        { key: 'enrolled', label: 'Enrolled' },
    ];

    const getCurrentStepIndex = () => {
        const index = steps.findIndex(s => s.key === status);
        if (index === -1) {
            if (status?.includes('rejected')) return steps.findIndex(s => s.key === 'submitted');
            return 0;
        }
        return index;
    };

    const activeIndex = getCurrentStepIndex();

    return (
        <div className="w-full py-4 px-2">
            <div className="relative flex items-center justify-between">
                {/* Background Line */}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 dark:bg-gray-700 -z-10"></div>

                {steps.map((step, index) => {
                    const isCompleted = index < activeIndex;
                    const isActive = index === activeIndex;
                    // const isPending = index > activeIndex;

                    return (
                        <div key={step.key} className="flex flex-col items-center gap-2 bg-white dark:bg-boxdark px-1 sm:px-2 z-10 transition-all">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 text-sm font-medium transition-colors ${isCompleted
                                        ? 'bg-success border-success text-white'
                                        : isActive
                                            ? 'bg-primary border-primary text-white'
                                            : 'bg-white border-gray-300 text-gray-500 dark:bg-gray-800 dark:border-gray-600'
                                    }`}
                            >
                                {isCompleted ? <FiCheck size={16} /> : index + 1}
                            </div>
                            <span
                                className={`text-[10px] sm:text-xs font-medium text-center ${isActive ? 'text-primary' : isCompleted ? 'text-success' : 'text-gray-500 dark:text-gray-400'
                                    }`}
                            >
                                {step.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default WorkflowProgress;
