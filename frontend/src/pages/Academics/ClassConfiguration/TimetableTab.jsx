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

            <div className="rounded-sm border border-gray-200 bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-gray-700 dark:bg-gray-800 sm:px-7.5 xl:pb-1">
                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-50 text-left dark:bg-gray-700">
                                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">Time / Day</th>
                                {DAYS.map(day => (
                                    <th key={day} className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white text-center">
                                        {day}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {PERIODS.map(period => (
                                <tr key={period.id}>
                                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-gray-700 xl:pl-11">
                                        <h5 className="font-medium text-black dark:text-white">{period.label}</h5>
                                    </td>
                                    {period.type === "break" ? (
                                        <td colSpan={6} className="bg-gray-50 dark:bg-gray-700/50 p-2 text-center text-xs font-bold text-gray-500 tracking-widest uppercase border-b border-[#eee] dark:border-gray-700">
                                            {period.name}
                                        </td>
                                    ) : (
                                        DAYS.map(day => (
                                            <td
                                                key={`${day}-${period.id}`}
                                                onClick={() => handleSlotClick(day, period)}
                                                className="border-b border-[#eee] py-5 px-4 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors relative group"
                                            >
                                                <div className="flex flex-col items-center justify-center p-1 rounded-lg">
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
