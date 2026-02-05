export const dummyApplications = [
  {
    _id: "64f1b2c3e4b0a1a2b3c4d5e6",
    applicationId: "ADM-2025-000001",
    academicYear: "2025-2026",
    firstName: "Aarav",
    lastName: "Sharma",
    classOfAdmission: {
      _id: "64f1b2c3e4b0a1a2b3c4d111",
      name: "Class 1"
    },
    status: "draft",
    dateOfBirth: "2019-05-15T00:00:00.000Z",
    gender: "male",
    category: "general",
    currentAddress: {
      addressLine1: "123, Palm Grove Society",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001"
    },
    familyInfo: {
      fatherName: "Rajesh Sharma",
      motherName: "Priya Sharma",
      primaryContactNumber: "9876543210"
    }
  },
  {
    _id: "64f1b2c3e4b0a1a2b3c4d5e7",
    applicationId: "ADM-2025-000002",
    academicYear: "2025-2026",
    firstName: "Ishaan",
    lastName: "Verma",
    classOfAdmission: {
      _id: "64f1b2c3e4b0a1a2b3c4d222",
      name: "Class 5"
    },
    status: "pending_admission_review",
    dateOfBirth: "2015-08-22T00:00:00.000Z",
    gender: "male",
    category: "obc",
    currentAddress: {
      addressLine1: "45, Green Valley",
      city: "Pune",
      state: "Maharashtra",
      pincode: "411001"
    },
    familyInfo: {
      fatherName: "Suresh Verma",
      motherName: "Anita Verma",
      primaryContactNumber: "9876543211"
    }
  },
  {
    _id: "64f1b2c3e4b0a1a2b3c4d5e8",
    applicationId: "ADM-2025-000003",
    academicYear: "2025-2026",
    firstName: "Ananya",
    lastName: "Gupta",
    classOfAdmission: {
      _id: "64f1b2c3e4b0a1a2b3c4d333",
      name: "Class 9"
    },
    status: "rejected_by_admission",
    dateOfBirth: "2011-03-10T00:00:00.000Z",
    gender: "female",
    category: "general",
    currentAddress: {
      addressLine1: "78, Sunshine Apartments",
      city: "Delhi",
      state: "Delhi",
      pincode: "110001"
    },
    familyInfo: {
      fatherName: "Vikram Gupta",
      motherName: "Meera Gupta",
      primaryContactNumber: "9876543212"
    }
  },
  {
    _id: "64f1b2c3e4b0a1a2b3c4d5e9",
    applicationId: "ADM-2025-000004",
    academicYear: "2025-2026",
    firstName: "Riya",
    lastName: "Singh",
    classOfAdmission: {
      _id: "64f1b2c3e4b0a1a2b3c4d111",
      name: "Class 1"
    },
    status: "pending_fee_structure",
    dateOfBirth: "2019-11-05T00:00:00.000Z",
    gender: "female",
    category: "sc",
    currentAddress: {
      addressLine1: "12, Rose Villa",
      city: "Lucknow",
      state: "Uttar Pradesh",
      pincode: "226001"
    },
    familyInfo: {
      fatherName: "Amit Singh",
      motherName: "Neelam Singh",
      primaryContactNumber: "9876543213"
    }
  },
  {
    _id: "64f1b2c3e4b0a1a2b3c4d5ea",
    applicationId: "ADM-2025-000005",
    academicYear: "2025-2026",
    firstName: "Kabir",
    lastName: "Das",
    classOfAdmission: {
      _id: "64f1b2c3e4b0a1a2b3c4d222",
      name: "Class 5"
    },
    status: "approved",
    dateOfBirth: "2015-01-30T00:00:00.000Z",
    gender: "male",
    category: "st",
    currentAddress: {
      addressLine1: "89, Lake View",
      city: "Kolkata",
      state: "West Bengal",
      pincode: "700001"
    },
    familyInfo: {
      fatherName: "Rahul Das",
      motherName: "Sita Das",
      primaryContactNumber: "9876543214"
    }
  },
  {
    _id: "64f1b2c3e4b0a1a2b3c4d5eb",
    applicationId: "ADM-2025-000006",
    academicYear: "2025-2026",
    firstName: "Saanvi",
    lastName: "Patel",
    classOfAdmission: {
      _id: "64f1b2c3e4b0a1a2b3c4d333",
      name: "Class 9"
    },
    status: "pending_admission_review",
    dateOfBirth: "2011-07-12T00:00:00.000Z",
    gender: "female",
    category: "general",
    currentAddress: {
      addressLine1: "56, River Side",
      city: "Ahmedabad",
      state: "Gujarat",
      pincode: "380001"
    },
    familyInfo: {
      fatherName: "Nilesh Patel",
      motherName: "Bhavna Patel",
      primaryContactNumber: "9876543215"
    }
  },
  {
    _id: "64f1b2c3e4b0a1a2b3c4d5ec",
    applicationId: "ADM-2025-000007",
    academicYear: "2025-2026",
    firstName: "Rohan",
    lastName: "Mehta",
    classOfAdmission: {
      _id: "64f1b2c3e4b0a1a2b3c4d111",
      name: "Class 1"
    },
    status: "pending_principal_approval",
    dateOfBirth: "2019-02-20T00:00:00.000Z",
    gender: "male",
    category: "general",
    currentAddress: {
      addressLine1: "101, Sky Towers",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400050"
    },
    familyInfo: {
      fatherName: "Karan Mehta",
      motherName: "Simran Mehta",
      primaryContactNumber: "9876543220"
    },
    feeStructure: {
        components: [
            { id: 1, name: 'Tuition Fee', type: 'Tuition', frequency: 'Annually', amount: 25000, isActive: true },
            { id: 2, name: 'Development Fee', type: 'Development', frequency: 'One-time', amount: 5000, isActive: true },
            { id: 3, name: 'Library Fee', type: 'Miscellaneous', frequency: 'Annually', amount: 1000, isActive: true },
            { id: 4, name: 'Sports Fee', type: 'Miscellaneous', frequency: 'Annually', amount: 1500, isActive: false },
        ],
        concession: {
            type: 'percentage',
            value: 10,
            reason: 'Sibling Discount'
        },
        totals: {
            gross: 31000,
            concession: 3100,
            net: 27900
        }
    }
  }
];
