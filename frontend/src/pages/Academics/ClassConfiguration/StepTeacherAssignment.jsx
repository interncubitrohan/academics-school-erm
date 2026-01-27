import React, { useMemo } from "react";
import Badge from "../../../components/ui/badge/Badge";

const StepTeacherAssignment = ({ formData, handleTeacherChange, handleChange, teachers, existingClasses, errors = {} }) => {
    // Determine available teachers and teacher workloads
    const { teacherWorkload, availableTeachers } = useMemo(() => {
        const workload = {};

        // Calculate workload from existing active classes
        existingClasses?.forEach(cls => {
            if (cls.status === "Active" && cls.classTeacher?.id) {
                const tid = cls.classTeacher.id;
                workload[tid] = (workload[tid] || 0) + 1;
            }
        });

        // Current selection shouldn't count towards "already assigned" limit for this form validation context
        // unless checking globally. Here we just want to know who is overbooked.

        return {
            teacherWorkload: workload,
            availableTeachers: teachers // All teachers are technically selectable, but we warn/block based on rules
        };
    }, [teachers, existingClasses]);

    const getTeacherStatus = (teacherId) => {
        const count = teacherWorkload[teacherId] || 0;
        if (count >= 3) return { status: "Overloaded", color: "danger", message: `Assigned to ${count} classes (Max 3)` };
        if (count > 0) return { status: "Busy", color: "warning", message: `Assigned to ${count} classes` };
        return { status: "Available", color: "success", message: "Available" };
    };

    return (
        <div className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Class Teacher Assignment
            </h4>

            {errors.classTeacher && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm mb-4">
                    {errors.classTeacher}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Class Teacher */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Class Teacher {!formData.allowTeacherLater && <span className="text-red-500">*</span>}
                    </label>
                    <select
                        value={formData.classTeacher?.id || ""}
                        onChange={(e) => handleTeacherChange(e, 'classTeacher')}
                        disabled={formData.allowTeacherLater}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white ${formData.allowTeacherLater ? "bg-gray-100 dark:bg-gray-800 text-gray-500 cursor-not-allowed" : ""
                            } ${errors.classTeacher ? "border-red-500" : "border-gray-300"}`}
                    >
                        <option value="">Select Teacher</option>
                        {availableTeachers.map((teacher) => {
                            const { status, message } = getTeacherStatus(teacher.id);
                            // Disable selection if overloaded, unless it's the currently selected one (to allow unselecting/keeping)
                            const isOverloaded = status === "Overloaded" && formData.classTeacher?.id !== teacher.id;

                            return (
                                <option key={teacher.id} value={teacher.id} disabled={isOverloaded}>
                                    {teacher.name} ({teacher.department}) - {message}
                                </option>
                            );
                        })}
                    </select>
                </div>

                {/* Co-Class Teacher */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Co-Class Teacher
                    </label>
                    <select
                        value={formData.coClassTeacher?.id || ""}
                        onChange={(e) => handleTeacherChange(e, 'coClassTeacher')}
                        disabled={formData.allowTeacherLater}
                        className={`w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white ${formData.allowTeacherLater ? "bg-gray-100 dark:bg-gray-800 text-gray-500 cursor-not-allowed" : ""
                            }`}
                    >
                        <option value="">Select Co-Teacher</option>
                        {availableTeachers.map((teacher) => (
                            <option key={teacher.id} value={teacher.id}>
                                {teacher.name} ({teacher.department})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Allow Later Checkbox */}
                <div className="col-span-2">
                    <label className="flex items-center space-x-3 cursor-pointer select-none">
                        <input
                            type="checkbox"
                            name="allowTeacherLater"
                            checked={formData.allowTeacherLater}
                            onChange={(e) => {
                                handleChange(e);
                                if (e.target.checked) {
                                    // Clear selections if checking "Assign Later"
                                    // Or keep them but validation won't fire. 
                                    // Usually UX prefers clearing or just disabling validation. 
                                    // Here we keep values but disable input to indicate they are ignored or draft tokens.
                                }
                            }}
                            className="w-4 h-4 text-brand-600 border-gray-300 rounded focus:ring-brand-500"
                        />
                        <div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Assign Later (Draft Mode)
                            </span>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                Class will be saved as "Draft" until a teacher is assigned.
                            </p>
                        </div>
                    </label>
                </div>
            </div>

            {/* Selected Teacher Details */}
            {formData.classTeacher && !formData.allowTeacherLater && (() => {
                const teacher = teachers.find(t => t.id === formData.classTeacher.id);
                if (!teacher) return null;
                const { status, color, message } = getTeacherStatus(teacher.id);

                return (
                    <div className="mt-4 p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center text-brand-600 dark:text-brand-400 font-bold text-lg">
                                    {teacher.name.charAt(0)}
                                </div>
                                <div>
                                    <h5 className="text-md font-bold text-gray-900 dark:text-white">
                                        {teacher.name}
                                    </h5>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {teacher.employeeId} • {teacher.department}
                                    </p>
                                </div>
                            </div>
                            <Badge color={color}>{status}</Badge>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300 pl-16">
                            <p className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                {teacher.email}
                            </p>
                            <p className="flex items-center gap-2 mt-1">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Current Status: <strong>{message}</strong>
                            </p>
                        </div>
                    </div>
                );
            })()}
        </div>
    );
};

export default StepTeacherAssignment;
