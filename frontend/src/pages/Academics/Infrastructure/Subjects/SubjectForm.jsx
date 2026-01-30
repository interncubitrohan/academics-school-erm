import React, { useState, useEffect } from "react";
import { Modal } from "../../../../components/ui/modal";
import { FiTrash } from "react-icons/fi";
import BoardSelector from "../../../../components/common/BoardSelector";
import Button from "../../../../components/ui/button/Button";
import { MOCK_SUBJECTS } from "../../../../data/subjectData";

const SubjectForm = ({ isOpen, onClose, onSave, subject }) => {
    const defaultState = {
        subjectCode: "",
        subjectName: "",
        shortName: "",
        subjectType: "Theory",
        boards: [],
        applicableGrades: [],
        maxMarksOrCredits: 100,
        hasPractical: false,
        practicalMarks: 0,
        hasInternalAssessment: false,
        iaWeightage: 0,
        description: "",
        prerequisites: [], // Array of subject codes
        status: "Active"
    };

    const [formData, setFormData] = useState(defaultState);
    const [touched, setTouched] = useState({});
    const [tempBoard, setTempBoard] = useState({ category: "", state: "", boardName: "" });

    // Reset or Populate form
    useEffect(() => {
        if (subject) {
            setFormData({
                ...defaultState,
                ...subject,
                boards: subject.boards || [],
                applicableGrades: subject.applicableGrades || [],
                prerequisites: Array.isArray(subject.prerequisites) ? subject.prerequisites : [],
            });
        } else {
            setFormData(defaultState);
        }
        setTouched({});
    }, [subject, isOpen]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        let finalValue = type === "checkbox" ? checked : value;

        if (name === "subjectCode") {
            finalValue = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
        } else if (["maxMarksOrCredits", "practicalMarks", "iaWeightage"].includes(name)) {
            finalValue = Number(value);
        }

        setFormData((prev) => {
            const updates = { [name]: finalValue };
            // Reset dependent fields when toggles are turned off
            if (name === "hasPractical" && !checked) {
                updates.practicalMarks = 0;
            }
            if (name === "hasInternalAssessment" && !checked) {
                updates.iaWeightage = 0;
            }
            return { ...prev, ...updates };
        });
    };



    const handleGradeChange = (grade) => {
        setFormData(prev => {
            const grades = prev.applicableGrades.includes(grade)
                ? prev.applicableGrades.filter(g => g !== grade)
                : [...prev.applicableGrades, grade];
            return { ...prev, applicableGrades: grades };
        });
    };

    const handlePrerequisiteAdd = (e) => {
        const value = e.target.value;
        if (value && !formData.prerequisites.includes(value)) {
            setFormData(prev => ({
                ...prev,
                prerequisites: [...prev.prerequisites, value]
            }));
        }
        e.target.value = ""; // Reset select
    };

    const handlePrerequisiteRemove = (code) => {
        setFormData(prev => ({
            ...prev,
            prerequisites: prev.prerequisites.filter(p => p !== code)
        }));
    };

    const handleBlur = (e) => {
        setTouched({ ...touched, [e.target.name]: true });
    };

    const validate = () => {
        const errors = {};
        if (!formData.subjectName.trim()) errors.subjectName = "Subject Name is required";
        if (!formData.subjectCode.trim()) errors.subjectCode = "Subject Code is required";
        if (formData.boards.length === 0) errors.boards = "Select at least one board";
        if (formData.applicableGrades.length === 0) errors.applicableGrades = "Select at least one grade";

        if (formData.hasPractical && formData.practicalMarks <= 0) {
            errors.practicalMarks = "Practical marks must be > 0";
        }
        if (formData.hasInternalAssessment && (formData.iaWeightage <= 0 || formData.iaWeightage > 100)) {
            errors.iaWeightage = "IA weightage must be between 1-100";
        }
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validate();

        if (Object.keys(errors).length > 0) {
            setTouched({
                subjectName: true,
                subjectCode: true,
                boards: true,
                applicableGrades: true,
                practicalMarks: true,
                iaWeightage: true
            });
            return;
        }

        onSave(formData);
    };

    const errors = validate();

    // Filter available prerequisites:
    // 1. Exclude itself (by code)
    // 2. Exclude already selected
    const availablePrerequisites = MOCK_SUBJECTS.filter(s =>
        s.subjectCode !== formData.subjectCode &&
        !formData.prerequisites.includes(s.subjectCode)
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-[800px] p-0 overflow-hidden rounded-xl">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {subject ? "Edit Subject" : "Add New Subject"}
                </h3>
            </div>

            <form onSubmit={handleSubmit} className="p-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
                <div className="space-y-6">
                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                Subject Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="subjectName"
                                value={formData.subjectName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-shadow ${touched.subjectName && errors.subjectName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-brand-500 dark:border-gray-700'} dark:bg-gray-800 dark:text-white`}
                                placeholder="e.g. Advanced Mathematics"
                            />
                            {touched.subjectName && errors.subjectName && <p className="text-xs text-red-500 mt-1">{errors.subjectName}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                Subject Code <span className="text-gray-400 text-xs">(Unique, Uppercase)</span> <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="subjectCode"
                                value={formData.subjectCode}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-shadow uppercase font-mono ${touched.subjectCode && errors.subjectCode ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-brand-500 dark:border-gray-700'} dark:bg-gray-800 dark:text-white`}
                                placeholder="e.g. MATH101"
                            />
                            {touched.subjectCode && errors.subjectCode && <p className="text-xs text-red-500 mt-1">{errors.subjectCode}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                Short Name / Abbreviation
                            </label>
                            <input
                                type="text"
                                name="shortName"
                                value={formData.shortName}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                placeholder="e.g. Adv. Math"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                Subject Type <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="subjectType"
                                value={formData.subjectType}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            >
                                <option value="Theory">Theory</option>
                                <option value="Practical">Practical</option>
                                <option value="Language">Language</option>
                                <option value="Co-Scholastic">Co-Scholastic</option>
                                <option value="Elective">Elective</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                Max Marks / Credits
                            </label>
                            <input
                                type="number"
                                name="maxMarksOrCredits"
                                value={formData.maxMarksOrCredits}
                                onChange={handleChange}
                                min="0"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            />
                        </div>
                    </div>

                    {/* Configuration Toggles */}
                    <div className="p-5 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700 space-y-4">
                        <label className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                            <svg className="w-4 h-4 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                            Configuration
                        </label>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            name="hasPractical"
                                            checked={formData.hasPractical}
                                            onChange={handleChange}
                                            className="sr-only"
                                        />
                                        <div className={`block w-10 h-6 rounded-full transition-colors ${formData.hasPractical ? 'bg-brand-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                                        <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${formData.hasPractical ? 'transform translate-x-4' : ''}`}></div>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Has Practical Component</span>
                                </label>
                                {formData.hasPractical && (
                                    <div className="pl-2 animate-fadeIn">
                                        <label className="block text-xs text-gray-500 mb-1">Practical Marks <span className="text-red-500">*</span></label>
                                        <input
                                            type="number"
                                            name="practicalMarks"
                                            value={formData.practicalMarks}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={`w-full px-3 py-1.5 text-sm border rounded focus:ring-1 transition-colors ${touched.practicalMarks && errors.practicalMarks ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-brand-500 dark:border-gray-700'} dark:bg-gray-800`}
                                        />
                                        {touched.practicalMarks && errors.practicalMarks && <p className="text-xs text-red-500 mt-1">{errors.practicalMarks}</p>}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-3">
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            name="hasInternalAssessment"
                                            checked={formData.hasInternalAssessment}
                                            onChange={handleChange}
                                            className="sr-only"
                                        />
                                        <div className={`block w-10 h-6 rounded-full transition-colors ${formData.hasInternalAssessment ? 'bg-brand-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                                        <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${formData.hasInternalAssessment ? 'transform translate-x-4' : ''}`}></div>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Has Internal Assessment (IA)</span>
                                </label>
                                {formData.hasInternalAssessment && (
                                    <div className="pl-2 animate-fadeIn">
                                        <label className="block text-xs text-gray-500 mb-1">IA Weightage (%) <span className="text-red-500">*</span></label>
                                        <input
                                            type="number"
                                            name="iaWeightage"
                                            value={formData.iaWeightage}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            max="100"
                                            className={`w-full px-3 py-1.5 text-sm border rounded focus:ring-1 transition-colors ${touched.iaWeightage && errors.iaWeightage ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-brand-500 dark:border-gray-700'} dark:bg-gray-800`}
                                        />
                                        {touched.iaWeightage && errors.iaWeightage && <p className="text-xs text-red-500 mt-1">{errors.iaWeightage}</p>}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Arrays Selection */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Applicable Boards <span className="text-red-500">*</span>
                            </label>

                            <div className="space-y-3">
                                {/* Selected Boards List */}
                                {formData.boards.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {formData.boards.map((b, idx) => (
                                            <div key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300 rounded-lg border border-brand-200 dark:border-brand-800 text-sm">
                                                <span>
                                                    {b.category}
                                                    {b.state ? ` - ${b.state}` : ''}
                                                    {b.boardName ? ` (${b.boardName})` : ''}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newBoards = [...formData.boards];
                                                        newBoards.splice(idx, 1);
                                                        setFormData(prev => ({ ...prev, boards: newBoards }));
                                                    }}
                                                    className="text-brand-400 hover:text-red-500 transition-colors"
                                                >
                                                    <FiTrash size={14} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Add Board Component */}
                                <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50/50 dark:bg-gray-800/50">
                                    <BoardSelector
                                        value={tempBoard}
                                        onChange={(newBoard) => {
                                            setTempBoard(newBoard);

                                            // Validate uniqueness
                                            const exists = formData.boards.some(b =>
                                                b.category === newBoard.category &&
                                                b.state === newBoard.state &&
                                                b.boardName === newBoard.boardName
                                            );

                                            // Only add if it's a complete selection
                                            const isComplete = newBoard.category && (
                                                newBoard.category !== "State Board" ||
                                                (newBoard.state && newBoard.boardName)
                                            );

                                            if (!exists && isComplete) {
                                                // Add to list
                                                setFormData(prev => ({
                                                    ...prev,
                                                    boards: [...prev.boards, newBoard]
                                                }));
                                                // Reset temp board
                                                setTempBoard({ category: "", state: "", boardName: "" });
                                            }
                                        }}
                                        errors={{}}
                                    />
                                    <p className="text-xs text-gray-500 mt-2">
                                        Select a board above to add it to the list.
                                    </p>
                                </div>
                            </div>

                            {touched.boards && formData.boards.length === 0 && (
                                <p className="text-xs text-red-500 mt-1">Please select at least one board.</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Applicable Grades <span className="text-red-500">*</span>
                            </label>
                            <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 max-h-40 overflow-y-auto">
                                <div className="grid grid-cols-4 gap-2">
                                    {Array.from({ length: 12 }, (_, i) => String(i + 1)).map((grade) => (
                                        <label key={grade} className="flex items-center space-x-1.5 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 p-1 rounded">
                                            <input
                                                type="checkbox"
                                                checked={formData.applicableGrades.includes(grade)}
                                                onChange={() => handleGradeChange(grade)}
                                                className="rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                                            />
                                            <span className="text-sm text-gray-700 dark:text-gray-300">{grade}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            {touched.applicableGrades && formData.applicableGrades.length === 0 && (
                                <p className="text-xs text-red-500 mt-1">Please select at least one grade.</p>
                            )}
                        </div>
                    </div>

                    {/* Prerequisites */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Prerequisites
                        </label>
                        <div className="flex flex-col gap-3">
                            <select
                                onChange={handlePrerequisiteAdd}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                defaultValue=""
                            >
                                <option value="" disabled>Select prerequisite subject...</option>
                                {availablePrerequisites.map(s => (
                                    <option key={s.id} value={s.subjectCode}>
                                        {s.subjectName} ({s.subjectCode})
                                    </option>
                                ))}
                            </select>

                            <div className="flex flex-wrap gap-2">
                                {formData.prerequisites.map(code => {
                                    const subj = MOCK_SUBJECTS.find(s => s.subjectCode === code);
                                    return (
                                        <span key={code} className="inline-flex items-center px-2.5 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                                            {subj ? subj.subjectName : code} ({code})
                                            <button
                                                type="button"
                                                onClick={() => handlePrerequisiteRemove(code)}
                                                className="ml-1.5 text-gray-500 hover:text-red-500 focus:outline-none"
                                            >
                                                &times;
                                            </button>
                                        </span>
                                    );
                                })}
                                {formData.prerequisites.length === 0 && (
                                    <span className="text-sm text-gray-500 italic">No prerequisites selected.</span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="3"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            placeholder="Brief description of the subject curriculum..."
                        />
                    </div>
                </div>

                <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center">
                        <label className="flex items-center cursor-pointer">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    name="status"
                                    checked={formData.status === 'Active'}
                                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.checked ? 'Active' : 'Inactive' }))}
                                    className="sr-only"
                                />
                                <div className={`block w-10 h-6 rounded-full transition-colors ${formData.status === 'Active' ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${formData.status === 'Active' ? 'transform translate-x-4' : ''}`}></div>
                            </div>
                            <div className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                                {formData.status}
                            </div>
                        </label>
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2.5 text-sm font-medium text-white bg-brand-600 rounded-lg hover:bg-brand-700 focus:ring-4 focus:ring-brand-500/20 shadow-sm transition-colors"
                        >
                            {subject ? "Update Subject" : "Create Subject"}
                        </button>
                    </div>
                </div>
            </form>
        </Modal>
    );
};

export default SubjectForm;

