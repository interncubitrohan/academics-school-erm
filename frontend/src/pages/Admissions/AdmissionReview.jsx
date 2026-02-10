import React, { useState } from 'react';
import ReviewStep from './ApplicationForm/ReviewStep';
import Button from '../../components/ui/button/Button';

const AdmissionReview = ({ application }) => {
    // Local state to simulate status changes for now (since no API)
    const [status, setStatus] = useState(application?.status);
    const [remarks, setRemarks] = useState('');

    if (!application) return <div>No application data provided.</div>;

    // Simulate approval
    const handleApprove = () => {
        application.status = "pending_fee_structure";
        setStatus("pending_fee_structure");
    };

    // Simulate rejection
    const handleReject = () => {
        if (!remarks.trim()) {
            alert('Please enter remarks before rejecting.');
            return;
        }
        // In real app, API call here
        setStatus('rejected_by_admission');
        alert('Application Rejected! Status changed to rejected_by_admission');
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-9">
                {/* Header Actions - Only show if pending review */}
                {status === 'pending_admission_review' && (
                    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                        <div className="mb-6">
                            <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                                Admission Office Action
                            </h3>
                            <div className="mb-4">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Remarks / Notes
                                </label>
                                <textarea
                                    rows="3"
                                    placeholder="Enter remarks for approval or rejection..."
                                    value={remarks}
                                    onChange={(e) => setRemarks(e.target.value)}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                ></textarea>
                            </div>
                            <div className="flex gap-4">
                                <Button
                                    variant="success"
                                    onClick={handleApprove}
                                >
                                    Approve Application
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={handleReject}
                                >
                                    Reject Application
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Reuse ReviewStep for Read-Only View */}
                {/* We pass specific status if we want to show updated one, or let it use prop */}
                <ReviewStep formData={{ ...application, status: status }} />
            </div>
        </div>
    );
};

export default AdmissionReview;
