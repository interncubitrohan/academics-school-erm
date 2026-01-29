import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../../../components/ui/table";
import { Modal } from "../../../components/ui/modal";
import Badge from "../../../components/ui/badge/Badge";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import SubjectForm from "./SubjectForm";
import ViewSubject from "./ViewSubject";
import BulkUploadSubjects from "./BulkUploadSubjects";
import { MOCK_SUBJECTS } from "../../../data/subjectData";
import Button from "../../../components/ui/button/Button";

// Mock Data for "In Use" subjects (e.g. mapped to classes)
const MOCKED_MAPPED_SUBJECT_IDS = ["sub_1", "sub_2", "sub_3"];


const SubjectList = () => {
    const [subjects, setSubjects] = useState(MOCK_SUBJECTS);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);
    const [currentSubject, setCurrentSubject] = useState(null);

    // Filter State
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("All");
    const [filterBoard, setFilterBoard] = useState("All");
    const [filterGrade, setFilterGrade] = useState("All");

    // Modal States
    const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [pendingSubjectData, setPendingSubjectData] = useState(null);
    const [subjectToDelete, setSubjectToDelete] = useState(null);

    const handleAddSubject = () => {
        setCurrentSubject(null);
        setIsModalOpen(true);
    };

    const handleEditSubject = (subject) => {
        setCurrentSubject(subject);
        setIsModalOpen(true);
    };

    const handleViewSubject = (subject) => {
        setCurrentSubject(subject);
        setIsViewModalOpen(true);
    };

    const confirmDeleteSubject = (id) => {
        if (MOCKED_MAPPED_SUBJECT_IDS.includes(id)) {
            alert("Cannot delete this subject as it is currently mapped to one or more classes/curriculums.");
            return;
        }
        setSubjectToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteProceed = () => {
        if (subjectToDelete) {
            setSubjects(subjects.filter((s) => s.id !== subjectToDelete));
            setIsDeleteModalOpen(false);
            setSubjectToDelete(null);
        }
    };

    const processSave = (subjectData) => {
        if (currentSubject && !isViewModalOpen) {
            // Edit
            setSubjects(
                subjects.map((s) => (s.id === currentSubject.id ? { ...subjectData, id: s.id } : s))
            );
        } else {
            // Add
            setSubjects([...subjects, { ...subjectData, id: `sub_${Date.now()}` }]);
        }
        setIsModalOpen(false);
        setIsWarningModalOpen(false);
        setPendingSubjectData(null);
    };

    const handleSaveSubject = (subjectData) => {
        if (currentSubject) {
            // Check for Core Attribute Changes
            const isCodeChanged = subjectData.subjectCode !== currentSubject.subjectCode;
            const isNameChanged = subjectData.subjectName !== currentSubject.subjectName;
            const isTypeChanged = subjectData.subjectType !== currentSubject.subjectType;

            if (isCodeChanged || isNameChanged || isTypeChanged) {
                setPendingSubjectData(subjectData);
                setIsWarningModalOpen(true);
                return;
            }
        }
        processSave(subjectData);
    };

    const handleConfirmWarning = () => {
        if (pendingSubjectData) {
            processSave(pendingSubjectData);
        }
    };

    const handleBulkImport = (newSubjects) => {
        const subjectsWithIds = newSubjects.map((s, i) => ({
            ...s,
            id: `sub_${Date.now()}_${i}`
        }));
        setSubjects([...subjects, ...subjectsWithIds]);
        setIsBulkUploadOpen(false);
    };

    // Filter Logic
    const filteredSubjects = subjects.filter((subject) => {
        const matchesSearch =
            subject.subjectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            subject.subjectCode.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesType = filterType === "All" || subject.subjectType === filterType;
        const matchesBoard = filterBoard === "All" || subject.boards.includes(filterBoard);
        const matchesGrade = filterGrade === "All" || subject.applicableGrades.includes(filterGrade);

        return matchesSearch && matchesType && matchesBoard && matchesGrade;
    });

    const uniqueBoards = Array.from(new Set(MOCK_SUBJECTS.flatMap(s => s.boards)));
    const uniqueGrades = Array.from(new Set(MOCK_SUBJECTS.flatMap(s => s.applicableGrades))).sort((a, b) => Number(a) - Number(b));

    return (
        <>
            <PageMeta
                title="Subjects Master | School ERP"
                description="Manage school subjects and curriculum"
            />
            <PageBreadcrumb pageTitle="Subjects Master" />

            <div className="space-y-6">
                <div className="rounded-sm border border-gray-200 bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-gray-700 dark:bg-gray-800 sm:px-7.5 xl:pb-1">

                    {/* Filters & Actions */}
                    <div className="flex flex-col gap-4 mb-6">
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                            <div className="relative w-full sm:w-72">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search by name or code..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                            </div>

                            <div className="flex gap-2 w-full sm:w-auto">
                                <Button
                                    variant="outline"
                                    onClick={() => setIsBulkUploadOpen(true)}
                                    startIcon={
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                                    }
                                >
                                    Bulk Upload
                                </Button>
                                <Button
                                    onClick={handleAddSubject}
                                    startIcon={<span className="text-lg leading-none">+</span>}
                                >
                                    Add Subject
                                </Button>
                            </div>
                        </div>

                        {/* Advanced Filters */}
                        <div className="flex flex-wrap gap-3 items-center">
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            >
                                <option value="All">All Types</option>
                                <option value="Theory">Theory</option>
                                <option value="Practical">Practical</option>
                                <option value="Language">Language</option>
                                <option value="Co-Scholastic">Co-Scholastic</option>
                            </select>

                            <select
                                value={filterBoard}
                                onChange={(e) => setFilterBoard(e.target.value)}
                                className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            >
                                <option value="All">All Boards</option>
                                {uniqueBoards.map(board => (
                                    <option key={board} value={board}>{board}</option>
                                ))}
                            </select>

                            <select
                                value={filterGrade}
                                onChange={(e) => setFilterGrade(e.target.value)}
                                className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            >
                                <option value="All">All Grades</option>
                                {uniqueGrades.map(grade => (
                                    <option key={grade} value={grade}>Grade {grade}</option>
                                ))}
                            </select>

                            {(filterType !== "All" || filterBoard !== "All" || filterGrade !== "All" || searchTerm) && (
                                <button
                                    onClick={() => {
                                        setFilterType("All");
                                        setFilterBoard("All");
                                        setFilterGrade("All");
                                        setSearchTerm("");
                                    }}
                                    className="text-sm text-red-500 hover:text-red-700 font-medium"
                                >
                                    Clear Filters
                                </button>
                            )}
                        </div>
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
                                        Boards
                                    </TableCell>
                                    <TableCell isHeader className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                                        Grades
                                    </TableCell>
                                    <TableCell isHeader className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                        Indicators
                                    </TableCell>
                                    <TableCell isHeader className="py-4 px-4 font-medium text-black dark:text-white">
                                        Status
                                    </TableCell>
                                    <TableCell isHeader className="py-4 px-4 font-medium text-black dark:text-white">
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredSubjects.map((subject) => {
                                    const isMapped = MOCKED_MAPPED_SUBJECT_IDS.includes(subject.id);

                                    return (
                                        <TableRow key={subject.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                            <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700 xl:pl-11 font-mono text-black dark:text-white">
                                                {subject.subjectCode}
                                            </TableCell>
                                            <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                                <div>
                                                    <h5 className="font-medium text-black dark:text-white">
                                                        {subject.subjectName}
                                                    </h5>
                                                    {subject.shortName && (
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                                            ({subject.shortName})
                                                        </p>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                                <Badge
                                                    size="sm"
                                                    color={
                                                        subject.subjectType === "Theory"
                                                            ? "primary"
                                                            : subject.subjectType === "Practical"
                                                                ? "warning"
                                                                : subject.subjectType === "Language"
                                                                    ? "success"
                                                                    : "secondary"
                                                    }
                                                >
                                                    {subject.subjectType}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                                <div className="flex flex-wrap gap-1">
                                                    {subject.boards.map(board => (
                                                        <span key={board} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                                            {board}
                                                        </span>
                                                    ))}
                                                </div>
                                            </TableCell>
                                            <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                                <div className="flex flex-wrap gap-1">
                                                    {subject.applicableGrades.map(grade => (
                                                        <span key={grade} className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                                                            {grade}
                                                        </span>
                                                    ))}
                                                </div>
                                            </TableCell>
                                            <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                                <div className="flex flex-col gap-1">
                                                    {subject.hasPractical && (
                                                        <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                                                            Practical ({subject.practicalMarks})
                                                        </span>
                                                    )}
                                                    {subject.hasInternalAssessment && (
                                                        <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                                                            IA ({subject.iaWeightage}%)
                                                        </span>
                                                    )}
                                                    {!subject.hasPractical && !subject.hasInternalAssessment && (
                                                        <span className="text-xs text-gray-400">Theory Only</span>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                                <Badge
                                                    size="sm"
                                                    color={subject.status === "Active" ? "success" : "danger"}
                                                >
                                                    {subject.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                                <div className="flex items-center space-x-3.5">
                                                    <button
                                                        onClick={() => handleViewSubject(subject)}
                                                        className="hover:text-blue-500"
                                                        title="View Details"
                                                    >
                                                        <svg
                                                            className="fill-current"
                                                            width="18"
                                                            height="18"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                                                        </svg>
                                                    </button>
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
                                                        onClick={() => confirmDeleteSubject(subject.id)}
                                                        disabled={isMapped}
                                                        className={`transition-colors ${isMapped ? "text-gray-300 dark:text-gray-600 cursor-not-allowed" : "hover:text-red-500"}`}
                                                        title={isMapped ? "Cannot delete: Subject mapped to active classes" : "Delete"}
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
                                    );
                                })}
                                {filteredSubjects.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={8} className="border-b border-[#eee] py-10 text-center dark:border-gray-700">
                                            <div className="flex flex-col items-center justify-center space-y-3">
                                                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full">
                                                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                </div>
                                                <div>
                                                    <p className="text-lg font-medium text-gray-900 dark:text-white">No subjects found</p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filters.</p>
                                                </div>
                                            </div>
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

            <ViewSubject
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                subject={currentSubject}
            />

            <BulkUploadSubjects
                isOpen={isBulkUploadOpen}
                onClose={() => setIsBulkUploadOpen(false)}
                onImport={handleBulkImport}
                existingSubjects={subjects}
            />

            {/* Warning Modal */}
            <Modal
                isOpen={isWarningModalOpen}
                onClose={() => setIsWarningModalOpen(false)}
                className="max-w-[500px] p-6 rounded-xl"
            >
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                            Update Core Attributes?
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                            You are about to modify core attributes <strong>(Subject Code, Name, or Type)</strong>.
                            This change might affect historical data or generated reports for past academic years.
                        </p>
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-800 mb-6">
                            <p className="text-xs text-blue-800 dark:text-blue-200">
                                <strong>Tip:</strong> If this is a major curriculum change, consider creating a NEW subject instead of editing this one to preserve history.
                            </p>
                        </div>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setIsWarningModalOpen(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmWarning}
                                className="px-4 py-2 text-sm font-medium text-white bg-yellow-600 rounded-lg hover:bg-yellow-700"
                            >
                                Proceed Anyway
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                className="max-w-[400px] p-6 rounded-xl"
            >
                <div className="text-center">
                    <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        Delete Subject?
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                        Are you sure you want to delete this subject? This action cannot be undone.
                    </p>
                    <div className="flex justify-center gap-3">
                        <button
                            onClick={() => setIsDeleteModalOpen(false)}
                            className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDeleteProceed}
                            className="px-5 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                        >
                            Delete Subject
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default SubjectList;
