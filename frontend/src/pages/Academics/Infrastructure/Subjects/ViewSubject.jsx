import React from "react";
import { Modal } from "../../../../components/ui/modal";
import Badge from "../../../../components/ui/badge/Badge";

const ViewSubject = ({ isOpen, onClose, subject }) => {
    if (!subject) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-[700px] p-0 overflow-hidden rounded-xl">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Subject Details
                </h3>
                <Badge
                    size="sm"
                    color={subject.status === "Active" ? "success" : "danger"}
                >
                    {subject.status}
                </Badge>
            </div>

            <div className="p-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
                <div className="space-y-8">
                    {/* Header Section */}
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                {subject.subjectName}
                            </h2>
                            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-gray-800 dark:text-gray-200">
                                    {subject.subjectCode}
                                </span>
                                {subject.shortName && <span>â€¢ {subject.shortName}</span>}
                            </div>
                        </div>
                        <Badge
                            size="md"
                            color={
                                subject.subjectType === "Theory"
                                    ? "primary"
                                    : subject.subjectType === "Practical"
                                        ? "warning"
                                        : subject.subjectType === "Language"
                                            ? "success"
                                            : "secondary"
                            }
                        >
                            {subject.subjectType}
                        </Badge>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <div>
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                                Curricular Details
                            </h4>
                            <dl className="space-y-3">
                                <div className="flex justify-between">
                                    <dt className="text-sm text-gray-600 dark:text-gray-400">Applicable Boards</dt>
                                    <dd className="text-sm font-medium text-gray-900 dark:text-white text-right">
                                        <div className="flex flex-wrap gap-1 justify-end">
                                            {subject.boards.map(board => (
                                                <span key={board} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                                    {board}
                                                </span>
                                            ))}
                                        </div>
                                    </dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-sm text-gray-600 dark:text-gray-400">Grades</dt>
                                    <dd className="text-sm font-medium text-gray-900 dark:text-white text-right">
                                        {subject.applicableGrades.join(", ")}
                                    </dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-sm text-gray-600 dark:text-gray-400">Max Marks / Credits</dt>
                                    <dd className="text-sm font-medium text-gray-900 dark:text-white">
                                        {subject.maxMarksOrCredits}
                                    </dd>
                                </div>
                            </dl>
                        </div>

                        <div>
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                                Configuration
                            </h4>
                            <dl className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <dt className="text-sm text-gray-600 dark:text-gray-400">Practical Component</dt>
                                    <dd className="text-sm font-medium text-gray-900 dark:text-white">
                                        {subject.hasPractical ? (
                                            <span className="flex items-center text-green-600 dark:text-green-400">
                                                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                                Yes ({subject.practicalMarks} Marks)
                                            </span>
                                        ) : (
                                            <span className="text-gray-400">No</span>
                                        )}
                                    </dd>
                                </div>
                                <div className="flex justify-between items-center">
                                    <dt className="text-sm text-gray-600 dark:text-gray-400">Internal Assessment</dt>
                                    <dd className="text-sm font-medium text-gray-900 dark:text-white">
                                        {subject.hasInternalAssessment ? (
                                            <span className="flex items-center text-purple-600 dark:text-purple-400">
                                                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                                Yes ({subject.iaWeightage}%)
                                            </span>
                                        ) : (
                                            <span className="text-gray-400">No</span>
                                        )}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>

                    {/* Prerequisites */}
                    {subject.prerequisites && subject.prerequisites.length > 0 && (
                        <div>
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
                                Prerequisites
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {Array.isArray(subject.prerequisites) ? subject.prerequisites.map((req, idx) => (
                                    <span key={idx} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800">
                                        {req}
                                    </span>
                                )) : (
                                    <span className="text-sm text-gray-600 dark:text-gray-400">{subject.prerequisites}</span>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Description */}
                    {subject.description && (
                        <div>
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                                Description
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700 leading-relaxed">
                                {subject.description}
                            </p>
                        </div>
                    )}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ViewSubject;

