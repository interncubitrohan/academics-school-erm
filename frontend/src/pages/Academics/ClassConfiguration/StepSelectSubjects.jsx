import React, { useState, useMemo } from "react";
import Badge from "../../../components/ui/badge/Badge";
import { MOCK_SUBJECTS } from "../../../data/subjectData";
import CopyMappingModal from "./CopyMappingModal";
import { FiCopy } from "react-icons/fi"; // Added icon

const StepSelectSubjects = ({ selectedSubjectIds, setSelectedSubjectIds }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterBoard, setFilterBoard] = useState("All");
    const [filterType, setFilterType] = useState("All");
    const [showCopyModal, setShowCopyModal] = useState(false); // State for modal

    // Extract unique filter options from data
    const uniqueBoards = useMemo(() => Array.from(new Set(MOCK_SUBJECTS.flatMap(s => s.boards))), []);
    const uniqueTypes = useMemo(() => Array.from(new Set(MOCK_SUBJECTS.map(s => s.subjectType))), []);

    // Filter Logic
    const filteredSubjects = useMemo(() => {
        return MOCK_SUBJECTS.filter(subject => {
            const matchesSearch =
                subject.subjectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                subject.subjectCode.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesBoard = filterBoard === "All" || subject.boards.includes(filterBoard);
            const matchesType = filterType === "All" || subject.subjectType === filterType;

            return matchesSearch && matchesBoard && matchesType;
        });
    }, [searchTerm, filterBoard, filterType]);

    // Handle Toggle Selection
    const toggleSubject = (id) => {
        setSelectedSubjectIds(prev =>
            prev.includes(id)
                ? prev.filter(sId => sId !== id)
                : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        const visibleIds = filteredSubjects.map(s => s.id);
        const allVisibleSelected = visibleIds.every(id => selectedSubjectIds.includes(id));

        if (allVisibleSelected) {
            // Deselect all visible
            setSelectedSubjectIds(prev => prev.filter(id => !visibleIds.includes(id)));
        } else {
            // Select all visible (merge unique)
            setSelectedSubjectIds(prev => Array.from(new Set([...prev, ...visibleIds])));
        }
    };

    // Handle Copy from Modal
    const handleCopySubjects = (newSubjectIds) => {
        // Here we can choose to replace or merge. 
        // "Load into current state" usually implies replacement or smart merge.
        // Let's go with replacement but maybe warn user? 
        // For now, let's just set individual uniqueness.
        // But wait, if I copy, I probably want to START with that set.
        // Let's replace the selection with the copied set to match "Load existing mapping" mental model.
        // If user wants to keep existing, they likely wouldn't be "loading" a whole set.
        setSelectedSubjectIds(newSubjectIds);
    };

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                        Step 2: Select Subjects
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Choose subjects from the master list to add to this class curriculum.
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setShowCopyModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors shadow-sm"
                    >
                        <FiCopy className="w-4 h-4" />
                        <span className="text-sm font-medium">Copy Mapping</span>
                    </button>

                    <div className="flex items-center gap-3 px-4 py-2 bg-brand-50 text-brand-700 rounded-lg border border-brand-100 dark:bg-brand-900/20 dark:text-brand-300 dark:border-brand-800">
                        <span className="text-sm font-semibold">Selected:</span>
                        <span className="text-lg font-bold">{selectedSubjectIds.length}</span>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700 mb-6 space-y-4 md:space-y-0 md:flex md:gap-4">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Search by name or code..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                </div>

                <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="md:w-48 px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                    <option value="All">All Types</option>
                    {uniqueTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>

                <select
                    value={filterBoard}
                    onChange={(e) => setFilterBoard(e.target.value)}
                    className="md:w-48 px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                    <option value="All">All Boards</option>
                    {uniqueBoards.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
            </div>

            {/* List Header */}
            <div className="flex justify-between items-center mb-3 px-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Showing {filteredSubjects.length} subjects
                </p>
                {filteredSubjects.length > 0 && (
                    <button
                        onClick={handleSelectAll}
                        className="text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
                    >
                        {filteredSubjects.every(s => selectedSubjectIds.includes(s.id)) ? "Deselect All" : "Select All Visible"}
                    </button>
                )}
            </div>

            {/* Subjects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2">
                {filteredSubjects.map(subject => {
                    const isSelected = selectedSubjectIds.includes(subject.id);
                    return (
                        <div
                            key={subject.id}
                            onClick={() => toggleSubject(subject.id)}
                            className={`
                                relative flex items-start p-4 rounded-xl border cursor-pointer transition-all group
                                ${isSelected
                                    ? "border-brand-500 bg-brand-50 dark:bg-brand-900/20 dark:border-brand-500"
                                    : "border-gray-200 bg-white hover:border-brand-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600"
                                }
                            `}
                        >
                            <div className="flex items-center h-5 mt-1">
                                <input
                                    type="checkbox"
                                    checked={isSelected}
                                    readOnly
                                    className="w-5 h-5 text-brand-600 border-gray-300 rounded focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600"
                                />
                            </div>
                            <div className="ml-4 flex-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className={`text-base font-semibold ${isSelected ? "text-brand-800 dark:text-brand-200" : "text-gray-900 dark:text-white"}`}>
                                            {subject.subjectName}
                                        </h4>
                                        <p className="text-xs font-mono text-gray-500 dark:text-gray-400 mt-0.5">
                                            {subject.subjectCode}
                                        </p>
                                    </div>
                                    <Badge
                                        size="sm"
                                        color={subject.subjectType === "Theory" ? "primary" : subject.subjectType === "Practical" ? "warning" : "secondary"}
                                    >
                                        {subject.subjectType}
                                    </Badge>
                                </div>

                                <div className="mt-3 flex flex-wrap gap-2">
                                    {subject.boards.map(board => (
                                        <span key={board} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                                            {board}
                                        </span>
                                    ))}
                                    {subject.applicableGrades.length > 0 && (
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                                            Grades: {subject.applicableGrades.join(", ")}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}

                {filteredSubjects.length === 0 && (
                    <div className="col-span-full py-12 text-center border-2 border-dashed border-gray-200 rounded-xl dark:border-gray-700">
                        <p className="text-gray-500 dark:text-gray-400">No subjects found matching your filters.</p>
                        <button
                            onClick={() => { setSearchTerm(""); setFilterBoard("All"); setFilterType("All"); }}
                            className="mt-2 text-brand-600 font-medium hover:underline"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>

            {/* Copy Modal */}
            <CopyMappingModal
                isOpen={showCopyModal}
                onClose={() => setShowCopyModal(false)}
                onCopy={handleCopySubjects}
                currentYear="2025-2026" // Passed static as context suggests
                currentClassId="new" // Since we are creating/configuring, assume new or different ID
            />
        </div>
    );
};

export default StepSelectSubjects;
