/**
 * Teacher/Staff Data Model
 * 
 * @typedef {Object} Teacher
 * @property {string} id - Unique identifier
 * @property {string} name - Full name
 * @property {string} employeeId - Employee ID
 * @property {string} department - Department/Subject specialization
 * @property {string} email - Email address
 * @property {string} phone - Contact number
 * @property {string} status - "Active" | "On Leave" | "Inactive"
 * @property {boolean} isClassTeacher - Currently assigned as class teacher
 * @property {string|null} assignedClass - Class ID if assigned
 */

export const MOCK_TEACHERS = [
    {
        id: "sarah_williams",
        name: "Sarah Williams",
        employeeId: "EMP001",
        department: "Mathematics",
        email: "sarah.williams@school.edu",
        phone: "+91-9876543210",
        status: "Active",
        isClassTeacher: true,
        assignedClass: "cls_001"
    },
    {
        id: "john_smith",
        name: "John Smith",
        employeeId: "EMP002",
        department: "Science",
        email: "john.smith@school.edu",
        phone: "+91-9876543211",
        status: "Active",
        isClassTeacher: false,
        assignedClass: null
    },
    {
        id: "emily_davis",
        name: "Emily Davis",
        employeeId: "EMP003",
        department: "English",
        email: "emily.davis@school.edu",
        phone: "+91-9876543212",
        status: "Active",
        isClassTeacher: true,
        assignedClass: "cls_002"
    },
    {
        id: "michael_brown",
        name: "Michael Brown",
        employeeId: "EMP004",
        department: "Social Studies",
        email: "michael.brown@school.edu",
        phone: "+91-9876543213",
        status: "Active",
        isClassTeacher: false,
        assignedClass: null
    },
    {
        id: "lisa_johnson",
        name: "Lisa Johnson",
        employeeId: "EMP005",
        department: "Computer Science",
        email: "lisa.johnson@school.edu",
        phone: "+91-9876543214",
        status: "Active",
        isClassTeacher: false,
        assignedClass: null
    },
    {
        id: "david_wilson",
        name: "David Wilson",
        employeeId: "EMP006",
        department: "Physical Education",
        email: "david.wilson@school.edu",
        phone: "+91-9876543215",
        status: "Active",
        isClassTeacher: false,
        assignedClass: null
    }
];
