import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { mockRequests } from './PrintRequest';

const MyPrintRequests = () => {
    const [requests, setRequests] = useState([]);
    const currentUser = "Mock User"; // Simulate logged-in user

    const fetchRequests = () => {
        // Filter by current user
        const userRequests = mockRequests.filter(req => req.requester.name === currentUser);
        setRequests([...userRequests]);
    };

    useEffect(() => {
        fetchRequests();

        // Listen for updates from other components
        const handleUpdates = () => fetchRequests();
        window.addEventListener('printRequestsUpdated', handleUpdates);

        return () => {
            window.removeEventListener('printRequestsUpdated', handleUpdates);
        };
    }, []);

    const handleDelete = (requestToDelete) => {
        if (requestToDelete.status !== 'requested') return;

        // Remove from local state
        setRequests(requests.filter(req => req !== requestToDelete));

        // Remove from the mockRequests array
        const index = mockRequests.indexOf(requestToDelete);
        if (index > -1) {
            mockRequests.splice(index, 1);
            // Notify other components
            window.dispatchEvent(new Event('printRequestsUpdated'));
        }
    };

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                My Print Requests
            </h4>

            <div className="flex flex-col">
                {/* Table Header */}
                <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
                    <div className="p-2.5 xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">Request ID</h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">File Name</h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">Copies</h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">Delivery</h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">Status</h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">Action</h5>
                    </div>
                </div>

                {/* Table Body */}
                {requests.length === 0 ? (
                    <div className="p-5 text-center text-gray-500">
                        No print requests found.
                    </div>
                ) : (
                    requests.map((request) => (
                        <div
                            className={`grid grid-cols-3 sm:grid-cols-6 border-b border-stroke dark:border-strokedark last:border-b-0`}
                            key={request.id || Math.random()}
                        >
                            <div className="flex items-center gap-3 p-2.5 xl:p-5">
                                <Link to={`/printing/requests/${request.id}`} className="text-primary hover:underline font-medium">
                                    #{request.id}
                                </Link>
                            </div>

                            <div className="flex items-center justify-center p-2.5 xl:p-5">
                                <p className="text-black dark:text-white truncate max-w-[150px]" title={request.file?.name}>{request.file?.name || "N/A"}</p>
                            </div>

                            <div className="flex items-center justify-center p-2.5 xl:p-5">
                                <p className="text-meta-3">{request.copies}</p>
                            </div>

                            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                                <p className="text-black dark:text-white capitalize">
                                    {request.deliveryMode === 'take_away' ? 'Take Away' : 'Delivery'}
                                </p>
                            </div>

                            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                                <p className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium capitalize 
                                    ${request.status === 'requested' ? 'bg-warning text-warning' : 'bg-success text-success'}`}>
                                    {request.status}
                                </p>
                            </div>

                            <div className="flex items-center justify-center p-2.5 xl:p-5">
                                <button
                                    onClick={() => handleDelete(request)}
                                    disabled={request.status !== 'requested'}
                                    className={`hover:text-primary ${request.status !== 'requested' ? 'cursor-not-allowed opacity-50' : ''}`}
                                    title={request.status !== 'requested' ? "Cannot delete processed request" : "Delete"}
                                >
                                    <svg
                                        className="fill-current"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 18 18"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7285C12.8816 17.5219 13.8379 16.6219 13.8941 15.4688L14.3441 6.1594C14.8785 5.9344 15.2441 5.42815 15.2441 4.8094V3.96565C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.041C10.1816 1.74377 10.2941 1.85627 10.2941 1.9969V2.47502H7.67852V1.9969ZM12.6004 15.4406C12.5723 15.8906 12.2066 16.2563 11.7285 16.2563H6.24414C5.76602 16.2563 5.40039 15.8906 5.37227 15.4406L4.95039 6.2719H13.0504L12.6004 15.4406ZM13.9785 4.8094C13.9785 4.9219 13.8941 5.00627 13.7535 5.00627H4.21914C4.07852 5.00627 3.99414 4.9219 3.99414 4.8094V3.96565C3.99414 3.85315 4.07852 3.76877 4.21914 3.76877H13.7535C13.8941 3.76877 13.9785 3.85315 13.9785 3.96565V4.8094Z"
                                            fill=""
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MyPrintRequests;
