import React, { useState, useEffect } from "react";
import { FiSave, FiX } from "react-icons/fi";
import GradeBandBuilder from "./GradeBandBuilder";
import BoardSelector from "../../../components/common/BoardSelector";

const GradingScaleForm = ({ onSave, onCancel, initialData }) => {
    const [formData, setFormData] = useState({
        scaleName: "",
        board: { category: "", state: "", boardName: "" },
        scaleType: "Percentage",
        applicableGrades: [],
        isDefault: false,
        status: "Active",
        gradeBands: [
            { id: Date.now(), grade: "A", minValue: 90, maxValue: 100, points: 4.0, remarks: "Excellent" },
        ],
    });

    const AVAILABLE_GRADES = [
        "Nursery", "LKG", "UKG",
        "I", "II", "III", "IV", "V",
        "VI", "VII", "VIII", "IX", "X",
        "XI", "XII"
    ];

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                gradeBands: initialData.gradeBands ? initialData.gradeBands.map(b => ({ ...b, id: b.id || Math.random() })) : []
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleGradeToggle = (grade) => {
        setFormData(prev => {
            const currentGrades = prev.applicableGrades || [];
            if (currentGrades.includes(grade)) {
                return { ...prev, applicableGrades: currentGrades.filter(g => g !== grade) };
            } else {
                return { ...prev, applicableGrades: [...currentGrades, grade] };
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (!formData.scaleName.trim()) {
            alert("Scale Name is required");
            return;
        }

        // 1. Sort Bands by Min Value (Ascending) before validating logic
        const sortedBands = [...formData.gradeBands].sort((a, b) => Number(a.minValue) - Number(b.minValue));

        // 2. Band-level validation
        for (const band of sortedBands) {
            if (!band.grade) {
                alert("All bands must have a Grade Label (e.g., A, B, A1).");
                return;
            }
            if (Number(band.minValue) > Number(band.maxValue)) {
                alert(`Invalid range for grade ${band.grade}: Min cannot be greater than Max.`);
                return;
            }
        }

        // 3. Validation for Percentage Scales: Complete Coverage 0-100 check
        if (formData.scaleType === "Percentage") {
            if (sortedBands.length === 0) {
                alert("At least one grade band is required.");
                return;
            }

            // Check if starts at 0
            if (Number(sortedBands[0].minValue) !== 0) {
                alert("Percentage scale must start at 0%.");
                return;
            }

            // Check if ends at 100
            if (Number(sortedBands[sortedBands.length - 1].maxValue) !== 100) {
                alert("Percentage scale must end at 100%.");
                return;
            }

            // Check for gaps (assuming integer ranges for now, e.g. 0-32, 33-40)
            // If ranges are continuous integers: Next Min should be Previous Max + 1
            // If ranges use decimals or < / <= logic, it might be different. 
            // For this ERP, let's assume loose continuity check or just standard overlap check which is already done.
            // Let's add a basic gap check.
            for (let i = 0; i < sortedBands.length - 1; i++) {
                const currentMax = Number(sortedBands[i].maxValue);
                const nextMin = Number(sortedBands[i + 1].minValue);

                // Allowing a gap of 1 for integer logic (e.g. 50-60, 61-70) OR 0 for continuous (50-60, 60-70)
                // If next starts > currentMax + 1, there is a gap.
                if (nextMin > currentMax + 1) {
                    alert(`Gap detected between ${sortedBands[i].grade} and ${sortedBands[i + 1].grade}. Please ensure ranges are continuous.`);
                    return;
                }
            }
        }

        // Update with sorted bands and save
        onSave({ ...formData, gradeBands: sortedBands });
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-white/[0.05] p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    {initialData ? "Edit Grading Scale" : "Create Grading Scale"}
                </h3>
                <button onClick={onCancel} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                    <FiX size={24} />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* General Configuration */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="col-span-2 md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Scale Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="scaleName"
                            required
                            value={formData.scaleName}
                            onChange={handleChange}
                            placeholder="e.g. CBSE Primary 2025"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                        />
                    </div>

                    <div className="col-span-2 md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Board / Curriculum
                        </label>
                        <BoardSelector
                            value={formData.board}
                            onChange={(newBoardData) => setFormData(prev => ({ ...prev, board: newBoardData }))}
                            errors={{}}
                        />
                    </div>

                    <div className="col-span-2 md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Scale Type
                        </label>
                        <select
                            name="scaleType"
                            value={formData.scaleType}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                        >
                            <option value="Percentage">Percentage Range</option>
                            <option value="GPA">GPA (Points)</option>
                            <option value="Grade-only">Grade Only</option>
                            <option value="Direct-Grading">Direct Grading</option>
                        </select>
                    </div>

                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                            Applicable Grades
                        </label>
                        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-3">
                            {AVAILABLE_GRADES.map((grade) => (
                                <label key={grade} className={`
                                    flex items-center justify-center px-3 py-2 rounded-md border text-sm font-medium cursor-pointer transition-all
                                    ${formData.applicableGrades.includes(grade)
                                        ? 'bg-brand-50 border-brand-500 text-brand-700 dark:bg-brand-900/20 dark:border-brand-500 dark:text-brand-300'
                                        : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400'}
                                `}>
                                    <input
                                        type="checkbox"
                                        className="sr-only"
                                        checked={formData.applicableGrades.includes(grade)}
                                        onChange={() => handleGradeToggle(grade)}
                                    />
                                    {grade}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex gap-6 items-center border-t border-b border-gray-100 dark:border-gray-700 py-6">
                    <label className="flex items-center space-x-3 cursor-pointer select-none">
                        <div className="relative">
                            <input
                                type="checkbox"
                                name="isDefault"
                                checked={formData.isDefault}
                                onChange={handleChange}
                                className="sr-only peer"
                            />
                            <div className="w-10 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-300 dark:peer-focus:ring-brand-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-brand-600"></div>
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Set as Default Scale</span>
                    </label>

                    <label className="flex items-center space-x-3 cursor-pointer select-none">
                        <div className="relative">
                            <input
                                type="checkbox"
                                name="status"
                                checked={formData.status === "Active"}
                                onChange={(e) => handleChange({ target: { name: "status", value: e.target.checked ? "Active" : "Inactive" } })}
                                className="sr-only peer"
                            />
                            <div className="w-10 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-300 dark:peer-focus:ring-brand-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-success"></div>
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Active</span>
                    </label>
                </div>

                {/* Grade Bands Section */}
                <GradeBandBuilder
                    bands={formData.gradeBands}
                    onChange={(updatedBands) => setFormData(prev => ({ ...prev, gradeBands: updatedBands }))}
                />

                <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 dark:border-gray-700">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-brand-600 rounded-lg hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-sm"
                    >
                        <FiSave size={16} /> Save Grading Scale
                    </button>
                </div>
            </form>
        </div>
    );
};

export default GradingScaleForm;
