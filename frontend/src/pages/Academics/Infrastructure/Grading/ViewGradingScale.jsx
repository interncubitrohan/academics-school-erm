import React from "react";
import { Modal } from "../../../../components/ui/modal";
import Badge from "../../../../components/ui/badge/Badge";
import { FiX } from "react-icons/fi";

const ViewGradingScale = ({ isOpen, onClose, scale }) => {
    if (!scale) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-[700px] p-0">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        Grading Scale Details
                    </h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                        <FiX size={24} />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Header Info */}
                    <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                        <div>
                            <label className="block text-xs font-medium text-gray-500 uppercase">Scale Name</label>
                            <div className="mt-1 text-base font-medium text-gray-900 dark:text-white">{scale.scaleName}</div>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 uppercase">Board</label>
                            <div className="mt-1 text-base font-medium text-gray-900 dark:text-white">{scale.board}</div>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 uppercase">Type</label>
                            <div className="mt-1">
                                <Badge color={scale.scaleType === 'GPA' ? 'success' : 'primary'}>{scale.scaleType}</Badge>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 uppercase">Status</label>
                            <div className="mt-1">
                                <Badge color={scale.status === 'Active' ? 'success' : 'danger'}>{scale.status}</Badge>
                            </div>
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xs font-medium text-gray-500 uppercase">Applicable Grades</label>
                            <div className="mt-1 flex flex-wrap gap-1">
                                {scale.applicableGrades?.map((g, i) => (
                                    <span key={i} className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs dark:bg-gray-700 dark:text-gray-300">
                                        {g}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Grade Bands Table */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">Grade Bands</h4>
                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-800/50">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Range</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Points</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Remarks</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {scale.gradeBands?.map((band, idx) => (
                                        <tr key={idx}>
                                            <td className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-white">{band.grade}</td>
                                            <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">{band.minValue}% - {band.maxValue}%</td>
                                            <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">{band.points}</td>
                                            <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">{band.remarks || "-"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                    >
                        Close
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ViewGradingScale;

