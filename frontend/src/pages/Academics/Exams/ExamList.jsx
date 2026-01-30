import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../../../components/ui/table";
import Badge from "../../../components/ui/badge/Badge";
import Button from "../../../components/ui/button/Button";
import { mockExams } from "../../../data/examData";

const ExamList = () => {
    const navigate = useNavigate();
    const [exams, setExams] = useState(mockExams);
    const [searchTerm, setSearchTerm] = useState("");

    // Filter logic would go here
    const filteredExams = exams.filter(exam =>
        exam.examName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.examCode.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status) => {
        switch (status) {
            case "Published": return "success";
            case "Scheduled": return "warning";
            case "Draft": return "secondary";
            case "Completed": return "primary";
            default: return "light";
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Exam Management</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Manage schedules, hall tickets, and marks</p>
                </div>
                <div className="flex gap-2">
                    <Button onClick={() => navigate("/academics/exams/create")}>
                        + New Exam
                    </Button>
                </div>
            </div>

            <div className="rounded-sm border border-gray-200 bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-gray-700 dark:bg-gray-800 sm:px-7.5 xl:pb-1">
                <div className="max-w-full overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50 dark:bg-gray-700 text-left">
                                <TableCell isHeader className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">Exam Name</TableCell>
                                <TableCell isHeader className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">Code</TableCell>
                                <TableCell isHeader className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Type</TableCell>
                                <TableCell isHeader className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Session</TableCell>
                                <TableCell isHeader className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Board</TableCell>
                                <TableCell isHeader className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Status</TableCell>
                                <TableCell isHeader className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Result Date</TableCell>
                                <TableCell isHeader className="py-4 px-4 font-medium text-black dark:text-white">Actions</TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredExams.map((exam) => (
                                <TableRow key={exam.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700 xl:pl-11">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-black dark:text-white">{exam.examName}</span>
                                            <span className="text-xs text-gray-500">{exam.schedule.startDate} to {exam.schedule.endDate}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                        <span className="text-sm font-mono">{exam.examCode}</span>
                                    </TableCell>
                                    <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                        <span className="text-sm">{exam.examType}</span>
                                    </TableCell>
                                    <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                        <div className="flex flex-col">
                                            <span className="text-sm">{exam.academicYear}</span>
                                            <span className="text-xs text-gray-500">{exam.term}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                        <span className="text-sm text-gray-700 dark:text-gray-300">
                                            {typeof exam.board === 'object' ?
                                                `${exam.board.type}${exam.board.state ? ` - ${exam.board.state}` : ''}`
                                                : (exam.board || "-")}
                                        </span>
                                    </TableCell>
                                    <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                        <Badge color={getStatusColor(exam.status)}>{exam.status}</Badge>
                                    </TableCell>
                                    <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                        <span className="text-sm">{exam.schedule.resultDate}</span>
                                    </TableCell>
                                    <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                        <div className="flex items-center space-x-2">
                                            {/* View Action */}
                                            <button className="hover:text-blue-500 transition-colors" title="View Details">
                                                <svg className="fill-current" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                                                </svg>
                                            </button>
                                            {/* Edit Action */}
                                            <button className="hover:text-primary transition-colors" title="Edit Exam">
                                                <svg className="fill-current" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                                                </svg>
                                            </button>
                                            {/* Generate Ticket */}
                                            <button
                                                className="hover:text-amber-500 transition-colors"
                                                title="Generate Hall Tickets"
                                                onClick={() => alert("Generating Hall Tickets for " + exam.examName + "... (Mock Action)")}
                                            >
                                                <svg className="fill-current" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2.01.89-2.01 2L3 19a2 2 0 002 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
                                                </svg>
                                            </button>
                                            {/* Publish Action (if not published) */}
                                            {exam.status !== 'Published' && (
                                                <button
                                                    className="hover:text-green-600 transition-colors"
                                                    title="Publish Results"
                                                    onClick={() => {
                                                        if (window.confirm("Publish results for " + exam.examName + "?")) {
                                                            alert("Results Published!");
                                                        }
                                                    }}
                                                >
                                                    <svg className="fill-current" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5 4v2h14V4H5zm0 10h4v6h6v-6h4l-7-7-7 7z" />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default ExamList;
