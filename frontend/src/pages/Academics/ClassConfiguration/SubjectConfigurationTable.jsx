import React, { useEffect } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../../components/ui/table";
import Badge from "../../../components/ui/badge/Badge";

const SubjectConfigurationTable = ({ subjects, setSubjects, errors = {} }) => {

    // Sort subjects by displayOrder on changing
    const sortedSubjects = [...subjects].sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

    const handleSubjectChange = (id, field, value) => {
        setSubjects(prevSubjects => prevSubjects.map(sub => {
            if (sub.id !== id) return sub;

            const updatedSub = { ...sub, [field]: value };

            // Auto-calculate Total Marks
            if (["maxTheoryMarks", "maxPracticalMarks", "maxIAMarks"].includes(field)) {
                // Parse as numbers or default to 0
                const theory = Number(field === "maxTheoryMarks" ? value : updatedSub.maxTheoryMarks) || 0;
                const practical = Number(field === "maxPracticalMarks" ? value : updatedSub.maxPracticalMarks) || 0;
                const ia = Number(field === "maxIAMarks" ? value : updatedSub.maxIAMarks) || 0;

                const newTotal = theory + practical + ia;
                updatedSub.totalMaxMarks = newTotal;

                // Auto-calculate Pass Marks (33% rule)
                updatedSub.passMarks = Math.ceil(newTotal * 0.33);
            }

            return updatedSub;
        }));
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                    Step 3: Define Rules & Configuration
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Configure marking schemes, teaching hours, and visibility for each subject.
                </p>
            </div>

            <div className="rounded-sm border border-gray-200 bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-gray-700 dark:bg-gray-800 sm:px-7.5 xl:pb-1">
                <div className="max-w-full overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50 dark:bg-gray-700 text-left">
                                <TableCell isHeader className="min-w-[50px] py-2 px-2 font-medium text-black dark:text-white">Order</TableCell>
                                <TableCell isHeader className="min-w-[150px] py-2 px-4 font-medium text-black dark:text-white">Subject</TableCell>
                                <TableCell isHeader className="min-w-[100px] py-2 px-4 font-medium text-black dark:text-white">Type</TableCell>
                                <TableCell isHeader className="min-w-[100px] py-2 px-2 font-medium text-black dark:text-white text-center">Theory</TableCell>
                                <TableCell isHeader className="min-w-[100px] py-2 px-2 font-medium text-black dark:text-white text-center">Practical</TableCell>
                                <TableCell isHeader className="min-w-[80px] py-2 px-2 font-medium text-black dark:text-white text-center">IA</TableCell>
                                <TableCell isHeader className="min-w-[80px] py-2 px-2 font-medium text-black dark:text-white text-center">Total</TableCell>
                                <TableCell isHeader className="min-w-[80px] py-2 px-2 font-medium text-black dark:text-white text-center">Pass</TableCell>
                                <TableCell isHeader className="min-w-[100px] py-2 px-2 font-medium text-black dark:text-white text-center">Hrs/Week</TableCell>
                                <TableCell isHeader className="min-w-[80px] py-2 px-2 font-medium text-black dark:text-white text-center">Optional</TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sortedSubjects.map((subject, index) => {
                                const subjectErrors = errors[subject.id] || {};
                                return (
                                    <TableRow key={subject.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                        {/* Order */}
                                        <TableCell className="border-b border-[#eee] py-4 px-2 dark:border-gray-700">
                                            <input
                                                type="number"
                                                value={subject.displayOrder || index + 1}
                                                onChange={(e) => handleSubjectChange(subject.id, "displayOrder", parseInt(e.target.value))}
                                                className={`w-12 px-2 py-1 text-center border rounded focus:outline-none focus:ring-1 ${subjectErrors.displayOrder ? 'border-red-500 ring-red-500' : 'border-gray-300 focus:ring-brand-500'} dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                                            />
                                        </TableCell>

                                        {/* Subject Info */}
                                        <TableCell className="border-b border-[#eee] py-4 px-4 dark:border-gray-700">
                                            <div>
                                                <p className="font-semibold text-black dark:text-white text-sm">{subject.subjectName}</p>
                                                <p className="text-xs text-gray-500 font-mono">{subject.subjectCode}</p>
                                                {subjectErrors.general && <p className="text-xs text-red-500 mt-1">{subjectErrors.general}</p>}
                                            </div>
                                        </TableCell>

                                        {/* Type */}
                                        <TableCell className="border-b border-[#eee] py-4 px-4 dark:border-gray-700">
                                            <Badge
                                                size="sm"
                                                color={
                                                    subject.subjectType === "Theory" ? "primary" :
                                                        subject.subjectType === "Practical" ? "warning" :
                                                            subject.subjectType === "Language" ? "success" : "secondary"
                                                }
                                            >
                                                {subject.subjectType}
                                            </Badge>
                                        </TableCell>

                                        {/* Marks Configuration */}
                                        <TableCell className="border-b border-[#eee] py-4 px-2 dark:border-gray-700">
                                            <input
                                                type="number"
                                                min="0"
                                                value={subject.maxTheoryMarks || 0}
                                                onChange={(e) => handleSubjectChange(subject.id, "maxTheoryMarks", parseInt(e.target.value) || 0)}
                                                className="w-full px-2 py-1 text-center border rounded border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                                            />
                                        </TableCell>
                                        <TableCell className="border-b border-[#eee] py-4 px-2 dark:border-gray-700">
                                            <input
                                                type="number"
                                                min="0"
                                                disabled={!subject.hasPractical && subject.subjectType === "Theory"}
                                                value={subject.maxPracticalMarks || 0}
                                                onChange={(e) => handleSubjectChange(subject.id, "maxPracticalMarks", parseInt(e.target.value) || 0)}
                                                className={`w-full px-2 py-1 text-center border rounded border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-500 ${(!subject.hasPractical && subject.subjectType === "Theory") ? "bg-gray-100 dark:bg-gray-800 opacity-50 cursor-not-allowed" : ""}`}
                                            />
                                        </TableCell>
                                        <TableCell className="border-b border-[#eee] py-4 px-2 dark:border-gray-700">
                                            <input
                                                type="number"
                                                min="0"
                                                value={subject.maxIAMarks || 0}
                                                onChange={(e) => handleSubjectChange(subject.id, "maxIAMarks", parseInt(e.target.value) || 0)}
                                                className="w-full px-2 py-1 text-center border rounded border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                                            />
                                        </TableCell>

                                        {/* Auto Calculated Fields */}
                                        <TableCell className="border-b border-[#eee] py-4 px-2 dark:border-gray-700">
                                            <div className={`w-full px-2 py-1 text-center font-bold bg-gray-50 dark:bg-gray-700/50 rounded ${subjectErrors.totalMaxMarks ? 'text-red-600 border border-red-200' : 'text-gray-800 dark:text-white'}`}>
                                                {subject.totalMaxMarks || 0}
                                            </div>
                                        </TableCell>
                                        <TableCell className="border-b border-[#eee] py-4 px-2 dark:border-gray-700">
                                            <input
                                                type="number"
                                                min="0"
                                                value={subject.passMarks || 0}
                                                onChange={(e) => handleSubjectChange(subject.id, "passMarks", parseInt(e.target.value) || 0)}
                                                className="w-full px-2 py-1 text-center border rounded border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-500 text-red-600 font-medium"
                                            />
                                        </TableCell>

                                        {/* Teaching Hours */}
                                        <TableCell className="border-b border-[#eee] py-4 px-2 dark:border-gray-700">
                                            <input
                                                type="number"
                                                min="0"
                                                step="0.5"
                                                value={subject.teachingHoursPerWeek || 0}
                                                onChange={(e) => handleSubjectChange(subject.id, "teachingHoursPerWeek", parseFloat(e.target.value) || 0)}
                                                className={`w-full px-2 py-1 text-center border rounded focus:outline-none focus:ring-1 ${subjectErrors.teachingHoursPerWeek ? 'border-red-500 ring-red-500' : 'border-gray-300 focus:ring-brand-500'} dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                                            />
                                        </TableCell>

                                        {/* Is Optional */}
                                        <TableCell className="border-b border-[#eee] py-4 px-2 dark:border-gray-700 text-center">
                                            <div className="flex flex-col items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={subject.isOptional || false}
                                                    onChange={(e) => handleSubjectChange(subject.id, "isOptional", e.target.checked)}
                                                    className="w-4 h-4 text-brand-600 border-gray-300 rounded focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600"
                                                />
                                                {subjectErrors.isOptional && <span className="text-[10px] text-red-500 mt-1">{subjectErrors.isOptional}</span>}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                            {subjects.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={10} className="text-center py-8 text-gray-500 dark:text-gray-400">
                                        No subjects selected. Go back to Step 2 to add subjects.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <div className="text-sm">
                    <p className="font-semibold text-blue-800 dark:text-blue-200">Note on Calculations</p>
                    <p className="text-blue-700 dark:text-blue-300 mt-1">
                        Total Marks are automatically calculated as sum of Theory, Practical, and IA.
                        Pass marks default to 33% of the total but can be adjusted manually.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SubjectConfigurationTable;
