import React from 'react';
import { useNavigate } from 'react-router';
import { FiPlus, FiLayers, FiCheckCircle, FiXCircle } from 'react-icons/fi';

const FeeStructureDashboard = () => {
    const navigate = useNavigate();

    // Dummy Data for KPIs
    const kpiData = [
        {
            title: 'Total Fee Templates',
            value: '12',
            icon: <FiLayers className="text-primary text-xl" />,
            color: 'bg-primary/10 text-primary',
        },
        {
            title: 'Active Templates',
            value: '8',
            icon: <FiCheckCircle className="text-success text-xl" />,
            color: 'bg-success/10 text-success',
        },
        {
            title: 'Inactive Templates',
            value: '4',
            icon: <FiXCircle className="text-danger text-xl" />,
            color: 'bg-danger/10 text-danger',
        },
    ];

    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                    Fee Structure Dashboard
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

            {/* KPI Cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 xl:gap-7.5">
                {kpiData.map((kpi, index) => (
                    <div
                        key={index}
                        className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark"
                    >
                        <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                            {kpi.icon}
                        </div>

                        <div className="mt-4 flex items-end justify-between">
                            <div>
                                <h4 className="text-title-md font-bold text-black dark:text-white">
                                    {kpi.value}
                                </h4>
                                <span className="text-sm font-medium">{kpi.title}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Placeholder for Recent Activity or List Preview */}
            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="flex items-center justify-between mb-6">
                    <h4 className="text-xl font-semibold text-black dark:text-white">
                        Recent Templates
                    </h4>
                    <button
                        onClick={() => navigate('/management/fee-structure/list')}
                        className="text-primary hover:underline text-sm font-medium"
                    >
                        View All
                    </button>
                </div>
                <div className="flex flex-col">
                    {/* Placeholder Content */}
                    <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                        Recent activity list will appear here.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeeStructureDashboard;
