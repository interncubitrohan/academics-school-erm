import React, { useState } from "react";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import GradingScaleList from "./GradingScaleList";
import GradingScaleBuilder from "./GradingScaleBuilder";

// Mock Data
const initialScales = [
    {
        id: 1,
        name: "Standard Percentage Scale",
        type: "Percentage",
        rules: [
            { id: 1, grade: "A+", min: 90, max: 100, points: 0 },
            { id: 2, grade: "A", min: 80, max: 89, points: 0 },
            { id: 3, grade: "B", min: 70, max: 79, points: 0 },
            { id: 4, grade: "C", min: 60, max: 69, points: 0 },
            { id: 5, grade: "F", min: 0, max: 59, points: 0 },
        ],
    },
    {
        id: 2,
        name: "4.0 GPA Scale",
        type: "GPA",
        rules: [
            { id: 1, grade: "A", min: 93, max: 100, points: 4.0 },
            { id: 2, grade: "A-", min: 90, max: 92, points: 3.7 },
            { id: 3, grade: "B+", min: 87, max: 89, points: 3.3 },
            { id: 4, grade: "B", min: 83, max: 86, points: 3.0 },
        ],
    },
];

const GradingSystems = () => {
    const [view, setView] = useState("list"); // list, create, edit
    const [scales, setScales] = useState(initialScales);
    const [currentScale, setCurrentScale] = useState(null);

    const handleCreate = () => {
        setCurrentScale(null);
        setView("create");
    };

    const handleEdit = (scale) => {
        setCurrentScale(scale);
        setView("edit");
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this grading scale?")) {
            setScales(scales.filter((scale) => scale.id !== id));
        }
    };

    const handleSave = (scaleData) => {
        if (currentScale) {
            // Update existing
            setScales(
                scales.map((s) =>
                    s.id === currentScale.id ? { ...scaleData, id: s.id } : s
                )
            );
        } else {
            // Create new
            setScales([...scales, { ...scaleData, id: Date.now() }]);
        }
        setView("list");
    };

    const handleCancel = () => {
        setView("list");
        setCurrentScale(null);
    };

    return (
        <>
            <PageMeta
                title="Grading Systems | School ERP"
                description="Manage grading scales and rules"
            />
            <PageBreadcrumb pageTitle="Grading Systems" />

            <div className="space-y-6">
                {view === "list" ? (
                    <GradingScaleList
                        scales={scales}
                        onCreate={handleCreate}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ) : (
                    <GradingScaleBuilder
                        onSave={handleSave}
                        onCancel={handleCancel}
                        initialData={currentScale}
                    />
                )}
            </div>
        </>
    );
};

export default GradingSystems;
