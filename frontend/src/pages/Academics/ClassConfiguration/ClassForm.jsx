import React, { useState, useEffect } from "react";

const ClassForm = ({ onSave, onCancel, initialData, teachers, rooms, existingClasses }) => {
    const [formData, setFormData] = useState({
        className: "",
        academicYear: "2025-2026",
        grade: "",
        section: "",
        board: "CBSE",
        medium: "English",
        room: null,
        roomNote: "",
        classTeacher: null,
        coClassTeacher: null,
        allowTeacherLater: false,
        maxStudents: 40,
        currentStrength: 0,
        classType: "Regular",
        status: "Draft",
        specialNotes: ""
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));

        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleRoomChange = (e) => {
        const roomId = e.target.value;
        if (!roomId) {
            setFormData(prev => ({ ...prev, room: null }));
            return;
        }

        const selectedRoom = rooms.find(r => r.id === roomId);
        if (selectedRoom) {
            setFormData(prev => ({
                ...prev,
                room: {
                    id: selectedRoom.id,
                    block: selectedRoom.blockName,
                    floor: selectedRoom.floorNumber,
                    roomNumber: selectedRoom.roomNumber,
                    capacity: selectedRoom.capacity
                },
                maxStudents: selectedRoom.capacity // Auto-set max students to room capacity
            }));
        }
    };

    const handleTeacherChange = (e, field) => {
        const teacherId = e.target.value;
        if (!teacherId) {
            setFormData(prev => ({ ...prev, [field]: null }));
            return;
        }

        const selectedTeacher = teachers.find(t => t.id === teacherId);
        if (selectedTeacher) {
            setFormData(prev => ({
                ...prev,
                [field]: {
                    id: selectedTeacher.id,
                    name: selectedTeacher.name
                }
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Required fields
        if (!formData.grade) newErrors.grade = "Grade is required";
        if (!formData.section) newErrors.section = "Section is required";

        // Teacher validation
        if (!formData.allowTeacherLater && !formData.classTeacher) {
            newErrors.classTeacher = "Class Teacher is required (or enable 'Allow Teacher Later')";
        }

        // Room validation
        if (formData.room) {
            // Check if room is already assigned to another class
            const roomConflict = existingClasses.find(cls =>
                cls.id !== initialData?.id &&
                cls.room?.id === formData.room.id &&
                cls.status === "Active"
            );

            if (roomConflict) {
                newErrors.room = `Room already assigned to ${roomConflict.className}`;
            }

            // Check capacity
            if (formData.maxStudents > formData.room.capacity) {
                newErrors.maxStudents = `Cannot exceed room capacity (${formData.room.capacity})`;
            }
        }

        // Teacher assignment validation
        if (formData.classTeacher) {
            const teacherConflict = existingClasses.find(cls =>
                cls.id !== initialData?.id &&
                cls.classTeacher?.id === formData.classTeacher.id &&
                cls.status === "Active"
            );

            if (teacherConflict) {
                newErrors.classTeacher = `Teacher already assigned to ${teacherConflict.className}`;
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        // Auto-generate className
        const className = `${formData.grade}-${formData.section}`;

        onSave({ ...formData, className });
    };

    // Filter available rooms (not assigned or assigned to current class)
    const availableRooms = rooms.filter(room =>
        room.status === "Available" ||
        room.id === initialData?.room?.id
    );

    // Filter available teachers (not assigned or assigned to current class)
    const availableTeachers = teachers.filter(teacher =>
        !teacher.isClassTeacher ||
        teacher.id === initialData?.classTeacher?.id
    );

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-white/[0.05] p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    {initialData ? "Edit Class" : "Create New Class"}
                </h3>
                <button onClick={onCancel} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Academic Year <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="academicYear"
                            value={formData.academicYear}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Grade <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="grade"
                            required
                            value={formData.grade}
                            onChange={handleChange}
                            className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white ${errors.grade ? 'border-red-500' : 'border-gray-300'}`}
                        >
                            <option value="">Select Grade</option>
                            {Array.from({ length: 12 }, (_, i) => i + 1).map((grade) => (
                                <option key={grade} value={grade}>
                                    Grade {grade}
                                </option>
                            ))}
                        </select>
                        {errors.grade && <p className="mt-1 text-sm text-red-500">{errors.grade}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Section <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="section"
                            required
                            value={formData.section}
                            onChange={handleChange}
                            className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white ${errors.section ? 'border-red-500' : 'border-gray-300'}`}
                        >
                            <option value="">Select Section</option>
                            {["A", "B", "C", "D", "E"].map((section) => (
                                <option key={section} value={section}>
                                    Section {section}
                                </option>
                            ))}
                        </select>
                        {errors.section && <p className="mt-1 text-sm text-red-500">{errors.section}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Board
                        </label>
                        <select
                            name="board"
                            value={formData.board}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                        >
                            <option value="CBSE">CBSE</option>
                            <option value="ICSE">ICSE</option>
                            <option value="IGCSE">IGCSE</option>
                            <option value="State">State Board</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Medium
                        </label>
                        <select
                            name="medium"
                            value={formData.medium}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                        >
                            <option value="English">English</option>
                            <option value="Hindi">Hindi</option>
                            <option value="Gujarati">Gujarati</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Class Type
                        </label>
                        <select
                            name="classType"
                            value={formData.classType}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                        >
                            <option value="Regular">Regular</option>
                            <option value="Honors">Honors</option>
                            <option value="Remedial">Remedial</option>
                        </select>
                    </div>
                </div>

                {/* Room Assignment */}
                <div className="border-t border-gray-100 dark:border-gray-700 pt-6">
                    <h4 className="text-md font-semibold text-gray-800 dark:text-white mb-4">Room Assignment</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Default Room
                            </label>
                            <select
                                value={formData.room?.id || ""}
                                onChange={handleRoomChange}
                                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white ${errors.room ? 'border-red-500' : 'border-gray-300'}`}
                            >
                                <option value="">Select Room</option>
                                {availableRooms.map((room) => (
                                    <option key={room.id} value={room.id}>
                                        {room.roomName} (Capacity: {room.capacity})
                                    </option>
                                ))}
                            </select>
                            {errors.room && <p className="mt-1 text-sm text-red-500">{errors.room}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Room Note
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
                </div>

                {/* Teacher Assignment */}
                <div className="border-t border-gray-100 dark:border-gray-700 pt-6">
                    <h4 className="text-md font-semibold text-gray-800 dark:text-white mb-4">Teacher Assignment</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Class Teacher {!formData.allowTeacherLater && <span className="text-red-500">*</span>}
                            </label>
                            <select
                                value={formData.classTeacher?.id || ""}
                                onChange={(e) => handleTeacherChange(e, 'classTeacher')}
                                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white ${errors.classTeacher ? 'border-red-500' : 'border-gray-300'}`}
                            >
                                <option value="">Select Teacher</option>
                                {availableTeachers.map((teacher) => (
                                    <option key={teacher.id} value={teacher.id}>
                                        {teacher.name} ({teacher.department})
                                    </option>
                                ))}
                            </select>
                            {errors.classTeacher && <p className="mt-1 text-sm text-red-500">{errors.classTeacher}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Co-Class Teacher
                            </label>
                            <select
                                value={formData.coClassTeacher?.id || ""}
                                onChange={(e) => handleTeacherChange(e, 'coClassTeacher')}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                            >
                                <option value="">Select Co-Teacher</option>
                                {teachers.map((teacher) => (
                                    <option key={teacher.id} value={teacher.id}>
                                        {teacher.name} ({teacher.department})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-span-2">
                            <label className="flex items-center space-x-3 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    name="allowTeacherLater"
                                    checked={formData.allowTeacherLater}
                                    onChange={handleChange}
                                    className="w-4 h-4 text-brand-600 border-gray-300 rounded focus:ring-brand-500"
                                />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Allow saving without teacher assignment (Draft mode)
                                </span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Capacity */}
                <div className="border-t border-gray-100 dark:border-gray-700 pt-6">
                    <h4 className="text-md font-semibold text-gray-800 dark:text-white mb-4">Capacity</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Max Students
                            </label>
                            <input
                                type="number"
                                name="maxStudents"
                                value={formData.maxStudents}
                                onChange={handleChange}
                                min="1"
                                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white ${errors.maxStudents ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.maxStudents && <p className="mt-1 text-sm text-red-500">{errors.maxStudents}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Current Strength
                            </label>
                            <input
                                type="number"
                                name="currentStrength"
                                value={formData.currentStrength}
                                onChange={handleChange}
                                min="0"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                            />
                        </div>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="border-t border-gray-100 dark:border-gray-700 pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Status
                            </label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                            >
                                <option value="Draft">Draft</option>
                                <option value="Active">Active</option>
                                <option value="Archived">Archived</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Special Notes
                            </label>
                            <input
                                type="text"
                                name="specialNotes"
                                value={formData.specialNotes}
                                onChange={handleChange}
                                placeholder="e.g., Smart classroom enabled"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 dark:border-gray-700">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-5 py-2.5 text-sm font-medium text-white bg-brand-600 rounded-lg hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-sm"
                    >
                        {initialData ? "Update Class" : "Create Class"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ClassForm;
