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
                                <TableCell isHeader className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                    Class Name
                                </TableCell>
                                <TableCell isHeader className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                                    Grade
                                </TableCell>
                                <TableCell isHeader className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                                    Section
                                </TableCell>
                                <TableCell isHeader className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                                    Board
                                </TableCell>
                                <TableCell isHeader className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                    Class Teacher
                                </TableCell>
                                <TableCell isHeader className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                                    Room
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
                                        <Link
                                            to={`/academics/classes/${cls.id}`}
                                            className="font-medium text-black dark:text-white hover:text-primary hover:underline"
                                        >
                                            {cls.name}
                                        </Link>
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
                                        <Badge size="sm" color={cls.board === "CBSE" ? "info" : "warning"}>
                                            {cls.board}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                        <p className="text-black dark:text-white">{cls.teacher}</p>
                                    </TableCell>
                                    <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                        <p className="text-black dark:text-white">{cls.room}</p>
                                    </TableCell>
                                    <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => onEdit(cls)}
                                                className="hover:text-primary text-sm font-medium"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => onDelete(cls.id)}
                                                className="hover:text-red-500 text-sm font-medium"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {classes.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={7} className="border-b border-[#eee] py-5 px-4 text-center dark:border-gray-700">
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
