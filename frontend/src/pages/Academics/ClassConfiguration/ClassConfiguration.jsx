import React, { useState } from "react";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import ClassList from "./ClassList";
import ClassForm from "./ClassForm";
import ClassCreateWizard from "./ClassCreateWizard";
import { MOCK_CLASSES } from "../../../data/classData";
import { MOCK_TEACHERS } from "../../../data/teacherData";
import { MOCK_ROOMS } from "../../../data/roomData";

import { useNavigate } from "react-router";

const ClassConfiguration = () => {
    const navigate = useNavigate();
    const [view, setView] = useState("list"); // list, create, edit
    const [classes, setClasses] = useState(MOCK_CLASSES);
    const [currentClass, setCurrentClass] = useState(null);
    const [teachers, setTeachers] = useState(MOCK_TEACHERS);
    const [rooms, setRooms] = useState(MOCK_ROOMS);
    const [wizardKey, setWizardKey] = useState(0);

    const handleCreate = () => {
        setCurrentClass(null);
        setWizardKey(prev => prev + 1); // Reset wizard state
        setView("create");
    };

    const handleEdit = (cls) => {
        setCurrentClass(cls);
        setView("edit");
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this class?")) {
            setClasses(classes.filter((c) => c.id !== id));
        }
    };

    const handleSave = (classData, action = 'create') => {
        let updatedClasses;
        const isNew = !currentClass;
        // Ensure ID exists for new classes
        const savedClass = {
            ...classData,
            id: classData.id || `cls_${Date.now()}`
        };

        if (currentClass) {
            // Update existing
            updatedClasses = classes.map((c) =>
                c.id === currentClass.id ? savedClass : c
            );
        } else {
            // Create new
            updatedClasses = [...classes, savedClass];
        }

        setClasses(updatedClasses);

        // Update teacher assignments
        if (classData.classTeacher) {
            setTeachers(teachers.map(t =>
                t.id === classData.classTeacher.id
                    ? { ...t, isClassTeacher: true, assignedClass: savedClass.id }
                    : t
            ));
        }

        // Update room assignments
        if (classData.room) {
            setRooms(rooms.map(r =>
                r.id === classData.room.id
                    ? { ...r, status: "Assigned", assignedClass: savedClass.className }
                    : r
            ));
        }

        // Handle navigation based on action
        switch (action) {
            case 'create_another':
                // Stay in create mode, reset wizard
                setWizardKey(prev => prev + 1);
                break;
            case 'configure':
                // Navigate to details page
                navigate(`/academics/classes/${savedClass.id}`);
                break;
            case 'draft':
            case 'create':
            default:
                // Return to list
                setView("list");
                break;
        }
    };

    const handleCancel = () => {
        setView("list");
        setCurrentClass(null);
    };

    return (
        <>
            <PageMeta
                title="Class Configuration | School ERP"
                description="Manage classes, sections, and assignments"
            />
            <PageBreadcrumb pageTitle="Class Configuration" />

            {view === "list" ? (
                <ClassList
                    classes={classes}
                    onCreate={handleCreate}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            ) : view === "create" ? (
                <ClassCreateWizard
                    key={wizardKey}
                    onSave={handleSave}
                    onCancel={handleCancel}
                    teachers={teachers}
                    rooms={rooms}
                    existingClasses={classes}
                />
            ) : (
                <ClassForm
                    onSave={handleSave}
                    onCancel={handleCancel}
                    initialData={currentClass}
                    teachers={teachers}
                    rooms={rooms}
                    existingClasses={classes}
                />
            )}
        </>
    );
};

export default ClassConfiguration;
