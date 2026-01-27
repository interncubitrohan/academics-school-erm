import React, { useMemo } from "react";
import Badge from "../../../components/ui/badge/Badge";

const StepRoomAssignment = ({ formData, handleChange, handleRoomChange, rooms, existingClasses }) => {
    // Filter rooms logic
    const { availableRooms, assignedRooms } = useMemo(() => {
        const available = [];
        const assigned = [];

        rooms.forEach(room => {
            // Check if room is assigned to another active class
            const isAssigned = existingClasses?.some(cls =>
                cls.status === "Active" &&
                cls.room?.id === room.id &&
                cls.id !== formData.id // Exclude current class if editing
            );

            if (isAssigned) {
                assigned.push(room);
            } else {
                available.push(room);
            }
        });

        // Also add currently selected room to available list if it was cleared by the above logic
        if (formData.room?.id && !available.find(r => r.id === formData.room.id)) {
            const currentRoom = rooms.find(r => r.id === formData.room.id);
            if (currentRoom) available.push(currentRoom);
        }

        return { availableRooms: available, assignedRooms: assigned };
    }, [rooms, existingClasses, formData.room?.id, formData.id]);

    // Sorting: Available first, then by name
    const sortedRooms = [...availableRooms].sort((a, b) => a.roomName.localeCompare(b.roomName));

    return (
        <div className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Room Assignment
            </h4>

            {/* Context Info */}
            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-lg p-4 mb-6">
                <div className="flex gap-2 text-sm text-blue-700 dark:text-blue-400">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p>
                        Showing rooms available for Academic Year <strong>{formData.academicYear}</strong>.
                        Rooms already assigned to active classes are hidden from the main list.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Classroom
                    </label>
                    <div className="relative">
                        <select
                            value={formData.room?.id || ""}
                            onChange={handleRoomChange}
                            className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white ${!formData.room ? "text-gray-500" : ""
                                }`}
                        >
                            <option value="">Select Room</option>
                            {sortedRooms.map((room) => (
                                <option key={room.id} value={room.id}>
                                    {room.roomName} ({room.roomType}) - Cap: {room.capacity}
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-10 top-2.5 pointer-events-none">
                            <span className="text-xs text-gray-400">
                                {sortedRooms.length} available
                            </span>
                        </div>
                    </div>
                    {/* Error message for room conflict if forcefully set (edge case) */}
                    {formData.room && assignedRooms.find(r => r.id === formData.room.id) && (
                        <p className="mt-1 text-sm text-red-500">
                            Warning: This room is marked as assigned in another active class.
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Room Allocation Note
                    </label>
                    <input
                        type="text"
                        name="roomNote"
                        value={formData.roomNote}
                        onChange={handleChange}
                        placeholder="e.g., Temporary shift every Friday"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                    />
                </div>
            </div>

            {/* Selected Room Preview Card */}
            {formData.room ? (
                <div className="mt-4 p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h5 className="text-md font-bold text-gray-900 dark:text-white">
                                {formData.room.block}-{formData.room.floor}-{formData.room.roomNumber}
                            </h5>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {formData.room.roomType || "Classroom"}
                            </p>
                        </div>
                        <Badge
                            color={assignedRooms.find(r => r.id === formData.room.id) ? "warning" : "success"}
                        >
                            {assignedRooms.find(r => r.id === formData.room.id) ? "Conflict" : "Available"}
                        </Badge>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                        <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                            <span className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Block</span>
                            <span className="font-medium text-gray-900 dark:text-gray-200">{formData.room.block}</span>
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                            <span className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Floor</span>
                            <span className="font-medium text-gray-900 dark:text-gray-200">{formData.room.floor}</span>
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                            <span className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Room No</span>
                            <span className="font-medium text-gray-900 dark:text-gray-200">{formData.room.roomNumber}</span>
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                            <span className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Capacity</span>
                            <span className="font-medium text-gray-900 dark:text-gray-200">{formData.room.capacity} students</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="mt-4 p-8 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl text-center">
                    <div className="mx-auto w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-3">
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">
                        No room selected. Please choose a classroom from the list above.
                    </p>
                </div>
            )}
        </div>
    );
};

export default StepRoomAssignment;
