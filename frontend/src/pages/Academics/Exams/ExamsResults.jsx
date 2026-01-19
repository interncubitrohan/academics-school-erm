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

const ExamsResults = () => {
    const [exams, setExams] = useState([]);

    useEffect(() => {
        const storedExams = JSON.parse(localStorage.getItem("scheduledExams") || "[]");
        setExams(storedExams);
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this exam?")) {
            const updatedExams = exams.filter(e => e.id !== id);
            setExams(updatedExams);
            localStorage.setItem("scheduledExams", JSON.stringify(updatedExams));
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Exams & Results</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Manage examination schedules and view results</p>
                </div>
                <Link
                    to="/academics/exams/schedule"
                    className="px-4 py-2 text-sm font-medium text-white bg-brand-600 rounded-lg hover:bg-brand-700 w-full sm:w-auto text-center"
                >
                    + Schedule Exam
                </Link>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <Table>
                    <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                        <TableRow>
                            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Exam Title</TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Type</TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Dates</TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Classes</TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Status</TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Actions</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                        {exams.map((exam) => (
                            <TableRow key={exam.id}>
                                <TableCell className="px-5 py-4 text-start font-medium text-gray-800 dark:text-white">
                                    {exam.title}
                                </TableCell>
                                <TableCell className="px-5 py-4 text-start text-gray-500 dark:text-gray-400">
                                    <Badge color="light">{exam.type}</Badge>
                                </TableCell>
                                <TableCell className="px-5 py-4 text-start text-gray-500 dark:text-gray-400">
                                    <div className="text-sm">{exam.startDate}</div>
                                    <div className="text-xs text-gray-400">to {exam.endDate}</div>
                                </TableCell>
                                <TableCell className="px-5 py-4 text-start text-gray-500 dark:text-gray-400">
                                    {exam.selectedClasses ? exam.selectedClasses.length : 0} Classes
                                </TableCell>
                                <TableCell className="px-5 py-4 text-start">
                                    <Badge color="success">{exam.status}</Badge>
                                </TableCell>
                                <TableCell className="px-5 py-4 text-start">
                                    <div className="flex gap-2">
                                        <button className="text-brand-500 hover:text-brand-700 text-sm font-medium">Results</button>
                                        <button
                                            onClick={() => handleDelete(exam.id)}
                                            className="text-red-500 hover:text-red-700 text-sm font-medium"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                        {exams.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="px-5 py-8 text-center text-gray-500 dark:text-gray-400">
                                    No exams scheduled yet.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default ExamsResults;
