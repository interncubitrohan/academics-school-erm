import React, { useState } from "react";
import Button from "../../../../components/ui/button/Button";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../../../../components/ui/table";
import { MOCK_SUBJECTS as mockSubjects } from "../../../../data/subjectData"; // Assuming this exists or using inline mock

const StepExamSchedule = ({ formData, setFormData }) => {
    const [scheduleMode, setScheduleMode] = useState("manual"); // 'quick' or 'manual'

    const handleScheduleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            schedule: {
                ...prev.schedule,
                [name]: value
            }
        }));
    };

    const handleTimetableChange = (index, field, value) => {
        const updatedTimetable = [...formData.schedule.timetable];
        updatedTimetable[index] = {
            ...updatedTimetable[index],
            [field]: value
        };
        setFormData(prev => ({
            ...prev,
            schedule: {
                ...prev.schedule,
                timetable: updatedTimetable
            }
        }));
    };

    const addTimetableRow = () => {
        setFormData(prev => ({
            ...prev,
            schedule: {
                ...prev.schedule,
                timetable: [
                    ...prev.schedule.timetable,
                    {
                        date: formData.schedule.startDate || "",
                        subjectId: "",
                        startTime: "09:00",
                        endTime: "12:00",
                        duration: 180,
                        room: ""
                    }
                ]
            }
        }));
    };

    const removeTimetableRow = (index) => {
        const updatedTimetable = formData.schedule.timetable.filter((_, i) => i !== index);
        setFormData(prev => ({
            ...prev,
            schedule: {
                ...prev.schedule,
                timetable: updatedTimetable
            }
        }));
    };

    const generateQuickSchedule = () => {
        if (!formData.schedule.startDate || !formData.schedule.endDate) {
            alert("Please select Start and End dates first.");
            return;
        }
        // Mock generation logic: One paper per day excluding weekends
        const start = new Date(formData.schedule.startDate);
        const end = new Date(formData.schedule.endDate);
        const newTimetable = [];
        let currentDate = new Date(start);

        // Use mock subjects to fill slots
        let subjectIndex = 0;

        while (currentDate <= end && subjectIndex < mockSubjects.length) {
            const day = currentDate.getDay();
            if (day !== 0 && day !== 6) { // Exclude Sun (0) and Sat (6)
                newTimetable.push({
                    date: currentDate.toISOString().split('T')[0],
                    subjectId: mockSubjects[subjectIndex].id,
                    startTime: "09:00",
                    endTime: "12:00",
                    duration: 180,
                    room: "Exam Hall A"
                });
                subjectIndex++;
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }

        setFormData(prev => ({
            ...prev,
            schedule: {
                ...prev.schedule,
                timetable: newTimetable
            }
        }));
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white border-b pb-2">
                Exam Schedule & Timetable
            </h2>

            {/* Date Range Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Start Date <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="date"
                        name="startDate"
                        value={formData.schedule.startDate}
                        onChange={handleScheduleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        End Date <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="date"
                        name="endDate"
                        value={formData.schedule.endDate}
                        onChange={handleScheduleChange}
                        min={formData.schedule.startDate}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Result Declaration (Expected)
                    </label>
                    <input
                        type="date"
                        name="resultDate"
                        value={formData.schedule.resultDate}
                        onChange={handleScheduleChange}
                        min={formData.schedule.endDate}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                </div>
            </div>

            {/* Timetable Section */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="font-medium text-gray-800 dark:text-white">Exam Timetable</h3>
                    <div className="flex space-x-2">
                        <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                            <button
                                onClick={() => setScheduleMode("manual")}
                                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${scheduleMode === "manual" ? "bg-white shadow text-brand-600" : "text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                Manual
                            </button>
                            <button
                                onClick={() => setScheduleMode("quick")}
                                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${scheduleMode === "quick" ? "bg-white shadow text-brand-600" : "text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                Quick Generate
                            </button>
                        </div>
                    </div>
                </div>

                {scheduleMode === "quick" && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-sm text-blue-800 dark:text-blue-300">
                            <p className="font-semibold">Auto-generate Schedule?</p>
                            <p>This will assign one subject per day (excluding weekends) starting from the Start Date.</p>
                        </div>
                        <Button size="sm" onClick={generateQuickSchedule}>Generate Draft</Button>
                    </div>
                )}

                <div className="rounded-sm border border-gray-200 bg-white shadow-default dark:border-gray-700 dark:bg-gray-800 overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50 dark:bg-gray-700">
                                <TableCell isHeader className="p-3">Num</TableCell>
                                <TableCell isHeader className="p-3">Date</TableCell>
                                <TableCell isHeader className="p-3">Subject</TableCell>
                                <TableCell isHeader className="p-3">Time</TableCell>
                                <TableCell isHeader className="p-3">Duration (Min)</TableCell>
                                <TableCell isHeader className="p-3">Room (Default)</TableCell>
                                <TableCell isHeader className="p-3">Action</TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {formData.schedule.timetable.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                                        No papers scheduled yet. Add a row or use Quick Generate.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                formData.schedule.timetable.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="p-3 text-center">{index + 1}</TableCell>
                                        <TableCell className="p-3">
                                            <input
                                                type="date"
                                                value={row.date}
                                                onChange={(e) => handleTimetableChange(index, "date", e.target.value)}
                                                className="w-full text-sm border-gray-300 rounded focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                        </TableCell>
                                        <TableCell className="p-3">
                                            <select
                                                value={row.subjectId}
                                                onChange={(e) => handleTimetableChange(index, "subjectId", e.target.value)}
                                                className="w-full text-sm border-gray-300 rounded focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600"
                                            >
                                                <option value="">Select Subject</option>
                                                {mockSubjects.map(sub => (
                                                    <option key={sub.id} value={sub.id}>{sub.subjectName}</option>
                                                ))}
                                            </select>
                                        </TableCell>
                                        <TableCell className="p-3">
                                            <div className="flex items-center gap-1">
                                                <input
                                                    type="time"
                                                    value={row.startTime}
                                                    onChange={(e) => handleTimetableChange(index, "startTime", e.target.value)}
                                                    className="w-24 text-sm border-gray-300 rounded focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600"
                                                />
                                                <span className="text-xs">-</span>
                                                <input
                                                    type="time"
                                                    value={row.endTime}
                                                    onChange={(e) => handleTimetableChange(index, "endTime", e.target.value)}
                                                    className="w-24 text-sm border-gray-300 rounded focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600"
                                                />
                                            </div>
                                        </TableCell>
                                        <TableCell className="p-3">
                                            <input
                                                type="number"
                                                value={row.duration}
                                                onChange={(e) => handleTimetableChange(index, "duration", e.target.value)}
                                                className="w-20 text-sm border-gray-300 rounded focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                        </TableCell>
                                        <TableCell className="p-3">
                                            <input
                                                type="text"
                                                value={row.room}
                                                onChange={(e) => handleTimetableChange(index, "room", e.target.value)}
                                                placeholder="Room No."
                                                className="w-full text-sm border-gray-300 rounded focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                        </TableCell>
                                        <TableCell className="p-3">
                                            <button
                                                onClick={() => removeTimetableRow(index)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                    <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                        <Button variant="outline" size="sm" onClick={addTimetableRow} className="w-full sm:w-auto">
                            + Add Paper
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StepExamSchedule;
