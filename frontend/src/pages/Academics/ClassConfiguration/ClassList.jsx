import React from "react";
import { Link } from "react-router";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../../../components/ui/table";
import Badge from "../../../components/ui/badge/Badge";

const ClassList = ({ classes, onEdit, onDelete, onCreate }) => {
    return (
        <div className="space-y-6">
            <div className="rounded-sm border border-gray-200 bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-gray-700 dark:bg-gray-800 sm:px-7.5 xl:pb-1">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                    <h3 className="text-xl font-semibold text-black dark:text-white">
                        Class List
                    </h3>
                    <button
                        onClick={onCreate}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 w-full sm:w-auto"
                    >
                        + Create Class
                    </button>
                </div>

                <div className="max-w-full overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50 dark:bg-gray-700 text-left">
                                <TableCell isHeader className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                    Academic Year
                                </TableCell>
                                <TableCell isHeader className="min-w-[80px] py-4 px-4 font-medium text-black dark:text-white">
                                    Grade
                                </TableCell>
                                <TableCell isHeader className="min-w-[80px] py-4 px-4 font-medium text-black dark:text-white">
                                    Section
                                </TableCell>
                                <TableCell isHeader className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                                    Board
                                </TableCell>
                                <TableCell isHeader className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                    Room
                                </TableCell>
                                <TableCell isHeader className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                    Class Teacher
                                </TableCell>
                                <TableCell isHeader className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                                    Strength
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
                            {classes.map((cls) => (
                                <TableRow key={cls.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700 xl:pl-11">
                                        <p className="text-black dark:text-white font-medium">{cls.academicYear}</p>
                                    </TableCell>
                                    <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                        <p className="text-black dark:text-white">{cls.grade}</p>
                                    </TableCell>
                                    <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                        <Badge size="sm" color="light">
                                            {cls.section}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                        <Badge size="sm" color={cls.board?.category === "CBSE" ? "info" : "warning"}>
                                            {typeof cls.board === 'object' ?
                                                `${cls.board.category}${cls.board.state ? ` - ${cls.board.state}` : ''}`
                                                : cls.board}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                        <p className="text-black dark:text-white">
                                            {cls.room ? `${cls.room.block}-${cls.room.floor}-${cls.room.roomNumber}` : "-"}
                                        </p>
                                    </TableCell>
                                    <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                        <p className="text-black dark:text-white">
                                            {cls.classTeacher?.name || "-"}
                                        </p>
                                    </TableCell>
                                    <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                        <p className="text-black dark:text-white">
                                            {cls.currentStrength}/{cls.maxStudents}
                                        </p>
                                    </TableCell>
                                    <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                        <Badge size="sm" color={cls.status === "Active" ? "success" : "warning"}>
                                            {cls.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                        <div className="flex items-center space-x-3.5">
                                            <Link
                                                to={`/academics/classes/${cls.id}`}
                                                className="hover:text-primary"
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
                                            </Link>
                                            <button
                                                onClick={() => onEdit(cls)}
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
                                            <Link
                                                to={`/academics/classes/${cls.id}/mapping`}
                                                className="hover:text-primary"
                                                title="Configure Subjects"
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
                                            </Link>
                                            <button
                                                onClick={() => onDelete(cls.id)}
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
                            {classes.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={9} className="border-b border-[#eee] py-5 px-4 text-center dark:border-gray-700">
                                        <span className="text-gray-500 dark:text-gray-400">No classes found. Create one to get started.</span>
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

export default ClassList;
