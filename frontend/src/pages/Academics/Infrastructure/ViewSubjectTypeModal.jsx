import React from "react";
import { Modal } from "../../../components/ui/modal";
import Badge from "../../../components/ui/badge/Badge";
import { FiCheck, FiX, FiStar } from "react-icons/fi";

const ViewSubjectTypeModal = ({ isOpen, onClose, subjectType }) => {
    if (!subjectType) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-[500px] p-6">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-xl font-semibold text-black dark:text-white">
                        {subjectType.typeName}
                    </h3>
                    <div className="mt-1">
                        <Badge size="sm" color="gray">
                            {subjectType.typeCode}
                        </Badge>
                    </div>
                </div>
                <div>
                    <Badge size="sm" color={subjectType.status === "Active" ? "success" : "warning"}>
                        {subjectType.status}
                    </Badge>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Description
                    </h4>
                    <p className="text-black dark:text-white">
                        {subjectType.description || "No description provided."}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Display Order</span>
                        <span className="text-black dark:text-white font-medium">{subjectType.displayOrder}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Default Status</span>
                        <span className="flex items-center gap-1 text-black dark:text-white">
                            {subjectType.isDefault ? (
                                <>
                                    <FiStar className="text-warning fill-current" /> Default Type
                                </>
                            ) : (
                                "Not Default"
                            )}
                        </span>
                    </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-meta-4 rounded-lg">
                            <span className="text-sm font-medium text-black dark:text-white">Is Compulsory</span>
                            {subjectType.isCompulsory ? (
                                <div className="flex items-center gap-1 text-success bg-white dark:bg-boxdark px-2 py-1 rounded shadow-sm">
                                    <FiCheck /> Yes
                                </div>
                            ) : (
                                <div className="flex items-center gap-1 text-danger bg-white dark:bg-boxdark px-2 py-1 rounded shadow-sm">
                                    <FiX /> No
                                </div>
                            )}
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-meta-4 rounded-lg">
                            <span className="text-sm font-medium text-black dark:text-white">Affects Promotion</span>
                            {subjectType.affectsPromotion ? (
                                <div className="flex items-center gap-1 text-success bg-white dark:bg-boxdark px-2 py-1 rounded shadow-sm">
                                    <FiCheck /> Yes
                                </div>
                            ) : (
                                <div className="flex items-center gap-1 text-danger bg-white dark:bg-boxdark px-2 py-1 rounded shadow-sm">
                                    <FiX /> No
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex justify-end">
                <button
                    onClick={onClose}
                    className="px-6 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                >
                    Close
                </button>
            </div>
        </Modal>
    );
};

export default ViewSubjectTypeModal;
