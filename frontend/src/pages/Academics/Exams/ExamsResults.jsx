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
        if (storedExams.length === 0) {
            // Seed a demo exam for the user to see
            const demoExam = {
                id: 1715411200000,
                title: "Demo Mid-Term 2024",
                type: "Term",
                startDate: "2024-05-15",
                endDate: "2024-05-25",
                selectedClasses: [1, 5],
                gradingScaleId: 1,
                status: "Scheduled",
                papers: [
                    { subjectId: 101, date: "2024-05-15", time: "09:00", duration: "2", maxMarks: "100" },
                    { subjectId: 102, date: "2024-05-17", time: "09:00", duration: "2", maxMarks: "100" }
                ]
            };
            const seeded = [demoExam];
            localStorage.setItem("scheduledExams", JSON.stringify(seeded));
            setExams(seeded);
        } else {
            setExams(storedExams);
        }
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

            <div className="rounded-sm border border-gray-200 bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-gray-700 dark:bg-gray-800 sm:px-7.5 xl:pb-1">
                <div className="max-w-full overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50 dark:bg-gray-700 text-left">
                                <TableCell isHeader className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">Exam Title</TableCell>
                                <TableCell isHeader className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Type</TableCell>
                                <TableCell isHeader className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Dates</TableCell>
                                <TableCell isHeader className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Classes</TableCell>
                                <TableCell isHeader className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Status</TableCell>
                                <TableCell isHeader className="py-4 px-4 font-medium text-black dark:text-white">Actions</TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {exams.map((exam) => (
                                <TableRow key={exam.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700 xl:pl-11 font-medium text-black dark:text-white">
                                        {exam.title}
                                    </TableCell>
                                    <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                        <Badge color="light">{exam.type}</Badge>
                                    </TableCell>
                                    <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                        <div className="text-sm text-black dark:text-white">{exam.startDate}</div>
                                        <div className="text-xs text-gray-500">to {exam.endDate}</div>
                                    </TableCell>
                                    <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                        <p className="text-black dark:text-white">{exam.selectedClasses ? exam.selectedClasses.length : 0} Classes</p>
                                    </TableCell>
                                    <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                        <Badge color="success">{exam.status}</Badge>
                                    </TableCell>
                                    <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                        <div className="flex gap-2">
                                            <Link
                                                to="/academics/exams/marks"
                                                className="text-primary hover:underline text-sm font-medium"
                                            >
                                                Enter Marks
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(exam.id)}
                                                className="hover:text-red-500 text-sm font-medium"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {exams.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="border-b border-[#eee] py-5 px-4 text-center dark:border-gray-700">
                                        <span className="text-gray-500 dark:text-gray-400">No exams scheduled yet.</span>
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

export default ExamsResults;
