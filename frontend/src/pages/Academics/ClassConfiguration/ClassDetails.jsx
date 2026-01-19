import React, { useState } from "react";
import { Link, useParams } from "react-router"; // Assuming React Router v6
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import Badge from "../../../components/ui/badge/Badge";
import CurriculumTab from "./CurriculumTab";
import FacultyAllocationTab from "./FacultyAllocationTab";
import TimetableTab from "./TimetableTab";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../../../components/ui/table";

// Mock Data
const mockClassDetails = {
    id: 1,
    name: "Class 5-A",
    grade: "Grade 5",
    section: "A",
    classTeacher: "Sarah Williams",
    subjects: [
        { id: 1, name: "Mathematics", teacher: "Sarah Williams", sessions: 5 },
        { id: 2, name: "Science", teacher: "John Doe", sessions: 4 },
        { id: 3, name: "English", teacher: "Emily Davis", sessions: 4 },
        { id: 4, name: "History", teacher: "Michael Brown", sessions: 2 },
    ],
    faculty: [
        { id: 1, name: "Sarah Williams", role: "Class Teacher", subject: "Mathematics" },
        { id: 2, name: "John Doe", role: "Subject Teacher", subject: "Science" },
        { id: 3, name: "Emily Davis", role: "Subject Teacher", subject: "English" },
        { id: 4, name: "Michael Brown", role: "Subject Teacher", subject: "History" },
    ],
};

const ClassDetails = () => {
    // In a real app, use useParams to fetch data
    const { classId } = useParams();
    const [activeTab, setActiveTab] = useState("curriculum");

    return (
        <>
            <PageMeta
                title="Class Details | School ERP"
                description="View class curriculum, faculty, and timetable"
            />
            <PageBreadcrumb pageTitle="Class Details" />

            <div className="space-y-6">
                {/* Header Card */}
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-white/[0.05] shadow-sm">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                                {mockClassDetails.name}
                            </h2>
                            <div className="flex flex-wrap gap-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="flex items-center gap-1">
                                    <span className="font-medium text-gray-700 dark:text-gray-300">Grade:</span> {mockClassDetails.grade}
                                </span>
                                <span className="hidden md:inline">•</span>
                                <span className="flex items-center gap-1">
                                    <span className="font-medium text-gray-700 dark:text-gray-300">Section:</span> {mockClassDetails.section}
                                </span>
                                <span className="hidden md:inline">•</span>
                                <span className="flex items-center gap-1">
                                    <span className="font-medium text-gray-700 dark:text-gray-300">Class Teacher:</span> {mockClassDetails.classTeacher}
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Link
                                to="/academics/class-configuration"
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                            >
                                Back to List
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Tabs Navigation */}
                <div className="border-b border-gray-200 dark:border-gray-700">
                    <nav className="flex space-x-8" aria-label="Tabs">
                        {[
                            { id: "curriculum", label: "Curriculum" },
                            { id: "faculty", label: "Faculty Allocation" },
                            { id: "timetable", label: "Timetable Strategy" },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                                    py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm
                                    ${activeTab === tab.id
                                        ? "border-brand-500 text-brand-600 dark:text-brand-400"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                                    }
                                `}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Tab Content */}
                <div className="min-h-[400px]">
                    {activeTab === "curriculum" && (
                        <CurriculumTab initialSubjects={mockClassDetails.subjects} />
                    )}

                    {activeTab === "faculty" && (
                        <FacultyAllocationTab subjects={mockClassDetails.subjects} />
                    )}

                    {activeTab === "timetable" && (
                        <TimetableTab subjects={mockClassDetails.subjects} />
                    )}
                </div>
            </div>
        </>
    );
};

export default ClassDetails;
