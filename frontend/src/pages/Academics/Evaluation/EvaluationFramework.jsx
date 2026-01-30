import React, { useState } from "react";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import EvaluationFrameworkList from "./EvaluationFrameworkList";
import EvaluationFrameworkForm from "./EvaluationFrameworkForm";
import ViewEvaluationFramework from "./ViewEvaluationFramework";

const initialFrameworks = [
    {
        id: 1,
        frameworkName: "CBSE Secondary School Evaluation",
        board: "CBSE",
        applicableGrades: ["IX", "X"],
        academicYear: "2025-2026",
        gradingScale: "CBSE 9-Point Scale",
        status: "Active",
        isDefault: true,
        overallPassingCriteria: {
            minTotalPercentage: 33,
        },
        assessmentComponents: [
            { componentName: "Internal Assessment", weightage: 20 },
            { componentName: "Year End Examination", weightage: 80 }
        ]
    },
    {
        id: 2,
        frameworkName: "Primary General Assessment",
        board: "State Board",
        applicableGrades: ["I", "II", "III", "IV", "V"],
        academicYear: "2025-2026",
        gradingScale: "5-Point Grading",
        status: "Active",
        isDefault: false,
        overallPassingCriteria: {
            minTotalPercentage: 35,
        },
        assessmentComponents: [
            { componentName: "Term 1", weightage: 50 },
            { componentName: "Term 2", weightage: 50 }
        ]
    },
    {
        id: 3,
        frameworkName: "Kindergarten Activity Based",
        board: "Generic",
        applicableGrades: ["Nursery", "LKG", "UKG"],
        academicYear: "2025-2026",
        gradingScale: "Star Rating",
        status: "Active",
        isDefault: false,
        overallPassingCriteria: {
            minTotalPercentage: 0,
        },
        assessmentComponents: [
            { componentName: "Continuous Observation", weightage: 100 }
        ]
    },
];

const EvaluationFramework = () => {
    const [view, setView] = useState("list"); // list, create, edit
    const [frameworks, setFrameworks] = useState(initialFrameworks);
    const [currentFramework, setCurrentFramework] = useState(null);

    const handleCreate = () => {
        setCurrentFramework(null);
        setView("create");
    };

    const handleEdit = (framework) => {
        if (framework.status === "Active") {
            const hasExamsLinked = checkIsLinkedToExams(framework.id); // Check linkage
            if (hasExamsLinked) {
                if (!window.confirm("WARNING: This framework is currently active and linked to scheduled exams. Editing structure or weightage may corrupt existing report cards. Are you sure you want to proceed?")) {
                    return;
                }
            } else {
                if (!window.confirm("Note: You are editing an 'Active' framework. Ensure no unexpected changes for ongoing terms. Continue?")) {
                    return;
                }
            }
        }
        setCurrentFramework(framework);
        setView("edit");
    };

    // Mock check for exam linkage
    const checkIsLinkedToExams = (id) => {
        // Mock logic: Assume IDs 1 and 2 are linked to some exams
        return [1, 2].includes(id);
    };

    const handleDelete = (id) => {
        const framework = frameworks.find(f => f.id === id);

        if (framework.isDefault) {
            alert("Cannot delete a Default framework. Please set another framework as default for this board first.");
            return;
        }

        if (checkIsLinkedToExams(id)) {
            alert("Cannot delete this framework because it is linked to existing Exam Schedules or Results. Please archive it instead.");
            return;
        }

        if (window.confirm("Are you sure you want to delete this framework? This action cannot be undone.")) {
            setFrameworks(frameworks.filter((f) => f.id !== id));
        }
    };

    const handleDuplicate = (framework) => {
        // Deep copy using JSON parse/stringify to ensure nested arrays/objects are cloned
        const deepCopiedFramework = JSON.parse(JSON.stringify(framework));

        const newFramework = {
            ...deepCopiedFramework,
            id: Date.now(),
            frameworkName: `${framework.frameworkName} (Copy)`,
            isDefault: false,
        };
        setFrameworks([...frameworks, newFramework]);
    };

    const handleView = (framework) => {
        setCurrentFramework(framework);
        setView("view");
    };

    const handleSetDefault = (id) => {
        const targetFramework = frameworks.find(f => f.id === id);
        if (!targetFramework) return;

        // Unset default for others with the same board, set true for target
        setFrameworks(frameworks.map(f => {
            if (f.board === targetFramework.board) {
                return { ...f, isDefault: f.id === id };
            }
            return f;
        }));
    };

    const handleSave = (data) => {
        if (currentFramework) {
            // Edit
            setFrameworks(
                frameworks.map((f) => (f.id === currentFramework.id ? { ...data, id: f.id } : f))
            );
        } else {
            // Create
            setFrameworks([...frameworks, { ...data, id: Date.now(), isDefault: false }]);
        }
        setView("list");
    };

    const handleCancel = () => {
        setView("list");
        setCurrentFramework(null);
    };

    return (
        <>
            <PageMeta
                title="Evaluation Framework | School ERP"
                description="Define and manage evaluation frameworks and pass criteria."
            />
            <PageBreadcrumb pageTitle="Evaluation Framework" />

            <div className="space-y-6">
                {view === "list" ? (
                    <EvaluationFrameworkList
                        frameworks={frameworks}
                        onCreate={handleCreate}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onDuplicate={handleDuplicate}
                        onView={handleView}
                        onSetDefault={handleSetDefault}
                    />
                ) : view === "view" ? (
                    <ViewEvaluationFramework
                        framework={currentFramework}
                        onClose={handleCancel}
                    />
                ) : (
                    <EvaluationFrameworkForm
                        onSave={handleSave}
                        onCancel={handleCancel}
                        initialData={currentFramework}
                    />
                )}
            </div>
        </>
    );
};

export default EvaluationFramework;
