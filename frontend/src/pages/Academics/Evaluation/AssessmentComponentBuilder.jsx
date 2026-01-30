import React from "react";
import { FiPlus, FiTrash2, FiChevronDown, FiChevronUp } from "react-icons/fi";
import Button from "../../../components/ui/button/Button";

const AssessmentComponentBuilder = ({ components, onChange, validationStatus }) => {
    // Helper to update a specific component
    const updateComponent = (index, field, value) => {
        const updated = [...components];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    };

    // Helper to add a new component
    const addComponent = () => {
        const newComponent = {
            id: Date.now(),
            componentName: "",
            type: "Term",
            weightage: 0,
            subComponents: [],
            passingCriteria: { minPercentage: 33 }
        };
        onChange([...components, newComponent]);
    };

    // Helper to remove a component
    const removeComponent = (index) => {
        const updated = components.filter((_, i) => i !== index);
        onChange(updated);
    };

    // Helper to update sub-components
    const updateSubComponents = (compIndex, newSubComponents) => {
        const updated = [...components];
        updated[compIndex] = { ...updated[compIndex], subComponents: newSubComponents };
        onChange(updated);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Assessment Structure
                </h4>
                <Button
                    type="button"
                    onClick={addComponent}
                    variant="white"
                    className="!py-1.5 !px-3 text-brand-600 bg-brand-50 hover:bg-brand-100 dark:bg-brand-900/20 dark:text-brand-400 dark:hover:bg-brand-900/40 border-brand-200 dark:border-brand-800"
                >
                    <FiPlus size={16} /> Add Component
                </Button>
            </div>

            {/* Total Weightage Indicator */}
            <div className={`flex items-center justify-between p-3 rounded-lg border ${validationStatus?.isTotalValid
                ? "bg-green-50 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300"
                : "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-300"
                }`}>
                <div className="flex items-center gap-2">
                    <span className="font-medium">Total Weightage:</span>
                    <span className="text-xl font-bold">{validationStatus?.totalWeightage || 0}%</span>
                    <span className="text-sm opacity-80">(Target: 100%)</span>
                </div>
                {!validationStatus?.isTotalValid && (
                    <div className="text-sm font-medium">
                        {validationStatus?.totalWeightage < 100 ? "Add more weightage" : "Reduce weightage"}
                    </div>
                )}
            </div>

            <div className="space-y-4">
                {components.map((component, index) => (
                    <ComponentItem
                        key={component.id || index}
                        component={component}
                        onUpdate={(field, val) => updateComponent(index, field, val)}
                        onRemove={() => removeComponent(index)}
                        onUpdateSubComponents={(subs) => updateSubComponents(index, subs)}
                        error={validationStatus?.componentErrors?.[component.id]}
                    />
                ))}
                {components.length === 0 && (
                    <div className="text-center py-6 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg text-gray-500">
                        No assessment components defined. Add one to start (e.g., Term 1).
                    </div>
                )}
            </div>
        </div>
    );
};

