// Define curriculum based on Basis Charter School standards
// Source: Basis Charter Schools Curriculum (K-12)

const SUBJECTS_BY_GRADE = {
    // Primary (1-4) - LET/SET Model
    // Focus: Connections, Humanities, Math/Science, Literacy
    primary: {
        "Math": ["Saxon Math", "Arithmetic", "Geometry Basics", "Problem Solving"],
        "Science": ["Introduction to Science", "Physical Geography", "Engineering & Technology"],
        "Humanities": ["History", "Civics", "Geography", "Cultural Studies"],
        "English": ["Reading", "Writing", "Spelling", "Phonics", "Grammar"],
        "Engineering": ["Engineering Design Process", "Structures", "Simple Machines"]
    },
    // Middle School (5-7) - Specialized Subjects
    // Biology, Chemistry, Physics start early (Gr 6)
    middle: {
        "Math": ["Arithmetic B", "Pre-Algebra", "Algebra I", "Geometry"],
        "Science": ["Introduction to Science (Gr 5)", "Biology", "Chemistry", "Physics"],
        "English": ["English Language", "Literature", "Writing", "Classics"],
        "History": ["World History", "American History", "Geography"],
        "Electives": ["Latin", "Logic", "Economics", "Computer Science"]
    },
    // High School (8-12) - AP Focus
    high: {
        "Math": ["Algebra II", "Pre-Calculus", "AP Calculus AB", "AP Calculus BC", "AP Statistics", "Linear Algebra"],
        "Science": ["Honors Biology", "Honors Chemistry", "Honors Physics", "AP Biology", "AP Chemistry", "AP Physics"],
        "English": ["Honors English Lit", "Honors English Lang", "AP English Language", "AP English Literature"],
        "Social Science": ["AP World History", "AP US History", "AP Macreconomics", "AP Microeconomics", "AP Government", "AP Psychology"],
        "Capstone": ["Senior Project", "Research Methods"]
    },
    // Advanced Placement (AP) - Full Suite
    ap: {
        "AP Arts": ["AP Art History", "AP Music Theory", "AP 2-D Art and Design"],
        "AP English": ["AP English Language and Composition", "AP English Literature and Composition"],
        "AP History & Social Sciences": [
            "AP Comparative Government and Politics",
            "AP European History",
            "AP Human Geography",
            "AP Macroeconomics",
            "AP Microeconomics",
            "AP Psychology",
            "AP United States Government and Politics",
            "AP United States History",
            "AP World History: Modern"
        ],
        "AP Math & Computer Science": [
            "AP Calculus AB",
            "AP Calculus BC",
            "AP Computer Science A",
            "AP Computer Science Principles",
            "AP Precalculus",
            "AP Statistics"
        ],
        "AP Sciences": [
            "AP Biology",
            "AP Chemistry",
            "AP Environmental Science",
            "AP Physics 1: Algebra-Based",
            "AP Physics 2: Algebra-Based",
            "AP Physics C: Mechanics",
            "AP Physics C: Electricity and Magnetism"
        ],
        "AP World Languages & Cultures": [
            "AP Chinese Language and Culture",
            "AP French Language and Culture",
            "AP German Language and Culture",
            "AP Italian Language and Culture",
            "AP Japanese Language and Culture",
            "AP Latin",
            "AP Spanish Language and Culture",
            "AP Spanish Literature and Culture"
        ]
    }
};

// Helper to determine grade level category for Basis
const getGradeLevel = (gradeNum) => {
    if (gradeNum <= 4) return 'primary';
    if (gradeNum <= 7) return 'middle';
    return 'high';
};

// Helper to generate structure for all grades
const generateCurriculum = () => {
    const data = {};

    // Generate Grades 1-12
    for (let i = 1; i <= 12; i++) {
        const grade = `Grade ${i}`;
        data[grade] = {};

        const level = getGradeLevel(i);
        const curriculum = SUBJECTS_BY_GRADE[level];

        Object.keys(curriculum).forEach(subject => {
            data[grade][subject] = {};
            curriculum[subject].forEach(topic => {
                data[grade][subject][topic] = [];
            });
        });
    }

    // Add AP Level
    data["AP"] = {};
    const apCurriculum = SUBJECTS_BY_GRADE.ap;
    Object.keys(apCurriculum).forEach(subject => {
        data["AP"][subject] = {};
        apCurriculum[subject].forEach(topic => {
            data["AP"][subject][topic] = [];
        });
    });

    return data;
};

export const quizData = generateCurriculum();
