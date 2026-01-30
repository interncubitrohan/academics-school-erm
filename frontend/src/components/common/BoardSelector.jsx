import React from "react";
import StateBoardSelector from "./StateBoardSelector";



const BoardSelector = ({ value, onChange, errors = {} }) => {
    // value structure: { category: string, state: string, boardName: string }

    // Ensure value is an object
    const safeValue = value || { category: "", state: "", boardName: "" };

    const handleCategoryChange = (e) => {
        const newCategory = e.target.value;
        onChange({
            category: newCategory,
            state: "", // Reset dependent fields
            boardName: ""
        });
    };



    return (
        <div className="space-y-4">
            {/* Category Selection */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Board Category <span className="text-red-500">*</span>
                </label>
                <select
                    value={safeValue.category || ""}
                    onChange={handleCategoryChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/50 dark:bg-gray-700 dark:text-white ${errors.category ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                        }`}
                >
                    <option value="">Select Category</option>
                    <option value="CBSE">CBSE</option>
                    <option value="ICSE">ICSE</option>
                    <option value="State Board">State Board</option>
                    <option value="International">International</option>
                </select>
                {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category}</p>}
            </div>

            {/* Conditional State Flow */}
            {safeValue.category === "State Board" && (
                <StateBoardSelector
                    value={{ state: safeValue.state, boardName: safeValue.boardName }}
                    onChange={(newStateBoardData) => onChange({ ...safeValue, ...newStateBoardData })}
                    errors={errors}
                />
            )}
        </div>
    );
};

export default BoardSelector;
