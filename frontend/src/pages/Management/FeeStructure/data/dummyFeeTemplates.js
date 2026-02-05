export const dummyFeeTemplates = [
  {
    _id: "FT-2025-001",
    name: "Class 1 Standard Fee Structure",
    academicYear: "2025-2026",
    class: {
      _id: "CLS-001",
      name: "Class 1"
    },
    feeComponents: [
      {
        name: "Tuition Fee",
        amount: 45000,
        type: "Tuition",
        frequency: "Annual",
        taxAmount: 0
      },
      {
        name: "Development Fee",
        amount: 5000,
        type: "Development",
        frequency: "Annual",
        taxAmount: 0
      },
      {
        name: "Activity Fee",
        amount: 2500,
        type: "Miscellaneous",
        frequency: "Term",
        taxAmount: 0
      }
    ],
    totalAmount: 52500,
    yearlyIncrementPercentage: 5,
    isActive: true
  },
  {
    _id: "FT-2025-002",
    name: "Class 5 Standard Fee Structure",
    academicYear: "2025-2026",
    class: {
      _id: "CLS-005",
      name: "Class 5"
    },
    feeComponents: [
      {
        name: "Tuition Fee",
        amount: 55000,
        type: "Tuition",
        frequency: "Annual",
        taxAmount: 0
      },
      {
        name: "Computer Lab Fee",
        amount: 3000,
        type: "Laboratory",
        frequency: "Annual",
        taxAmount: 0
      },
      {
        name: "Library Fee",
        amount: 1500,
        type: "Library",
        frequency: "Annual",
        taxAmount: 0
      }
    ],
    totalAmount: 59500,
    yearlyIncrementPercentage: 5,
    isActive: true
  },
  {
    _id: "FT-2025-003",
    name: "Class 10 Science Stream Fee",
    academicYear: "2025-2026",
    class: {
      _id: "CLS-010-SCI",
      name: "Class 10 - Science"
    },
    feeComponents: [
      {
        name: "Tuition Fee",
        amount: 75000,
        type: "Tuition",
        frequency: "Annual",
        taxAmount: 0
      },
      {
        name: "Science Lab Fee",
        amount: 8000,
        type: "Laboratory",
        frequency: "Annual",
        taxAmount: 0
      },
      {
        name: "Examination Fee",
        amount: 2000,
        type: "Examination",
        frequency: "Term",
        taxAmount: 0
      }
    ],
    totalAmount: 85000,
    yearlyIncrementPercentage: 7,
    isActive: true
  },
  {
    _id: "FT-2025-004",
    name: "Class 12 Commerce Stream Fee",
    academicYear: "2025-2026",
    class: {
      _id: "CLS-012-COM",
      name: "Class 12 - Commerce"
    },
    feeComponents: [
      {
        name: "Tuition Fee",
        amount: 70000,
        type: "Tuition",
        frequency: "Annual",
        taxAmount: 0
      },
      {
        name: "Computer Lab Fee",
        amount: 4000,
        type: "Laboratory",
        frequency: "Annual",
        taxAmount: 0
      },
      {
        name: "Project Work Fee",
        amount: 1500,
        type: "Miscellaneous",
        frequency: "One-Time",
        taxAmount: 0
      }
    ],
    totalAmount: 75500,
    yearlyIncrementPercentage: 7,
    isActive: false
  }
];
