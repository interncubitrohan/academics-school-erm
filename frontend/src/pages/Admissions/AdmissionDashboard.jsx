import React from 'react';
import { Link } from 'react-router';
import { dummyApplications } from './data/dummyApplications';
import { FiUsers, FiFileText, FiXCircle, FiPlus, FiList } from 'react-icons/fi';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import PageMeta from '../../components/common/PageMeta';

const AdmissionDashboard = () => {
    // KPI Calculations
    const totalApplications = dummyApplications.length;
    const pendingReview = dummyApplications.filter(app => app.status === 'pending_admission_review').length;
    const rejectedApplications = dummyApplications.filter(app => app.status === 'rejected_by_admission').length;

    return (
        <>
            <PageMeta
                title="Admissions Dashboard | School ERP"
                description="Overview of student admissions"
            />
            <PageBreadcrumb pageTitle="Admissions Dashboard" />

            <div>
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                    <div className="flex gap-3">
                        <Link
                            to="/admissions/list"
                            className="inline-flex items-center justify-center gap-2.5 rounded-md bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                        >
                            <FiList />
                            View Applications
                        </Link>
                        <Link
                            to="/admissions/new"
                            className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                        >
                            <FiPlus />
                            New Application
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
                    {/* Total Applications Card */}
                    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                            <FiUsers className="text-primary text-xl" />
                        </div>

                        <div className="mt-4 flex items-end justify-between">
                            <div>
                                <h4 className="text-title-md font-bold text-black dark:text-white">
                                    {totalApplications}
                                </h4>
                                <span className="text-sm font-medium">Total Applications</span>
                            </div>
                        </div>
                    </div>

                    {/* Pending Review Card */}
                    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                            <FiFileText className="text-warning text-xl" />
                        </div>

                        <div className="mt-4 flex items-end justify-between">
                            <div>
                                <h4 className="text-title-md font-bold text-black dark:text-white">
                                    {pendingReview}
                                </h4>
                                <span className="text-sm font-medium">Pending Admission Review</span>
                            </div>
                        </div>
                    </div>

                    {/* Rejected Applications Card */}
                    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                            <FiXCircle className="text-danger text-xl" />
                        </div>

                        <div className="mt-4 flex items-end justify-between">
                            <div>
                                <h4 className="text-title-md font-bold text-black dark:text-white">
                                    {rejectedApplications}
                                </h4>
                                <span className="text-sm font-medium">Rejected By Admission</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdmissionDashboard;
