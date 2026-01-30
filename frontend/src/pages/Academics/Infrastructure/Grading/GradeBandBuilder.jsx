import React, { useState, useEffect } from "react";
import { FiPlus, FiTrash2, FiAlertCircle } from "react-icons/fi";

const GradeBandBuilder = ({ bands, onChange }) => {
    const [overlapError, setOverlapError] = useState(null);

    useEffect(() => {
        validateOverlaps();
    }, [bands]);

    const validateOverlaps = () => {
        if (!bands || bands.length < 2) {
            setOverlapError(null);
            return;
        }

        // Sort bands by min value to check for sequence overlaps
        const sortedBands = [...bands]
            .filter(b => b.minValue != null && b.maxValue != null)
            .sort((a, b) => Number(a.minValue) - Number(b.minValue));

        for (let i = 0; i < sortedBands.length - 1; i++) {
            const current = sortedBands[i];
            const next = sortedBands[i + 1];

            if (Number(current.maxValue) >= Number(next.minValue)) {
                setOverlapError(`Overlap detected between ${current.grade} (${current.minValue}-${current.maxValue}) and ${next.grade} (${next.minValue}-${next.maxValue})`);
                return;
            }
        }
        setOverlapError(null);
    };

    const handleAddBand = () => {
        const newBand = {
            id: Date.now(),
            grade: "",
            minValue: 0,
            maxValue: 0,
            points: 0,
            remarks: ""
        };
        onChange([...bands, newBand]);
    };

    const handleRemoveBand = (id) => {
        if (bands.length > 1) {
            onChange(bands.filter((band) => band.id !== id));
        }
    };

    const handleBandChange = (id, field, value) => {
        onChange(bands.map((band) =>
            band.id === id ? { ...band, [field]: value } : band
        ));
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Grade Bands / Rules
                </h4>
                <button
                    type="button"
                    onClick={handleAddBand}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-brand-600 bg-brand-50 rounded-lg hover:bg-brand-100 dark:bg-brand-900/20 dark:text-brand-300 dark:hover:bg-brand-900/30 transition-colors"
                >
                    <FiPlus size={16} /> Add Grade Band
                </button>
            </div>

            {overlapError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2 text-sm">
                    <FiAlertCircle size={16} />
                    {overlapError}
                </div>
            )}

            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800/50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-32">
                                Grade <span className="block text-[10px] font-normal text-gray-400 normal-case">Label</span>
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-32">
                                Min % <span className="block text-[10px] font-normal text-gray-400 normal-case">Start Range</span>
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-32">
                                Max % <span className="block text-[10px] font-normal text-gray-400 normal-case">End Range</span>
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-32">
                                Points <span className="block text-[10px] font-normal text-gray-400 normal-case">GPA Val</span>
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Remarks <span className="block text-[10px] font-normal text-gray-400 normal-case">On Report</span>
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-20">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                        {bands.map((band) => (
                            <tr key={band.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                <td className="px-4 py-2">
                                    <input
                                        type="text"
                                        required
                                        value={band.grade}
                                        onChange={(e) => handleBandChange(band.id, "grade", e.target.value)}
                                        className="w-full px-3 py-1.5 text-sm border-gray-300 border rounded-md focus:outline-none focus:ring-1 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                        placeholder="e.g. A1"
                                    />
                                </td>
                                <td className="px-4 py-2">
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={band.minValue}
                                        onChange={(e) => handleBandChange(band.id, "minValue", e.target.value)}
                                        className={`w-full px-3 py-1.5 text-sm border-gray-300 border rounded-md focus:outline-none focus:ring-1 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white ${Number(band.minValue) > Number(band.maxValue) ? 'border-red-500 focus:ring-red-500' : ''}`}
                                    />
                                </td>
                                <td className="px-4 py-2">
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={band.maxValue}
                                        onChange={(e) => handleBandChange(band.id, "maxValue", e.target.value)}
                                        className="w-full px-3 py-1.5 text-sm border-gray-300 border rounded-md focus:outline-none focus:ring-1 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                    />
                                </td>
                                <td className="px-4 py-2">
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={band.points}
                                        onChange={(e) => handleBandChange(band.id, "points", e.target.value)}
                                        className="w-full px-3 py-1.5 text-sm border-gray-300 border rounded-md focus:outline-none focus:ring-1 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                    />
                                </td>
                                <td className="px-4 py-2">
                                    <input
                                        type="text"
                                        value={band.remarks}
                                        onChange={(e) => handleBandChange(band.id, "remarks", e.target.value)}
                                        className="w-full px-3 py-1.5 text-sm border-gray-300 border rounded-md focus:outline-none focus:ring-1 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                        placeholder="Optional remarks"
                                    />
                                </td>
                                <td className="px-4 py-2 text-right">
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveBand(band.id)}
                                        className="p-2 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                        disabled={bands.length <= 1}
                                        title="Remove Rule"
                                    >
                                        <FiTrash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {bands.length === 0 && (
                <div className="text-center py-6 text-gray-500">
                    No grade bands added. Click "Add Grade Band" to start.
                </div>
            )}
        </div>
    );
};

export default GradeBandBuilder;

