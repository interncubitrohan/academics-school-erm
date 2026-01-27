import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../../../components/ui/table";
import Badge from "../../../components/ui/badge/Badge";

const GradingScaleList = ({ scales, onEdit, onDelete, onCreate, onDuplicate, onView }) => {
    return (
        <div className="space-y-6">
            <div className="rounded-sm border border-gray-200 bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-gray-700 dark:bg-gray-800 sm:px-7.5 xl:pb-1">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                    <h3 className="text-xl font-semibold text-black dark:text-white">
                        Active Grading Scales
                    </h3>
                    <button
                        onClick={onCreate}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 w-full sm:w-auto"
                    >
                        + Create New Scale
                    </button>
                </div>

                <div className="max-w-full overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50 dark:bg-gray-700 text-left">
                                <TableCell isHeader className="min-w-[180px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                    Scale Name
                                </TableCell>
                                <TableCell isHeader className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                    Board
                                </TableCell>
                                <TableCell isHeader className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                    Type
                                </TableCell>
                                <TableCell isHeader className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                    Applicable Grades
                                </TableCell>
                                <TableCell isHeader className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                                    Status
                                </TableCell>
                                <TableCell isHeader className="py-4 px-4 font-medium text-black dark:text-white">
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {scales.map((scale) => (
                                <TableRow key={scale.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700 xl:pl-11">
                                        <div className="flex flex-col gap-1">
                                            <span className="font-medium text-black dark:text-white">
                                                {scale.scaleName}
                                            </span>
                                            {scale.isDefault && (
                                                <span className="inline-block px-2 py-0.5 text-[10px] font-medium text-blue-600 bg-blue-100 rounded-full w-fit">
                                                    Default
                                                </span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                        <div className="text-sm text-black dark:text-white">
                                            {scale.board || "Generic"}
                                        </div>
                                    </TableCell>
                                    <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                        <Badge
                                            size="sm"
                                            color={
                                                scale.scaleType === "GPA"
                                                    ? "success"
                                                    : scale.scaleType === "Percentage"
                                                        ? "primary"
                                                        : "brand"
                                            }
                                        >
                                            {scale.scaleType}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                                            {scale.applicableGrades && scale.applicableGrades.length > 0 ? (
                                                scale.applicableGrades.map((grade, idx) => (
                                                    <span key={idx} className="bg-gray-100 text-gray-600 text-[10px] px-2 py-1 rounded dark:bg-gray-700 dark:text-gray-300">
                                                        {grade}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-gray-400 text-sm">All</span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                        <Badge
                                            size="sm"
                                            color={scale.status === "Active" ? "success" : "danger"}
                                        >
                                            {scale.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                        <div className="flex items-center space-x-3.5">
                                            <button
                                                onClick={() => onView && onView(scale)}
                                                className="hover:text-primary"
                                                title="View"
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
                                                onClick={() => onEdit(scale)}
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
                                                onClick={() => onDuplicate && onDuplicate(scale)}
                                                className="hover:text-primary"
                                                title="Duplicate"
                                            >
                                                <svg
                                                    className="fill-current"
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => onDelete(scale.id)}
                                                className={`transition-colors ${scale.isDefault || scale.linkedExamCount > 0
                                                    ? "text-gray-300 cursor-not-allowed"
                                                    : "hover:text-red-500"
                                                    }`}
                                                title={
                                                    scale.isDefault
                                                        ? "Cannot delete default scale"
                                                        : scale.linkedExamCount > 0
                                                            ? `Linked to ${scale.linkedExamCount} exams`
                                                            : "Delete"
                                                }
                                                disabled={scale.isDefault || scale.linkedExamCount > 0}
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
                            {scales.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="border-b border-[#eee] py-5 px-4 text-center dark:border-gray-700">
                                        <div className="p-4 text-gray-500 dark:text-gray-400">
                                            No grading scales found. Create one to get started.
                                        </div>
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

export default GradingScaleList;
