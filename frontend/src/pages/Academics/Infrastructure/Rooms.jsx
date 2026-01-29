import React, { useState } from "react";

import RoomModal from "./RoomModal";
import RoomList from "./RoomList";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import { MOCK_ROOMS } from "../../../data/roomData";

import Button from "../../../components/ui/button/Button";

const Rooms = () => {
    // ... maintain existing state ...

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
                rooms.map((r) => (r.id === currentRoom.id ? { ...r, ...roomData } : r))
            );
        } else {
            // Add
            setRooms([...rooms, { assignedClass: null, ...roomData, id: `room_${Date.now()}` }]);
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
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Room List</h3>
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
                            <Button
                                onClick={handleAddRoom}
                                startIcon={<span className="text-lg leading-none">+</span>}
                            >
                                Add Room
                            </Button>
                        </div>
                    </div>

                    <RoomList
                        rooms={filteredRooms}
                        onEdit={handleEditRoom}
                        onDelete={handleDeleteRoom}
                    />
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
