import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from '../../components/ui/table';
import Button from '../../components/ui/button/Button';
import { dummyFeeTemplates } from '../Management/FeeStructure/data/dummyFeeTemplates';

const FeeStructureAssignment = ({ application }) => {
    // State
    const [status, setStatus] = useState(application?.status || 'pending_fee_structure');
    const [selectedTemplateId, setSelectedTemplateId] = useState('');
    const [feeComponents, setFeeComponents] = useState([]);

    const [concession, setConcession] = useState({});
    const [grossTotal, setGrossTotal] = useState(0);
    const [concessionAmount, setConcessionAmount] = useState(0);
    const [netTotal, setNetTotal] = useState(0);

    // Derived state for read-only mode
    const isReadOnly = status !== 'pending_fee_structure';

    // Filter templates based on application class if available
    const availableTemplates = application?.appliedClass
        ? dummyFeeTemplates.filter(t => t.class.name === application.appliedClass && t.isActive)
        : dummyFeeTemplates.filter(t => t.isActive);

    // Handle Template Selection
    const handleTemplateChange = (e) => {
        const templateId = e.target.value;
        setSelectedTemplateId(templateId);

        if (templateId) {
            const template = dummyFeeTemplates.find(t => t._id === templateId);
            if (template) {
                // Clone components to avoid mutating original data
                setFeeComponents(template.feeComponents.map(c => ({ ...c })));
            }
        } else {
            setFeeComponents([]);
        }
    };

    // Calculate totals whenever feeComponents or concession changes
    useEffect(() => {
        // 1. Calculate Gross Total (sum of active & non-optional components)
        // Note: For assignment, we assume 'isActive' from the template determines inclusion, 
        // but user might be able to toggle optional ones? 
        // Let's assume standard behavior: Sum of all items in the list that are 'Active'.

        const newGrossTotal = feeComponents.reduce((sum, component) => {
            // Ensure amount is treated as a number
            const amount = Number(component.amount) || 0;
            return component.isActive ? sum + amount : sum;
        }, 0);

        // 2. Calculate Concession Amount
        let newConcessionAmount = 0;
        if (concession.type === 'percentage') {
            newConcessionAmount = (newGrossTotal * parseFloat(concession.value || 0)) / 100;
        } else if (concession.type === 'fixed_amount') {
            newConcessionAmount = parseFloat(concession.value || 0);
        }

        // 3. Calculate Net Total
        const newNetTotal = newGrossTotal - newConcessionAmount;

        setGrossTotal(newGrossTotal);
        setConcessionAmount(newConcessionAmount);
        setNetTotal(newNetTotal);
    }, [feeComponents, concession]);

    if (!application) return <div>No application data provided.</div>;

    const handleToggleActive = (index) => {
        if (isReadOnly) return;
        const updated = [...feeComponents];
        // Only allow toggling if it's optional in the template logic? 
        // For now, let's allow basic toggling as per previous logic, 
        // but really in a strict system we might restrict this.
        updated[index].isActive = !updated[index].isActive;
        setFeeComponents(updated);
    };

    const handleAssign = () => {
        setStatus('pending_principal_approval');
        // In a real app, you would make an API call here to update the application
        console.log('Fee structure assigned:', {
            templateId: selectedTemplateId,
            components: feeComponents,
            concession,
            totals: { grossTotal, concessionAmount, netTotal }
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-9">

                {/* Student Info Card */}
                <div className="rounded-sm border border-gray-200 bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-gray-700 dark:bg-gray-800 sm:px-7.5 xl:pb-1">
                    <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
                        Student Information
                    </h3>
                    <div className="mb-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
                                    Class Applied
                                </label>
                                <p className="text-lg font-semibold text-gray-800 dark:text-white">
                                    {application.appliedClass || 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Fee Template Selection */}
                {!isReadOnly && (
                    <div className="rounded-sm border border-gray-200 bg-white px-5 pt-6 pb-6 shadow-default dark:border-gray-700 dark:bg-gray-800 sm:px-7.5">
                        <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
                            Select Fee Structure
                        </h3>
                        <div>
                            <label className="mb-2.5 block text-black dark:text-white">
                                Available Templates (Class: {application.appliedClass || 'All'})
                            </label>
                            <select
                                value={selectedTemplateId}
                                onChange={handleTemplateChange}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            >
                                <option value="">Select a Fee Template</option>
                                {availableTemplates.map((template) => (
                                    <option key={template._id} value={template._id}>
                                        {template.name} ({template.academicYear}) - ₹{template.totalAmount}
                                    </option>
                                ))}
                            </select>
                            {availableTemplates.length === 0 && (
                                <p className="mt-2 text-sm text-danger">
                                    No active fee templates found for this class. Please ask Management to create one.
                                </p>
                            )}
                        </div>
                    </div>
                )}

                {/* Fee Components Card */}
                {selectedTemplateId && (
                    <div className="rounded-sm border border-gray-200 bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-gray-700 dark:bg-gray-800 sm:px-7.5 xl:pb-1">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                                Fee Components
                            </h3>
                        </div>

                        <div className="max-w-full overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-gray-50 dark:bg-gray-700 text-left">
                                        <TableCell isHeader className="min-w-[80px] py-4 px-4 font-medium text-black dark:text-white">
                                            Active
                                        </TableCell>
                                        <TableCell isHeader className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                            Name
                                        </TableCell>
                                        <TableCell isHeader className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                            Type
                                        </TableCell>
                                        <TableCell isHeader className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                            Frequency
                                        </TableCell>
                                        <TableCell isHeader className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white text-right">
                                            Amount
                                        </TableCell>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {feeComponents.map((component, index) => (
                                        <TableRow key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                            <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                                <input
                                                    type="checkbox"
                                                    className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer disabled:cursor-not-allowed"
                                                    checked={component.isActive}
                                                    onChange={() => handleToggleActive(index)}
                                                    disabled={isReadOnly || !component.isOptional} // Locked if not optional in template
                                                    title={!component.isOptional ? "Mandatory Component" : "Optional Component"}
                                                />
                                            </TableCell>
                                            <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                                <p className="font-medium text-black dark:text-white">
                                                    {component.name}
                                                    {component.isOptional && <span className="ml-2 text-xs text-meta-5">(Optional)</span>}
                                                </p>
                                            </TableCell>
                                            <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                                <span className="inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium bg-info text-info">
                                                    {component.type}
                                                </span>
                                            </TableCell>
                                            <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                                <p className="text-black dark:text-white">{component.frequency}</p>
                                            </TableCell>
                                            <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700 text-right">
                                                <p className="font-mono font-medium text-black dark:text-white">
                                                    ₹ {Number(component.amount).toLocaleString()}
                                                </p>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {feeComponents.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                                                No fee components available.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                    {/* Concession Card */}
                    <div className="rounded-sm border border-gray-200 bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-gray-700 dark:bg-gray-800 sm:px-7.5 xl:pb-1">
                        <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
                            Concession Details
                        </h3>
                        <div className="mb-6">
                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Concession Type
                                </label>
                                <select
                                    value={concession.type || 'none'}
                                    onChange={(e) => setConcession({ ...concession, type: e.target.value })}
                                    disabled={isReadOnly}
                                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                                >
                                    <option value="none">None</option>
                                    <option value="percentage">Percentage (%)</option>
                                    <option value="fixed_amount">Fixed Amount</option>
                                </select>
                            </div>

                            {concession.type && concession.type !== 'none' && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Value {concession.type === 'percentage' ? '(%)' : '(Amount)'}
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="0"
                                            value={concession.value || ''}
                                            onChange={(e) => setConcession({ ...concession, value: e.target.value })}
                                            disabled={isReadOnly}
                                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Reason
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Reason for concession"
                                            value={concession.reason || ''}
                                            onChange={(e) => setConcession({ ...concession, reason: e.target.value })}
                                            disabled={isReadOnly}
                                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Fee Summary Card */}
                    <div className="rounded-sm border border-gray-200 bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-gray-700 dark:bg-gray-800 sm:px-7.5 xl:pb-1">
                        <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
                            Fee Summary
                        </h3>
                        <div className="flex flex-col gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg mb-6">
                            <div className="flex justify-between items-center text-gray-600 dark:text-gray-300">
                                <span className="font-medium">Gross Total</span>
                                <span className="font-mono text-lg">₹ {grossTotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-gray-600 dark:text-gray-300">
                                <span className="font-medium">Concession Amount</span>
                                <span className="font-mono text-lg text-danger">- ₹ {concessionAmount.toLocaleString()}</span>
                            </div>
                            <div className="border-t border-gray-200 dark:border-gray-600 my-1"></div>
                            <div className="flex justify-between items-center text-gray-800 dark:text-white">
                                <span className="font-bold text-lg">Net Total</span>
                                <span className="font-mono font-bold text-2xl text-success">₹ {netTotal.toLocaleString()}</span>
                            </div>
                        </div>

                        {!isReadOnly && (
                            <div className="mb-6">
                                <Button
                                    onClick={handleAssign}
                                    className="w-full"
                                    variant="success"
                                    disabled={!selectedTemplateId}
                                >
                                    Assign & Forward to Principal
                                </Button>
                            </div>
                        )}
                        {status === 'pending_principal_approval' && (
                            <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg text-center border border-green-200 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300">
                                <span className="block font-semibold">Status: Pending Principal Approval</span>
                                <span className="text-sm">Fee structure has been assigned and locked.</span>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default FeeStructureAssignment;
