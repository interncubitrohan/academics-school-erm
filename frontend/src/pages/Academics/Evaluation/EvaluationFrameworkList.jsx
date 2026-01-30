import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../../../components/ui/table";
import Badge from "../../../components/ui/badge/Badge";
import Button from "../../../components/ui/button/Button";


const EvaluationFrameworkList = ({ frameworks, onEdit, onDelete, onCreate, onView, onDuplicate, onSetDefault }) => {
    return (
        <div className="space-y-6">
            <div className="rounded-sm border border-gray-200 bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-gray-700 dark:bg-gray-800 sm:px-7.5 xl:pb-1">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                    <h3 className="text-xl font-semibold text-black dark:text-white">
                        Evaluation Frameworks
                    </h3>
                    <Button
                        onClick={onCreate}
                        className="w-full sm:w-auto"
                        variant="primary"
                    >
                        + Create New Framework
                    </Button>
                </div>

                <div className="max-w-full overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50 dark:bg-gray-700 text-left">
                                <TableCell isHeader className="min-w-[180px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                    Framework Name
                                </TableCell>
                                <TableCell isHeader className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                    Board
                                </TableCell>
                                <TableCell isHeader className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                    Grades
                                </TableCell>
                                <TableCell isHeader className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                    Academic Year
                                </TableCell>
                                <TableCell isHeader className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                    Grading Scale
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
                            {frameworks.map((framework) => (
                                <TableRow key={framework.id} className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 ${framework.isDefault ? "bg-blue-50/50 dark:bg-blue-900/10" : ""}`}>
                                    <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700 xl:pl-11">
                                        <div className="flex flex-col gap-1">
                                            <span className="font-medium text-black dark:text-white flex items-center gap-2">
                                                {framework.frameworkName}
                                                {framework.isDefault && (
                                                    <span className="inline-block px-2 py-0.5 text-[10px] font-medium text-blue-600 bg-blue-100 rounded-full w-fit">
                                                        Default
                                                    </span>
                                                )}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                        <span className="text-sm text-black dark:text-white">
                                            {typeof framework.board === 'object' ?
                                                `${framework.board.category}${framework.board.state ? ` - ${framework.board.state}` : ''}${framework.board.boardName ? ` (${framework.board.boardName})` : ''}`
                                                : framework.board}
                                        </span>
                                    </TableCell>
                                    <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                                            {framework.applicableGrades && framework.applicableGrades.length > 0 ? (
                                                framework.applicableGrades.map((grade, idx) => (
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
                                        <span className="text-sm text-black dark:text-white">
                                            {framework.academicYear}
                                        </span>
                                    </TableCell>
                                    <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                            {framework.gradingScale}
                                        </span>
                                    </TableCell>
                                    <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                        <Badge
                                            size="sm"
                                            color={framework.status === "Active" ? "success" : "danger"}
                                        >
                                            {framework.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                        <div className="flex items-center space-x-3.5">
                                            <button
                                                onClick={() => onView && onView(framework)}
                                                className="hover:text-blue-500 transition-colors"
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
                                                onClick={() => onEdit(framework)}
                                                className="hover:text-primary transition-colors"
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
                                                onClick={() => onDuplicate && onDuplicate(framework)}
                                                className="hover:text-primary transition-colors"
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
                                                onClick={() => onSetDefault && onSetDefault(framework.id)}
                                                className={`transition-colors ${framework.isDefault ? "text-green-600 cursor-default" : "hover:text-green-600"}`}
                                                title={framework.isDefault ? "Current Default" : "Set as Default"}
                                                disabled={framework.isDefault}
                                            >
                                                <svg
                                                    className="fill-current"
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => onDelete(framework.id)}
                                                className={`transition-colors ${framework.isDefault ? "text-gray-300 cursor-not-allowed" : "hover:text-red-500"}`}
                                                title={framework.isDefault ? "Cannot delete default framework" : "Delete"}
                                                disabled={framework.isDefault}
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
                            {frameworks.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={7} className="border-b border-[#eee] py-5 px-4 text-center dark:border-gray-700">
                                        <div className="p-4 text-gray-500 dark:text-gray-400">
                                            No evaluation frameworks found. Create one to get started.
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

export default EvaluationFrameworkList;
