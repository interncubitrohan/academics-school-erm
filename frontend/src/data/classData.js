/**
 * Class Data Model
 * Based on class_data_model.md specification
 */

export const MOCK_CLASSES = [
    {
        id: "cls_001",
        className: "10-A",
        academicYear: "2025-2026",
        grade: "10",
        section: "A",
        board: { category: "CBSE", state: "", boardName: "" },
        medium: "English",
        room: {
            id: "room_002",
            block: "Main",
            floor: 1,
            roomNumber: "102",
            capacity: 40
        },
        classTeacher: {
            id: "sarah_williams",
            name: "Sarah Williams"
        },
        coClassTeacher: null,
        allowTeacherLater: false,
        maxStudents: 40,
        currentStrength: 38,
        classType: "Regular",
        status: "Active",
        specialNotes: "Smart classroom enabled"
    },
    {
        id: "cls_002",
        className: "12-B",
        academicYear: "2025-2026",
        grade: "12",
        section: "B",
        board: { category: "CBSE", state: "", boardName: "" },
        medium: "English",
        room: {
            id: "room_003",
            block: "Science",
            floor: 2,
            roomNumber: "201",
            capacity: 30
        },
        classTeacher: {
            id: "emily_davis",
            name: "Emily Davis"
        },
        coClassTeacher: {
            id: "john_smith",
            name: "John Smith"
        },
        allowTeacherLater: false,
        maxStudents: 30,
        currentStrength: 25,
        classType: "Honors",
        status: "Active",
        specialNotes: "Science stream - Lab access required"
    },
    {
        id: "cls_003",
        className: "1-C",
        academicYear: "2025-2026",
        grade: "1",
        section: "C",
        board: { category: "CBSE", state: "", boardName: "" },
        medium: "English",
        room: null,
        roomNote: "Waiting for new block completion",
        classTeacher: null,
        coClassTeacher: null,
        allowTeacherLater: true,
        maxStudents: 35,
        currentStrength: 0,
        classType: "Regular",
        status: "Draft"
    }
];
