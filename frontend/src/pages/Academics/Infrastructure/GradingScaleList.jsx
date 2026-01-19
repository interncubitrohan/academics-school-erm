import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../../../components/ui/table";
import Badge from "../../../components/ui/badge/Badge";

const GradingScaleList = ({ scales, onEdit, onDelete, onCreate }) => {
    return (
        <div className="space-y-6">
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] p-4">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                        Active Grading Scales
                    </h3>
                    <button
                        onClick={onCreate}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 w-full sm:w-auto"
                    >
                        + Create New Scale
                    </button>
                </div>

                <div className="max-w-full overflow-x-auto">
                    <Table>
                        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                            <TableRow>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Scale Name
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Type
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Rules Count
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {scales.map((scale) => (
                                <TableRow key={scale.id}>
                                    <TableCell className="px-5 py-4 text-start text-theme-sm dark:text-gray-400">
                                        <div className="font-medium text-gray-800 dark:text-white">
                                            {scale.name}
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-start">
                                        <Badge
                                            size="sm"
                                            color={
                                                scale.type === "GPA"
                                                    ? "success"
                                                    : scale.type === "Percentage"
                                                        ? "primary"
                                                        : "brand"
                                            }
                                        >
                                            {scale.type}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {scale.rules?.length || 0} Rules
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-start">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => onEdit(scale)}
                                                className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => onDelete(scale.id)}
                                                className="text-red-500 hover:text-red-700 text-sm font-medium"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {scales.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} className="px-5 py-8 text-center text-gray-500 dark:text-gray-400">
                                        No grading scales found. Create one to get started.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default GradingScaleList;