const ComponentItem = ({ component, onUpdate, onRemove, onUpdateSubComponents, error }) => {
    const [isExpanded, setIsExpanded] = React.useState(true);

    const handleSubResponse = (updatedSubs) => {
        onUpdateSubComponents(updatedSubs);
    };

    const addSubComponent = () => {
        const newSub = {
            id: Date.now(),
            name: "",
            type: "Written",
            weightage: 0,
            maxMarks: 100
        };
        handleSubResponse([...(component.subComponents || []), newSub]);
    };

    const updateSubComponent = (idx, field, value) => {
        const updatedSubs = [...(component.subComponents || [])];
        updatedSubs[idx] = { ...updatedSubs[idx], [field]: value };
        handleSubResponse(updatedSubs);
    };

    const removeSubComponent = (idx) => {
        const updatedSubs = (component.subComponents || []).filter((_, i) => i !== idx);
        handleSubResponse(updatedSubs);
    };

    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
            <div className="p-4 flex flex-col md:flex-row gap-4 items-start md:items-center border-b border-gray-200 dark:border-gray-700">
                <button
                    type="button"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-1 text-gray-500 hover:text-gray-700 dark:text-gray-400"
                >
                    {isExpanded ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
                </button>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 w-full">
                    <div className="md:col-span-4">
                        <input
                            type="text"
                            value={component.componentName}
                            onChange={(e) => onUpdate("componentName", e.target.value)}
                            placeholder="Component Name (e.g. Term 1)"
                            className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:ring-1 focus:ring-brand-500"
                        />
                    </div>
                    <div className="md:col-span-3">
                        <select
                            value={component.type}
                            onChange={(e) => onUpdate("type", e.target.value)}
                            className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:ring-1 focus:ring-brand-500"
                        >
                            <option value="Term">Term Based</option>
                            <option value="Assessment">Assessment</option>
                            <option value="PeriodicTest">Periodic Test</option>
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <div className="relative">
                            <input
                                type="number"
                                value={component.weightage}
                                onChange={(e) => onUpdate("weightage", parseFloat(e.target.value) || 0)}
                                placeholder="Weight"
                                className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:ring-1 focus:ring-brand-500"
                            />
                            <span className="absolute right-3 top-2 text-gray-400 text-xs">%</span>
                        </div>
                    </div>
                    <div className="md:col-span-3">
                        <div className="relative flex items-center gap-2">
                            <span className="text-xs text-gray-500 whitespace-nowrap">Pass Min:</span>
                            <div className="relative w-full">
                                <input
                                    type="number"
                                    value={component.passingCriteria?.minPercentage || 0}
                                    onChange={(e) => onUpdate("passingCriteria", { ...component.passingCriteria, minPercentage: parseFloat(e.target.value) || 0 })}
                                    className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:ring-1 focus:ring-brand-500"
                                />
                                <span className="absolute right-3 top-2 text-gray-400 text-xs">%</span>
                            </div>
                        </div>
                    </div>
                    {error && (
                        <div className="md:col-span-12 mt-2 px-3 py-2 bg-red-50 text-red-600 text-sm rounded border border-red-200 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            {error}
                        </div>
                    )}
                </div>

                <div className="flex items-center">
                    <button
                        type="button"
                        onClick={onRemove}
                        className="text-gray-400 hover:text-red-500 p-2"
                        title="Remove Component"
                    >
                        <FiTrash2 size={18} />
                    </button>
                </div>
            </div>

            {isExpanded && (
                <div className="p-4 bg-white dark:bg-gray-900 rounded-b-lg ml-6 border-l-2 border-dashed border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center mb-3">
                        <h5 className="text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                            Sub-Components (Examinations/Activities)
                        </h5>
                        <button
                            type="button"
                            onClick={addSubComponent}
                            className="text-xs flex items-center gap-1 text-brand-600 hover:text-brand-700 font-medium"
                        >
                            <FiPlus size={14} /> Add Sub-Component
                        </button>
                    </div>

                    <div className="space-y-3">
                        {(component.subComponents || []).map((sub, idx) => (
                            <div key={sub.id || idx} className="grid grid-cols-12 gap-3 items-center">
                                <div className="col-span-4">
                                    <input
                                        type="text"
                                        value={sub.name}
                                        onChange={(e) => updateSubComponent(idx, "name", e.target.value)}
                                        placeholder="Name (e.g. Theory)"
                                        className="w-full px-2 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-sm focus:border-brand-500"
                                    />
                                </div>
                                <div className="col-span-3">
                                    <select
                                        value={sub.type}
                                        onChange={(e) => updateSubComponent(idx, "type", e.target.value)}
                                        className="w-full px-2 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-sm focus:border-brand-500"
                                    >
                                        <option value="Written">Written Exam</option>
                                        <option value="Theory">Theory</option>
                                        <option value="Practical">Practical</option>
                                        <option value="Continuous">Continuous/Portfolio</option>
                                    </select>
                                </div>
                                <div className="col-span-2">
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={sub.weightage}
                                            onChange={(e) => updateSubComponent(idx, "weightage", parseFloat(e.target.value) || 0)}
                                            placeholder="Wgt"
                                            className="w-full px-2 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-sm focus:border-brand-500"
                                        />
                                        <span className="absolute right-1 top-1.5 text-gray-400 text-[10px] pointer-events-none">%</span>
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={sub.maxMarks}
                                            onChange={(e) => updateSubComponent(idx, "maxMarks", parseFloat(e.target.value) || 0)}
                                            placeholder="Max"
                                            className="w-full px-2 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-sm focus:border-brand-500"
                                        />
                                        <span className="absolute right-1 top-1.5 text-gray-400 text-[10px] pointer-events-none">Pts</span>
                                    </div>
                                </div>
                                <div className="col-span-1 text-center">
                                    <button
                                        type="button"
                                        onClick={() => removeSubComponent(idx)}
                                        className="text-gray-400 hover:text-red-500"
                                    >
                                        <FiTrash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                        {(component.subComponents || []).length === 0 && (
                            <p className="text-xs text-gray-400 italic">No sub-components added.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AssessmentComponentBuilder;
