import { mockApplications } from "../../data/mockApplications";
import { useNavigate } from "react-router";

export default function ApplicationsList() {
    const navigate = useNavigate();
    const pendingApplications = mockApplications.filter(
        (app) => app.status === "pending_fee_structure"
    );

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Applications Pending Fee Allocation</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Review and allocate fees for pending applications</p>
                </div>
            </div>

            {/* Table Section */}
            <div className="rounded-sm border border-gray-200 bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-gray-700 dark:bg-gray-800 sm:px-7.5 xl:pb-1">
                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-gray-700 text-left">
                                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                    Application ID
                                </th>
                                <th className="min-w-[200px] py-4 px-4 font-medium text-black dark:text-white">
                                    Student Name
                                </th>
                                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                    Class
                                </th>
                                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                    Academic Year
                                </th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingApplications.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="py-5 px-4 text-center text-gray-500 dark:text-gray-400">
                                        No applications pending fee allocation.
                                    </td>
                                </tr>
                            ) : (
                                pendingApplications.map((app) => (
                                    <tr key={app.applicationId} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-gray-700 xl:pl-11">
                                            <span className="font-medium text-black dark:text-white">{app.applicationId}</span>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                            <span className="text-black dark:text-white">{app.studentName}</span>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                            <span className="text-sm">{app.classOfAdmission}</span>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                            <span className="text-sm">{app.academicYear}</span>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                            <button
                                                onClick={() => navigate(`/management/fee-allocation/${app.applicationId}`)}
                                                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-center font-medium text-white hover:bg-opacity-90 transition-opacity"
                                            >
                                                Allocate Fee
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

