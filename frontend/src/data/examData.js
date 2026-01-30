/**
 * Exam Data Model & Mock Data
 *
 * Relationship Explanation:
 * - An Exam is linked to a specific 'EvaluationFramework' (via evaluationFrameworkId).
 *   This framework dictates the structure of the exam (e.g., Internal vs External weightage).
 * - An Exam is linked to a 'GradingScale' (via resultSettings.gradingScaleId).
 *   This determines how marks are converted to grades (e.g., GPA, Percentage, A-E).
 * - 'applicableClasses' links to the Class Configuration module.
 * - 'timetable.subjectId' links to the Subject Master.
 */

export const mockExams = [
    {
        id: 2024001,
        examName: "Mid-Term Examination 2024-25",
        examType: "Term", // Term, Unit, Final
        academicYear: "2024-2025",
        term: "Term 1",
        examCode: "MT-2024-T1",
        description: "Half-yearly assessment covering the first 50% of the syllabus.",
        board: { category: "CBSE", state: "", boardName: "" },
        
        schedule: {
            startDate: "2024-10-15",
            endDate: "2024-10-25",
            resultDate: "2024-11-10",
            excludedDates: ["2024-10-19", "2024-10-20"], // Weekends
            timetable: [
                {
                    date: "2024-10-15",
                    subjectId: 101, // Mathematics
                    subjectName: "Mathematics",
                    startTime: "09:00",
                    endTime: "11:00",
                    duration: 120, // minutes
                    room: "Examination Hall A"
                },
                {
                    date: "2024-10-17",
                    subjectId: 102, // Science
                    subjectName: "Science",
                    startTime: "09:00",
                    endTime: "11:00",
                    duration: 120,
                    room: "Examination Hall B"
                },
                {
                    date: "2024-10-21",
                    subjectId: 103, // English
                    subjectName: "English",
                    startTime: "09:00",
                    endTime: "11:00",
                    duration: 120,
                    room: "Classroom 5-A"
                }
            ]
        },

        applicableClasses: [
            { classId: 9, className: "Class 9-A" },
            { classId: 10, className: "Class 9-B" }
        ],

        // Defines which subjects are part of this exam for specific classes
        // Usually auto-fetched from Class-Subject mapping
        applicableSubjects: [
            { subjectId: 101, subjectName: "Mathematics", maxMarks: 80 },
            { subjectId: 102, subjectName: "Science", maxMarks: 80 },
            { subjectId: 103, subjectName: "English", maxMarks: 80 },
            { subjectId: 104, subjectName: "Social Science", maxMarks: 80 },
            { subjectId: 105, subjectName: "Hindi", maxMarks: 80 }
        ],

        // Direct link to the Evaluation Framework
        // This overrides manual max marks if the framework enforces strict structure
        evaluationFrameworkId: 1, // e.g., "CBSE Secondary School Evaluation"
        evaluationFrameworkName: "CBSE Secondary School Evaluation",

        marksConfiguration: {
            // Common settings for all subjects
            common: {
                maxMarks: 80,
                passingMarks: 26,
            },
            // Overrides for specific subjects
            subjectSpecific: [
                {
                    subjectId: 105, // Hindi might be out of 50
                    maxMarks: 50,
                    passingMarks: 17
                }
            ]
        },

        evaluationGuidelines: {
            markingScheme: "Step-wise marking as per CBSE guidelines.",
            answerKey: null, // Link to uploaded file
            rubric: null, // Link to rubric definition
            moderation: "Access limited to HODs + Principal.",
            gracePolicy: "Maximum 2 grace marks allowed for borderline cases (32%).",
            specialInstructions: "Calculators are NOT allowed."
        },

        resultSettings: {
            format: "Report Card", // Report Card, Marksheet
            gradingScaleId: 1, // Linked to "CBSE 9-Point Scale"
            gradingScaleName: "CBSE 9-Point Scale",
            components: {
                showClassRank: true,
                showAttendance: true,
                showRemarks: true,
                showSubjectHighest: false
            },
            publication: {
                publishToStudentPortal: true,
                publishToParentApp: true,
                requiresApproval: true,
                approvalStatus: "Approved"
            }
        },

        status: "Scheduled" // Draft, Scheduled, Ongoing, Completed, Published
    }
];

// Helper to get an empty exam object structure for the wizard
export const getEmptyExamObject = () => ({
    examName: "",
    examType: "Term",
    academicYear: new Date().getFullYear() + "-" + (new Date().getFullYear() + 1),
    term: "Term 1",
    examCode: "",
    description: "",
    schedule: {
        startDate: "",
        endDate: "",
        resultDate: "",
        excludedDates: [],
        timetable: []
    },
    board: {
        category: "",
        state: "",
        boardName: ""
    },
    applicableClasses: [],
    applicableSubjects: [],
    evaluationFrameworkId: null,
    marksConfiguration: {
        common: { maxMarks: 100, passingMarks: 33 },
        subjectSpecific: []
    },
    evaluationGuidelines: {
        markingScheme: "",
        gracePolicy: "",
        specialInstructions: ""
    },
    resultSettings: {
        format: "Report Card",
        gradingScaleId: null,
        components: {
            showClassRank: false,
            showAttendance: true,
            showRemarks: true
        },
        publication: {
            publishToStudentPortal: false,
            publishToParentApp: false,
            requiresApproval: true
        }
    },
    status: "Draft"
});
