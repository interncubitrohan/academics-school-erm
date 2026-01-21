import React from "react";
import { Modal } from "../../../components/ui/modal";
import SubjectTypeForm from "./SubjectTypeForm";

const SubjectTypeModal = ({ isOpen, onClose, onSave, subjectType }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-[700px] p-0">
            {/* Note: I removed p-6 and header from here because SubjectTypeForm already has its own header and padding.
                 Wait, RoomModal had header here. Let's check SubjectTypeForm.
                 SubjectTypeForm HAS a header "Add Subject Type" and padding p-6.5.
                 So we should probably remove the header from SubjectTypeForm or not render it here.
                 To keep SubjectTypeForm reusable (maybe on its own page?), I'll leave it there 
                 and make this Modal just a wrapper without extra UI.
             */}
            <SubjectTypeForm
                initialData={subjectType}
                onSave={onSave}
                onCancel={onClose}
            />
        </Modal>
    );
};

export default SubjectTypeModal;
