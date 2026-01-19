import React, { useState, useEffect } from "react";

const GradingScaleBuilder = ({ onSave, onCancel, initialData }) => {
    const [scaleName, setScaleName] = useState("");
    const [scaleType, setScaleType] = useState("Percentage"); // Percentage, GPA, Grade-only
    const [rules, setRules] = useState([
        { id: Date.now(), grade: "A", min: 90, max: 100, points: 4.0 },
    ]);

    useEffect(() => {
        if (initialData) {
            setScaleName(initialData.name);
            setScaleType(initialData.type);
            setRules(initialData.rules);
        }
    }, [initialData]);

    const handleAddRule = () => {
        setRules([
            ...rules,
            { id: Date.now(), grade: "", min: 0, max: 0, points: 0 },
        ]);
    };

    const handleRemoveRule = (id) => {
        if (rules.length > 1) {
            setRules(rules.filter((rule) => rule.id !== id));
        }
    };

    const handleRuleChange = (id, field, value) => {
        setRules(
            rules.map((rule) =>
                rule.id === id ? { ...rule, [field]: value } : rule
            )
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            name: scaleName,
            type: scaleType,
            rules: rules,
        });
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-white/[0.05] p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6">
                {initialData ? "Edit Grading Scale" : "Create Grading Scale"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Scale Name
                        </label>
                        <input
                            type="text"
                            required
                            value={scaleName}
                            onChange={(e) => setScaleName(e.target.value)}
                            placeholder="e.g. Standard 10-Point Scale"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Scale Type
                        </label>
                        <select
                            value={scaleType}
                            onChange={(e) => setScaleType(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                        >
                            <option value="Percentage">Percentage Range</option>
                            <option value="GPA">GPA (Points)</option>
                            <option value="Grade-only">Grade Only</option>
                        </select>
                    </div>
                </div>

                <div className="border-t border-gray-100 dark:border-white/[0.05] pt-6">
                    <div className="flex justify-between items-center mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Grading Rules
                        </label>
                        <button
                            type="button"
                            onClick={handleAddRule}
                            className="text-sm text-brand-500 font-medium hover:text-brand-600 dark:text-brand-400"
                        >
                            + Add Rule
                        </button>
                    </div>

                    <div className="space-y-3">
                        {rules.map((rule, index) => (
                            <div
                                key={rule.id}
                                className="flex flex-col md:flex-row gap-3 items-end p-4 bg-gray-50 dark:bg-white/[0.03] rounded-lg border border-gray-100 dark:border-white/[0.05]"
                            >
                                <div className="flex-1">
                                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                                        Grade Label
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. A+"
                                        value={rule.grade}
                                        onChange={(e) =>
                                            handleRuleChange(rule.id, "grade", e.target.value)
                                        }
                                        className="w-full px-3 py-2 text-sm border rounded hover:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                    />
                                </div>
                                {(scaleType === "Percentage" || scaleType === "GPA") && (
                                    <>
                                        <div className="w-24">
                                            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                                                Min %
                                            </label>
                                            <input
                                                type="number"
                                                min="0"
                                                max="100"
                                                value={rule.min}
                                                onChange={(e) =>
                                                    handleRuleChange(rule.id, "min", e.target.value)
                                                }
                                                className="w-full px-3 py-2 text-sm border rounded hover:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                            />
                                        </div>
                                        <div className="w-24">
                                            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                                                Max %
                                            </label>
                                            <input
                                                type="number"
                                                min="0"
                                                max="100"
                                                value={rule.max}
                                                onChange={(e) =>
                                                    handleRuleChange(rule.id, "max", e.target.value)
                                                }
                                                className="w-full px-3 py-2 text-sm border rounded hover:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                            />
                                        </div>
                                    </>
                                )}
                                {scaleType === "GPA" && (
                                    <div className="w-24">
                                        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                                            Points
                                        </label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={rule.points || 0}
                                            onChange={(e) =>
                                                handleRuleChange(rule.id, "points", e.target.value)
                                            }
                                            className="w-full px-3 py-2 text-sm border rounded hover:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                        />
                                    </div>
                                )}
                                <div className="pb-1">
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveRule(rule.id)}
                                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                        disabled={rules.length <= 1}
                                        title="Remove Rule"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M3 6h18"></path>
                                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                            <line x1="10" y1="11" x2="10" y2="17"></line>
                                            <line x1="14" y1="11" x2="14" y2="17"></line>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-brand-600 rounded-lg hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                        Save Grading Scale
                    </button>
                </div>
            </form>
        </div>
    );
};

export default GradingScaleBuilder;
