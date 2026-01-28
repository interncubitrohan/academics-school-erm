/**
 * Class-Subject Mapping Data Model
 * 
 * DESIGN PHILOSOPHY:
 * ------------------
 * 1. Separation of Concerns:
 *    - Subject Master (`subjectData.js`): Defines WHAT a subject is (Code, Name, Default Type).
 *    - Class-Subject Mapping (`this file`): Defines HOW a subject is applied to a specific Class & Year.
 * 
 * 2. Why this separation?
 *    - "Mathematics" (MATH101) exists as a concept in the Master list.
 *    - In "Class 10-A (2025-26)", MATH101 might be:
 *      - Mandatory
 *      - 100 Marks (80 Theory + 20 IA)
 *      - 5 Hours/week
 *    - In "Class 9-A (2025-26)", the same MATH101 might have different settings (though unlikely for the same code, 
 *      it allows flexibility without duplicating master records).
 * 
 * 3. Elective Groups:
 *    - Subjects can be grouped (e.g., "Second Language Group" or "Science Electives").
 *    - `subjectGroups` defines the rules (Min 1, Max 1).
 *    - `subjects` entries reference these groups via `groupId`.
 */

export const MOCK_CLASS_SUBJECT_MAPPINGS = [
    {
        id: "map_2025_10A", // Unique Mapping ID
        academicYear: "2025-2026",
        classId: "class_10_A", // References a Class Master ID
        className: "Class 10-A", // Denormalized for convenience
        termStructure: "Annual", // Annual, Semester, Trimester

        // Groups for Electives / Optional Selections
        subjectGroups: [
            {
                groupId: "grp_lang_2",
                groupName: "Second Language",
                minSelect: 1,
                maxSelect: 1,
                subjectCodes: ["HINDI10", "SANSK10", "FRENCH10"] // Validation helper
            },
            {
                groupId: "grp_skill",
                groupName: "Skill Electives",
                minSelect: 0,
                maxSelect: 1,
                subjectCodes: ["AI101", "IT101"]
            }
        ],

        // The actual mapped subjects
        subjects: [
            // --- CORE SUBJECTS ---
            {
                subjectCode: "MATH10", // Link to Subject Master
                subjectName: "Mathematics", // Denormalized for display speed
                subjectType: "Theory", // Derived from Master but can be overridden? Usually same.
                
                // Academic Configuration
                teachingHoursPerWeek: 6,
                
                // Examination / Evaluation Schema
                maxTheoryMarks: 80,
                maxPracticalMarks: 0,
                maxIAMarks: 20,
                totalMaxMarks: 100, // Calculated: 80 + 0 + 20
                passMarks: 33,
                
                isOptional: false,
                displayOrder: 1,
                groupId: null
            },
            {
                subjectCode: "SCI10",
                subjectName: "Science",
                subjectType: "Theory",
                teachingHoursPerWeek: 6,
                maxTheoryMarks: 80,
                maxPracticalMarks: 20, // Lab practicals
                maxIAMarks: 0, // Enriched internally inside Practical for this specific schema
                totalMaxMarks: 100,
                passMarks: 33,
                isOptional: false,
                displayOrder: 2,
                groupId: null
            },
            
            // --- ELECTIVE GROUP EXAMPLES (Second Language) ---
            {
                subjectCode: "HINDI10",
                subjectName: "Hindi Course B",
                subjectType: "Language",
                teachingHoursPerWeek: 4,
                maxTheoryMarks: 80,
                maxPracticalMarks: 0,
                maxIAMarks: 20,
                totalMaxMarks: 100,
                passMarks: 33,
                isOptional: true, // It's part of a choice
                displayOrder: 3,
                groupId: "grp_lang_2" // Linked to "Second Language" group
            },
            {
                subjectCode: "FRENCH10",
                subjectName: "French",
                subjectType: "Language",
                teachingHoursPerWeek: 4,
                maxTheoryMarks: 80,
                maxPracticalMarks: 0,
                maxIAMarks: 20,
                totalMaxMarks: 100,
                passMarks: 33,
                isOptional: true,
                displayOrder: 4,
                groupId: "grp_lang_2"
            },

            // --- SKILL ELECTIVES ---
            {
                subjectCode: "AI101",
                subjectName: "Artificial Intelligence",
                subjectType: "Skill",
                teachingHoursPerWeek: 2,
                maxTheoryMarks: 50,
                maxPracticalMarks: 50,
                maxIAMarks: 0,
                totalMaxMarks: 100,
                passMarks: 33,
                isOptional: true,
                displayOrder: 5,
                groupId: "grp_skill"
            }
        ]
    }
];

// Helper to calculate total marks automatically (if needed in UI logic)
export const calculateTotalMarks = (subject) => {
    return (subject.maxTheoryMarks || 0) + 
           (subject.maxPracticalMarks || 0) + 
           (subject.maxIAMarks || 0);
};
