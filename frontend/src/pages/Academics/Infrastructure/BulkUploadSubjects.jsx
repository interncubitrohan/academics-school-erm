import React, { useState, useRef } from "react";
import { Modal } from "../../../components/ui/modal";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../../../components/ui/table";
import Badge from "../../../components/ui/badge/Badge";

const SAMPLE_CSV = `SubjectName,SubjectCode,SubjectType,Boards,ApplicableGrades,Description
Mathematics,MATH101,Theory,CBSE;IGCSE,9;10,Core Mathematics
Physics,PHY101,Theory,CBSE,11;12,Fundamental Physics
Chemistry Lab,CHEMLAB1,Practical,CBSE,11;12,Chemistry Laboratory
English,ENG101,Language,CBSE;IGCSE;IB,9;10;11;12,English Literature`;

const BulkUploadSubjects = ({ isOpen, onClose, onImport, existingSubjects = [] }) => {
    const [step, setStep] = useState("UPLOAD"); // UPLOAD, PREVIEW
    const [file, setFile] = useState(null);
    const [parsedData, setParsedData] = useState([]);
    const [errors, setErrors] = useState([]);
    const fileInputRef = useRef(null);

    const resetState = () => {
        setStep("UPLOAD");
        setFile(null);
        setParsedData([]);
        setErrors([]);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleClose = () => {
        resetState();
        onClose();
    };

    const handleDownloadSample = () => {
        const blob = new Blob([SAMPLE_CSV], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "subjects_sample.csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            // Simulate parsing immediately for better UX or wait for "Next"
            // Let's parse immediately to show preview
            parseFile(selectedFile);
        }
    };

    const parseFile = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            const lines = text.split(/\r?\n/).filter(line => line.trim() !== "");

            // Basic CSV parsing (assuming simple comma separation, no quotes handling for simplicity as per "Simulate")
            // Skip header
            const headers = lines[0].split(",");
            const rows = lines.slice(1);

            const parsed = rows.map((line, index) => {
                const values = line.split(",");
                // Map based on assumed order: Name, Code, Type, Boards, Grades, Desc
                // In a real app, we'd match headers dynamically

                // Safe access
                const subjectName = values[0]?.trim() || "";
                const subjectCode = values[1]?.trim() || "";
                const subjectType = values[2]?.trim() || "Theory";
                const boardsStr = values[3]?.trim() || "";
                const gradesStr = values[4]?.trim() || "";
                const description = values[5]?.trim() || "";

                return {
                    id: `temp_${index}`, // temp ID
                    subjectName,
                    subjectCode,
                    subjectType,
                    boards: boardsStr.split(";").filter(b => b),
                    applicableGrades: gradesStr.split(";").filter(g => g),
                    description,
                    // Default values for others
                    status: "Active",
                    hasPractical: false,
                    practicalMarks: 0,
                    hasInternalAssessment: false,
                    iaWeightage: 0,
                    maxMarksOrCredits: 100
                };
            });

            validateData(parsed);
            setParsedData(parsed);
            setStep("PREVIEW");
        };
        reader.readAsText(file);
    };

    const validateData = (data) => {
        const newErrors = [];
        const seenCodes = new Set(existingSubjects.map(s => s.subjectCode.toUpperCase()));
        const currentBatchCodes = new Set();

        data.forEach((row, index) => {
            const rowErrors = [];

            if (!row.subjectName) rowErrors.push("Missing Subject Name");
            if (!row.subjectCode) rowErrors.push("Missing Subject Code");
            if (row.boards.length === 0) rowErrors.push("Missing Boards");
            if (row.applicableGrades.length === 0) rowErrors.push("Missing Grades");

            // Check Uniqueness
            const codeUpper = row.subjectCode?.toUpperCase();
            if (codeUpper) {
                if (seenCodes.has(codeUpper)) {
                    rowErrors.push("Duplicate Code (Exists in System)");
                } else if (currentBatchCodes.has(codeUpper)) {
                    rowErrors.push("Duplicate Code (In File)");
                }
                currentBatchCodes.add(codeUpper);
            }

            if (rowErrors.length > 0) {
                newErrors.push({ rowIndex: index, errors: rowErrors });
            }
        });

        setErrors(newErrors);
    };

    const getRowErrors = (index) => {
        const errorItem = errors.find(e => e.rowIndex === index);
        return errorItem ? errorItem.errors : [];
    };

    const handleImport = () => {
        const validRows = parsedData.filter((_, index) => getRowErrors(index).length === 0);
        if (validRows.length === 0) {
            alert("No valid data to import");
            return;
        }

        // Clean up temp IDs and ensure final structure
        const finalData = validRows.map(({ id, ...rest }) => ({
            ...rest
        }));

        onImport(finalData);
        handleClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} className="max-w-[900px] p-0 overflow-hidden rounded-xl">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {step === "UPLOAD" ? "Bulk Upload Subjects" : "Preview & Validate"}
                </h3>
                {step === "PREVIEW" && (
                    <button
                        onClick={() => { setStep("UPLOAD"); setFile(null); setParsedData([]); }}
                        className="text-sm text-blue-600 hover:underline"
                    >
                        Change File
                    </button>
                )}
            </div>

            <div className="p-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
                {step === "UPLOAD" ? (
                    <div className="space-y-6">
                        {/* Sample Download Section */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-sm text-blue-800 dark:text-blue-200 border border-blue-100 dark:border-blue-800">
                            <h4 className="font-semibold mb-2">Instructions:</h4>
                            <ul className="list-disc pl-5 space-y-1 mb-4">
                                <li>Upload a CSV file with the required columns.</li>
                                <li>Required Columns: SubjectName, SubjectCode, SubjectType, Boards, ApplicableGrades.</li>
                                <li>Use semicolons (;) to separate multiple values for Boards and Grades.</li>
                            </ul>
                            <button
                                onClick={handleDownloadSample}
                                className="flex items-center gap-2 font-medium hover:underline"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                Download Sample CSV
                            </button>
                        </div>

                        {/* Upload Area */}
                        <div
                            className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-10 flex flex-col items-center justify-center text-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept=".csv"
                                className="hidden"
                            />
                            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                            </div>
                            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                                Click to upload or drag and drop
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                CSV files only (max 5MB)
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm">
                            <p className="text-gray-600 dark:text-gray-300">
                                Found <span className="font-semibold text-gray-900 dark:text-white">{parsedData.length}</span> records.
                                <span className="text-red-500 ml-2">{errors.length} errors found.</span>
                            </p>
                        </div>

                        <div className="border rounded-lg overflow-hidden border-gray-200 dark:border-gray-700">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-gray-50 dark:bg-gray-800">
                                        <TableCell isHeader>Row</TableCell>
                                        <TableCell isHeader>Code</TableCell>
                                        <TableCell isHeader>Name</TableCell>
                                        <TableCell isHeader>Type</TableCell>
                                        <TableCell isHeader>Boards</TableCell>
                                        <TableCell isHeader>Grades</TableCell>
                                        <TableCell isHeader>Status</TableCell>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {parsedData.map((row, index) => {
                                        const rowErrors = getRowErrors(index);
                                        const isValid = rowErrors.length === 0;

                                        return (
                                            <TableRow key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell className="font-mono">{row.subjectCode}</TableCell>
                                                <TableCell>{row.subjectName}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        size="sm"
                                                        color={
                                                            row.subjectType === "Theory" ? "primary" :
                                                                row.subjectType === "Practical" ? "warning" :
                                                                    "secondary"
                                                        }
                                                    >
                                                        {row.subjectType}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-xs">{row.boards.join(", ")}</TableCell>
                                                <TableCell className="text-xs">{row.applicableGrades.join(", ")}</TableCell>
                                                <TableCell>
                                                    {isValid ? (
                                                        <span className="text-green-600 flex items-center gap-1 text-xs font-medium">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                                            Valid
                                                        </span>
                                                    ) : (
                                                        <div className="text-red-500 text-xs space-y-1">
                                                            {rowErrors.map((err, i) => (
                                                                <div key={i} className="flex items-center gap-1">
                                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                                    {err}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex justify-end items-center gap-3 px-6 py-4 border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900">
                <button
                    onClick={handleClose}
                    className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                >
                    Cancel
                </button>
                {step === "PREVIEW" && (
                    <button
                        onClick={handleImport}
                        disabled={parsedData.length === 0 || errors.length > 0 && parsedData.length === errors.length} // Disable if no valid data
                        className={`px-5 py-2.5 text-sm font-medium text-white rounded-lg transition-colors ${parsedData.length === 0 || (errors.length > 0 && parsedData.length === errors.length)
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-brand-600 hover:bg-brand-700"
                            }`}
                    >
                        Import {parsedData.length - errors.length} Subjects
                    </button>
                )}
            </div>
        </Modal>
    );
};

export default BulkUploadSubjects;
