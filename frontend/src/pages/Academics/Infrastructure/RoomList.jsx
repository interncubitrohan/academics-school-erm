import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../../../components/ui/table";
import Badge from "../../../components/ui/badge/Badge";

const RoomList = ({ rooms, onEdit, onDelete }) => {
    return (
        <div className="rounded-sm border border-gray-200 bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-gray-700 dark:bg-gray-800 sm:px-7.5 xl:pb-1">
            <div className="max-w-full overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50 dark:bg-gray-700 text-left">
                            <TableCell isHeader className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                Block
                            </TableCell>
                            <TableCell isHeader className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                                Floor
                            </TableCell>
                            <TableCell isHeader className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                Room No
                            </TableCell>
                            <TableCell isHeader className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                Type
                            </TableCell>
                            <TableCell isHeader className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                                Capacity
                            </TableCell>
                            <TableCell isHeader className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                Status
                            </TableCell>
                            <TableCell isHeader className="py-4 px-4 font-medium text-black dark:text-white">
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rooms.length > 0 ? (
                            rooms.map((room) => (
                                <TableRow key={room.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700 xl:pl-11">
                                        <p className="text-black dark:text-white">{room.blockName}</p>
                                    </TableCell>
                                    <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                        <p className="text-black dark:text-white">{room.floorNumber}</p>
                                    </TableCell>
                                    <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                        <h5 className="font-medium text-black dark:text-white">
                                            {room.roomNumber}
                                        </h5>
                                    </TableCell>
                                    <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                        <Badge
                                            size="sm"
                                            color={
                                                room.roomType === "Classroom"
                                                    ? "success"
                                                    : room.roomType === "Lab"
                                                        ? "warning"
                                                        : room.roomType === "Library"
                                                            ? "info"
                                                            : "error"
                                            }
                                        >
                                            {room.roomType}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                        <p className="text-black dark:text-white">{room.capacity}</p>
                                    </TableCell>
                                    <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                        {room.assignedClass ? (
                                            <Badge size="sm" color="warning">
                                                Assigned to Class {room.assignedClass}
                                            </Badge>
                                        ) : (
                                            <Badge size="sm" color="success">
                                                Available
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                        <div className="flex items-center space-x-3.5">

                                            <button
                                                onClick={() => onEdit(room)}
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
                                                onClick={() => onDelete(room.id)}
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
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={7}
                                    className="border-b border-[#eee] py-5 px-4 text-center dark:border-gray-700"
                                >
                                    No rooms found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default RoomList;
