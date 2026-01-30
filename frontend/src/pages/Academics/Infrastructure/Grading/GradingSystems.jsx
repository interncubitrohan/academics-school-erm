import React, { useState } from "react";
import PageBreadcrumb from "../../../../components/common/PageBreadCrumb";
import PageMeta from "../../../../components/common/PageMeta";
import GradingScaleList from "./GradingScaleList";
import GradingScaleForm from "./GradingScaleForm";
import ViewGradingScale from "./ViewGradingScale";

// Mock Data matching the new Data Model
export const mockGradingScales = [
    {
        id: 1,
        scaleName: "CBSE Secondary School Grading (IX-X)",
        board: "CBSE",
        applicableGrades: ["IX", "X"],
        scaleType: "GPA", // Often converted to Grade Points in CBSE
        isDefault: true,
        linkedExamCount: 5, // Mock data: Linked to 5 exams
        status: "Active",
        gradeBands: [
            { grade: "A1", minValue: 91, maxValue: 100, points: 10.0, remarks: "Outstanding" },
            { grade: "A2", minValue: 81, maxValue: 90, points: 9.0, remarks: "Excellent" },
            { grade: "B1", minValue: 71, maxValue: 80, points: 8.0, remarks: "Very Good" },
            { grade: "B2", minValue: 61, maxValue: 70, points: 7.0, remarks: "Good" },
            { grade: "C1", minValue: 51, maxValue: 60, points: 6.0, remarks: "Average" },
            { grade: "C2", minValue: 41, maxValue: 50, points: 5.0, remarks: "Below Average" },
            { grade: "D", minValue: 33, maxValue: 40, points: 4.0, remarks: "Marginal" },
            { grade: "E", minValue: 0, maxValue: 32, points: 0.0, remarks: "Needs Improvement" }
        ]
    },
    {
        id: 2,
        scaleName: "Primary General Grading",
        board: "State Board",
        applicableGrades: ["I", "II", "III", "IV", "V"],
        scaleType: "Percentage",
        isDefault: false,
        status: "Active",
        gradeBands: [
            { grade: "O", minValue: 85, maxValue: 100, points: null, remarks: "Outstanding" },
            { grade: "A", minValue: 70, maxValue: 84, points: null, remarks: "Very Good" },
            { grade: "B", minValue: 55, maxValue: 69, points: null, remarks: "Good" },
            { grade: "C", minValue: 40, maxValue: 54, points: null, remarks: "Average" },
            { grade: "D", minValue: 0, maxValue: 39, points: null, remarks: "Fail" }
        ]
    },
    {
        id: 3,
        scaleName: "Co-Scholastic 5-Point Scale",
        board: "Generic",
        applicableGrades: ["VI", "VII", "VIII"],
        scaleType: "Grade-only",
        isDefault: false,
        status: "Active",
        gradeBands: [
            { grade: "A", minValue: 5, maxValue: 5, points: 5, remarks: "Highly Competent" },
            { grade: "B", minValue: 4, maxValue: 4, points: 4, remarks: "Competent" },
            { grade: "C", minValue: 3, maxValue: 3, points: 3, remarks: "Developing" },
            { grade: "D", minValue: 2, maxValue: 2, points: 2, remarks: "Emerging" },
            { grade: "E", minValue: 1, maxValue: 1, points: 1, remarks: "Beginner" }
        ]
    }
];

const GradingSystems = () => {
    const [view, setView] = useState("list"); // list, create, edit
    const [scales, setScales] = useState(mockGradingScales);
    const [currentScale, setCurrentScale] = useState(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [viewScale, setViewScale] = useState(null);

    const handleCreate = () => {
        setCurrentScale(null);
        setView("create");
    };

    const handleEdit = (scale) => {
        setCurrentScale(scale);
        setView("edit");
    };

    const handleDuplicate = (scale) => {
        const newScale = {
            ...scale,
            id: null, // Reset ID so it's treated as a new entry
            scaleName: `${scale.scaleName} (Copy)`,
            isDefault: false, // Clone should not default to being the default scale
        };
        setCurrentScale(newScale);
        setView("create"); // Open the form view directly
    };

    const handleView = (scale) => {
        setViewScale(scale);
        setIsViewModalOpen(true);
    };

    const handleDelete = (id) => {
        const scaleToDelete = scales.find(s => s.id === id);

        if (!scaleToDelete) return;

        if (scaleToDelete.isDefault) {
            alert("Cannot delete the default grading scale. Please set another scale as default first.");
            return;
        }

        // Mock check for linked exams
        if (scaleToDelete.linkedExamCount && scaleToDelete.linkedExamCount > 0) {
            alert(`Cannot delete this scale as it is currently linked to ${scaleToDelete.linkedExamCount} exam(s).`);
            return;
        }

        if (window.confirm("Are you sure you want to delete this grading scale?")) {
            setScales(scales.filter((scale) => scale.id !== id));
        }
    };

    const handleSave = (scaleData) => {
        if (currentScale && currentScale.id) {
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
                        onDuplicate={handleDuplicate}
                        onView={handleView}
                        onDelete={handleDelete}
                    />
                ) : (
                    <GradingScaleForm
                        onSave={handleSave}
                        onCancel={handleCancel}
                        initialData={currentScale}
                    />
                )}
            </div>

            <ViewGradingScale
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                scale={viewScale}
            />
        </>
    );
};

export default GradingSystems;

