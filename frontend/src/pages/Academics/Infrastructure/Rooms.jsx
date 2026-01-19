import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../../../components/ui/table";
import Badge from "../../../components/ui/badge/Badge"; // Using Badge for Room Type if applicable, or generic text
import RoomModal from "./RoomModal";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";

// Mock Data
const initialRooms = [
    { id: 1, name: "101-A", type: "Classroom", capacity: 40 },
    { id: 2, name: "Chemistry Lab", type: "Lab", capacity: 25 },
    { id: 3, name: "Main Library", type: "Library", capacity: 100 },
    { id: 4, name: "Auditorium", type: "Hall", capacity: 200 },
    { id: 5, name: "102-B", type: "Classroom", capacity: 35 },
];

const Rooms = () => {
    const [rooms, setRooms] = useState(initialRooms);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentRoom, setCurrentRoom] = useState(null);

    const handleAddRoom = () => {
        setCurrentRoom(null);
        setIsModalOpen(true);
    };

    const handleEditRoom = (room) => {
        setCurrentRoom(room);
        setIsModalOpen(true);
    };

    const handleDeleteRoom = (id) => {
        if (window.confirm("Are you sure you want to delete this room?")) {
            setRooms(rooms.filter((r) => r.id !== id));
        }
    };

    const handleSaveRoom = (roomData) => {
        if (currentRoom) {
            // Edit
            setRooms(
                rooms.map((r) => (r.id === currentRoom.id ? { ...roomData, id: r.id } : r))
            );
        } else {
            // Add
            setRooms([...rooms, { ...roomData, id: Date.now() }]);
        }
        setIsModalOpen(false);
    };

    return (
        <>
            <PageMeta
                title="Rooms Management | School ERP"
                description="Manage school infrastructure rooms"
            />
            <PageBreadcrumb pageTitle="Rooms Management" />

            <div className="space-y-6">
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Room List</h3>
                        <button
                            onClick={handleAddRoom}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                        >
                            + Add Room
                        </button>
                    </div>
                    <div className="max-w-full overflow-x-auto">
                        <Table>
                            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                <TableRow>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Room Name
                                    </TableCell>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Type
                                    </TableCell>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Capacity
                                    </TableCell>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {rooms.map((room) => (
                                    <TableRow key={room.id}>
                                        <TableCell className="px-5 py-4 sm:px-6 text-start text-theme-sm dark:text-gray-400">
                                            {room.name}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            <Badge
                                                size="sm"
                                                color={
                                                    room.type === "Classroom"
                                                        ? "success"
                                                        : room.type === "Lab"
                                                            ? "warning"
                                                            : room.type === "Library"
                                                                ? "info"
                                                                : "error"
                                                }
                                            >
                                                {room.type}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {room.capacity}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEditRoom(room)}
                                                    className="text-blue-500 hover:text-blue-700"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteRoom(room.id)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {rooms.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={4} className="px-5 py-4 text-center text-gray-500 dark:text-gray-400">
                                            No rooms found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>

            <RoomModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveRoom}
                room={currentRoom}
            />
        </>
    );
};

export default Rooms;
