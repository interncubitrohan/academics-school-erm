import React, { useState } from "react";
import PageBreadcrumb from "../../../../components/common/PageBreadCrumb";
import PageMeta from "../../../../components/common/PageMeta";
import SubjectTypeList from "./SubjectTypeList";
import SubjectTypeModal from "./SubjectTypeModal";
import ViewSubjectTypeModal from "./ViewSubjectTypeModal";
import { FiPlus } from "react-icons/fi";

const initialSubjectTypes = [
    {
        id: 1,
        typeName: "Scholastic - Core",
        typeCode: "SCH-CORE",
        description: "Main subjects like Math, Science, English",
        isCompulsory: true,
        affectsPromotion: true,
        displayOrder: 1,
        status: "Active",
    },
    {
        id: 2,
        typeName: "Co-Scholastic",
        typeCode: "CO-SCH",
        description: "Arts, PE, Music, etc.",
        isCompulsory: true,
        affectsPromotion: false,
        displayOrder: 2,
        status: "Active",
    },
    {
        id: 3,
        typeName: "Elective",
        typeCode: "ELEC",
        description: "Optional subjects chosen by students",
        isCompulsory: false,
        affectsPromotion: true,
        displayOrder: 3,
        status: "Active",
    },
];

const SubjectTypes = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [subjectTypes, setSubjectTypes] = useState(initialSubjectTypes);
    const [currentType, setCurrentType] = useState(null);

    // Search and Filter States
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCompulsory, setFilterCompulsory] = useState("all");
    const [filterPromotion, setFilterPromotion] = useState("all");

    const handleCreate = () => {
        setCurrentType(null);
        setIsModalOpen(true);
    };

    const handleEdit = (type) => {
        setCurrentType(type);
        setIsModalOpen(true);
    };

    // Mock data for subject usage
    // In a real app, this would be an API call to check foreign keys
    const MOCK_LINKED_IDS = [1]; // ID 1 (Scholastic - Core) is linked to subjects

    const checkDeletePermission = (type) => {
        if (MOCK_LINKED_IDS.includes(type.id)) {
            return { allowed: false, reason: "Cannot delete: Assigned to subjects." };
        }
        return { allowed: true };
    };

    const handleDelete = (id) => {
        const typeToDelete = subjectTypes.find(t => t.id === id);
        const permission = checkDeletePermission(typeToDelete);

        if (!permission.allowed) {
            alert(permission.reason); // Fallback if button wasn't disabled
            return;
        }

        if (window.confirm("Are you sure you want to delete this Subject Type?")) {
            setSubjectTypes(subjectTypes.filter((t) => t.id !== id));
        }
    };

    const handleSave = (formData) => {
        let updatedList;

        if (currentType) {
            // Update
            updatedList = subjectTypes.map((t) =>
                t.id === currentType.id ? { ...formData, id: t.id } : t
            );
        } else {
            // Create
            updatedList = [
                ...subjectTypes,
                { ...formData, id: Date.now() },
            ];
        }

        setSubjectTypes(updatedList);
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setCurrentType(null);
    };

    const handleView = (type) => {
        setCurrentType(type);
        setIsViewModalOpen(true);
    };

    const handleCloseView = () => {
        setIsViewModalOpen(false);
        setCurrentType(null);
    }

    // Filtering Logic
    const filteredTypes = subjectTypes
        .filter((type) => {
            const matchesSearch =
                type.typeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                type.typeCode.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCompulsory =
                filterCompulsory === "all"
                    ? true
                    : filterCompulsory === "yes"
                        ? type.isCompulsory
                        : !type.isCompulsory;

            const matchesPromotion =
                filterPromotion === "all"
                    ? true
                    : filterPromotion === "yes"
                        ? type.affectsPromotion
                        : !type.affectsPromotion;

            return matchesSearch && matchesCompulsory && matchesPromotion;
        })
        .sort((a, b) => a.displayOrder - b.displayOrder);


    return (
        <>
            <PageMeta
                title="Subject Types | School ERP"
                description="Manage different subject categories and their rules."
            />
            <PageBreadcrumb pageTitle="Subject Types" />

            <div className="mb-4 rounded-lg border border-info bg-info/10 px-4 py-3 text-sm text-info dark:border-blue-500 dark:bg-blue-500/10">
                <p>
                    <span className="font-bold">Note:</span> Display order affects the layout sequence in report cards.
                </p>
            </div>

            <div className="space-y-6">
                <div className="rounded-sm border border-gray-200 bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-gray-700 dark:bg-gray-800 sm:px-7.5 xl:pb-1">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                        <h3 className="text-xl font-semibold text-black dark:text-white">
                            Subject Types List
                        </h3>
                        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                            <input
                                type="text"
                                placeholder="Search types..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            />
                            <select
                                value={filterCompulsory}
                                onChange={(e) => setFilterCompulsory(e.target.value)}
                                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            >
                                <option value="all">All Types (Compulsory)</option>
                                <option value="yes">Compulsory</option>
                                <option value="no">Optional</option>
                            </select>
                            <select
                                value={filterPromotion}
                                onChange={(e) => setFilterPromotion(e.target.value)}
                                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            >
                                <option value="all">All Types (Promotion)</option>
                                <option value="yes">Promotional</option>
                                <option value="no">Non-Promotional</option>
                            </select>
                            <button
                                onClick={handleCreate}
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 whitespace-nowrap"
                            >
                                + Add Type
                            </button>
                        </div>
                    </div>

                    <SubjectTypeList
                        subjectTypes={filteredTypes}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onView={handleView}
                        checkDeletePermission={checkDeletePermission}
                    />
                </div>
            </div>

            <SubjectTypeModal
                isOpen={isModalOpen}
                onClose={handleCancel}
                onSave={handleSave}
                subjectType={currentType}
            />

            <ViewSubjectTypeModal
                isOpen={isViewModalOpen}
                onClose={handleCloseView}
                subjectType={currentType}
            />
        </>
    );
};

export default SubjectTypes;

