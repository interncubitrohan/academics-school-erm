import React, { useState } from "react";
import { Modal } from "../../../components/ui/modal";
import BoardSelector from "../../../components/common/BoardSelector";

const QuickCreateSubjectModal = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        subjectName: "",
        subjectCode: "",
        subjectType: "Theory",
        board: { category: "", state: "", boardName: "" }
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "subjectCode" ? value.toUpperCase() : value
        }));
        // Clear error on change
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.subjectName.trim()) newErrors.subjectName = "Name is required";
        if (!formData.subjectCode.trim()) newErrors.subjectCode = "Code is required";
        if (!formData.board?.category) {
            newErrors.board = "Board is required";
        } else if (formData.board.category === "State Board") {
            if (!formData.board.state || !formData.board.boardName) {
                newErrors.board = "State and Board Name are required";
            }
        }
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Create new subject object structure
        const newSubject = {
            id: `sub_quick_${Date.now()}`,
            subjectName: formData.subjectName,
            subjectCode: formData.subjectCode,
            subjectType: formData.subjectType,
            boards: [formData.board], // Store as array to match master schema
            applicableGrades: [], // Can be filled later or inferred
            status: "Active",
            // Defaults
            maxMarksOrCredits: 100,
            hasPractical: false,
            hasInternalAssessment: false
        };

        onSave(newSubject);

        // Reset and close
        setFormData({
            subjectName: "",
            subjectCode: "",
            subjectType: "Theory",
            board: { category: "", state: "", boardName: "" }
        });
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-[500px] p-6 rounded-xl">
            <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                    Quick Add Subject
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Add a new subject to the master list and select it immediately.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Subject Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="subjectName"
                        value={formData.subjectName}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.subjectName ? 'border-red-500 ring-red-200' : 'border-gray-300 focus:ring-brand-500 dark:border-gray-600'} dark:bg-gray-700 dark:text-white`}
                        placeholder="e.g. Environmental Science"
                    />
                    {errors.subjectName && <p className="text-xs text-red-500 mt-1">{errors.subjectName}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Subject Code <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="subjectCode"
                            value={formData.subjectCode}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 uppercase ${errors.subjectCode ? 'border-red-500 ring-red-200' : 'border-gray-300 focus:ring-brand-500 dark:border-gray-600'} dark:bg-gray-700 dark:text-white`}
                            placeholder="EVS101"
                        />
                        {errors.subjectCode && <p className="text-xs text-red-500 mt-1">{errors.subjectCode}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Type
                        </label>
                        <select
                            name="subjectType"
                            value={formData.subjectType}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        >
                            <option value="Theory">Theory</option>
                            <option value="Practical">Practical</option>
                            <option value="Language">Language</option>
                            <option value="Co-Scholastic">Co-Scholastic</option>
                            <option value="Elective">Elective</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Board <span className="text-red-500">*</span>
                    </label>
                    <BoardSelector
                        value={formData.board}
                        onChange={(newBoardData) => {
                            setFormData(prev => ({ ...prev, board: newBoardData }));
                            if (errors.board) setErrors(prev => ({ ...prev, board: null }));
                        }}
                        errors={{ category: errors.board, state: errors.board, boardName: errors.board }}
                    />
                    {errors.board && <p className="text-xs text-red-500 mt-1">{errors.board}</p>}
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-brand-600 rounded-lg hover:bg-brand-700"
                    >
                        Create & Select
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default QuickCreateSubjectModal;
