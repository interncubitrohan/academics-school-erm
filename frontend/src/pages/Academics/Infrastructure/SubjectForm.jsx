import React, { useState, useEffect } from "react";
import { Modal } from "../../../components/ui/modal";

const SubjectForm = ({ isOpen, onClose, onSave, subject }) => {
    const [formData, setFormData] = useState({
        name: "",
        code: "",
        type: "Theory",
        department: "",
        description: "",
        creditHours: 1,
        boards: [],
        prerequisites: "",
    });

    useEffect(() => {
        if (subject) {
            setFormData({
                ...subject,
                boards: subject.boards || [],
                prerequisites: Array.isArray(subject.prerequisites) ? subject.prerequisites.join(", ") : subject.prerequisites || "",
            });
        } else {
            setFormData({
                name: "",
                code: "",
                type: "Theory",
                department: "",
                description: "",
                creditHours: 1,
                boards: [],
                prerequisites: "",
            });
        }
    }, [subject, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleBoardChange = (board) => {
        setFormData(prev => {
            const boards = prev.boards.includes(board)
                ? prev.boards.filter(b => b !== board)
                : [...prev.boards, board];
            return { ...prev, boards };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...formData,
            creditHours: Number(formData.creditHours),
            prerequisites: formData.prerequisites.split(",").map(p => p.trim()).filter(p => p)
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-[700px] p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                {subject ? "Edit Subject" : "Add New Subject"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Subject Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            placeholder="e.g. Mathematics"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Subject Code <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="code"
                            value={formData.code}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            placeholder="e.g. MATH101"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Subject Type <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        >
                            <option value="Theory">Theory</option>
                            <option value="Practical">Practical</option>
                            <option value="Co-Scholastic">Co-Scholastic</option>
                            <option value="Language">Language</option>
                            <option value="Elective">Elective</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Department
                        </label>
                        <input
                            type="text"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            placeholder="e.g. Science"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Credit Hours (Weekly)
                        </label>
                        <input
                            type="number"
                            name="creditHours"
                            value={formData.creditHours}
                            onChange={handleChange}
                            min="0"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            placeholder="e.g. 3"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Prerequisites (Codes)
                        </label>
                        <input
                            type="text"
                            name="prerequisites"
                            value={formData.prerequisites}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            placeholder="e.g. MATH101, PHY101"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Applicable Boards
                    </label>
                    <div className="flex gap-4 flex-wrap">
                        {["CBSE", "IGCSE", "IB", "State Board"].map((board) => (
                            <label key={board} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.boards.includes(board)}
                                    onChange={() => handleBoardChange(board)}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">{board}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        placeholder="Brief description of the subject..."
                    />
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                    >
                        {subject ? "Update Subject" : "Add Subject"}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default SubjectForm;
