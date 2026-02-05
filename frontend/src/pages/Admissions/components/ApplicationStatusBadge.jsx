import React from 'react';

const ApplicationStatusBadge = ({ status }) => {
    const getStatusConfig = (status) => {
        switch (status) {
            case 'draft':
                return {
                    label: 'Draft',
                    classes: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
                };
            case 'submitted':
                return {
                    label: 'Submitted',
                    classes: 'bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-300',
                };
            case 'pending_admission_review':
                return {
                    label: 'Pending Admission Review',
                    classes: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-300',
                };
            case 'pending_fee_structure':
                return {
                    label: 'Pending Fee Structure',
                    classes: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-700 dark:text-indigo-300',
                };
            case 'pending_principal_approval':
                return {
                    label: 'Pending Principal Approval',
                    classes: 'bg-purple-100 text-purple-800 dark:bg-purple-700 dark:text-purple-300',
                };
            case 'rejected_by_admission':
                return {
                    label: 'Rejected by Admission',
                    classes: 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-300',
                };
            case 'rejected_by_principal':
                return {
                    label: 'Rejected by Principal',
                    classes: 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-300',
                };
            case 'approved':
                return {
                    label: 'Approved',
                    classes: 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-300',
                };
            case 'enrolled':
                return {
                    label: 'Enrolled',
                    classes: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-700 dark:text-emerald-300',
                };
            case 'cancelled':
                return {
                    label: 'Cancelled',
                    classes: 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300',
                };
            case 'withdrawn':
                return {
                    label: 'Withdrawn',
                    classes: 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300',
                };
            default:
                return {
                    label: status?.replace(/_/g, ' ') || 'Unknown',
                    classes: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
                };
        }
    };

    const config = getStatusConfig(status);

    return (
        <span
            className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${config.classes}`}
        >
            {config.label}
        </span>
    );
};

export default ApplicationStatusBadge;
