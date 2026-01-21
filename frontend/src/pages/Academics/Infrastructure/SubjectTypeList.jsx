import React from "react";
import { FiStar } from "react-icons/fi";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../../../components/ui/table";
import Badge from "../../../components/ui/badge/Badge";

const SubjectTypeList = ({ subjectTypes, onEdit, onDelete, onSetDefault, onView, checkDeletePermission }) => {
    return (
        <div className="max-w-full overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow className="bg-gray-50 dark:bg-gray-700 text-left">
                        <TableCell isHeader className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                            Type Name
                        </TableCell>
                        <TableCell isHeader className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                            Code
                        </TableCell>
                        <TableCell isHeader className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                            Compulsory
                        </TableCell>
                        <TableCell isHeader className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                            Promotion
                        </TableCell>
                        <TableCell isHeader className="min-w-[80px] py-4 px-4 font-medium text-black dark:text-white">
                            Order
                        </TableCell>
                        <TableCell isHeader className="min-w-[80px] py-4 px-4 font-medium text-black dark:text-white">
                            Default
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
                    {subjectTypes.length > 0 ? (
                        subjectTypes.map((type) => {
                            const deletePermission = checkDeletePermission ? checkDeletePermission(type) : { allowed: true };

                            return (
                                <TableRow key={type.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700 xl:pl-11">
                                        <p className="text-black dark:text-white font-medium">
                                            {type.typeName}
                                        </p>
                                    </TableCell>
                                    <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                        <Badge size="sm" color="gray">
                                            {type.typeCode}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                        {type.isCompulsory ? (
                                            <Badge size="sm" color="success">Yes</Badge>
                                        ) : (
                                            <Badge size="sm" color="error">No</Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                        {type.affectsPromotion ? (
                                            <Badge size="sm" color="success">Yes</Badge>
                                        ) : (
                                            <Badge size="sm" color="error">No</Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                        <p className="text-black dark:text-white">
                                            {type.displayOrder}
                                        </p>
                                    </TableCell>
                                    <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                        {type.isDefault ? (
                                            <FiStar className="text-warning text-lg fill-current" />
                                        ) : (
                                            <button onClick={() => onSetDefault(type.id)} className="text-gray-400 hover:text-warning" title="Set as Default">
                                                <FiStar className="text-lg" />
                                            </button>
                                        )}
                                    </TableCell>
                                    <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                        <Badge size="sm" color={type.status === "Active" ? "success" : "warning"}>
                                            {type.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                        <div className="flex items-center space-x-3.5">
                                            <button
                                                onClick={() => onView(type)}
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
                                                onClick={() => onEdit(type)}
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
                                                onClick={() => onDelete(type.id)}
                                                disabled={!deletePermission.allowed}
                                                className={`hover:text-red-500 ${!deletePermission.allowed ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                title={!deletePermission.allowed ? deletePermission.reason : "Delete"}
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
                            )
                        })
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={8}
                                className="border-b border-[#eee] py-5 px-4 text-center dark:border-gray-700"
                            >
                                No subject types found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default SubjectTypeList;
