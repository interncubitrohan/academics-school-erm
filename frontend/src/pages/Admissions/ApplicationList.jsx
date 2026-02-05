import React, { useState, useEffect } from 'react';
import { dummyApplications } from './data/dummyApplications';
import ApplicationStatusBadge from './components/ApplicationStatusBadge';
import { Link } from 'react-router';
// Icons
import { FiEye, FiPlus, FiFilter, FiSearch } from 'react-icons/fi';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import PageMeta from '../../components/common/PageMeta';
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../../components/ui/table";
import Button from '../../components/ui/button/Button';

const ApplicationList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [yearFilter, setYearFilter] = useState('');
    const [allApplications, setAllApplications] = useState([]);

    // Load applications from localStorage on mount
    useEffect(() => {
        const storedApps = JSON.parse(localStorage.getItem('applications') || '[]');
        // Merge stored applications with dummy data (stored apps first to show newest)
        setAllApplications([...storedApps.reverse(), ...dummyApplications]);
    }, []);

    const filteredApplications = allApplications.filter(app => {
        const matchesSearch =
            app.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.applicationId.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter ? app.status === statusFilter : true;
        const matchesYear = yearFilter ? app.academicYear === yearFilter : true;

        return matchesSearch && matchesStatus && matchesYear;
    });

    const uniqueYears = [...new Set(allApplications.map(app => app.academicYear))];

    return (
        <>
            <PageMeta
                title="Applications List | School ERP"
                description="List of all admission applications"
            />
            <PageBreadcrumb pageTitle="Applications List" />

            <div className="rounded-sm border border-gray-200 bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-gray-700 dark:bg-gray-800 sm:px-7.5 xl:pb-1">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <h4 className="text-xl font-semibold text-black dark:text-white">
                        Admissions Applications
                    </h4>
                    <Link to="/admissions/new">
                        <Button
                            startIcon={<span className="text-lg leading-none">+</span>}
                        >
                            New Application
                        </Button>
                    </Link>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative w-full md:w-1/3">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiSearch className="text-gray-500" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by ID or Name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded border border-stroke bg-transparent py-2 pl-10 pr-4 outline-none focus:border-primary focus-visible:shadow-none dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary"
                        />
                    </div>

                    <div className="relative w-full md:w-1/4">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiFilter className="text-gray-500" />
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full rounded border border-stroke bg-transparent py-2 pl-10 pr-4 outline-none focus:border-primary focus-visible:shadow-none dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary appearance-none"
                        >
                            <option value="">All Statuses</option>
                            <option value="draft">Draft</option>
                            <option value="submitted">Submitted</option>
                            <option value="pending_admission_review">Pending Admission Review</option>
                            <option value="pending_fee_structure">Pending Fee Structure</option>
                            <option value="pending_principal_approval">Pending Principal Approval</option>
                            <option value="approved">Approved</option>
                            <option value="rejected_by_admission">Rejected by Admission</option>
                            <option value="rejected_by_principal">Rejected by Principal</option>
                            <option value="enrolled">Enrolled</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="withdrawn">Withdrawn</option>
                        </select>
                    </div>

                    <div className="relative w-full md:w-1/4">
                        <select
                            value={yearFilter}
                            onChange={(e) => setYearFilter(e.target.value)}
                            className="w-full rounded border border-stroke bg-transparent py-2 px-4 outline-none focus:border-primary focus-visible:shadow-none dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary appearance-none"
                        >
                            <option value="">All Years</option>
                            {uniqueYears.map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="max-w-full overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50 dark:bg-gray-700 text-left">
                                <TableCell isHeader className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                    Application ID
                                </TableCell>
                                <TableCell isHeader className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                    Student Name
                                </TableCell>
                                <TableCell isHeader className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                    Class
                                </TableCell>
                                <TableCell isHeader className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                    Board
                                </TableCell>
                                <TableCell isHeader className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                    Academic Year
                                </TableCell>
                                <TableCell isHeader className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                    Status
                                </TableCell>
                                <TableCell isHeader className="py-4 px-4 font-medium text-black dark:text-white">
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredApplications.length > 0 ? (
                                filteredApplications.map((app) => (
                                    <TableRow key={app._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                        <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700 xl:pl-11">
                                            <p className="font-medium text-black dark:text-white">
                                                {app.applicationId}
                                            </p>
                                        </TableCell>
                                        <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                            <p className="text-black dark:text-white">
                                                {app.firstName} {app.lastName}
                                            </p>
                                        </TableCell>
                                        <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                            <p className="text-black dark:text-white">
                                                {app.classOfAdmission?.name || 'N/A'}
                                            </p>
                                        </TableCell>
                                        <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                            <p className="text-black dark:text-white">
                                                {app.board?.category === 'State Board'
                                                    ? `${app.board.state} Board`
                                                    : app.board?.category || 'N/A'}
                                            </p>
                                        </TableCell>
                                        <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                            <p className="text-black dark:text-white">
                                                {app.academicYear}
                                            </p>
                                        </TableCell>
                                        <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                            <ApplicationStatusBadge status={app.status} />
                                        </TableCell>
                                        <TableCell className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                            <Link to={`/admissions/${app._id}`} className="hover:text-primary">
                                                <FiEye size={18} />
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="border-b border-[#eee] py-5 px-4 text-center dark:border-gray-700"
                                    >
                                        No applications found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
};

export default ApplicationList;
