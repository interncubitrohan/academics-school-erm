import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../../../components/ui/table";
import Badge from "../../../components/ui/badge/Badge";

// Mock Master Subjects
const masterSubjects = [
    { id: 101, name: "Mathematics", code: "MATH101", type: "Theory" },
    { id: 102, name: "Science", code: "SCI101", type: "Theory" },
    { id: 103, name: "English", code: "ENG101", type: "Theory" },
    { id: 104, name: "History", code: "HIS101", type: "Theory" },
    { id: 105, name: "Physics Lab", code: "PHY101", type: "Practical" },
    { id: 106, name: "Art", code: "ART101", type: "Co-Scholastic" },
    { id: 107, name: "Physical Education", code: "PE101", type: "Co-Scholastic" },
];

const CurriculumTab = ({ initialSubjects = [] }) => {
    const [subjects, setSubjects] = useState(initialSubjects);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        subjectId: "",
        teacher: "",
        sessions: "",
        type: "Mandatory", // Mandatory / Elective
        credits: "1",
    });

    const resetForm = () => {
        setFormData({
            subjectId: "",
            teacher: "",
            sessions: "",
            type: "Mandatory",
            credits: "1",
        });
        setEditingId(null);
    };

    const handleOpenModal = (subject = null) => {
        if (subject) {
            setEditingId(subject.id);
            // Reverse lookup subject ID from name for the dropdown
            const masterSubject = masterSubjects.find(s => s.name === subject.name);
            setFormData({
                subjectId: masterSubject ? masterSubject.id : "",
                teacher: subject.teacher,
                sessions: subject.sessions,
                type: subject.type || "Mandatory",
                credits: subject.credits || "1",
            });
        } else {
            resetForm();
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        resetForm();
    };

    const handleSave = (e) => {
        e.preventDefault();

        const selectedMasterSubject = masterSubjects.find(s => s.id === parseInt(formData.subjectId));
        if (!selectedMasterSubject) return;

        const newSubjectData = {
            id: editingId || Date.now(),
            name: selectedMasterSubject.name,
            teacher: formData.teacher,
            sessions: formData.sessions,
            type: formData.type,
            credits: formData.credits,
        };

        if (editingId) {
            setSubjects(subjects.map(s => s.id === editingId ? newSubjectData : s));
        } else {
            setSubjects([...subjects, newSubjectData]);
        }

        handleCloseModal();
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to remove this subject from the curriculum?")) {
            setSubjects(subjects.filter(s => s.id !== id));
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">Subject Mapping</h3>
                <button
                    onClick={() => handleOpenModal()}
                    className="px-4 py-2 text-sm font-medium text-white bg-brand-600 rounded-lg hover:bg-brand-700"
                >
                    + Add Subject
                </button>
            </div>
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <Table>
                    <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                        <TableRow>
                            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Subject Name</TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Default Teacher</TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Type</TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Credits</TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Weekly Sessions</TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Actions</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                        {subjects.map((subject) => (
                            <TableRow key={subject.id}>
                                <TableCell className="px-5 py-4 text-start font-medium text-gray-800 dark:text-white">{subject.name}</TableCell>
                                <TableCell className="px-5 py-4 text-start text-gray-500 dark:text-gray-400">{subject.teacher}</TableCell>
                                <TableCell className="px-5 py-4 text-start">
                                    <Badge color={subject.type === "Mandatory" ? "brand" : "info"} size="sm">
                                        {subject.type || "Mandatory"}
                                    </Badge>
                                </TableCell>
                                <TableCell className="px-5 py-4 text-start text-gray-500 dark:text-gray-400">{subject.credits || "-"}</TableCell>
                                <TableCell className="px-5 py-4 text-start text-gray-500 dark:text-gray-400">{subject.sessions}</TableCell>
                                <TableCell className="px-5 py-4 text-start">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleOpenModal(subject)}
                                            className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(subject.id)}
                                            className="text-red-500 hover:text-red-700 text-sm font-medium"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                        {subjects.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="px-5 py-8 text-center text-gray-500 dark:text-gray-400">
                                    No subjects mapped yet. Click "Add Subject" to begin.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-lg p-6">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                            {editingId ? "Edit Subject Mapping" : "Add Subject to Curriculum"}
                        </h3>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Subject
                                </label>
                                <select
                                    name="subjectId"
                                    required
                                    value={formData.subjectId}
                                    onChange={(e) => setFormData({ ...formData, subjectId: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                >
                                    <option value="">Select Subject</option>
                                    {masterSubjects.map(s => (
                                        <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Subject Type
                                    </label>
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    >
                                        <option value="Mandatory">Mandatory</option>
                                        <option value="Elective">Elective</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Credit Hours
                                    </label>
                                    <input
                                        name="credits"
                                        type="number"
                                        min="0"
                                        step="0.5"
                                        value={formData.credits}
                                        onChange={(e) => setFormData({ ...formData, credits: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Default Teacher
                                    </label>
                                    <input
                                        name="teacher"
                                        type="text"
                                        value={formData.teacher}
                                        onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
                                        placeholder="Teacher Name"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Weekly Sessions
                                    </label>
                                    <input
                                        name="sessions"
                                        type="number"
                                        min="1"
                                        required
                                        value={formData.sessions}
                                        onChange={(e) => setFormData({ ...formData, sessions: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
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
                                    {editingId ? "Update Subject" : "Add Subject"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CurriculumTab;
