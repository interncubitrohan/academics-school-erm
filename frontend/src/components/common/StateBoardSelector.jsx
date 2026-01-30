import React, { useEffect } from "react";
import SearchableSelect from "./SearchableSelect";
import { INDIAN_STATES, STATE_BOARD_MAPPINGS } from "../../data/boardData";

const StateBoardSelector = ({ value, onChange, errors = {} }) => {
    // value expected: { state: string, boardName: string }
    const { state, boardName } = value || { state: "", boardName: "" };

    const handleStateChange = (newState) => {
        onChange({
            state: newState,
            boardName: "" // Reset board name when state changes
        });
    };

    const handleBoardNameChange = (newBoardName) => {
        onChange({
            ...value,
            boardName: newBoardName
        });
    };

    const getBoardOptions = () => {
        if (!state) return [];
        return STATE_BOARD_MAPPINGS[state] || STATE_BOARD_MAPPINGS["DEFAULT"];
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
            {/* State Selection */}
            <SearchableSelect
                label="Select State"
                options={INDIAN_STATES}
                value={state}
                onChange={handleStateChange}
                placeholder="Search State..."
                error={errors.state}
            />

            {/* Board Name Selection */}
            <SearchableSelect
                label="State Board Name"
                options={getBoardOptions()}
                value={boardName}
                onChange={handleBoardNameChange}
                placeholder={state ? "Search Board Name..." : "Select State First"}
                disabled={!state}
                error={errors.boardName}
            />
        </div>
    );
};

export default StateBoardSelector;
