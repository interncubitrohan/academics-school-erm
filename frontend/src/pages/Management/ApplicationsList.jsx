export default function ApplicationsList() {
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
                                    Status
                                </th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-gray-700 xl:pl-11">
                                    <span className="font-medium text-black dark:text-white">APP-2024-001</span>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                    <span className="text-black dark:text-white">Rahul Sharma</span>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                    <span className="text-sm">Class 10</span>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                    <span className="inline-flex rounded-full bg-warning bg-opacity-10 px-3 py-1 text-sm font-medium text-warning">
                                        pending_fee_structure
                                    </span>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                    <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-center font-medium text-white hover:bg-opacity-90 transition-opacity">
                                        Allocate Fee
                                    </button>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-gray-700 xl:pl-11">
                                    <span className="font-medium text-black dark:text-white">APP-2024-002</span>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                    <span className="text-black dark:text-white">Priya Patel</span>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                    <span className="text-sm">Class 9</span>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                    <span className="inline-flex rounded-full bg-warning bg-opacity-10 px-3 py-1 text-sm font-medium text-warning">
                                        pending_fee_structure
                                    </span>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                    <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-center font-medium text-white hover:bg-opacity-90 transition-opacity">
                                        Allocate Fee
                                    </button>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-gray-700 xl:pl-11">
                                    <span className="font-medium text-black dark:text-white">APP-2024-003</span>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                    <span className="text-black dark:text-white">Amit Kumar</span>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                    <span className="text-sm">Class 11</span>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                    <span className="inline-flex rounded-full bg-warning bg-opacity-10 px-3 py-1 text-sm font-medium text-warning">
                                        pending_fee_structure
                                    </span>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                                    <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-center font-medium text-white hover:bg-opacity-90 transition-opacity">
                                        Allocate Fee
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

