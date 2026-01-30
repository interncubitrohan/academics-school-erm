import React, { useState } from "react";

// List of all Indian states
const INDIAN_STATES = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Jammu & Kashmir"
];

const StateBoardSelect = ({ value, onChange, error }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    // Initial value handling: if value exists, we don't necessarily need to set search term unless we want to show it.
    // But for a combo-box feel, the search term IS the display.
    // When prop value changes externally (e.g. form reset), we should sync.
    React.useEffect(() => {
        if (value) {
            setSearchTerm(value);
        } else {
            setSearchTerm("");
        }
    }, [value]);

    const filteredStates = INDIAN_STATES.filter(state =>
        state.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (state) => {
        onChange(state);
        setSearchTerm(state);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Select State <span className="text-red-500">*</span>
            </label>

            <div className="relative">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setIsOpen(true);
                        // If user clears input, clear value? Or keep last valid?
                        // For strict selection, perhaps enable filtering but only commit on click.
                        // But standard combo box usually allows typing.
                    }}
                    onFocus={() => setIsOpen(true)}
                    // Simplify: Click outside to close is tricky without extra lib or refs.
                    // For now, let's keep it simple: input acts as filter.
                    placeholder="Search State..."
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/50 dark:bg-gray-700 dark:text-white ${error ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                        }`}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {filteredStates.length > 0 ? (
                        filteredStates.map(state => (
                            <div
                                key={state}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-200"
                                onClick={() => handleSelect(state)}
                            >
                                {state}
                            </div>
                        ))
                    ) : (
                        <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">No states found</div>
                    )}
                </div>
            )}

            {/* Overlay to close on click outside - Simple implementation */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-0 bg-transparent"
                    onClick={() => {
                        // On close, if search term matches a valid state, keep it. Else revert to value or clear?
                        // If exact match found in list, select it.
                        const exactMatch = INDIAN_STATES.find(s => s.toLowerCase() === searchTerm.toLowerCase());
                        if (exactMatch) {
                            handleSelect(exactMatch);
                        } else {
                            // Reset to last valid value or keep as is? 
                            // Requirement says "Required dropdown". So effectively must pick from list.
                            // Reverting to `value` is safer.
                            setSearchTerm(value || "");
                            setIsOpen(false);
                        }
                    }}
                ></div>
            )}

            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
    );
};

export default StateBoardSelect;
