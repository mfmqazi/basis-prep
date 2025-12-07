import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ExternalLink, Video, FileText, Home, GraduationCap, Calculator, FlaskConical, Globe, Languages, History, Atom } from 'lucide-react';

export default function StudyMaterials() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('textbooks');

    const textbooksBySubject = {
        "Math": {
            icon: Calculator,
            color: "blue",
            books: [
                { title: "Saxon Math Series", description: "Used in BASIS K-8. Incremental approach with constant review.", levels: "K-8", recommended: true },
                { title: "Singapore Math", description: "Problem-solving focused curriculum, strong conceptual foundation.", levels: "K-8", recommended: true },
                { title: "Art of Problem Solving (AoPS)", description: "Advanced problem solving for gifted students.", levels: "6-12", url: "https://artofproblemsolving.com" },
                { title: "Precalculus by Stewart", description: "Standard high school precalculus textbook.", levels: "9-12" },
                { title: "Calculus by Stewart", description: "AP Calculus standard text.", levels: "11-12" }
            ]
        },
        "Science": {
            icon: FlaskConical,
            color: "green",
            books: [
                { title: "CPO Science Series", description: "Hands-on, inquiry-based science curriculum.", levels: "K-8", recommended: true },
                { title: "Campbell Biology", description: "Gold standard for AP Biology preparation.", levels: "9-12", recommended: true },
                { title: "Chemistry: The Central Science", description: "Comprehensive chemistry textbook for AP Chem.", levels: "10-12" },
                { title: "Physics: Principles with Applications", description: "Giancoli's physics for AP Physics.", levels: "10-12" },
                { title: "The Princeton Review AP Series", description: "Test prep for all AP Science exams.", levels: "9-12", url: "https://www.princetonreview.com" }
            ]
        },
        "English & Language Arts": {
            icon: BookOpen,
            color: "purple",
            books: [
                { title: "Core Knowledge Language Arts", description: "Systematic reading and writing curriculum.", levels: "K-5", recommended: true },
                { title: "Vocabulary Workshop", description: "Sadlier vocabulary building series.", levels: "3-12", recommended: true },
                { title: "The Elements of Style (Strunk & White)", description: "Essential writing guide.", levels: "6-12" },
                { title: "50 Essays: A Portable Anthology", description: "Classic essays for AP English.", levels: "9-12" },
                { title: "How to Read Literature Like a Professor", description: "Literary analysis skills.", levels: "8-12" }
            ]
        },
        "History & Social Studies": {
            icon: History,
            color: "amber",
            books: [
                { title: "Core Knowledge History Series", description: "Comprehensive world and US history.", levels: "K-8", recommended: true },
                { title: "A History of US (Hakim)", description: "Engaging narrative American history.", levels: "4-8", recommended: true },
                { title: "The American Pageant", description: "Standard AP US History textbook.", levels: "10-12" },
                { title: "Western Civilization (Spielvogel)", description: "AP European History preparation.", levels: "10-12" },
                { title: "Barron's AP World History", description: "Comprehensive AP World prep.", levels: "9-12" }
            ]
        },
        "Mandarin Chinese": {
            icon: Languages,
            color: "red",
            books: [
                { title: "Integrated Chinese (中文听说读写)", description: "Most widely used Chinese textbook in US schools. Excellent for beginners.", levels: "K-12", recommended: true, url: "https://www.cheng-tsui.com/integrated-chinese" },
                { title: "Better Chinese (轻松学中文)", description: "Fun, engaging approach for younger learners.", levels: "K-6", recommended: true },
                { title: "Chinese Made Easy", description: "Simplified characters focus, great for self-study.", levels: "K-8" },
                { title: "HSK Standard Course", description: "Official HSK exam preparation textbooks.", levels: "3-12", url: "https://www.purpleculture.net" },
                { title: "New Practical Chinese Reader", description: "Comprehensive series with cultural content.", levels: "6-12" },
                { title: "Remembering Simplified Hanzi", description: "Heisig method for memorizing characters.", levels: "All" },
                { title: "Pleco Dictionary App", description: "Essential dictionary app with flashcards.", levels: "All", url: "https://www.pleco.com" }
            ]
        },
        "Latin": {
            icon: GraduationCap,
            color: "slate",
            books: [
                { title: "Cambridge Latin Course", description: "Story-based Latin learning, used in many BASIS schools.", levels: "5-12", recommended: true },
                { title: "Wheelock's Latin", description: "Traditional grammar-focused approach.", levels: "7-12" },
                { title: "Latin for the New Millennium", description: "Modern Latin textbook with cultural context.", levels: "8-12" }
            ]
        },
        "Computer Science": {
            icon: Atom,
            color: "cyan",
            books: [
                { title: "Scratch Programming Playground", description: "Visual programming for beginners.", levels: "K-6" },
                { title: "Python Crash Course", description: "Beginner-friendly Python programming.", levels: "6-12", recommended: true },
                { title: "AP Computer Science A (Barron's)", description: "Java and AP CS A prep.", levels: "9-12" },
                { title: "CS50 (Harvard)", description: "Free online intro to computer science.", levels: "8-12", url: "https://cs50.harvard.edu" }
            ]
        }
    };

    const onlineResources = {
        "General Learning": [
            { title: "Khan Academy", type: "All Subjects", url: "https://www.khanacademy.org", icon: Video },
            { title: "Crash Course", type: "Video Series", url: "https://www.youtube.com/crashcourse", icon: Video },
            { title: "Quizlet", type: "Flashcards", url: "https://quizlet.com", icon: FileText }
        ],
        "Math": [
            { title: "Art of Problem Solving", type: "Advanced Math", url: "https://artofproblemsolving.com", icon: Calculator },
            { title: "Desmos", type: "Graphing Calculator", url: "https://www.desmos.com", icon: Calculator },
            { title: "Wolfram Alpha", type: "Math Engine", url: "https://www.wolframalpha.com", icon: Calculator }
        ],
        "Mandarin": [
            { title: "ChineseClass101", type: "Audio Lessons", url: "https://www.chineseclass101.com", icon: Languages },
            { title: "HelloChinese", type: "Mobile App", url: "https://www.hellochinese.cc", icon: Languages },
            { title: "Du Chinese", type: "Reading Practice", url: "https://www.duchinese.net", icon: Languages },
            { title: "Skritter", type: "Character Writing", url: "https://skritter.com", icon: Languages }
        ],
        "Science": [
            { title: "PhET Simulations", type: "Interactive Labs", url: "https://phet.colorado.edu", icon: FlaskConical },
            { title: "Bozeman Science", type: "AP Science Videos", url: "https://www.bozemanscience.com", icon: FlaskConical }
        ]
    };

    const colorClasses = {
        blue: "bg-blue-50 text-blue-600 border-blue-200",
        green: "bg-green-50 text-green-600 border-green-200",
        purple: "bg-purple-50 text-purple-600 border-purple-200",
        amber: "bg-amber-50 text-amber-600 border-amber-200",
        red: "bg-red-50 text-red-600 border-red-200",
        slate: "bg-slate-50 text-slate-600 border-slate-200",
        cyan: "bg-cyan-50 text-cyan-600 border-cyan-200"
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="mb-8 text-center">
                <button
                    onClick={() => navigate('/')}
                    className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-bold mb-6 transition-colors bg-white/50 px-4 py-2 rounded-full hover:bg-white/80"
                >
                    <Home size={18} />
                    Back to Dashboard
                </button>
                <h1 className="page-title">Study Materials</h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">
                    Recommended textbooks and resources aligned with BASIS curriculum
                </p>
            </div>

            {/* Tabs */}
            <div className="flex justify-center gap-4 mb-10">
                <button
                    onClick={() => setActiveTab('textbooks')}
                    className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'textbooks'
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                            : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                        }`}
                >
                    📚 Textbooks by Subject
                </button>
                <button
                    onClick={() => setActiveTab('online')}
                    className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'online'
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                            : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                        }`}
                >
                    🌐 Online Resources
                </button>
            </div>

            {activeTab === 'textbooks' && (
                <div className="space-y-8">
                    {Object.entries(textbooksBySubject).map(([subject, data]) => {
                        const Icon = data.icon;
                        const colorClass = colorClasses[data.color];
                        return (
                            <div key={subject} className="glass-panel bg-white/90 border-white/60 shadow-lg p-6 md:p-8">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className={`p-3 rounded-xl ${colorClass}`}>
                                        <Icon size={28} />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-800">{subject}</h2>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {data.books.map((book, idx) => (
                                        <div
                                            key={idx}
                                            className={`p-4 rounded-xl border-2 ${book.recommended ? 'border-indigo-300 bg-indigo-50/50' : 'border-slate-100 bg-white'} hover:shadow-md transition-all`}
                                        >
                                            <div className="flex items-start justify-between gap-2">
                                                <h3 className="font-bold text-slate-800">{book.title}</h3>
                                                {book.recommended && (
                                                    <span className="text-xs bg-indigo-600 text-white px-2 py-1 rounded-full whitespace-nowrap">
                                                        ⭐ Recommended
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-slate-600 mt-1">{book.description}</p>
                                            <div className="flex items-center justify-between mt-3">
                                                <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                                                    Grades {book.levels}
                                                </span>
                                                {book.url && (
                                                    <a
                                                        href={book.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
                                                    >
                                                        Visit <ExternalLink size={12} />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {activeTab === 'online' && (
                <div className="space-y-8">
                    {Object.entries(onlineResources).map(([category, resources]) => (
                        <div key={category} className="glass-panel bg-white/90 border-white/60 shadow-lg p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-slate-800 mb-6">{category}</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {resources.map((resource, idx) => {
                                    const Icon = resource.icon;
                                    return (
                                        <a
                                            key={idx}
                                            href={resource.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group p-5 rounded-xl border-2 border-slate-100 bg-white hover:border-indigo-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="p-3 rounded-xl bg-indigo-50 group-hover:bg-indigo-600 group-hover:text-white transition-all text-indigo-600">
                                                    <Icon size={24} />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                                                        {resource.title}
                                                    </h3>
                                                    <p className="text-sm text-slate-500">{resource.type}</p>
                                                </div>
                                            </div>
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-12 glass-panel bg-gradient-to-r from-indigo-600 to-purple-600 border-transparent text-white p-8 shadow-2xl">
                <div className="flex items-start gap-6">
                    <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                        <BookOpen className="text-white flex-shrink-0" size={36} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-3">📖 Where to Buy Textbooks</h3>
                        <p className="text-indigo-100 mb-4 leading-relaxed">
                            Most textbooks can be found at Amazon, Bookshop.org, or your local library.
                            For Mandarin materials, check Cheng & Tsui, Purple Culture, or AliExpress for authentic Chinese publishers.
                        </p>
                        <p className="text-sm text-white/80 italic font-medium bg-white/10 inline-block px-4 py-2 rounded-lg">
                            💡 Tip: Many resources have free online components - check publisher websites!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
