import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, User, BookOpen, History, LayoutDashboard, HelpCircle, X } from 'lucide-react';

export default function Layout({ children }) {
  const { currentUser, logout, userData } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showHelp, setShowHelp] = useState(false);

  async function handleLogout() {
    try {
      await logout();
      navigate('/login');
    } catch {
      console.error("Failed to log out");
    }
  }

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 text-white shadow-lg z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div
            className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => navigate('/')}
          >
            <BookOpen size={28} strokeWidth={2.5} />
            <span className="text-2xl font-black tracking-tight">Basis Prep</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowHelp(true)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              title="Help"
            >
              <HelpCircle size={20} />
            </button>
            {currentUser ? (
              <>
                <button
                  onClick={() => navigate('/')}
                  className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all font-medium text-sm backdrop-blur-sm"
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </button>
                <button
                  onClick={() => navigate('/history')}
                  className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all font-medium text-sm backdrop-blur-sm"
                >
                  <History size={18} />
                  History
                </button>
                <div className="h-8 w-px bg-white/20 mx-1 hidden md:block"></div>
                <div className="text-right mr-2 hidden sm:block">
                  <div className="text-sm font-bold">{currentUser.displayName || 'Student'}</div>
                  <div className="text-xs text-indigo-200">@{currentUser.email.split('@')[0]}</div>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  title="Sign Out"
                >
                  <LogOut size={20} />
                </button>
              </>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={() => navigate('/login')}
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all font-bold text-sm"
                >
                  Log In
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className="px-4 py-2 rounded-lg bg-white text-indigo-700 hover:bg-indigo-50 transition-all font-bold text-sm shadow-md"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-grow p-4 md:p-6">
        {children}
      </main>

      <footer className="py-6 text-center text-slate-500 text-sm">
        &copy; {new Date().getFullYear()} Basis Prep Platform. All rights reserved.
      </footer>

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowHelp(false)}>
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-700" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 p-6 flex justify-between items-center rounded-t-2xl">
              <div className="flex items-center gap-3">
                <HelpCircle size={28} />
                <h2 className="text-2xl font-bold text-white">Help & Guide</h2>
              </div>
              <button
                onClick={() => setShowHelp(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6 text-slate-200">
              <section>
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <BookOpen size={20} className="text-indigo-400" />
                  What is Basis Prep?
                </h3>
                <p className="leading-relaxed">
                  Basis Prep is an educational platform designed to help students test their knowledge across various subjects and grade levels.
                  Our AI-powered quiz system generates personalized questions to enhance learning and track progress over time.
                </p>
              </section>

              <div className="h-px bg-slate-700"></div>

              <section>
                <h3 className="text-xl font-bold text-white mb-3">How to Use Basis Prep</h3>
                <div className="space-y-4">
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                    <h4 className="font-bold text-indigo-400 mb-2">1. Create an Account</h4>
                    <p className="text-sm">Sign up with your first name, last name, username, and password. Your data is securely stored in Firebase.</p>
                  </div>

                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                    <h4 className="font-bold text-purple-400 mb-2">2. Select Your Quiz</h4>
                    <p className="text-sm">From the dashboard, choose your grade level, subject, and specific topic you want to practice.</p>
                  </div>

                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                    <h4 className="font-bold text-pink-400 mb-2">3. Take the Quiz</h4>
                    <p className="text-sm">Answer the AI-generated questions at your own pace. Your responses are automatically saved.</p>
                  </div>

                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                    <h4 className="font-bold text-indigo-400 mb-2">4. Review Your Results</h4>
                    <p className="text-sm">After completing the quiz, see your score and review correct answers. All quiz history is saved in your profile.</p>
                  </div>

                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                    <h4 className="font-bold text-purple-400 mb-2">5. Track Your Progress</h4>
                    <p className="text-sm">Visit the History page to view all your past quizzes, scores, and dates to monitor your improvement over time.</p>
                  </div>
                </div>
              </section>

              <div className="h-px bg-slate-700"></div>

              <section>
                <h3 className="text-xl font-bold text-white mb-3">Features</h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li>AI-generated questions tailored to your grade and subject</li>
                  <li>Multiple subjects including Math, Science, English, and more</li>
                  <li>Comprehensive quiz history tracking</li>
                  <li>Secure user authentication and data storage</li>
                  <li>Mobile-friendly responsive design</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
