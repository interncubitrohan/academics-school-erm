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
    { id: 1, name: "Mathematics", code: "MATH101", type: "Theory", department: "Science", creditHours: 4, boards: ["CBSE", "IGCSE"] },
    { id: 2, name: "Physics Lab", code: "PHYLAB", type: "Practical", department: "Science", creditHours: 2, boards: ["CBSE"] },
    { id: 3, name: "English Literature", code: "ENG202", type: "Theory", department: "Arts", creditHours: 3, boards: ["CBSE", "IGCSE", "IB"] },
    { id: 4, name: "Physical Education", code: "PE101", type: "Co-Scholastic", department: "Sports", creditHours: 2, boards: ["CBSE"] },
    { id: 5, name: "Chemistry", code: "CHEM101", type: "Theory", department: "Science", creditHours: 4, boards: ["CBSE"] },
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
                <div className="rounded-sm border border-gray-200 bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-gray-700 dark:bg-gray-800 sm:px-7.5 xl:pb-1">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                        <div className="relative w-full sm:w-64">
                            <input
                                type="text"
                                placeholder="Search by name or code..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
                            <TableHeader>
                                <TableRow className="bg-gray-50 dark:bg-gray-700 text-left">
                                    <TableCell isHeader className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                        Subject Code
                                    </TableCell>
                                    <TableCell isHeader className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                        Subject Name
                                    </TableCell>
                                    <TableCell isHeader className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                        Type
                                    </TableCell>
                                    <TableCell isHeader className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                                        Credits
                                    </TableCell>
                                    <TableCell isHeader className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                        Department
                                    </TableCell>
                                    <TableCell isHeader className="py-4 px-4 font-medium text-black dark:text-white">
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredSubjects.map((subject) => (
                                    <TableRow key={subject.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                        <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700 xl:pl-11 font-mono text-black dark:text-white">
                                            {subject.code}
                                        </TableCell>
                                        <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                            <h5 className="font-medium text-black dark:text-white">
                                                {subject.name}
                                            </h5>
                                        </TableCell>
                                        <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
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
                                        <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                            <p className="text-black dark:text-white">{subject.creditHours}</p>
                                        </TableCell>
                                        <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                            <p className="text-black dark:text-white">{subject.department || "-"}</p>
                                        </TableCell>
                                        <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                            <div className="flex items-center space-x-3.5">
                                                <button
                                                    onClick={() => handleEditSubject(subject)}
                                                    className="hover:text-primary"
                                                    title="Edit"
                                                >
                                                    <svg
                                                        className="fill-current"
                                                        width="18"
                                                        height="18"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteSubject(subject.id)}
                                                    className="hover:text-red-500"
                                                    title="Delete"
                                                >
                                                    <svg
                                                        className="fill-current"
                                                        width="18"
                                                        height="18"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {filteredSubjects.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={6} className="border-b border-[#eee] py-5 px-4 text-center dark:border-gray-700">
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
