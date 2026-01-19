import React, { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../../../components/ui/table";
import Badge from "../../../components/ui/badge/Badge";

// Mock Faculty Data
const mockFaculty = [
    { id: 1, name: "Sarah Williams", department: "Mathematics" },
    { id: 2, name: "John Doe", department: "Science" },
    { id: 3, name: "Emily Davis", department: "Languages" },
    { id: 4, name: "Michael Brown", department: "Social Studies" },
    { id: 5, name: "Jessica Garcia", department: "Science" },
    { id: 6, name: "David Miller", department: "Mathematics" },
    { id: 7, name: "Robert Wilson", department: "Arts" },
    { id: 8, name: "Linda Martinez", department: "Physical Education" },
];

const FacultyAllocationTab = ({ subjects = [] }) => {
    // State to store allocations: { subjectId: teacherId }
    const [allocations, setAllocations] = useState({});
    const [isSaving, setIsSaving] = useState(false);

    // Initialize allocations from subjects prop if available
    useEffect(() => {
        const initialAllocations = {};
        subjects.forEach(sub => {
            if (sub.teacher) {
                // Find teacher ID by name for mock purposes
                const teacher = mockFaculty.find(f => f.name === sub.teacher);
                if (teacher) {
                    initialAllocations[sub.id] = teacher.id;
                }
            }
        });
        setAllocations(initialAllocations);
    }, [subjects]);

    const handleAllocationChange = (subjectId, teacherId) => {
        setAllocations(prev => ({
            ...prev,
            [subjectId]: parseInt(teacherId)
        }));
    };

    const getRecommendedFaculty = (subjectName) => {
        // Basic department mapping logic
        let department = "";
        if (subjectName.includes("Math")) department = "Mathematics";
        else if (subjectName.includes("Science") || subjectName.includes("Physics") || subjectName.includes("Bio") || subjectName.includes("Chem")) department = "Science";
        else if (subjectName.includes("English") || subjectName.includes("Hindi")) department = "Languages";
        else if (subjectName.includes("History") || subjectName.includes("Geography")) department = "Social Studies";
        else if (subjectName.includes("Art")) department = "Arts";
        else if (subjectName.includes("PE") || subjectName.includes("Physical")) department = "Physical Education";

        return department;
    };

    const handleSave = () => {
        setIsSaving(true);
        // Simulate API call
        setTimeout(() => {
            setIsSaving(false);
            alert("Faculty allocations saved successfully!");
        }, 800);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">Faculty Allocation</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Assign teachers to class subjects</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="px-6 py-2 text-sm font-medium text-white bg-brand-600 rounded-lg hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {isSaving ? "Saving..." : "Save Allocations"}
                </button>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <Table>
                    <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                        <TableRow>
                            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Subject</TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Department</TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Assigned Faculty</TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Status</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                        {subjects.map((subject) => {
                            const dept = getRecommendedFaculty(subject.name);
                            // Filter faculty: Show department matches first, then others (or just all for flexibility)
                            // For this UI, let's show all but maybe group them or just list them. 
                            // Requirements said "Filter faculty by department (basic logic)".
                            // Let's sort: Department matches come first.
                            const sortedFaculty = [...mockFaculty].sort((a, b) => {
                                if (a.department === dept && b.department !== dept) return -1;
                                if (a.department !== dept && b.department === dept) return 1;
                                return 0;
                            });

                            return (
                                <TableRow key={subject.id}>
                                    <TableCell className="px-5 py-4 text-start font-medium text-gray-800 dark:text-white">
                                        <div>{subject.name}</div>
                                        <div className="text-xs text-gray-500 font-normal">{subject.type} • {subject.sessions} Sessions/Week</div>
                                    </TableCell>
                                    <TableCell className="px-5 py-4 text-start text-gray-500 dark:text-gray-400">
                                        <Badge color="light" size="sm">{dept || "General"}</Badge>
                                    </TableCell>
                                    <TableCell className="px-5 py-4 text-start text-gray-500 dark:text-gray-400">
                                        <select
                                            className="w-full max-w-xs px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            value={allocations[subject.id] || ""}
                                            onChange={(e) => handleAllocationChange(subject.id, e.target.value)}
                                        >
                                            <option value="">Select Faculty</option>
                                            {sortedFaculty.map(f => (
                                                <option key={f.id} value={f.id}>
                                                    {f.name} {f.department === dept ? "⭐" : ""} ({f.department})
                                                </option>
                                            ))}
                                        </select>
                                    </TableCell>
                                    <TableCell className="px-5 py-4 text-start">
                                        {allocations[subject.id] ? (
                                            <Badge color="success" size="sm">Assigned</Badge>
                                        ) : (
                                            <Badge color="warning" size="sm">Pending</Badge>
                                        )}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                        {subjects.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="px-5 py-8 text-center text-gray-500 dark:text-gray-400">
                                    No subjects found. Please define curriculum first.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default FacultyAllocationTab;
