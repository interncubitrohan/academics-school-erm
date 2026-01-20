import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../../../components/ui/table";
import Badge from "../../../components/ui/badge/Badge";
import RoomModal from "./RoomModal";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import { MOCK_ROOMS } from "../../../data/roomData";

const Rooms = () => {
    const [rooms, setRooms] = useState(MOCK_ROOMS);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentRoom, setCurrentRoom] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("");

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
            setRooms([...rooms, { ...roomData, id: `room_${Date.now()}` }]);
        }
        setIsModalOpen(false);
    };

    const filteredRooms = rooms.filter((room) => {
        const matchesSearch =
            room.roomName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType ? room.roomType === filterType : true;
        return matchesSearch && matchesType;
    });

    const uniqueTypes = [...new Set(rooms.map((r) => r.roomType))];

    return (
        <>
            <PageMeta
                title="Rooms Management | School ERP"
                description="Manage school infrastructure rooms"
            />
            <PageBreadcrumb pageTitle="Rooms Management" />

            <div className="space-y-6">
                <div className="rounded-sm border border-gray-200 bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-gray-700 dark:bg-gray-800 sm:px-7.5 xl:pb-1">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                        <h3 className="text-xl font-semibold text-black dark:text-white">Room List</h3>
                        <div className="flex gap-2 w-full md:w-auto">
                            <input
                                type="text"
                                placeholder="Search by name or number..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            />
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            >
                                <option value="">All Types</option>
                                {uniqueTypes.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                            <button
                                onClick={handleAddRoom}
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 whitespace-nowrap"
                            >
                                + Add Room
                            </button>
                        </div>
                    </div>
                    <div className="max-w-full overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50 dark:bg-gray-700 text-left">
                                    <TableCell isHeader className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                        Room Name
                                    </TableCell>
                                    <TableCell isHeader className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                        Type
                                    </TableCell>
                                    <TableCell isHeader className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                        Location
                                    </TableCell>
                                    <TableCell isHeader className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                                        Capacity
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
                                {filteredRooms.map((room) => (
                                    <TableRow key={room.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                        <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700 xl:pl-11">
                                            <h5
                                                className="font-medium text-blue-600 hover:underline cursor-pointer dark:text-blue-400"
                                                onClick={() => handleEditRoom(room)}
                                            >
                                                {room.roomName}
                                            </h5>
                                            <span className="text-xs text-gray-500">ID: {room.roomNumber}</span>
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
                                            <p className="text-black dark:text-white">
                                                {room.blockName} <span className="text-sm text-gray-500">(Floor {room.floorNumber})</span>
                                            </p>
                                        </TableCell>
                                        <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                            <p className="text-black dark:text-white">{room.capacity}</p>
                                        </TableCell>
                                        <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                            <Badge
                                                size="sm"
                                                color={room.status === "Available" ? "success" : "warning"}
                                            >
                                                {room.status}
                                            </Badge>
                                            {room.assignedClass && <div className="text-xs text-gray-500 mt-1">Class: {room.assignedClass}</div>}
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
                                {filteredRooms.length === 0 && (
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
