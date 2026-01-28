import React, { useState } from "react";
import { Modal } from "../../../components/ui/modal";
import Badge from "../../../components/ui/badge/Badge";

const SubjectGrouping = ({ subjects, groups, setGroups, setSubjects }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentGroup, setCurrentGroup] = useState(null); // Editing group
    const [groupForm, setGroupForm] = useState({
        groupName: "",
        minSelect: 0,
        maxSelect: 1,
        selectedSubjectIds: []
    });

    // Filter only optional subjects for grouping
    const optionalSubjects = subjects.filter(s => s.isOptional);
    const availableForGrouping = optionalSubjects;
    // In a stricter version, we might hide subjects already in OTHER groups, 
    // but here we might want to allow moving them, so we show all optionals.

    const handleOpenModal = (group = null) => {
        if (group) {
            setCurrentGroup(group);
            setGroupForm({
                groupName: group.groupName,
                minSelect: group.minSelect,
                maxSelect: group.maxSelect,
                selectedSubjectIds: subjects.filter(s => s.groupId === group.groupId).map(s => s.id)
            });
        } else {
            setCurrentGroup(null);
            setGroupForm({
                groupName: "",
                minSelect: 0,
                maxSelect: 1,
                selectedSubjectIds: []
            });
        }
        setIsModalOpen(true);
    };

    const handleSaveGroup = (e) => {
        e.preventDefault();

        // Validation
        if (Number(groupForm.minSelect) > Number(groupForm.maxSelect)) {
            alert("Min Select cannot be greater than Max Select");
            return;
        }

        const groupId = currentGroup ? currentGroup.groupId : `grp_${Date.now()}`;

        const newGroup = {
            groupId,
            groupName: groupForm.groupName,
            minSelect: Number(groupForm.minSelect),
            maxSelect: Number(groupForm.maxSelect),
            subjectCodes: [] // We technically track this via mapping, but kept for schema compliance
        };

        if (currentGroup) {
            setGroups(groups.map(g => g.groupId === groupId ? newGroup : g));
        } else {
            setGroups([...groups, newGroup]);
        }

        // Update Subjects with groupId
        setSubjects(prevSubjects => prevSubjects.map(sub => {
            // If subject was in this group but designated to be removed (unselected)
            if (sub.groupId === groupId && !groupForm.selectedSubjectIds.includes(sub.id)) {
                return { ...sub, groupId: null };
            }
            // If subject is selected for this group
            if (groupForm.selectedSubjectIds.includes(sub.id)) {
                return { ...sub, groupId };
            }
            return sub;
        }));

        setIsModalOpen(false);
    };

    const handleDeleteGroup = (groupId) => {
        if (window.confirm("Delete this group? Subjects will become standalone electives.")) {
            // Remove Group
            setGroups(groups.filter(g => g.groupId !== groupId));
            // Unlink Subjects
            setSubjects(prev => prev.map(s => s.groupId === groupId ? { ...s, groupId: null } : s));
        }
    };

    const toggleSubjectSelection = (subjectId) => {
        setGroupForm(prev => {
            const exists = prev.selectedSubjectIds.includes(subjectId);
            return {
                ...prev,
                selectedSubjectIds: exists
                    ? prev.selectedSubjectIds.filter(id => id !== subjectId)
                    : [...prev.selectedSubjectIds, subjectId]
            };
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                        Step 4: Elective Groups
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Group optional subjects (e.g., "Second Language") and define selection rules.
                    </p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="px-4 py-2 text-sm font-medium text-white bg-brand-600 rounded-lg hover:bg-brand-700 flex items-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                    Create Group
                </button>
            </div>

            {/* Groups List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {groups.map(group => {
                    const groupSubjects = subjects.filter(s => s.groupId === group.groupId);
                    return (
                        <div key={group.groupId} className="border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 p-5 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h4 className="font-bold text-gray-800 dark:text-white text-lg">{group.groupName}</h4>
                                    <p className="text-xs text-brand-600 bg-brand-50 px-2 py-0.5 rounded-md inline-block mt-1 font-medium">
                                        Select Min {group.minSelect} - Max {group.maxSelect}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleOpenModal(group)}
                                        className="p-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                    </button>
                                    <button
                                        onClick={() => handleDeleteGroup(group.groupId)}
                                        className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                {groupSubjects.map(sub => (
                                    <div key={sub.id} className="flex items-center justify-between text-sm p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                        <span className="text-gray-800 dark:text-gray-200 font-medium">{sub.subjectName}</span>
                                        <span className="text-xs text-gray-500 font-mono">{sub.subjectCode}</span>
                                    </div>
                                ))}
                                {groupSubjects.length === 0 && (
                                    <p className="text-sm text-gray-400 italic py-2 text-center">No subjects assigned yet.</p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Ungrouped Optional Subjects Warning */}
            {optionalSubjects.filter(s => !s.groupId).length > 0 && (
                <div className="bg-amber-50 mx-auto rounded-lg p-4 border border-amber-200 flex items-start gap-3">
                    <svg className="w-5 h-5 text-amber-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    <div>
                        <h5 className="text-sm font-bold text-amber-800">Ungrouped Electives</h5>
                        <p className="text-sm text-amber-700 mt-1">
                            The following subjects are marked as Optional but not assigned to any group:
                            <span className="font-semibold ml-1">
                                {optionalSubjects.filter(s => !s.groupId).map(s => s.subjectName).join(", ")}
                            </span>.
                            They will be treated as standalone optionals.
                        </p>
                    </div>
                </div>
            )}

            {groups.length === 0 && (
                <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl dark:border-gray-700">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 dark:bg-gray-800">
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                    </div>
                    <h5 className="font-medium text-gray-900 dark:text-white">No Groups Defined</h5>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-4">Create a group to organize elective subjects.</p>
                </div>
            )}

            {/* Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className="max-w-[500px] p-6 rounded-xl">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                    {currentGroup ? "Edit Group" : "Create New Group"}
                </h3>
                <form onSubmit={handleSaveGroup} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Group Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            value={groupForm.groupName}
                            onChange={(e) => setGroupForm({ ...groupForm, groupName: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                            placeholder="e.g. Second Language"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Min Selections
                            </label>
                            <input
                                type="number"
                                min="0"
                                value={groupForm.minSelect}
                                onChange={(e) => setGroupForm({ ...groupForm, minSelect: Number(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Max Selections
                            </label>
                            <input
                                type="number"
                                min="1"
                                value={groupForm.maxSelect}
                                onChange={(e) => setGroupForm({ ...groupForm, maxSelect: Number(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Select Subjects in this Group
                        </label>
                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg max-h-[200px] overflow-y-auto">
                            {availableForGrouping.length === 0 ? (
                                <p className="p-4 text-sm text-gray-400 text-center">
                                    No optional subjects available. <br />Mark subjects as "Optional" in Step 3 first.
                                </p>
                            ) : (
                                availableForGrouping.map(sub => (
                                    <label key={sub.id} className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer border-b last:border-0 border-gray-100 dark:border-gray-700">
                                        <input
                                            type="checkbox"
                                            checked={groupForm.selectedSubjectIds.includes(sub.id)}
                                            onChange={() => toggleSubjectSelection(sub.id)}
                                            className="w-4 h-4 text-brand-600 rounded border-gray-300 focus:ring-brand-500"
                                        />
                                        <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">{sub.subjectName} ({sub.subjectCode})</span>
                                        {sub.groupId && sub.groupId !== (currentGroup?.groupId) && (
                                            <span className="ml-auto text-xs text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                                                Already in another group
                                            </span>
                                        )}
                                    </label>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-brand-600 rounded-lg hover:bg-brand-700"
                        >
                            Save Group
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default SubjectGrouping;
