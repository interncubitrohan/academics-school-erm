import React, { useState } from "react";
import Badge from "../../../components/ui/badge/Badge";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const PERIODS = [
    { id: 1, label: "08:00 - 09:00", type: "academic" },
    { id: 2, label: "09:00 - 10:00", type: "academic" },
    { id: 3, label: "10:00 - 10:15", type: "break", name: "Short Break" },
    { id: 4, label: "10:15 - 11:15", type: "academic" },
    { id: 5, label: "11:15 - 12:15", type: "academic" },
    { id: 6, label: "12:15 - 01:00", type: "break", name: "Lunch Break" },
    { id: 7, label: "01:00 - 02:00", type: "academic" },
    { id: 8, label: "02:00 - 03:00", type: "academic" },
];

const TimetableTab = ({ subjects = [] }) => {
    // State: { "day-periodId": { subjectId, teacher, room } }
    const [schedule, setSchedule] = useState({});
    const [selectedSlot, setSelectedSlot] = useState(null); // { day, periodId }
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form State for modal
    const [formData, setFormData] = useState({
        subjectId: "",
        teacher: "",
        room: "",
    });

    const handleSlotClick = (day, period) => {
        if (period.type === "break") return;

        const slotKey = `${day}-${period.id}`;
        const existingData = schedule[slotKey];

        setSelectedSlot({ day, periodId: period.id, label: period.label });

        if (existingData) {
            setFormData({
                subjectId: existingData.subjectId,
                teacher: existingData.teacher,
                room: existingData.room,
            });
        } else {
            setFormData({
                subjectId: "",
                teacher: "",
                room: "",
            });
        }
        setIsModalOpen(true);
    };

    const handleSubjectChange = (e) => {
        const subId = e.target.value;
        const subject = subjects.find(s => s.id === parseInt(subId));
        setFormData({
            ...formData,
            subjectId: subId,
            teacher: subject ? subject.teacher : "", // Auto-fill default teacher
        });
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (!selectedSlot) return;

        const slotKey = `${selectedSlot.day}-${selectedSlot.periodId}`;
        setSchedule({
            ...schedule,
            [slotKey]: {
                subjectId: formData.subjectId,
                teacher: formData.teacher,
                room: formData.room,
            }
        });
        handleCloseModal();
    };

    const handleClearSlot = () => {
        if (!selectedSlot) return;
        const slotKey = `${selectedSlot.day}-${selectedSlot.periodId}`;
        const newSchedule = { ...schedule };
        delete newSchedule[slotKey];
        setSchedule(newSchedule);
        handleCloseModal();
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedSlot(null);
    };

    const getSlotContent = (day, periodId) => {
        const data = schedule[`${day}-${periodId}`];
        if (!data) return null;

        const subject = subjects.find(s => s.id === parseInt(data.subjectId));
        return (
            <div className="flex flex-col gap-1">
                <span className="font-bold text-gray-800 dark:text-white text-sm truncate">
                    {subject ? subject.name : "Unknown Subject"}
                </span>
                <span className="text-xs text-brand-500 truncate">{data.teacher}</span>
                <span className="text-xs text-gray-400 truncate">{data.room}</span>
            </div>
        );
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">Timetable Strategy</h3>
                <button className="px-4 py-2 text-sm font-medium text-brand-600 border border-brand-600 rounded-lg hover:bg-brand-50 dark:hover:bg-gray-800">
                    Auto-Generate
                </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <table className="w-full min-w-[800px] border-collapse">
                    <thead>
                        <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                            <th className="p-4 text-left font-medium text-gray-500 text-sm w-32 sticky left-0 bg-gray-50 dark:bg-gray-800 z-10">Time / Day</th>
                            {DAYS.map(day => (
                                <th key={day} className="p-4 text-center font-medium text-gray-800 dark:text-white text-sm border-l border-gray-200 dark:border-gray-700 w-1/5">
                                    {day}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {PERIODS.map(period => (
                            <tr key={period.id} className="border-b border-gray-100 dark:border-gray-700 last:border-0">
                                <td className="p-4 text-left font-medium text-gray-500 text-xs w-32 sticky left-0 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-700">
                                    {period.label}
                                </td>
                                {period.type === "break" ? (
                                    <td colSpan={5} className="bg-gray-100 dark:bg-gray-800/50 p-2 text-center text-xs font-bold text-gray-400 tracking-widest uppercase">
                                        {period.name}
                                    </td>
                                ) : (
                                    DAYS.map(day => (
                                        <td
                                            key={`${day}-${period.id}`}
                                            onClick={() => handleSlotClick(day, period)}
                                            className="p-2 border-l border-gray-100 dark:border-gray-700 h-24 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors relative group"
                                        >
                                            <div className="h-full w-full flex items-center justify-center p-1 rounded-lg">
                                                {getSlotContent(day, period.id) || (
                                                    <span className="opacity-0 group-hover:opacity-100 text-gray-300 text-2xl font-light">+</span>
                                                )}
                                            </div>
                                        </td>
                                    ))
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Assignment Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md p-6">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                            {selectedSlot?.day}
                        </h3>
                        <p className="text-sm text-gray-500 mb-4">{selectedSlot?.label}</p>

                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Subject
                                </label>
                                <select
                                    required
                                    value={formData.subjectId}
                                    onChange={handleSubjectChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                >
                                    <option value="">Select Subject</option>
                                    {subjects.map(s => (
                                        <option key={s.id} value={s.id}>{s.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Teacher
                                </label>
                                <input
                                    type="text"
                                    value={formData.teacher}
                                    onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
                                    placeholder="Teacher Name"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Room
                                </label>
                                <input
                                    type="text"
                                    value={formData.room}
                                    onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                                    placeholder="e.g. Room 101"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                            </div>

                            <div className="flex justify-between mt-6">
                                <button
                                    type="button"
                                    onClick={handleClearSlot}
                                    className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                                >
                                    Clear Slot
                                </button>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={handleCloseModal}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 text-sm font-medium text-white bg-brand-600 rounded-lg hover:bg-brand-700"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TimetableTab;
