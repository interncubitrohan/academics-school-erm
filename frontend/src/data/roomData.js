/**
 * Room Data Model
 * 
 * @typedef {Object} Room
 * @property {string} id - Unique identifier (e.g., generated UUID or integer)
 * @property {string} blockName - Name of the building block (e.g., "Main", "Science")
 * @property {number} floorNumber - Floor number (0 for Ground, 1 for First, etc.)
 * @property {string} roomNumber - Physical room number/identifier (e.g., "101", "Lab-A")
 * @property {string} roomName - Generated full name (Block-Floor-RoomNumber) -> e.g., "Main-1-101"
 * @property {string} roomType - Type of room (Classroom, Lab, Library, etc.)
 * @property {number} capacity - max student capacity
 * @property {string[]} facilities - List of available facilities
 * @property {string} status - "Available" | "Assigned" | "Maintenance"
 * @property {string|null} assignedClass - ID or Name of class assigned (optional)
 */

/**
 * Naming Convention: Block-Floor-RoomNumber
 * 
 * This convention helps in easy physical location identification.
 * - Block: The building wing or block name.
 * - Floor: The specific floor index.
 * - RoomNumber: The specific room identifier on that floor.
 * 
 * Example: "Sci-2-205" -> Science Block, 2nd Floor, Room 205.
 */

export const MOCK_ROOMS = [
    {
        id: "room_001",
        blockName: "Main",
        floorNumber: 1,
        roomNumber: "101",
        roomName: "Main-1-101",
        roomType: "Classroom",
        capacity: 40,
        facilities: ["Projector", "Whiteboard", "AC"],
        status: "Available",
        assignedClass: null
    },
    {
        id: "room_002",
        blockName: "Main",
        floorNumber: 1,
        roomNumber: "102",
        roomName: "Main-1-102",
        roomType: "Classroom",
        capacity: 40,
        facilities: ["Whiteboard", "CCTV"],
        status: "Assigned",
        assignedClass: "10-A"
    },
    {
        id: "room_003",
        blockName: "Science",
        floorNumber: 2,
        roomNumber: "201",
        roomName: "Sci-2-201",
        roomType: "Lab",
        capacity: 30,
        facilities: ["Lab Equipment", "Safety Shower", "Smart Board"],
        status: "Available",
        assignedClass: null
    },
    {
        id: "room_004",
        blockName: "Library",
        floorNumber: 0,
        roomNumber: "001",
        roomName: "Lib-0-001",
        roomType: "Library",
        capacity: 100,
        facilities: ["Computers", "WiFi", "Reading Zone"],
        status: "Available",
        assignedClass: null
    },
    {
        id: "room_005",
        blockName: "Main",
        floorNumber: 3,
        roomNumber: "305",
        roomName: "Main-3-305",
        roomType: "Auditorium",
        capacity: 200,
        facilities: ["Stage", "Sound System", "Projector"],
        status: "Assigned",
        assignedClass: "Event-AnnualDay" 
    }
];
