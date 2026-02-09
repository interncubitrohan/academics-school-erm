import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import PageMeta from '../../components/common/PageMeta';
import WorkflowProgress from '../../components/admission/WorkflowProgress';
import AdmissionReview from './AdmissionReview';
import DepartmentProcessing from './DepartmentProcessing';
import PrincipalApproval from './PrincipalApproval';
import { dummyApplications } from './data/dummyApplications';
import Button from '../../components/ui/button/Button';

const ApplicationDetail = () => {
    const { id } = useParams();
    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API fetch
        const fetchApplication = () => {
            setLoading(true);
            console.log('Fetching application with ID:', id);

            // In real app, API calling here
            // const foundApp = dummyApplications.find(app => app._id === id); // Use _id if route uses it
            // For routing logic in ApplicationList, we used applicationId as key mostly for display, 
            // but typical link would be /admissions/applications/:id

            // Let's assume passed param is _id for now
            const foundApp = dummyApplications.find(app => app._id === id || app.applicationId === id);

            console.log('Found Application:', foundApp);

            setTimeout(() => {
                setApplication(foundApp);
                setLoading(false);
            }, 500);
        };

        fetchApplication();
    }, [id]);

    if (loading) {
        return <div className="p-10 text-center">Loading application details...</div>;
    }

    if (!application) {
        return (
            <div className="p-10 text-center">
                <h3 className="text-xl font-semibold mb-4">Application Not Found</h3>
                <Link to="/admissions/list">
                    <Button variant="primary">Back to List</Button>
                </Link>
            </div>
        );
    }

    console.log('Rendering ApplicationDetail for:', application.firstName);
    console.log('Current Status:', application.status);
    console.log('Is Pending Fee Structure?', application.status === 'pending_fee_structure');
    console.log('Is Pending Principal Approval?', application.status === 'pending_principal_approval');

    return (
        <>
            {/* ... meta and breadcrumb ... */}
            <PageMeta
                title={`Application ${application.applicationId} | School ERP`}
                description="Application Details and Review"
            />
            <PageBreadcrumb pageTitle={`Application Details - ${application.applicationId}`} />

            <div className="space-y-6">
                {/* Workflow Progress */}
                <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                    <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                        Application Lifecycle
                    </h3>
                    <WorkflowProgress status={application.status} />
                    <div className="mt-4 mb-4 text-sm text-gray-500 text-center">
                        Current Status: <span className="font-semibold text-primary uppercase">{application.status.replace(/_/g, ' ')}</span>
                    </div>
                </div>

                {/* Conditional Rendering based on Status */}
                {application.status === 'pending_principal_approval' ? (
                    <PrincipalApproval
                        application={application}
                        feeStructure={application.feeStructure}
                    />
                ) : application.status === 'approved' || application.status === 'enrolled' ? (
                    <DepartmentProcessing application={application} />
                ) : (
                    <AdmissionReview application={application} />
                )}
            </div>
        </>
    );
};

export default ApplicationDetail;
