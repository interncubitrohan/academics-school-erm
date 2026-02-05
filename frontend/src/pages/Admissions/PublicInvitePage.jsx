import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import ApplicationForm from './ApplicationForm';

const PublicInvitePage = () => {
    const [showForm, setShowForm] = useState(false);
    const [searchParams] = useSearchParams();
    const [password, setPassword] = useState('');

    useEffect(() => {
        const passwordParam = searchParams.get('password');
        if (passwordParam) {
            setPassword(passwordParam);
        }
    }, [searchParams]);

    if (showForm) {
        return <ApplicationForm mode="invite" />;
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-boxdark-2 px-4">
            <div className="w-full max-w-md">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white text-center">
                            Admission Application
                        </h3>
                    </div>
                    <div className="p-6.5">
                        <p className="mb-6 text-center text-body">
                            Please fill the application using the provided link.
                        </p>

                        <div className="mb-6">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Password
                            </label>
                            <input
                                type="text"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                        </div>

                        <button
                            onClick={() => setShowForm(true)}
                            className="w-full inline-flex items-center justify-center rounded-md bg-primary py-3 px-6 text-center font-medium text-white hover:bg-opacity-90"
                        >
                            Start Application
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PublicInvitePage;
