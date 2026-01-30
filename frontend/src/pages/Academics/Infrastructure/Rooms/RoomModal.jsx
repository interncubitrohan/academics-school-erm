import React from "react";
import { Modal } from "../../../../components/ui/modal";
import RoomForm from "./RoomForm";

const RoomModal = ({ isOpen, onClose, onSave, room }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-[700px] p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                {room ? "Edit Room" : "Add New Room"}
            </h3>
            <RoomForm
                initialData={room}
                onSave={onSave}
                onCancel={onClose}
            />
        </Modal>
    );
};

export default RoomModal;



