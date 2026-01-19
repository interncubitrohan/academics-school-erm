import React, { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../../../components/ui/table";
import Badge from "../../../components/ui/badge/Badge";

// Mock Faculty Data with Workload
const mockFaculty = [
    { id: 1, name: "Sarah Williams", department: "Mathematics", currentLoad: 18 },
    { id: 2, name: "John Doe", department: "Science", currentLoad: 25 },
    { id: 3, name: "Emily Davis", department: "Languages", currentLoad: 12 },
    { id: 4, name: "Michael Brown", department: "Social Studies", currentLoad: 28 },
    { id: 5, name: "Jessica Garcia", department: "Science", currentLoad: 32 }, // Overloaded
    { id: 6, name: "David Miller", department: "Mathematics", currentLoad: 20 },
    { id: 7, name: "Robert Wilson", department: "Arts", currentLoad: 5 },
    { id: 8, name: "Linda Martinez", department: "Physical Education", currentLoad: 15 },
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

    const getWorkloadColor = (load) => {
        if (load < 20) return "text-green-600 dark:text-green-400";
        if (load < 30) return "text-yellow-600 dark:text-yellow-400";
        return "text-red-600 dark:text-red-400";
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

            <div className="rounded-sm border border-gray-200 bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-gray-700 dark:bg-gray-800 sm:px-7.5 xl:pb-1">
                <div className="max-w-full overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50 dark:bg-gray-700 text-left">
                                <TableCell isHeader className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">Subject</TableCell>
                                <TableCell isHeader className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Department</TableCell>
                                <TableCell isHeader className="min-w-[200px] py-4 px-4 font-medium text-black dark:text-white">Assigned Faculty</TableCell>
                                <TableCell isHeader className="py-4 px-4 font-medium text-black dark:text-white">Status</TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {subjects.map((subject) => {
                                const dept = getRecommendedFaculty(subject.name);
                                // Sort: Department matches first
                                const sortedFaculty = [...mockFaculty].sort((a, b) => {
                                    if (a.department === dept && b.department !== dept) return -1;
                                    if (a.department !== dept && b.department === dept) return 1;
                                    return 0;
                                });

                                const allocatedTeacherId = allocations[subject.id];
                                const assignedTeacher = mockFaculty.find(f => f.id === allocatedTeacherId);
                                const isOverloaded = assignedTeacher && assignedTeacher.currentLoad >= 30;

                                return (
                                    <TableRow key={subject.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                        <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700 xl:pl-11 text-start font-medium text-black dark:text-white">
                                            <div>{subject.name}</div>
                                            <div className="text-xs text-gray-500 font-normal">{subject.type} • {subject.sessions} Sessions/Week</div>
                                        </TableCell>
                                        <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700 text-start text-black dark:text-white">
                                            <Badge color="light" size="sm">{dept || "General"}</Badge>
                                        </TableCell>
                                        <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700 text-start text-black dark:text-white">
                                            <div className="flex flex-col gap-1">
                                                <select
                                                    className={`w-full max-w-xs px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/50 dark:bg-gray-700 dark:text-white ${isOverloaded ? 'border-red-300 ring-red-200' : 'border-gray-300'}`}
                                                    value={allocations[subject.id] || ""}
                                                    onChange={(e) => handleAllocationChange(subject.id, e.target.value)}
                                                >
                                                    <option value="">Select Faculty</option>
                                                    {sortedFaculty.map(f => (
                                                        <option key={f.id} value={f.id}>
                                                            {f.name} {f.department === dept ? "⭐" : ""} - {f.currentLoad}h/wk
                                                        </option>
                                                    ))}
                                                </select>
                                                {isOverloaded && (
                                                    <span className="text-xs text-red-500 flex items-center gap-1">
                                                        ⚠️ High Workload ({assignedTeacher.currentLoad} hrs)
                                                    </span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700 text-start">
                                            {allocations[subject.id] ? (
                                                isOverloaded ?
                                                    <Badge color="warning" size="sm">Review</Badge> :
                                                    <Badge color="success" size="sm">Assigned</Badge>
                                            ) : (
                                                <Badge color="error" size="sm">Pending</Badge>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                            {subjects.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} className="border-b border-[#eee] py-5 px-4 text-center dark:border-gray-700">
                                        <span className="text-gray-500 dark:text-gray-400">No subjects found. Please define curriculum first.</span>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default FacultyAllocationTab;
