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
    { id: 1, name: "101-A", type: "Classroom", capacity: 40, floor: 1, building: "Main Block", status: "Active", facilities: ["Projector", "AC"] },
    { id: 2, name: "Chemistry Lab", type: "Lab", capacity: 25, floor: 2, building: "Science Wing", status: "Under Maintenance", facilities: ["Lab Equipment", "Wash Basin"] },
    { id: 3, name: "Main Library", type: "Library", capacity: 100, floor: 1, building: "Main Block", status: "Active", facilities: ["WiFi", "Computers"] },
    { id: 4, name: "Auditorium", type: "Hall", capacity: 200, floor: 0, building: "Auditorium Block", status: "Active", facilities: ["Stage", "Sound System"] },
    { id: 5, name: "102-B", type: "Classroom", capacity: 35, floor: 1, building: "Main Block", status: "Active", facilities: ["Whiteboard"] },
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
                <div className="rounded-sm border border-gray-200 bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-gray-700 dark:bg-gray-800 sm:px-7.5 xl:pb-1">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-black dark:text-white">Room List</h3>
                        <button
                            onClick={handleAddRoom}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                        >
                            + Add Room
                        </button>
                    </div>
                    <div className="max-w-full overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50 dark:bg-gray-700 text-left">
                                    <TableCell isHeader className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                        Room Name
                                    </TableCell>
                                    <TableCell isHeader className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                        Type
                                    </TableCell>
                                    <TableCell isHeader className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                                        Capacity
                                    </TableCell>
                                    <TableCell isHeader className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                        Building / Floor
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
                                {rooms.map((room) => (
                                    <TableRow key={room.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                        <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700 xl:pl-11">
                                            <h5 className="font-medium text-black dark:text-white">
                                                {room.name}
                                            </h5>
                                        </TableCell>
                                        <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
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
                                        <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                            <p className="text-black dark:text-white">{room.capacity}</p>
                                        </TableCell>
                                        <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                            <p className="text-black dark:text-white">
                                                {room.building} <span className="text-sm text-gray-500">({room.floor})</span>
                                            </p>
                                        </TableCell>
                                        <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                            <Badge
                                                size="sm"
                                                color={room.status === "Active" ? "success" : "error"}
                                            >
                                                {room.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                            <div className="flex items-center space-x-3.5">
                                                <button
                                                    onClick={() => handleEditRoom(room)}
                                                    className="hover:text-primary"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteRoom(room.id)}
                                                    className="hover:text-red-500"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {rooms.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={6} className="border-b border-[#eee] py-5 px-4 text-center dark:border-gray-700">
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
