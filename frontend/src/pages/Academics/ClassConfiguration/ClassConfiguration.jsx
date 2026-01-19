import React, { useState } from "react";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import ClassList from "./ClassList";
import ClassForm from "./ClassForm";

// Mock Data
const initialClasses = [
    { id: 1, name: "Class 1-A", grade: "1", section: "A", board: "CBSE", teacher: "Sarah Williams", room: "Room 101" },
    { id: 2, name: "Class 2-B", grade: "2", section: "B", board: "CBSE", teacher: "John Smith", room: "Room 102" },
    { id: 3, name: "Class 10-C", grade: "10", section: "C", board: "IGCSE", teacher: "Emily Davis", room: "Lab 3" },
];

const mockTeachers = [
    { id: 1, name: "Sarah Williams" },
    { id: 2, name: "John Smith" },
    { id: 3, name: "Emily Davis" },
    { id: 4, name: "Michael Brown" },
];

const mockRooms = [
    { id: 1, name: "Room 101" },
    { id: 2, name: "Room 102" },
    { id: 3, name: "Room 103" },
    { id: 4, name: "Lab 1" },
    { id: 5, name: "Lab 2" },
    { id: 6, name: "Lab 3" },
];

const ClassConfiguration = () => {
    const [view, setView] = useState("list"); // list, create, edit
    const [classes, setClasses] = useState(initialClasses);
    const [currentClass, setCurrentClass] = useState(null);

    const handleCreate = () => {
        setCurrentClass(null);
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

    const handleSave = (classData) => {
        if (currentClass) {
            // Update existing
            setClasses(
                classes.map((c) =>
                    c.id === currentClass.id ? { ...classData, id: c.id } : c
                )
            );
        } else {
            // Create new
            setClasses([...classes, { ...classData, id: Date.now() }]);
        }
        setView("list");
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
            ) : (
                <ClassForm
                    onSave={handleSave}
                    onCancel={handleCancel}
                    initialData={currentClass}
                    teachers={mockTeachers}
                    rooms={mockRooms}
                />
            )}
        </>
    );
};

export default ClassConfiguration;
