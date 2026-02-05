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
        <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-boxdark-2 px-4 py-8">
            <div className="w-full max-w-lg">
                <div className="rounded-lg border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-6 px-8 dark:border-strokedark bg-gray-50 dark:bg-meta-4">
                        <h3 className="text-2xl font-bold text-black dark:text-white text-center">
                            Admission Application
                        </h3>
                        <p className="mt-2 text-center text-sm text-body dark:text-bodydark">
                            Welcome! Please enter your password to begin.
                        </p>
                    </div>
                    <div className="p-8">
                        <div className="mb-8">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Access Password <span className="text-meta-1">*</span>
                            </label>
                            <input
                                type="text"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                            {password && (
                                <p className="mt-2 text-xs text-success">
                                    ✓ Password entered
                                </p>
                            )}
                        </div>

                        <button
                            onClick={() => setShowForm(true)}
                            type="button"
                            style={{ backgroundColor: '#3C50E0', color: '#FFFFFF' }}
                            className="w-full inline-flex items-center justify-center rounded-lg py-4 px-6 text-center font-semibold text-lg hover:bg-opacity-90 shadow-md transition duration-200"
                        >
                            Start Application →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PublicInvitePage;
