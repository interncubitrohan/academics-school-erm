import React, { useState, useEffect } from "react";
import Button from "../../../../components/ui/button/Button";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../../../../components/ui/table";

const StepMarksConfiguration = ({ formData, setFormData }) => {
    const [configMode, setConfigMode] = useState("common"); // 'common' or 'custom'

    // Initialize marksConfiguration structure if missing keys
    useEffect(() => {
        if (!formData.marksConfiguration.common.theory) {
            setFormData(prev => ({
                ...prev,
                marksConfiguration: {
                    ...prev.marksConfiguration,
                    common: {
                        ...prev.marksConfiguration.common,
                        theory: 80,
                        practical: 0,
                        ia: 20,
                        maxMarks: 100,
                        passingMarks: 33
                    }
                }
            }));
        }
    }, []);

    const handleCommonChange = (e) => {
        const { name, value } = e.target;
        const val = parseInt(value) || 0;

        setFormData(prev => {
            const newCommon = {
                ...prev.marksConfiguration.common,
                [name]: val
            };

            // Auto-calculate Total if components change
            if (name !== 'maxMarks' && name !== 'passingMarks') {
                newCommon.maxMarks = (newCommon.theory || 0) + (newCommon.practical || 0) + (newCommon.ia || 0);
            }

            return {
                ...prev,
                marksConfiguration: {
                    ...prev.marksConfiguration,
                    common: newCommon
                }
            };
        });
    };

    const handleSpecificChange = (subjectCode, field, value) => {
        const val = parseInt(value) || 0;

        setFormData(prev => {
            const currentSpecifics = [...prev.marksConfiguration.subjectSpecific];
            const existingIndex = currentSpecifics.findIndex(s => s.subjectId === subjectCode);

            let newItem;
            if (existingIndex >= 0) {
                newItem = { ...currentSpecifics[existingIndex], [field]: val };
            } else {
                // Initialize with common values then override
                newItem = {
                    subjectId: subjectCode,
                    ...prev.marksConfiguration.common,
                    [field]: val
                };
            }

            // Auto-calculate Total
            if (field !== 'maxMarks' && field !== 'passingMarks') {
                newItem.maxMarks = (newItem.theory || 0) + (newItem.practical || 0) + (newItem.ia || 0);
            }

            if (existingIndex >= 0) {
                currentSpecifics[existingIndex] = newItem;
            } else {
                currentSpecifics.push(newItem);
            }

            return {
                ...prev,
                marksConfiguration: {
                    ...prev.marksConfiguration,
                    subjectSpecific: currentSpecifics
                }
            };
        });
    };

    const getSubjectConfig = (subjectCode) => {
        const specific = formData.marksConfiguration.subjectSpecific.find(s => s.subjectId === subjectCode);
        return specific || formData.marksConfiguration.common;
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white border-b pb-2">
                Marks Configuration
            </h2>

            {/* Mode Selection */}
            <div className="flex space-x-4 mb-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                        type="radio"
                        checked={configMode === "common"}
                        onChange={() => setConfigMode("common")}
                        className="form-radio text-brand-600"
                    />
                    <span className="text-gray-700 dark:text-gray-300">Default Configuration (All Subjects)</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                        type="radio"
                        checked={configMode === "custom"}
                        onChange={() => setConfigMode("custom")}
                        className="form-radio text-brand-600"
                    />
                    <span className="text-gray-700 dark:text-gray-300">Subject-Specific Overrides</span>
                </label>
            </div>

            {/* Common Configuration Panel */}
            <div className={`grid grid-cols-1 md:grid-cols-5 gap-4 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 ${configMode === 'custom' ? 'opacity-50 pointer-events-none' : ''}`}>
                <div className="col-span-5 mb-2 font-medium text-gray-700 dark:text-gray-300">Common Marks Structure</div>

                <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Theory</label>
                    <input
                        type="number"
                        name="theory"
                        value={formData.marksConfiguration.common.theory || 0}
                        onChange={handleCommonChange}
                        className="w-full px-3 py-2 border rounded-md text-sm dark:bg-gray-700 dark:border-gray-600"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Practical</label>
                    <input
                        type="number"
                        name="practical"
                        value={formData.marksConfiguration.common.practical || 0}
                        onChange={handleCommonChange}
                        className="w-full px-3 py-2 border rounded-md text-sm dark:bg-gray-700 dark:border-gray-600"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Internal Assessment</label>
                    <input
                        type="number"
                        name="ia"
                        value={formData.marksConfiguration.common.ia || 0}
                        onChange={handleCommonChange}
                        className="w-full px-3 py-2 border rounded-md text-sm dark:bg-gray-700 dark:border-gray-600"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-brand-600 mb-1">Total Max Marks</label>
                    <input
                        type="number"
                        name="maxMarks"
                        value={formData.marksConfiguration.common.maxMarks || 0}
                        readOnly
                        className="w-full px-3 py-2 border border-brand-200 bg-brand-50 rounded-md text-sm font-bold text-brand-700 dark:bg-brand-900/20 dark:border-brand-800 dark:text-brand-300"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-red-500 mb-1">Pass Marks</label>
                    <input
                        type="number"
                        name="passingMarks"
                        value={formData.marksConfiguration.common.passingMarks || 0}
                        onChange={handleCommonChange}
                        className="w-full px-3 py-2 border rounded-md text-sm dark:bg-gray-700 dark:border-gray-600"
                    />
                </div>
            </div>

            {/* Config Table - Always visible but editable only in custom mode if needed, or always interactive? 
                User req says "Option 2: Subject-specific table". 
                Let's make it interactive always, but highlighting overrides. 
            */}
            <div className="rounded-sm border border-gray-200 bg-white shadow-default dark:border-gray-700 dark:bg-gray-800 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50 dark:bg-gray-700">
                            <TableCell isHeader className="p-3 w-1/4">Subject</TableCell>
                            <TableCell isHeader className="p-3 text-center">Theory</TableCell>
                            <TableCell isHeader className="p-3 text-center">Practical</TableCell>
                            <TableCell isHeader className="p-3 text-center">IA</TableCell>
                            <TableCell isHeader className="p-3 text-center font-bold text-brand-600">Total</TableCell>
                            <TableCell isHeader className="p-3 text-center text-red-500">Pass Marks</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {formData.applicableSubjects.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-6 text-gray-400">
                                    No subjects selected. Go back to Step 3.
                                </TableCell>
                            </TableRow>
                        ) : (
                            formData.applicableSubjects.map((sub) => {
                                const config = getSubjectConfig(sub.subjectId);
                                const isOverridden = formData.marksConfiguration.subjectSpecific.some(s => s.subjectId === sub.subjectId);

                                return (
                                    <TableRow key={`${sub.classId}-${sub.subjectId}`}>
                                        <TableCell className="p-3">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-sm">{sub.subjectName}</span>
                                                <span className="text-xs text-gray-500">{sub.className}</span>
                                                {isOverridden && <span className="text-[10px] text-brand-500 font-medium">Custom</span>}
                                            </div>
                                        </TableCell>
                                        <TableCell className="p-3">
                                            <input
                                                type="number"
                                                value={config.theory || 0}
                                                onChange={(e) => handleSpecificChange(sub.subjectId, 'theory', e.target.value)}
                                                disabled={configMode === 'common'}
                                                className={`w-full text-center text-sm border-gray-300 rounded p-1 ${configMode === 'common' ? 'bg-gray-100 dark:bg-gray-800 text-gray-500' : 'focus:ring-brand-500 dark:bg-gray-700'}`}
                                            />
                                        </TableCell>
                                        <TableCell className="p-3">
                                            <input
                                                type="number"
                                                value={config.practical || 0}
                                                onChange={(e) => handleSpecificChange(sub.subjectId, 'practical', e.target.value)}
                                                disabled={configMode === 'common'}
                                                className={`w-full text-center text-sm border-gray-300 rounded p-1 ${configMode === 'common' ? 'bg-gray-100 dark:bg-gray-800 text-gray-500' : 'focus:ring-brand-500 dark:bg-gray-700'}`}
                                            />
                                        </TableCell>
                                        <TableCell className="p-3">
                                            <input
                                                type="number"
                                                value={config.ia || 0}
                                                onChange={(e) => handleSpecificChange(sub.subjectId, 'ia', e.target.value)}
                                                disabled={configMode === 'common'}
                                                className={`w-full text-center text-sm border-gray-300 rounded p-1 ${configMode === 'common' ? 'bg-gray-100 dark:bg-gray-800 text-gray-500' : 'focus:ring-brand-500 dark:bg-gray-700'}`}
                                            />
                                        </TableCell>
                                        <TableCell className="p-3">
                                            <div className="text-center font-bold text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 rounded py-1">
                                                {config.maxMarks || 0}
                                            </div>
                                        </TableCell>
                                        <TableCell className="p-3">
                                            <input
                                                type="number"
                                                value={config.passingMarks || 0}
                                                onChange={(e) => handleSpecificChange(sub.subjectId, 'passingMarks', e.target.value)}
                                                disabled={configMode === 'common'}
                                                className={`w-full text-center text-sm border-gray-300 rounded p-1 ${configMode === 'common' ? 'bg-gray-100 dark:bg-gray-800 text-gray-500' : 'focus:ring-brand-500 dark:bg-gray-700'}`}
                                            />
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </div>

            <p className="text-xs text-gray-500 italic mt-2">
                * Switching to "Subject-Specific Overrides" allows editing individual rows. Total marks are auto-calculated (Theory + Practical + IA).
            </p>
        </div>
    );
};

export default StepMarksConfiguration;
