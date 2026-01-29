import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router"; // Assuming React Router v6
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import Badge from "../../../components/ui/badge/Badge";
import CurriculumTab from "./CurriculumTab";
import FacultyAllocationTab from "./FacultyAllocationTab";
import TimetableTab from "./TimetableTab";
import { MOCK_CLASSES } from "../../../data/classData";
import { MOCK_CLASS_SUBJECT_MAPPINGS } from "../../../data/classSubjectMappingData";

const ClassDetails = () => {
    const { classId } = useParams();
    const [activeTab, setActiveTab] = useState("curriculum");
    const [classDetails, setClassDetails] = useState(null);
    const [classSubjects, setClassSubjects] = useState([]);

    useEffect(() => {
        if (classId) {
            const found = MOCK_CLASSES.find(c => c.id === classId || c.id === parseInt(classId));
            if (found) {
                // Merge with mock details structure if needed, or use found class directly
                setClassDetails({
                    ...found,
                    name: found.className ? `Class ${found.className}` : found.name, // Ensure naming consistency
                    grade: `Grade ${found.grade}`, // Format grade
                    teacher: found.classTeacher?.name || "Unassigned"
                });

                // Find associated subject mapping
                const mapping = MOCK_CLASS_SUBJECT_MAPPINGS.find(m => m.classId === found.id);
                if (mapping) {
                    const adaptedSubjects = mapping.subjects.map((s, index) => ({
                        id: s.subjectCode || index,
                        name: s.subjectName,
                        teacher: "Unassigned", // Mapping doesn't explicitly store teacher per subject
                        sessions: s.teachingHoursPerWeek,
                        type: s.subjectType,
                        credits: "1"
                    }));
                    setClassSubjects(adaptedSubjects);
                } else {
                    setClassSubjects([]);
                }
            }
        }
    }, [classId]);

    if (!classDetails) {
        return (
            <div className="p-6 text-center">
                <p className="text-gray-500">Loading class details...</p>
            </div>
        );
    }
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
                                {classDetails.name}
                            </h2>
                            <div className="flex flex-wrap gap-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="flex items-center gap-1">
                                    <span className="font-medium text-gray-700 dark:text-gray-300">Grade:</span> {classDetails.grade}
                                </span>
                                <span className="hidden md:inline">•</span>
                                <span className="flex items-center gap-1">
                                    <span className="font-medium text-gray-700 dark:text-gray-300">Section:</span> {classDetails.section}
                                </span>
                                <span className="hidden md:inline">•</span>
                                <span className="flex items-center gap-1">
                                    <span className="font-medium text-gray-700 dark:text-gray-300">Class Teacher:</span> {classDetails.teacher}
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
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-white/[0.05] shadow-sm p-6">
                    {activeTab === "curriculum" && (
                        <CurriculumTab initialSubjects={classSubjects} />
                    )}

                    {activeTab === "faculty" && (
                        <FacultyAllocationTab subjects={classSubjects} />
                    )}

                    {activeTab === "timetable" && (
                        <TimetableTab subjects={classSubjects} />
                    )}
                </div>
            </div>
        </>
    );
};

export default ClassDetails;
