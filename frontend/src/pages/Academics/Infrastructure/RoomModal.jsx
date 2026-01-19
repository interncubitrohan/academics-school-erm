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
    });

    useEffect(() => {
        if (room) {
            setFormData(room);
        } else {
            setFormData({
                name: "",
                type: "Classroom",
                capacity: "",
            });
        }
    }, [room, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-[500px] p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                {room ? "Edit Room" : "Add New Room"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Room Name
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
                        Room Type
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
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Capacity
                    </label>
                    <input
                        type="number"
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleChange}
                        required
                        min="1"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        placeholder="e.g. 40"
                    />
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
