import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../../../components/ui/table";
import Badge from "../../../components/ui/badge/Badge";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import SubjectForm from "./SubjectForm";

// Mock Data
const initialSubjects = [
    { id: 1, name: "Mathematics", code: "MATH101", type: "Theory", department: "Science" },
    { id: 2, name: "Physics Lab", code: "PHYLAB", type: "Practical", department: "Science" },
    { id: 3, name: "English Literature", code: "ENG202", type: "Theory", department: "Arts" },
    { id: 4, name: "Physical Education", code: "PE101", type: "Co-Scholastic", department: "Sports" },
    { id: 5, name: "Chemistry", code: "CHEM101", type: "Theory", department: "Science" },
];

const SubjectList = () => {
    const [subjects, setSubjects] = useState(initialSubjects);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentSubject, setCurrentSubject] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const handleAddSubject = () => {
        setCurrentSubject(null);
        setIsModalOpen(true);
    };

    const handleEditSubject = (subject) => {
        setCurrentSubject(subject);
        setIsModalOpen(true);
    };

    const handleDeleteSubject = (id) => {
        if (window.confirm("Are you sure you want to delete this subject?")) {
            setSubjects(subjects.filter((s) => s.id !== id));
        }
    };

    const handleSaveSubject = (subjectData) => {
        if (currentSubject) {
            // Edit
            setSubjects(
                subjects.map((s) => (s.id === currentSubject.id ? { ...subjectData, id: s.id } : s))
            );
        } else {
            // Add
            setSubjects([...subjects, { ...subjectData, id: Date.now() }]);
        }
        setIsModalOpen(false);
    };

    const filteredSubjects = subjects.filter(
        (subject) =>
            subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            subject.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <PageMeta
                title="Subjects Master | School ERP"
                description="Manage school subjects and curriculum"
            />
            <PageBreadcrumb pageTitle="Subjects Master" />

            <div className="space-y-6">
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] p-4">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                        <div className="relative w-full sm:w-64">
                            <input
                                type="text"
                                placeholder="Search by name or code..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            />
                        </div>
                        <button
                            onClick={handleAddSubject}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 w-full sm:w-auto"
                        >
                            + Add Subject
                        </button>
                    </div>
                    <div className="max-w-full overflow-x-auto">
                        <Table>
                            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                <TableRow>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Subject Code
                                    </TableCell>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Subject Name
                                    </TableCell>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Type
                                    </TableCell>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Department
                                    </TableCell>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {filteredSubjects.map((subject) => (
                                    <TableRow key={subject.id}>
                                        <TableCell className="px-5 py-4 sm:px-6 text-start text-theme-sm dark:text-gray-400 font-mono">
                                            {subject.code}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {subject.name}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            <Badge
                                                size="sm"
                                                color={
                                                    subject.type === "Theory"
                                                        ? "primary"
                                                        : subject.type === "Practical"
                                                            ? "warning"
                                                            : "success"
                                                }
                                            >
                                                {subject.type}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {subject.department || "-"}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEditSubject(subject)}
                                                    className="text-blue-500 hover:text-blue-700"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteSubject(subject.id)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {filteredSubjects.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={5} className="px-5 py-4 text-center text-gray-500 dark:text-gray-400">
                                            No subjects found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>

            <SubjectForm
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveSubject}
                subject={currentSubject}
            />
        </>
    );
};

export default SubjectList;
