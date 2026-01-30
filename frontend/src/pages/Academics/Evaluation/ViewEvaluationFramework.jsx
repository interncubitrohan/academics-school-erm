import React from "react";
import { FiX, FiPrinter, FiCheckCircle, FiCheck, FiMinus } from "react-icons/fi";
import Badge from "../../../components/ui/badge/Badge";
import Button from "../../../components/ui/button/Button";

const ViewEvaluationFramework = ({ framework, onClose }) => {
    if (!framework) return null;

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 border-b border-gray-100 dark:border-gray-700 gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                            {framework.frameworkName}
                        </h3>
                        <Badge
                            size="sm"
                            color={framework.status === "Active" ? "success" : "danger"}
                        >
                            {framework.status}
                        </Badge>
                        {framework.isDefault && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-full dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800">
                                <FiCheckCircle size={12} /> Default
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Framework ID: {framework.id}
                    </p>
                </div>
                <div className="flex gap-3 print:hidden">
                    <Button
                        onClick={handlePrint}
                        variant="white"
                    >
                        <FiPrinter size={16} /> Print
                    </Button>
                    <Button
                        onClick={onClose}
                        variant="secondary"
                    >
                        <FiX size={16} /> Close
                    </Button>
                </div>
            </div>

            <div className="p-6 space-y-8">
                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Details Card */}
                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-5 border border-gray-100 dark:border-gray-800">
                        <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                            Framework Details
                        </h4>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Board / Curriculum:</span>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">{framework.board}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Academic Year:</span>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">{framework.academicYear}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Grading Scale:</span>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">{framework.gradingScale}</span>
                            </div>
                            <div className="flex justify-between items-start">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Applicable Grades:</span>
                                <div className="flex flex-wrap gap-1 justify-end max-w-[60%]">
                                    {(framework.applicableGrades || []).map((grade, i) => (
                                        <span key={i} className="inline-block px-2 py-0.5 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-gray-700 dark:text-gray-300">
                                            {grade}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Passing Criteria Card */}
                    <div className="bg-blue-50/50 dark:bg-blue-900/10 rounded-lg p-5 border border-blue-100 dark:border-blue-800/30">
                        <h4 className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-4">
                            Overall Passing Rules
                        </h4>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded border border-blue-100 dark:border-blue-900/20">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Min. Overall Percentage</span>
                                <span className="text-lg font-bold text-gray-900 dark:text-white">
                                    {framework.overallPassingCriteria?.minOverallPercentage || 0}%
                                </span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded border border-blue-100 dark:border-blue-900/20">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Max Grace Marks</span>
                                <span className="text-lg font-bold text-gray-900 dark:text-white">
                                    {framework.overallPassingCriteria?.maxGraceMarks || 0}
                                </span>
                            </div>
                            <div>
                                <span className="text-xs text-blue-500 dark:text-blue-400 font-medium block mb-2">
                                    Mandatory Pass Required In:
                                </span>
                                <div className="flex flex-wrap gap-2">
                                    {framework.overallPassingCriteria?.mandatoryPassSubjectTypes?.length > 0 ? (
                                        framework.overallPassingCriteria.mandatoryPassSubjectTypes.map(type => (
                                            <span key={type} className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-md dark:bg-blue-900/40 dark:text-blue-200">
                                                <FiCheck size={10} /> {type}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-xs text-gray-400 italic">None specified</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Assessment Components */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                        Assessment Structure
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                            Total Weightage: {framework.assessmentComponents?.reduce((sum, c) => sum + (Number(c.weightage) || 0), 0)}%
                        </span>
                    </h4>

                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white font-medium border-b border-gray-200 dark:border-gray-700">
                                <tr>
                                    <th className="px-4 py-3">Component Name</th>
                                    <th className="px-4 py-3">Type</th>
                                    <th className="px-4 py-3 w-32">Weightage</th>
                                    <th className="px-4 py-3">Sub-Components Breakdown</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                {framework.assessmentComponents?.map((comp, idx) => (
                                    <tr key={idx} className="bg-white dark:bg-gray-800">
                                        <td className="px-4 py-3 align-top font-medium text-gray-900 dark:text-white">
                                            {comp.componentName}
                                            <div className="text-xs text-gray-400 font-normal mt-0.5">
                                                Min Pass: {comp.passingCriteria?.minPercentage || 0}%
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 align-top text-gray-600 dark:text-gray-300">
                                            {comp.type}
                                        </td>
                                        <td className="px-4 py-3 align-top">
                                            <span className="font-bold text-brand-600 dark:text-brand-400">
                                                {comp.weightage}%
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 align-top">
                                            {comp.subComponents?.length > 0 ? (
                                                <div className="space-y-2">
                                                    {comp.subComponents.map((sub, sIdx) => (
                                                        <div key={sIdx} className="flex items-center justify-between text-xs bg-gray-50 dark:bg-gray-700/30 p-2 rounded">
                                                            <div className="flex flex-col">
                                                                <span className="font-medium text-gray-800 dark:text-gray-200">{sub.name}</span>
                                                                <span className="text-gray-500">{sub.type}</span>
                                                            </div>
                                                            <div className="text-right">
                                                                <span className="block font-semibold text-gray-700 dark:text-gray-300">{sub.weightage}%</span>
                                                                <span className="text-gray-400">Max: {sub.maxMarks}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <span className="text-gray-400 italic text-xs flex items-center gap-1">
                                                    <FiMinus size={12} /> No breakdown
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewEvaluationFramework;
