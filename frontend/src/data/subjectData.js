/**
 * Subject Master Data
 * 
 * Reusability Strategy:
 * Subjects defined here are "Master Records". They represent the definition of a subject
 * and are NOT tied to a specific Academic Year or Class Section initially.
 * 
 * - A Subject (e.g., "Mathematics Grade 10") is created once.
 * - Ideally, in the backend, these are linked to formatted "Curriculum" records for specific years/classes.
 * - This allows historical data retention while letting the curriculum evolve.
 * - Status 'Active'/'Inactive' controls visibility for new allocations without deleting historical data.
 */

export const MOCK_SUBJECTS = [
    {
        id: "sub_001",
        subjectCode: "MATH10",
        subjectName: "Mathematics",
        shortName: "Math",
        subjectType: "Theory", // Would typically be an ID linked to SubjectType Master
        boards: [{ category: "CBSE", state: "", boardName: "" }, { category: "International", state: "", boardName: "IGCSE" }],
        applicableGrades: ["10"],
        maxMarksOrCredits: 100,
        hasPractical: false,
        practicalMarks: 0,
        hasInternalAssessment: true,
        iaWeightage: 20, // 20% Internal, 80% Theory
        description: "Standard Mathematics curriculum covering Algebra, Geometry, and Trigonometry.",
        prerequisites: ["MATH09"],
        status: "Active"
    },
    {
        id: "sub_002",
        subjectCode: "PHY10",
        subjectName: "Physics",
        shortName: "Phy",
        subjectType: "Theory",
        boards: [{ category: "CBSE", state: "", boardName: "" }],
        applicableGrades: ["10"],
        maxMarksOrCredits: 70,
        hasPractical: true,
        practicalMarks: 30,
        hasInternalAssessment: true, // Lab work can be part of IA or separate Practical component
        iaWeightage: 0, // In this model, 70 Theory + 30 Practical.
        description: "Fundamental Physics concepts including Mechanics, Optics, and Electricity.",
        prerequisites: ["SCI09"],
        status: "Active"
    },
    {
        id: "sub_003",
        subjectCode: "ENG10",
        subjectName: "English Communicative",
        shortName: "Eng",
        subjectType: "Language",
        boards: [{ category: "CBSE", state: "", boardName: "" }, { category: "ICSE", state: "", boardName: "" }],
        applicableGrades: ["9", "10"],
        maxMarksOrCredits: 100,
        hasPractical: false,
        practicalMarks: 0,
        hasInternalAssessment: true,
        iaWeightage: 20, // ASL (Assessment of Speaking and Listening) often counts here
        description: "Focus on communication skills, literature, and grammar.",
        prerequisites: [],
        status: "Active"
    },
    {
        id: "sub_004",
        subjectCode: "PE10",
        subjectName: "Physical Education",
        shortName: "PE",
        subjectType: "Co-Scholastic",
        boards: [{ category: "CBSE", state: "", boardName: "" }],
        applicableGrades: ["10"],
        maxMarksOrCredits: 100, // Often graded on a scale but can have marks
        hasPractical: true,
        practicalMarks: 70,
        hasInternalAssessment: true,
        iaWeightage: 30,
        description: "Physical fitness, sports rules, and health education.",
        prerequisites: [],
        status: "Active"
    },
    {
        id: "sub_005",
        subjectCode: "CS12",
        subjectName: "Computer Science",
        shortName: "CS",
        subjectType: "Elective",
        boards: [{ category: "CBSE", state: "", boardName: "" }],
        applicableGrades: ["11", "12"],
        maxMarksOrCredits: 100,
        hasPractical: true,
        practicalMarks: 30,
        hasInternalAssessment: false,
        iaWeightage: 0,
        description: "Advanced Python programming, Database Management, and Networking.",
        prerequisites: ["MATH10"],
        status: "Active"
    }
];
