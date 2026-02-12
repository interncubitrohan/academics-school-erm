export const mockPurchaseRequests = [
    {
        id: 1,
        requestId: "REQ-2024-001",
        requester: "John Doe",
        department: "Computer Science",
        requestDate: "2024-02-12",
        status: "requested",
        items: [
            { id: 101, name: "Dell Monitor 24\"", quantity: 2, description: "For new lab computers", file: "quote_dell.pdf" },
            { id: 102, name: "HDMI Cables", quantity: 5, description: "High speed cables" }
        ],
        totalItems: 7
    },
    {
        id: 2,
        requestId: "REQ-2024-002",
        requester: "Jane Smith",
        department: "Physics",
        requestDate: "2024-02-11",
        status: "requested",
        items: [
            { id: 201, name: "Lab Coats", quantity: 20, description: "Size M and L" },
            { id: 202, name: "Safety Goggles", quantity: 20, description: "Standard safety goggles" }
        ],
        totalItems: 40
    },
    {
        id: 3,
        requestId: "REQ-2024-003",
        requester: "Bob Wilson",
        department: "Administration",
        requestDate: "2024-02-10",
        status: "approved",
        items: [
            { id: 301, name: "A4 Paper Ream", quantity: 50, description: "Monthly supply" }
        ],
        totalItems: 50
    },
     {
        id: 4,
        requestId: "REQ-2024-004",
        requester: "Alice Johnson",
        department: "Chemistry",
        requestDate: "2024-02-13",
        status: "requested",
        items: [
            { id: 401, name: "Test Tubes", quantity: 100, description: "Borosilicate glass" },
            { id: 402, name: "Bunsen Burner", quantity: 5, description: "Standard laboratory burner" }
        ],
        totalItems: 105
    }
];
