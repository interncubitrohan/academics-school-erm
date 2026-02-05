import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from '../../components/ui/table';
import Button from '../../components/ui/button/Button';

const PrincipalApproval = ({ application, feeStructure }) => {
    // Fallback if no props provided (for safe rendering)
    if (!application) return <div>No application data available.</div>;

    // Destructure for easier access, assuming feeStructure shape matches what FeeStructureAssignment generates
    const { components = [], concession = {}, totals = {} } = feeStructure || {};

    const [remarks, setRemarks] = useState('');
    const [actionStatus, setActionStatus] = useState(null); // 'approved' or 'rejected_by_principal'

    const handleApprove = () => {
        if (window.confirm('Are you sure you want to approve this admission?')) {
            setActionStatus('approved');
            // logic to update backend would go here
        }
    };

    const handleReject = () => {
        if (!remarks.trim()) {
            alert('Please provide remarks for rejection.');
            return;
        }
        if (window.confirm('Are you sure you want to reject this admission?')) {
            setActionStatus('rejected_by_principal');
            // logic to update backend would go here
        }
    };

    const isActionTaken = actionStatus !== null;
    const currentStatus = actionStatus || application.status;

    return (
        <div className="space-y-6">

            {/* 1. Student Information (Read-Only) */}
            <div className="rounded-sm border border-gray-200 bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-gray-700 dark:bg-gray-800 sm:px-7.5 xl:pb-1">
                <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
                    Student Information
                </h3>
                <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <label className="mb-2 block text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                            Applicant Name
                        </label>
                        <p className="text-lg font-semibold text-gray-800 dark:text-white">
                            {application.firstName} {application.lastName}
                        </p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <label className="mb-2 block text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                            Application Number
                        </label>
                        <p className="text-lg font-semibold text-gray-800 dark:text-white">
                            {application.applicationNumber || 'N/A'}
                        </p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <label className="mb-2 block text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                            Admission Class
                        </label>
                        <p className="text-lg font-semibold text-gray-800 dark:text-white">
                            {application.appliedClass || 'N/A'}
                        </p>
                    </div>
                </div>
            </div>

            {/* 2. Admission Details (Read-Only) */}
            <div className="rounded-sm border border-gray-200 bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-gray-700 dark:bg-gray-800 sm:px-7.5 xl:pb-1">
                <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
                    Admission Details
                </h3>
                <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-500 dark:text-gray-400">
                            Academic Year
                        </label>
                        <p className="text-base text-gray-800 dark:text-white">
                            {application.academicYear || '2025-2026'}
                        </p>
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-500 dark:text-gray-400">
                            Admission Category
                        </label>
                        <p className="text-base text-gray-800 dark:text-white capitalize">
                            {application.category || 'General'}
                        </p>
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-500 dark:text-gray-400">
                            Gender
                        </label>
                        <p className="text-base text-gray-800 dark:text-white capitalize">
                            {application.gender || 'N/A'}
                        </p>
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-500 dark:text-gray-400">
                            DOB
                        </label>
                        <p className="text-base text-gray-800 dark:text-white">
                            {application.dateOfBirth ? new Date(application.dateOfBirth).toLocaleDateString() : 'N/A'}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                {/* 3. Fee Components Structure (Read-Only) */}
                <div className="rounded-sm border border-gray-200 bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-gray-700 dark:bg-gray-800 sm:px-7.5 xl:pb-1 col-span-1 sm:col-span-2">
                    <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
                        Fee Components Structure
                    </h3>
                    <div className="max-w-full overflow-x-auto mb-4">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50 dark:bg-gray-700 text-left">
                                    <TableCell isHeader className="py-3 px-4 font-medium text-black dark:text-white">Component Name</TableCell>
                                    <TableCell isHeader className="py-3 px-4 font-medium text-black dark:text-white">Type</TableCell>
                                    <TableCell isHeader className="py-3 px-4 font-medium text-black dark:text-white">Frequency</TableCell>
                                    <TableCell isHeader className="py-3 px-4 font-medium text-black dark:text-white text-right">Amount</TableCell>
                                    <TableCell isHeader className="py-3 px-4 font-medium text-black dark:text-white text-center">Active</TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {components.length > 0 ? (
                                    components.map((comp, idx) => (
                                        <TableRow
                                            key={idx}
                                            className={`border-b border-[#eee] dark:border-gray-700 last:border-0 ${!comp.isActive ? 'opacity-60 bg-gray-50 dark:bg-gray-800/50' : ''}`}
                                        >
                                            <TableCell className="py-3 px-4 text-black dark:text-white font-medium">
                                                {comp.name}
                                            </TableCell>
                                            <TableCell className="py-3 px-4">
                                                <span className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-xs font-medium ${comp.type === 'Tuition' ? 'bg-primary text-primary' :
                                                    comp.type === 'Development' ? 'bg-secondary text-secondary' :
                                                        'bg-info text-info'
                                                    }`}>
                                                    {comp.type}
                                                </span>
                                            </TableCell>
                                            <TableCell className="py-3 px-4 text-black dark:text-white">{comp.frequency}</TableCell>
                                            <TableCell className="py-3 px-4 text-right font-mono text-black dark:text-white">
                                                ₹ {comp.amount?.toLocaleString()}
                                            </TableCell>
                                            <TableCell className="py-3 px-4 text-center">
                                                <span className={`inline-flex rounded-full py-1 px-3 text-xs font-medium ${comp.isActive
                                                    ? 'bg-success/10 text-success border border-success/20'
                                                    : 'bg-danger/10 text-danger border border-danger/20'
                                                    }`}>
                                                    {comp.isActive ? 'Yes' : 'No'}
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-4 text-gray-500">No fee components found.</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                {/* 4. Concession Summary */}
                <div className="rounded-sm border border-gray-200 bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-gray-700 dark:bg-gray-800 sm:px-7.5 xl:pb-1">
                    <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
                        Concession Details
                    </h3>
                    <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        {concession.type && concession.type !== 'none' ? (
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Type:</span>
                                    <span className="font-medium text-gray-800 dark:text-white capitalize">
                                        {concession.type.replace('_', ' ')}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Value:</span>
                                    <span className="font-medium text-gray-800 dark:text-white">
                                        {concession.type === 'percentage'
                                            ? `${concession.value}%`
                                            : `₹ ${Number(concession.value).toLocaleString()}`}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Reason:</span>
                                    <span className="font-medium text-gray-800 dark:text-white max-w-[60%] text-right truncate" title={concession.reason}>
                                        {concession.reason || '-'}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <p className="text-center text-gray-500">No concession applied.</p>
                        )}
                    </div>
                </div>

                {/* 5. Net Total Summary */}
                <div className="rounded-sm border border-gray-200 bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-gray-700 dark:bg-gray-800 sm:px-7.5 xl:pb-1">
                    <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
                        Final Summary
                    </h3>
                    <div className="flex flex-col gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg mb-4">
                        <div className="flex justify-between items-center text-gray-600 dark:text-gray-300">
                            <span className="font-medium">Gross Total</span>
                            <span className="font-mono text-lg">₹ {totals.gross?.toLocaleString() || 0}</span>
                        </div>
                        <div className="flex justify-between items-center text-gray-600 dark:text-gray-300">
                            <span className="font-medium">Concession</span>
                            <span className="font-mono text-lg text-danger">
                                - ₹ {totals.concession?.toLocaleString() || 0}
                            </span>
                        </div>
                        <div className="border-t border-gray-200 dark:border-gray-600 my-1"></div>
                        <div className="flex justify-between items-center text-gray-800 dark:text-white">
                            <span className="font-bold text-lg">Net Payable</span>
                            <span className="font-mono font-bold text-2xl text-success">
                                ₹ {totals.net?.toLocaleString() || 0}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 6. Principal Decision Section */}
            <div className="rounded-sm border border-gray-200 bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-gray-700 dark:bg-gray-800 sm:px-7.5 xl:pb-6">
                <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
                    Principal Decision
                </h3>

                {/* Confirmation Banner */}
                {(currentStatus === 'approved' || currentStatus === 'rejected_by_principal') && (
                    <div className={`mb-6 flex items-center gap-2 rounded-md border p-4 ${currentStatus === 'approved'
                            ? 'border-success/20 bg-success/10 text-success'
                            : 'border-danger/20 bg-danger/10 text-danger'
                        }`}>
                        {currentStatus === 'approved' ? (
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        ) : (
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        )}
                        <span className="font-medium">
                            {currentStatus === 'approved'
                                ? 'Admission approved. Forwarded to departments.'
                                : 'Admission rejected by principal.'}
                        </span>
                    </div>
                )}

                <div className="mb-6">
                    <label className="mb-2.5 block text-black dark:text-white">
                        Remarks / Comments
                    </label>
                    <textarea
                        rows={4}
                        placeholder="Enter remarks or comments here..."
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        disabled={isActionTaken || currentStatus !== 'pending_principal_approval'}
                    ></textarea>
                </div>

                {currentStatus === 'pending_principal_approval' && !isActionTaken && (
                    <div className="flex flex-col sm:flex-row gap-4 justify-end">
                        <Button
                            variant="danger"
                            onClick={handleReject}
                            disabled={isActionTaken}
                            className="min-w-[150px]"
                        >
                            Reject Admission
                        </Button>
                        <Button
                            variant="success"
                            onClick={handleApprove}
                            disabled={isActionTaken}
                            className="min-w-[150px]"
                        >
                            Approve Admission
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PrincipalApproval;
