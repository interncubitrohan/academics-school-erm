import React, { useState, useEffect } from "react";
import { Modal } from "../../../components/ui/modal";

const FACILITIES_OPTIONS = [
    "Projector",
    "Whiteboard",
    "Smart Board",
    "AC",
    "Lab Equipment",
    "Safety Shower",
    "Computers",
    "WiFi",
    "Sound System",
    "Stage",
    "CCTV"
];

const RoomModal = ({ isOpen, onClose, onSave, room }) => {
    const [formData, setFormData] = useState({
        blockName: "",
        floorNumber: "",
        roomNumber: "",
        roomType: "Classroom",
        capacity: "",
        status: "Available",
        facilities: [], // Array of strings
    });

    useEffect(() => {
        if (room) {
            setFormData({
                blockName: room.blockName,
                floorNumber: room.floorNumber,
                roomNumber: room.roomNumber,
                roomType: room.roomType,
                capacity: room.capacity,
                status: room.status,
                facilities: room.facilities || [],
            });
        } else {
            setFormData({
                blockName: "",
                floorNumber: "",
                roomNumber: "",
                roomType: "Classroom",
                capacity: "",
                status: "Available",
                facilities: [],
            });
        }
    }, [room, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFacilityChange = (facility) => {
        setFormData((prev) => {
            const newFacilities = prev.facilities.includes(facility)
                ? prev.facilities.filter((f) => f !== facility)
                : [...prev.facilities, facility];
            return { ...prev, facilities: newFacilities };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Generate roomName: Block-Floor-RoomNumber
        const roomName = `${formData.blockName}-${formData.floorNumber}-${formData.roomNumber}`;

        const submittedData = {
            ...formData,
            roomName,
            capacity: Number(formData.capacity),
            floorNumber: Number(formData.floorNumber),
        };
        onSave(submittedData);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-[700px] p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                {room ? "Edit Room" : "Add New Room"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Location Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Block Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="blockName"
                            value={formData.blockName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            placeholder="e.g. Science"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Floor Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            name="floorNumber"
                            value={formData.floorNumber}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            placeholder="e.g. 1"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Room Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="roomNumber"
                            value={formData.roomNumber}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            placeholder="e.g. 101"
                        />
                    </div>
                </div>

                {/* Properties */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Room Type <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="roomType"
                            value={formData.roomType}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        >
                            <option value="Classroom">Classroom</option>
                            <option value="Lab">Lab</option>
                            <option value="Library">Library</option>
                            <option value="Hall">Hall</option>
                            <option value="Auditorium">Auditorium</option>
                            <option value="Sports Room">Sports Room</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Capacity <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            name="capacity"
                            value={formData.capacity}
                            onChange={handleChange}
                            required
                            min="1"
                            max="500"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            placeholder="e.g. 40"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Status
                        </label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        >
                            <option value="Available">Available</option>
                            <option value="Assigned">Assigned</option>
                            <option value="Maintenance">Maintenance</option>
                        </select>
                    </div>
                </div>

                {/* Facilities Checkboxes */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Facilities
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {FACILITIES_OPTIONS.map((fac) => (
                            <label key={fac} className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.facilities.includes(fac)}
                                    onChange={() => handleFacilityChange(fac)}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                                />
                                <span>{fac}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                    >
                        {room ? "Update Room" : "Add Room"}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default RoomModal;
