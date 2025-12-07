import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ExternalLink, Download, Video, FileText, Home } from 'lucide-react';

export default function StudyMaterials() {
    const navigate = useNavigate();

    const materials = {
        "Grades K-5": [
            { title: "Saxon Math", type: "Textbook", url: "https://www.hmhco.com/programs/saxon-math", icon: BookOpen },
            { title: "The Little Red Fort", type: "Book", url: "https://www.amazon.com/Little-Red-Fort-Brenda-Maier/dp/0545859199", icon: BookOpen },
            { title: "The Most Magnificent Thing", type: "Book", url: "https://www.amazon.com/Most-Magnificent-Thing-Ashley-Spires/dp/1554537045", icon: BookOpen },
            { title: "Sentence Composing for Elementary School", type: "Worktext", url: "https://www.heinemann.com/products/e00244.aspx", icon: FileText },
            { title: "Khan Academy Kids", type: "Interactive", url: "https://www.khanacademy.org/kids", icon: Video },
            { title: "Logic of English", type: "Curriculum", url: "https://www.logicofenglish.com/", icon: BookOpen }
        ],
        "Grades 6-8": [
            { title: "Saxon Math Course 1-3", type: "Textbook", url: "https://www.hmhco.com/programs/saxon-math", icon: BookOpen },
            { title: "Campbell Biology (Concepts & Connections)", type: "Textbook", url: "https://www.pearson.com/", icon: BookOpen },
            { title: "The Western Heritage Since 1300", type: "History Textbook", url: "https://www.pearson.com/", icon: BookOpen },
            { title: "Sentence Composing for Middle School", type: "Worktext", url: "https://www.heinemann.com/", icon: FileText },
            { title: "Latin for Americans", type: "Textbook", url: "https://www.mheducation.com/", icon: BookOpen }
        ],
        "High School (9-12) & AP": [
            { title: "College Physics (Knight, Jones, Field)", type: "AP Physics Textbook", url: "https://www.pearson.com/", icon: BookOpen },
            { title: "Chemistry: The Central Science", type: "AP Chemistry Textbook", url: "https://www.pearson.com/", icon: BookOpen },
            { title: "Calculus: Early Transcendentals (Stewart)", type: "AP Calculus Textbook", url: "https://www.cengage.com/", icon: BookOpen },
            { title: "Myers' Psychology for AP", type: "AP Psychology Textbook", url: "https://www.macmillanlearning.com/", icon: BookOpen },
            { title: "The American Pageant", type: "AP US History Textbook", url: "https://www.cengage.com/", icon: BookOpen }
        ]
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="mb-12 text-center">
                <button
                    onClick={() => navigate('/')}
                    className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-bold mb-6 transition-colors bg-white/50 px-4 py-2 rounded-full hover:bg-white/80"
                >
                    <Home size={18} />
                    Back to Dashboard
                </button>
                <h1 className="page-title">Study Materials</h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">
                    Curated educational resources to supplement your learning journey
                </p>
            </div>

            <div className="space-y-10">
                {Object.entries(materials).map(([gradeRange, resources]) => (
                    <div key={gradeRange} className="glass-panel bg-white/80 border-white/60 shadow-xl p-8 md:p-10">
                        <h2 className="text-3xl font-bold text-slate-800 mb-8 pb-4 border-b-2 border-indigo-100 flex items-center gap-3">
                            <span className="bg-indigo-100 text-indigo-600 px-4 py-1 rounded-lg text-lg">
                                {gradeRange}
                            </span>
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {resources.map((resource, index) => {
                                const Icon = resource.icon;
                                return (
                                    <a
                                        key={index}
                                        href={resource.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group p-6 rounded-2xl border-2 border-slate-100 bg-white hover:border-indigo-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="p-4 rounded-xl bg-indigo-50 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 text-indigo-600">
                                                <Icon size={28} />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors mb-1">
                                                    {resource.title}
                                                </h3>
                                                <p className="text-sm text-slate-500 mb-3 font-medium">{resource.type}</p>
                                                <div className="flex items-center gap-1 text-indigo-600 text-sm font-bold group-hover:translate-x-1 transition-transform">
                                                    <span>Visit Resource</span>
                                                    <ExternalLink size={14} />
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 glass-panel bg-gradient-to-r from-indigo-600 to-purple-600 border-transparent text-white p-10 shadow-2xl">
                <div className="flex items-start gap-6">
                    <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                        <BookOpen className="text-white flex-shrink-0" size={40} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-3">Need More Resources?</h3>
                        <p className="text-indigo-100 mb-4 text-lg leading-relaxed">
                            These are just starting points! Your school library, local public library, and teachers
                            can recommend additional materials tailored to your specific learning needs.
                        </p>
                        <p className="text-sm text-white/80 italic font-medium bg-white/10 inline-block px-4 py-2 rounded-lg">
                            💡 Tip: Combine these resources with regular practice quizzes on EduQuiz for the best results!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
