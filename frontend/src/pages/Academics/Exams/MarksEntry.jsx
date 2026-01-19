import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../../../components/ui/table";
import Badge from "../../../components/ui/badge/Badge";

// Mock Students
const MOCK_STUDENTS = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    rollNo: 100 + i + 1,
    name: `Student ${String.fromCharCode(65 + i)}`,
}));

const MarksEntry = () => {
    // Selectors
    const [scheduledExams, setScheduledExams] = useState([]);
    const [selectedExamId, setSelectedExamId] = useState("");
    const [selectedClassId, setSelectedClassId] = useState("");
    const [selectedSubjectId, setSelectedSubjectId] = useState("");

    // Data
    const [marksData, setMarksData] = useState({}); // { studentId: marks }
    const [isSaving, setIsSaving] = useState(false);
    const [isFinalized, setIsFinalized] = useState(false);

    // Derived state
    const selectedExam = scheduledExams.find(e => e.id.toString() === selectedExamId);

    // Load scheduled exams
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("scheduledExams") || "[]");
        setScheduledExams(stored);
    }, []);

    // Load/Init marks when selection changes
    useEffect(() => {
        if (selectedExamId && selectedClassId && selectedSubjectId) {
            // Simulate fetching existing marks
            // In a real app, this would be an API call
            const key = `marks_${selectedExamId}_${selectedClassId}_${selectedSubjectId}`;
            const storedMarks = JSON.parse(localStorage.getItem(key) || "{}");
            setMarksData(storedMarks);
            setIsFinalized(storedMarks._isFinalized || false);
        }
    }, [selectedExamId, selectedClassId, selectedSubjectId]);

    const handleMarkChange = (studentId, value) => {
        if (isFinalized) return;

        const newMarks = { ...marksData, [studentId]: value };
        setMarksData(newMarks);

        // Auto-save simulation
        setIsSaving(true);
        setTimeout(() => {
            const key = `marks_${selectedExamId}_${selectedClassId}_${selectedSubjectId}`;
            localStorage.setItem(key, JSON.stringify(newMarks));
            setIsSaving(false);
        }, 800);
    };

    const handleFinalize = () => {
        if (!window.confirm("Are you sure? Once finalized, marks cannot be changed.")) return;

        const newMarks = { ...marksData, _isFinalized: true };
        setMarksData(newMarks);
        setIsFinalized(true);

        const key = `marks_${selectedExamId}_${selectedClassId}_${selectedSubjectId}`;
        localStorage.setItem(key, JSON.stringify(newMarks));
    };

    const getStatus = (marks) => {
        if (marks === "" || marks === undefined) return "Pending";
        const num = parseFloat(marks);
        if (isNaN(num)) return "Invalid";
        return num >= 35 ? "Pass" : "Fail";
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Marks Entry</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Enter and submit marks for scheduled exams</p>
                </div>
                <Link to="/academics/exams" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400">
                    Back to Exams
                </Link>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Exam</label>
                    <select
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        value={selectedExamId}
                        onChange={(e) => {
                            setSelectedExamId(e.target.value);
                            setSelectedClassId("");
                            setSelectedSubjectId("");
                        }}
                    >
                        <option value="">-- Choose Exam --</option>
                        {scheduledExams.map(exam => (
                            <option key={exam.id} value={exam.id}>{exam.title}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Class</label>
                    <select
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        value={selectedClassId}
                        onChange={(e) => setSelectedClassId(e.target.value)}
                        disabled={!selectedExamId}
                    >
                        <option value="">-- Choose Class --</option>
                        {selectedExam?.selectedClasses?.map(clsId => (
                            <option key={clsId} value={clsId}>Class {clsId}</option> // Ideally lookup name
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Subject</label>
                    <select
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        value={selectedSubjectId}
                        onChange={(e) => setSelectedSubjectId(e.target.value)}
                        disabled={!selectedExam?.papers?.length}
                    >
                        <option value="">-- Choose Subject --</option>
                        {selectedExam?.papers?.map(paper => (
                            <option key={paper.subjectId} value={paper.subjectId}>Subject {paper.subjectId}</option> // Ideally lookup name
                        ))}
                    </select>
                </div>
            </div>

            {/* Grids */}
            {selectedExamId && selectedClassId && selectedSubjectId ? (
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50">
                        <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-800 dark:text-white">Student List</h3>
                            {isSaving && <span className="text-xs text-gray-500 italic">Saving...</span>}
                            {!isSaving && !isFinalized && <span className="text-xs text-green-500">Saved</span>}
                        </div>
                        {isFinalized ? (
                            <Badge color="success">Finalized</Badge>
                        ) : (
                            <button
                                onClick={handleFinalize}
                                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 shadow-sm"
                            >
                                Finalize & Submit
                            </button>
                        )}
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableCell isHeader className="p-4">Roll No</TableCell>
                                <TableCell isHeader className="p-4">Student Name</TableCell>
                                <TableCell isHeader className="p-4 w-32">Marks Obtained</TableCell>
                                <TableCell isHeader className="p-4">Status</TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {MOCK_STUDENTS.map(student => (
                                <TableRow key={student.id}>
                                    <TableCell className="p-4 font-medium">{student.rollNo}</TableCell>
                                    <TableCell className="p-4 text-gray-600 dark:text-gray-300">{student.name}</TableCell>
                                    <TableCell className="p-2">
                                        <input
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={marksData[student.id] || ""}
                                            onChange={(e) => handleMarkChange(student.id, e.target.value)}
                                            disabled={isFinalized}
                                            className={`w-full p-2 border rounded text-center font-medium focus:ring-2 focus:ring-brand-500 outline-none
                                                ${isFinalized ? "bg-gray-100 dark:bg-gray-700 text-gray-500 cursor-not-allowed" : "bg-white dark:bg-gray-800 dark:text-white"}
                                            `}
                                        />
                                    </TableCell>
                                    <TableCell className="p-4">
                                        <Badge
                                            color={getStatus(marksData[student.id]) === "Pass" ? "success" :
                                                getStatus(marksData[student.id]) === "Fail" ? "error" : "light"}
                                        >
                                            {getStatus(marksData[student.id])}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            ) : (
                <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                    <p className="text-gray-500 dark:text-gray-400">Please select an Exam, Class, and Subject to enter marks.</p>
                </div>
            )}
        </div>
    );
};

export default MarksEntry;
