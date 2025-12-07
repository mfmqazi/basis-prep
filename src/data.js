// Define curriculum based on Basis Charter Schools (Accelerated)
// K-4: Primary
// 5-7: Middle (Bridge)
// 8-12: High (AP Focus)

const SUBJECTS_BY_GRADE = {
    // Primary (K-4) - Basis "LET/SET" Model
    primary: {
        "Math": ["Arithmetic", "Saxon Math Concepts", "Geometry Basics", "Problem Solving", "Number Theory"],
        "Science": ["Introduction to Science", "Physical World", "Living Things", "Engineering Basics"],
        "Humanities": ["History", "Geography", "Culture", "Integrated Social Studies"],
        "English": ["Phonics", "Reading Comprehension", "Grammar", "Writing", "Vocabulary"],
        "Mandarin": ["Basic Vocabulary", "Sentences", "Culture", "Writing Characters"],
        "Engineering": ["Structures", "Simple Machines", "Design Process", "Robotics Basics"]
    },
    // Middle (5-7) - Basis "Bridge to High School" (Separate Sciences start early)
    middle: {
        "Math": ["Arithmetic", "Pre-Algebra", "Algebra I", "Geometry"],
        "Biology": ["Cell Biology", "Genetics", "Evolution", "Human Anatomy", "Ecology"],
        "Chemistry": ["Atomic Structure", "Periodic Table", "Chemical Bonding", "Reactions", "States of Matter"],
        "Physics": ["Motion", "Forces", "Energy", "Waves", "Electricity"],
        "English": ["Literature Analysis", "Composition", "Grammar", "Vocabulary", "Classics"],
        "History": ["World History", "American History", "Geography", "Civics"],
        "Latin": ["Grammar", "Vocabulary", "Translation", "Roman Culture", "Myths"]
    },
    // High (8-12) - AP & Capstone Focus
    high: {
        "Math": ["Algebra II", "Pre-Calculus", "AP Calculus AB", "AP Calculus BC", "AP Statistics", "Complex Analysis"],
        "Science": ["AP Biology", "AP Chemistry", "AP Physics 1", "AP Physics C: Mechanics", "AP Environmental Science", "Organic Chemistry"],
        "English": ["AP English Language", "AP English Literature", "Rhetoric", "Creative Writing"],
        "History": ["AP World History", "AP US History", "AP European History", "AP Government", "AP Economics", "AP Human Geography"],
        "World Languages": ["AP Spanish", "AP French", "AP Latin", "AP Chinese"],
        "Electives": ["AP Psychology", "AP Computer Science A", "Economics", "Art History"],
        "Capstone": ["Senior Project (Research)", "Senior Project (Thesis)"]
    },
    // AP - Keep for dedicated AP practice (Optional, but users might like the direct category)
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

// Helper to determine grade level category
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
