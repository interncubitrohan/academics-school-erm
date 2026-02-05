import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { FiPlus, FiEye, FiEdit, FiSearch } from 'react-icons/fi';
import { dummyFeeTemplates } from './data/dummyFeeTemplates';

const FeeTemplateList = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        academicYear: '',
        class: '',
        status: '',
    });

    const uniqueYears = [...new Set(dummyFeeTemplates.map((t) => t.academicYear))];
    const uniqueClasses = [...new Set(dummyFeeTemplates.map((t) => t.class.name))];

    const filteredTemplates = dummyFeeTemplates.filter((template) => {
        const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesYear = filters.academicYear ? template.academicYear === filters.academicYear : true;
        const matchesClass = filters.class ? template.class.name === filters.class : true;
        const matchesStatus = filters.status
            ? (filters.status === 'Active' ? template.isActive : !template.isActive)
            : true;

        return matchesSearch && matchesYear && matchesClass && matchesStatus;
    });

    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                    Fee Templates
                </h2>
                <button
                    onClick={() => navigate('/management/fee-structure/create')}
                    className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                    <span>
                        <FiPlus />
                    </span>
                    Create Fee Structure
                </button>
            </div>

            {/* Filters */}
            <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-9">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                            Search
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2">
                                <FiSearch size={18} />
                            </span>
                            <input
                                type="text"
                                placeholder="Search by name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 pl-12 pr-4 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                            Academic Year
                        </label>
                        <select
                            value={filters.academicYear}
                            onChange={(e) => setFilters({ ...filters, academicYear: e.target.value })}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-4 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        >
                            <option value="">All Years</option>
                            {uniqueYears.map((year) => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                            Class
                        </label>
                        <select
                            value={filters.class}
                            onChange={(e) => setFilters({ ...filters, class: e.target.value })}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-4 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        >
                            <option value="">All Classes</option>
                            {uniqueClasses.map((cls) => (
                                <option key={cls} value={cls}>{cls}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                            Status
                        </label>
                        <select
                            value={filters.status}
                            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-4 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        >
                            <option value="">All Statuses</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                <th className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                    Template Name
                                </th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white">
                                    Class
                                </th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white">
                                    Academic Year
                                </th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white">
                                    Total Amount
                                </th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white">
                                    Status
                                </th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTemplates.map((template) => (
                                <tr key={template._id}>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-11">
                                        <h5 className="font-medium text-black dark:text-white">
                                            {template.name}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-black dark:text-white">
                                            {template.class.name}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-black dark:text-white">
                                            {template.academicYear}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-black dark:text-white">
                                            ₹ {template.totalAmount.toLocaleString()}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p
                                            className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${template.isActive
                                                    ? 'bg-success text-success'
                                                    : 'bg-danger text-danger'
                                                }`}
                                        >
                                            {template.isActive ? 'Active' : 'Inactive'}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <div className="flex items-center space-x-3.5">
                                            <button
                                                className="hover:text-primary"
                                                onClick={() => navigate(`/management/fee-structure/view/${template._id}`)}
                                                title="View Details"
                                            >
                                                <FiEye size={18} />
                                            </button>
                                            <button
                                                className="hover:text-primary"
                                                onClick={() => navigate(`/management/fee-structure/edit/${template._id}`)}
                                                title="Edit"
                                            >
                                                <FiEdit size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FeeTemplateList;
