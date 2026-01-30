import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { FiChevronDown, FiSearch, FiX } from "react-icons/fi";

const SearchableSelect = ({
    options = [],
    value,
    onChange,
    placeholder = "Select...",
    label,
    error,
    disabled = false,
    className = ""
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
    const dropdownRef = useRef(null);

    // Sync internal search term with external value on mount/change, 
    // unless open (to allow typing)
    useEffect(() => {
        if (!isOpen) {
            setSearchTerm(value || "");
        }
    }, [value, isOpen]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                // Check if click was inside the portal dropdown (not easily reachable via ref here without forwardRef or ID, 
                // but usually clicking outside the trigger closes it.
                // We need to ensure clicking the portal doesn't close it instantly if we listen globally.
                // However, since portal is in body, logic is tricky.
                // Simpler: use a transparent overlay or check event target closest.
            }
        };
        
        // Better close logic:
        const handleGlobalClick = (e) => {
            // If click is NOT in the main component AND NOT in the portal dropdown
            const portalEl = document.getElementById(`dropdown-portal-${label?.replace(/\s/g,'-') || 'select'}`);
            if (
                dropdownRef.current && 
                !dropdownRef.current.contains(e.target) &&
                portalEl && 
                !portalEl.contains(e.target)
            ) {
                setIsOpen(false);
                setSearchTerm(value || "");
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleGlobalClick);
            window.addEventListener("scroll", updateCoords, true);
            window.addEventListener("resize", updateCoords);
        }
        
        return () => {
            document.removeEventListener("mousedown", handleGlobalClick);
            window.removeEventListener("scroll", updateCoords, true);
            window.removeEventListener("resize", updateCoords);
        };
    }, [isOpen, value, label]);

    const updateCoords = () => {
        if (dropdownRef.current) {
            const rect = dropdownRef.current.getBoundingClientRect();
            setCoords({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
                width: rect.width
            });
        }
    };

    const handleOpen = () => {
        if (!disabled) {
            updateCoords();
            setIsOpen(true);
        }
    };

    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (option) => {
        onChange(option);
        setSearchTerm(option);
        setIsOpen(false);
    };

    const portalId = `dropdown-portal-${label?.replace(/\s/g,'-') || 'select'}`;

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {label} <span className="text-red-500">*</span>
                </label>
            )}

            <div
                className={`relative w-full border rounded-lg bg-white dark:bg-gray-700 ${error ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                    } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-text"}`}
                onClick={handleOpen}
            >
                <div className="flex items-center px-4 py-2">
                    <FiSearch className="text-gray-400 mr-2" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setIsOpen(true);
                            updateCoords();
                        }}
                        onFocus={handleOpen}
                        placeholder={placeholder}
                        disabled={disabled}
                        className="w-full bg-transparent focus:outline-none text-gray-700 dark:text-white placeholder-gray-400"
                    />
                    {value && !disabled && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onChange("");
                                setSearchTerm("");
                            }}
                            className="ml-2 text-gray-400 hover:text-gray-600"
                        >
                            <FiX />
                        </button>
                    )}
                    <FiChevronDown className={`ml-2 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </div>
            </div>

            {isOpen && !disabled && createPortal(
                <div 
                    id={portalId}
                    className="absolute z-[9999] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                    style={{
                        top: coords.top + 4, // Add slight offset
                        left: coords.left,
                        width: coords.width
                    }}
                >
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((option, index) => (
                            <div
                                key={index}
                                className={`px-4 py-2 cursor-pointer text-sm ${option === value
                                        ? "bg-brand-50 text-brand-700 dark:bg-brand-900/20 dark:text-brand-300"
                                        : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                                    }`}
                                onClick={() => handleSelect(option)}
                            >
                                {option}
                            </div>
                        ))
                    ) : (
                        <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                            No matches found
                        </div>
                    )}
                </div>,
                document.body
            )}

            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
    );
};

export default SearchableSelect;
