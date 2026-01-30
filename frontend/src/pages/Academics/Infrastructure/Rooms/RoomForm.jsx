import React, { useState, useEffect } from "react";

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

const ROOM_TYPES = [
    "Classroom",
    "Lab",
    "Library",
    "Hall",
    "Auditorium",
    "Sports Room"
];

const RoomForm = ({ initialData, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        blockName: "",
        floorNumber: "",
        roomNumber: "",
        roomType: "Classroom",
        capacity: "",
        status: "Available",
        facilities: [],
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                blockName: initialData.blockName || "",
                floorNumber: initialData.floorNumber !== undefined ? initialData.floorNumber : "",
                roomNumber: initialData.roomNumber || "",
                roomType: initialData.roomType || "Classroom",
                capacity: initialData.capacity || "",
                status: initialData.status || "Available",
                facilities: initialData.facilities || [],
            });
        }
    }, [initialData]);

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

        // Basic validation
        if (!formData.blockName || !formData.roomNumber || !formData.capacity) {
            alert("Please fill in all required fields.");
            return;
        }

        const roomName = `${formData.blockName}-${formData.floorNumber}-${formData.roomNumber}`;
        onSave({
            ...formData,
            roomName,
            capacity: Number(formData.capacity),
            floorNumber: Number(formData.floorNumber),
        });
    };

    return (
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
                    <select
                        name="floorNumber"
                        value={formData.floorNumber}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    >
                        <option value="">Select Floor</option>
                        <option value="0">Ground (0)</option>
                        <option value="1">1st Floor</option>
                        <option value="2">2nd Floor</option>
                        <option value="3">3rd Floor</option>
                        <option value="4">4th Floor</option>
                        <option value="5">5th Floor</option>
                    </select>
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
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    >
                        {ROOM_TYPES.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
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
                    onClick={onCancel}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                >
                    {initialData ? "Update Room" : "Add Room"}
                </button>
            </div>
        </form>
    );
};

export default RoomForm;

