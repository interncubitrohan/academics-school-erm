import React, { useState, useEffect } from 'react';
import AccountsProcessing from './AccountsProcessing';
import BooksDispersal from './BooksDispersal';
import HostelAssignment from './HostelAssignment';
import TransportAssignment from './TransportAssignment';

const DepartmentProcessing = ({ application }) => {
    if (!application) return null;

    const {
        firstName,
        lastName,
        applicationId,
        classOfAdmission,
        status: initialAppStatus,
        departmentStatus: initialDeptStatus = {},
        hostelNeeded = false,
        busNeeded = false,
    } = application;

    const [deptStatus, setDeptStatus] = useState({
        accounts: initialDeptStatus?.accounts?.status || 'pending',
        inventory: initialDeptStatus?.inventory?.status || 'pending',
        hostel: initialDeptStatus?.hostel?.status || (hostelNeeded ? 'pending' : 'not_required'),
        transport: initialDeptStatus?.transport?.status || (busNeeded ? 'pending' : 'not_required'),
    });

    const [appStatus, setAppStatus] = useState(initialAppStatus);

    // Use a derived state or separate state for the augmented application object passed to children
    // to ensure they receive the latest status
    const [currentApplication, setCurrentApplication] = useState(application);

    useEffect(() => {
        setCurrentApplication(prev => ({
            ...prev,
            departmentStatus: {
                accounts: { status: deptStatus.accounts },
                inventory: { status: deptStatus.inventory },
                hostel: { status: deptStatus.hostel },
                transport: { status: deptStatus.transport }
            }
        }));
    }, [deptStatus, application]); // Update when deptStatus changes

    useEffect(() => {
        checkEnrollmentEligibility();
    }, [deptStatus]);

    const updateDepartmentStatus = (dept, status) => {
        setDeptStatus(prev => ({
            ...prev,
            [dept]: status
        }));
    };

    const checkEnrollmentEligibility = () => {
        const isAccountsDone = deptStatus.accounts === 'completed';
        const isInventoryDone = deptStatus.inventory === 'completed';
        const isHostelDone = !hostelNeeded || deptStatus.hostel === 'completed';
        const isTransportDone = !busNeeded || deptStatus.transport === 'completed';

        if (isAccountsDone && isInventoryDone && isHostelDone && isTransportDone) {
            if (appStatus !== 'enrolled') {
                setAppStatus('enrolled');
                console.log('All departments processed. Student Enrolled!');
            }
        }
    };

    return (
        <div className="space-y-6">
            {/* Success Banner */}
            {appStatus === 'enrolled' && (
                <div className="flex w-full border-l-6 border-success bg-success bg-opacity-10 px-7 py-8 shadow-default dark:bg-boxdark dark:bg-opacity-30 md:p-9 rounded-sm">
                    <div className="mr-5 flex h-9 w-9 items-center justify-center rounded-lg bg-success">
                        <svg
                            width="16"
                            height="12"
                            viewBox="0 0 16 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M15.2984 0.826822L15.2868 0.811827L15.2741 0.797751C14.9173 0.401867 14.3238 0.400754 13.9657 0.794406L5.91888 9.45376L2.05667 5.2868C1.69856 4.89287 1.10487 4.89389 0.747996 5.28987C0.417335 5.65675 0.417335 6.22337 0.747996 6.59026L0.747959 6.59029L0.752701 6.59541L4.86742 11.0348C5.14445 11.3405 5.52858 11.5 5.89581 11.5C6.29242 11.5 6.65178 11.3355 6.92401 11.035L15.2162 2.11161C15.5833 1.74452 15.576 1.18615 15.2984 0.826822Z"
                                fill="white"
                                stroke="white"
                            ></path>
                        </svg>
                    </div>
                    <div className="w-full">
                        <h5 className="mb-3 text-lg font-bold text-black dark:text-success">
                            Student Successfully Enrolled!
                        </h5>
                        <p className="text-base leading-relaxed text-body">
                            All department clearances have been completed. The student is now officially enrolled in Class {classOfAdmission?.name}.
                        </p>
                    </div>
                </div>
            )}

            {/* Student Summary Card */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-4 dark:border-strokedark sm:px-6 xl:px-7.5">
                    <h3 className="font-medium text-black dark:text-white">
                        Department Clearance Processing
                    </h3>
                </div>
                <div className="p-4 sm:p-6 xl:p-7.5">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <h4 className="mb-1 text-xl font-bold text-black dark:text-white">
                                {firstName} {lastName}
                            </h4>
                            <p className="text-sm font-medium text-gray-500">
                                Application ID: <span className="text-black dark:text-white">{applicationId}</span>
                            </p>
                        </div>
                        <div className="text-right">
                            <span className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${appStatus === 'enrolled'
                                    ? 'bg-success text-success'
                                    : 'bg-primary text-primary'
                                }`}>
                                {appStatus ? appStatus.replace(/_/g, ' ') : 'N/A'}
                            </span>
                            <p className="text-sm font-medium text-gray-500 mt-1">Class: <span className="text-black dark:text-white">{classOfAdmission?.name || 'N/A'}</span></p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Department Processing Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
                <div className="flex flex-col gap-6">
                    <AccountsProcessing
                        application={currentApplication}
                        onStatusUpdate={(status) => updateDepartmentStatus('accounts', status)}
                    />
                    <BooksDispersal
                        application={currentApplication}
                        onStatusUpdate={(status) => updateDepartmentStatus('inventory', status)}
                    />
                </div>
                <div className="flex flex-col gap-6">
                    {hostelNeeded && (
                        <HostelAssignment
                            application={currentApplication}
                            onStatusUpdate={(status) => updateDepartmentStatus('hostel', status)}
                        />
                    )}

                    {busNeeded && (
                        <TransportAssignment
                            application={currentApplication}
                            onStatusUpdate={(status) => updateDepartmentStatus('transport', status)}
                        />
                    )}
                    {/* Placeholder for empty state if no optional depts needed but keeping layout balanced */}
                    {!hostelNeeded && !busNeeded && (
                        <div className="hidden md:block rounded-sm border border-dashed border-gray-300 bg-gray-50 p-6 flex items-center justify-center text-gray-400 dark:border-strokedark dark:bg-boxdark">
                            <p>No additional departments required.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DepartmentProcessing;
