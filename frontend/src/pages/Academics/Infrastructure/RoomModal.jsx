import React, { useState, useEffect } from "react";
import { Modal } from "../../../components/ui/modal";
import Button from "../../../components/ui/button/Button"; // Assuming Button component exists or I'll use standard HTML button if not sure
// If Button doesn't exist, I'll use standard Tailwind classes. 
// Checking 'src/components/ui/button' would be ideal but I'll assume standard HTML for now to avoid extra round trips if simple.
// Actually, I saw a button directory in the list_dir output earlier.

const RoomModal = ({ isOpen, onClose, onSave, room }) => {
    const [formData, setFormData] = useState({
        name: "",
        type: "Classroom",
        capacity: "",
        floor: "",
        building: "",
        facilities: "", // Comma separated string for simplicity
        status: "Active",
    });

    useEffect(() => {
        if (room) {
            setFormData({
                ...room,
                facilities: Array.isArray(room.facilities) ? room.facilities.join(", ") : room.facilities || "",
            });
        } else {
            setFormData({
                name: "",
                type: "Classroom",
                capacity: "",
                floor: "",
                building: "",
                facilities: "",
                status: "Active",
            });
        }
    }, [room, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const submittedData = {
            ...formData,
            facilities: formData.facilities.split(",").map(f => f.trim()).filter(f => f),
            capacity: Number(formData.capacity)
        };
        onSave(submittedData);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-[700px] p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                {room ? "Edit Room" : "Add New Room"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Room Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            placeholder="e.g. 101-A"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Room Type <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="type"
                            value={formData.type}
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            Floor
                        </label>
                        <input
                            type="number"
                            name="floor"
                            value={formData.floor}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            placeholder="e.g. 1"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Building
                        </label>
                        <input
                            type="text"
                            name="building"
                            value={formData.building}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            placeholder="e.g. Main Block"
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
                            <option value="Active">Active</option>
                            <option value="Under Maintenance">Under Maintenance</option>
                            <option value="Closed">Closed</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Facilities
                    </label>
                    <input
                        type="text"
                        name="facilities"
                        value={formData.facilities}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        placeholder="e.g. Projector, AC, Smart Board"
                    />
                    <p className="text-xs text-gray-500 mt-1">Separate multiple facilities with commas.</p>
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
