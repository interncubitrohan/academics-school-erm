import React from "react";

const StepTermStructure = ({ academicYear, termStructure, setTermStructure }) => {
    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                    Step 1: Configuration
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Define the academic year and assessment structure for this class.
                </p>
            </div>

            <div className="space-y-6">
                {/* Academic Year - Read Only */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Academic Year
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            value={academicYear}
                            readOnly
                            disabled
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-500 cursor-not-allowed focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                        </div>
                    </div>
                    <p className="mt-1.5 text-xs text-gray-500">
                        The academic year is inherited from the active session.
                    </p>
                </div>

                {/* Term Structure - Radio Options */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Term Structure
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            {
                                id: "Annual",
                                title: "Annual",
                                description: "One final exam at the end of the year",
                                icon: (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                )
                            },
                            {
                                id: "Semester",
                                title: "Semester",
                                description: "Two terms (SA1 + SA2) or similar",
                                icon: (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                                )
                            },
                            {
                                id: "Trimester",
                                title: "Trimester",
                                description: "Three terms distributed across the year",
                                icon: (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                )
                            }
                        ].map((option) => (
                            <label
                                key={option.id}
                                className={`
                                    relative flex flex-col p-4 border rounded-xl cursor-pointer transition-all
                                    ${termStructure === option.id
                                        ? "border-brand-500 bg-brand-50/50 dark:bg-brand-900/10 dark:border-brand-400 ring-1 ring-brand-500"
                                        : "border-gray-200 bg-white hover:border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600"
                                    }
                                `}
                            >
                                <input
                                    type="radio"
                                    name="termStructure"
                                    value={option.id}
                                    checked={termStructure === option.id}
                                    onChange={(e) => setTermStructure(e.target.value)}
                                    className="sr-only"
                                />
                                <div className={`mb-3 ${termStructure === option.id ? "text-brand-600 dark:text-brand-400" : "text-gray-400"}`}>
                                    {option.icon}
                                </div>
                                <span className={`font-semibold mb-1 ${termStructure === option.id ? "text-brand-700 dark:text-brand-300" : "text-gray-800 dark:text-white"}`}>
                                    {option.title}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                                    {option.description}
                                </span>

                                {termStructure === option.id && (
                                    <div className="absolute top-4 right-4 text-brand-500">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                    </div>
                                )}
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StepTermStructure;
